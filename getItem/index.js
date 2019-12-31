var AWS = require('aws-sdk');

const dbClient = new AWS.DynamoDB.DocumentClient({region:'ap-southeast-1'});

exports.handler = async (event) => {
    
    const params = {
    TableName: 'Item_table',
        FilterExpression: '#key = :key',
        ExpressionAttributeNames: {
            '#key': 'key',
        },
        ExpressionAttributeValues: {
            ':key': event.queryStringParameters.key,
        },
    }; 
    
    
    return new Promise((resolve, reject) =>{
        scanTable(params, event)
            .then(result => {
                if(result){
                    return resolve({statusCode: 200, body: JSON.stringify(result)});
                }
                else {
                    return resolve({statusCode: 404});
                }
        });
    });
    
};


var scanTable = async (params, event) => {
    let items = await dbClient.scan(params).promise();
    let itemList = items.Items;
    var result;
    if (event.queryStringParameters.timestamp){
        itemList.forEach(item=>{
            if(item.timestamp == event.queryStringParameters.timestamp){
                result = item;
            }
        })
    }
    else {
        //Sort and return latest
        itemList.sort((function (a, b) { 
                              return new Date(b.timestamp) - new Date(a.timestamp);
                            }));
        result = itemList[0];
    }
    if (result) {
        delete result.timestamp; //remove timestamp
        delete result.id; //remove id
    }
    return result;
};

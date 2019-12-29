var AWS = require('aws-sdk');

const uuidv1 = require('uuid/v1');

const dbClient = new AWS.DynamoDB.DocumentClient({region:'ap-southeast-1'});

exports.handler = async (event) => {
    
    var payload =  JSON.parse(event.body);
    
    console.log (payload);
    var params = {
        TableName: 'Item_table',
        Item:{
            'id': uuidv1(),
            'key': payload.key,
            'value': payload.value,
            "timestamp": Date.now()
        }
    };
    
    
    return new Promise((resolve, reject) =>{
        dbClient.put(params, function(err, data){
            if(err){
                reject(err);
            }
            else{
                return resolve({statusCode: 200});
            }
        })
    });
};
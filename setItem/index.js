var AWS = require('aws-sdk');

const dbClient = new AWS.DynamoDB.DocumentClient({region:'ap-southeast-1'});

exports.handler = async (event) => {
    
    var payload =  JSON.parse(event.body);
    
    console.log (payload);
    var params = {
        TableName: 'Item_table',
        Item:{
            'id': "123",
            'key': payload.key,
            'value': payload.value
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
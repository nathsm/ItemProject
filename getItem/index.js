var AWS = require('aws-sdk');

const dbClient = new AWS.DynamoDB.DocumentClient({region:'ap-southeast-1'});

exports.handler = async (event) => {
    
    var params = {
        TableName: 'Item_table',
        Key:{
            'id': "123",
        }
    }
    
    
    return new Promise((resolve, reject) =>{
        dbClient.get(params, function(err, data){
            if(err){
                reject(err);
            }
            else{
                return resolve({statusCode: 200, body:data});
            }
        })
    });
};


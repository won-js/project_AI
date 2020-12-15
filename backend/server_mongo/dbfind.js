var Client = require('mongodb').MongoClient;

Client.connect('mongodb://localhost:27017/school', function(error, database){
    if(error) {
        console.log(error);
    } else {
        const db = database.db('school');

        // 1. 읽어올 document 필드값 정의
        var query = {gender:'M'};
        // 2. find( ) 함수에 query 입력
        var cursor = db.collection('student').find(query);
        cursor.each(function(err,doc){
            if(err){
                console.log(err);
            }else{
                if(doc != null){
                    console.log(doc);
                } else {
                    console.log('없음')
                }
            }
        });
        database.close();
    }
});
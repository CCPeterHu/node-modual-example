const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');


const url = 'mongodb://localhost:27017'
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err, null);

    console.log('Connected correctly to the server');

    const db = client.db(dbname);

    dboper.insertDocument(db, {name: "Peter", description: "haha description"}, 'dishes', result => {
        
        console.log('Insert Document:\n', result.ops);
        
        dboper.findDocuments(db, 'dishes', docs => {
            console.log('Found Documents:\n', docs);

            dboper.updatetDocument(db, {name: "Peter"}, {description: "Updated Test"}, 'dishes', result => {
                console.log('Updated Document:\n', result.result);

                dboper.findDocuments(db, 'dishes', docs => {
                    console.log('Found Documents:\n', docs);

                    db.dropCollection('dishes', result =>{
                        console.log('Dropped Collection: ', result);

                        client.close();
                    });
                });
            });
        });
    });
    // const collection = db.collection('dishes');

    // collection.insertOne({"name": "Peter Hu", "description": "test description"}, 
    // (err, result)=> {
    //     assert.equal(err, null);

    //     console.log('After Inserting: \n');
    //     console.log(result.ops);

    //     collection.find({}).toArray((err, docs)=> {
    //         assert.equal(err, null);

    //         console.log('Found: \n');
    //         console.log(docs);


    //         db.dropCollection('dishes', (err, result)=>{ // remove from db
    //             assert.equal(err, null);

    //             client.close();
    //         });
    //     });
    // });

});
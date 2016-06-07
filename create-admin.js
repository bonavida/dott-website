var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost/dott';

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);

        // Get the documents collection
        var collection = db.collection('users');

        //Create the admin user
        var admin = {
            name:  "admin",
            username: "admin",
            password: "admin123",
            email: "admin@admin.com",
            birthday: "",
            location: "",
            image: "",
            isAdm: true,
        };


        // Insert some users
        collection.insert([admin], function (err, result) {
            if (err) {
                console.log("The admin user might already exist or there was some issue inserting it");
            } else {
                console.log('Inserted the admin user');
            }
            //Close connection
            db.close();
        });
    }
});
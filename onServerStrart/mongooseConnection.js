'use strict'; 
module.exports = function (app, mongoose) {
    let connection = mongoose.connect(app.config.MONGO_URI,  { useNewUrlParser: true });
    mongoose.connection.on('error', function (err) {
		console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
	});
};
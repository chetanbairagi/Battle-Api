
// Function to insert document 
exports.createDocument = function (toSaveDoc, collection,callback) {
	let res = new collection(toSaveDoc);
	res.save().then((doc) => { 
		callback("",doc);
	})
	.catch((e) => {
		callback(e, "");
	});
};


// Function to get document
exports.getAll = function (query, collection, selection, populateDoc, sorting, app, callback) {
	collection.find(query, selection).populate(populateDoc).sort(sorting).lean().then((doc) => {
		callback("", doc);
	}).catch((err) => {
		callback(err, "");
	});
};

// Function to get number of documents in a collection
exports.getAllDocsCount = function (query, collection, app, callback) {
	collection.count(query, function (err, count) {
		if (err) {
			callback(err, "");
		} else {
			callback("", count);
		}
	})
};

// Function to get data as aggregate function & group by & sort
exports.getAllDocsbyGroup = function (query, collection, app, callback) {
	collection.aggregate(query).then((doc) => {
		callback("", doc);
	}).catch((err) => {
		callback(err, "");
	});
};

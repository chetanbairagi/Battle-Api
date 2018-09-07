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
exports.getAllSearchData = function (query, collection, selection, activityPopulateObj, sorting, app, callback) {
	collection.find(query, selection).populate(activityPopulateObj).sort(sorting).lean().then((doc) => {
		callback("", doc);
	}).catch((err) => {
		callback(err, "");
	});
};

// Function to get number of documents in a collection
exports.getAllDataCount = function (query, collection, app, callback) {
	collection.count(query, function (err, count) {
		if (err) {
			callback(err, "");
		} else {
			callback("", count);
		}
	})
};

// Function to get data as aggregate function & group by & sort
exports.getAllDataByGroup = function (query, collection, app, callback) {
	collection.aggregate(query).then((doc) => {
		callback("", doc);
	}).catch((err) => {
		callback(err, "");
	});
};

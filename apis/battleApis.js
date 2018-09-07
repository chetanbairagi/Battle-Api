
exports.createJwtToken = function (req, res) {
	res.status(200).json({
		message: "success",
		data: { token : "Bearer" + " " + req.app.common.randomJwt(req.body, req.app)},
		res: true
	});
}

exports.list = function(req, res) {
	let collection = req.app.schema.battles;
	let query = [
		{
			"$group" : {
				_id  : "$location"
			}
		}
	];
   	let listPromise = new Promise(function(resolve, reject) {
		req.app.crud.getAllDataByGroup(query, collection, req.app, (err, doc) => {
			if (err) {
				reject({res: false, status : 500, err : "Uncaugth exception"});
			} else if (doc){
				resolve({res: true, status : 200, err : "success", doc : doc});
			} else {
				reject({res: false, status : 200, err : "success"});
			}
		});
	});
	listPromise.then((doc) => {
		res.status(200).json({
			message: "success",
			data: {count : doc.doc},
			res: true
		});
	}).catch((error) => {
		res.status(error.status).json({
			message: error.err,
			data: {},
			res: false
		});
	});
}

exports.count = function(req, res) {
	let collection = req.app.schema.battles;
	let query = {}

   	let countPromise = new Promise(function(resolve, reject) {
		req.app.crud.getAllDataCount(query, collection, req.app, (err, count) => {
			if (err) {
				reject({res: false, status : 500, err : "Uncaugth exception"});
			} else if (count){
				resolve({res: true, status : 200, err : "success", count : count});
			} else {
				reject({res: false, status : 200, err : "success"});
			}
		});
	});

	countPromise.then((doc) => {
		res.status(200).json({
			message: "success",
			data: {count : doc.count},
			res: true
		});
	}).catch((error) => {
		res.status(error.status).json({
			message: error.err,
			data: {},
			res: false
		});
	});
}

exports.search = function (req, res) {
	let query;
	if (typeof req.query.king !== "undefined" && typeof req.query.location !== "undefined" && typeof req.query.type !== "undefined") {
		query = {
			"$or" : [
				{
					"attacker_king" : req.query.king
				},
				{
					"defender_king" : req.query.king
				}
			],
			"location" : req.query.location,
			"battle_type" : req.query.type
		}
	} else {
		if (typeof req.query.king !== "undefined" && typeof req.query.location !== "undefined") {
			query = {
				"$or" : [
					{
						"attacker_king" : req.query.king
					},
					{
						"defender_king" : req.query.king
					}
				],
				"location" : req.query.location
			}
		} else {
			if (typeof req.query.king !== "undefined" && typeof req.query.type !== "undefined") {
				query = {
					"$or" : [
						{
							"attacker_king" : req.query.king
						},
						{
							"defender_king" : req.query.king
						}
					],
					"battle_type" : req.query.type
				}
			} else {
				if (typeof req.query.type !== "undefined" && typeof req.query.location !== "undefined") {
					query = {
						"location" : req.query.location,
						"battle_type" : req.query.type
					}
				} else {
					if (typeof req.query.king !== "undefined") {
						query =	{
							"$or" : [
								{
									"attacker_king" : req.query.king
								},
								{
									"defender_king" : req.query.king
								}
							]
						}
					} else {
						if (typeof req.query.location !== "undefined") {
							query = {
								"location" : req.query.location
							}
						} else {
							if (typeof req.query.type !== "undefined") {
								query = {
									"battle_type" : req.query.type
								}
							} else {
								query = {};
							}
						}
					}
				}
			}
		}
	}

	let collection = req.app.schema.battles, selection = {}, activityPopulateObj = "";
	let sort = {
		"battle_number" : -1 
	}

	let searchPromise = new Promise(function(resolve, reject) {
		req.app.crud.getAllSearchData(query, collection, selection, activityPopulateObj, sort, req.app, (err, doc) => {
			if (err) {
				reject({res: false, status : 500, err : "Uncaugth exception"});
			} else {
				if (doc.length > 0) {
					resolve({res: true, status : 200, err : "success", doc : doc});
				} else {
					reject({res: false, status : 200, err : "success"});
				}
			}
		});
	});

	searchPromise.then((doc) => {
		res.status(200).json({
			message: "success",
			data: doc.doc,
			res: true
		});
	}).catch((error) => {
		res.status(error.status).json({
			message: error.err,
			data: {},
			res: false
		});
	});
	
};


exports.stats = function(req, res) {
	let collection = req.app.schema.battles;
   	let attackerKingPromise = new Promise(function(resolve, reject) {
   		let query = [
			{
				"$group" : {
					_id  : "$attacker_king",
					total : {$sum : 1}
				}
			},
			{ $sort : { total : -1} },
			{ $limit : 1 }
		];
		req.app.crud.getAllDataByGroup(query, collection, req.app, (err, doc) => {
			if (err) {
				reject({res: false, status : 500, err : "Uncaugth exception"});
			} else if (doc){
				resolve({res: true, status : 200, err : "success", doc : doc});
			} else {
				reject({res: false, status : 200, err : "success"});
			}
		});
	});

   	let defenderKingPromise = new Promise(function(resolve, reject) {
   		let query = [
			{
				"$group" : {
					_id  : "$defender_king",
					total : {$sum : 1}
				}
			},
			{ $sort : { total : -1} },
			{ $limit : 1 }
		];
		req.app.crud.getAllDataByGroup(query, collection, req.app, (err, doc) => {
			if (err) {
				reject({res: false, status : 500, err : "Uncaugth exception"});
			} else if (doc){
				resolve({res: true, status : 200, err : "success", doc : doc});
			} else {
				reject({res: false, status : 200, err : "success"});
			}
		});
	}); 

	let regionPromise = new Promise(function(resolve, reject) {
   		let query = [
			{
				"$group" : {
					_id  : "$region",
					total : {$sum : 1}
				}
			},
			{ $sort : { total : -1} },
			{ $limit : 1 }
		];
		req.app.crud.getAllDataByGroup(query, collection, req.app, (err, doc) => {
			if (err) {
				reject({res: false, status : 500, err : "Uncaugth exception"});
			} else if (doc){
				resolve({res: true, status : 200, err : "success", doc : doc});
			} else {
				reject({res: false, status : 200, err : "success"});
			}
		});
	}); 

	let namePromise = new Promise(function(resolve, reject) {
   		let query = [
			{
				"$group" : {
					_id  : "$name",
					total : {$sum : 1}
				}
			},
			{ $sort : { total : -1} },
			{ $limit : 1 }
		];
		req.app.crud.getAllDataByGroup(query, collection, req.app, (err, doc) => {
			if (err) {
				reject({res: false, status : 500, err : "Uncaugth exception"});
			} else if (doc){
				resolve({res: true, status : 200, err : "success", doc : doc});
			} else {
				reject({res: false, status : 200, err : "success"});
			}
		});
	}); 

	let attackerOutcomePromise = new Promise(function(resolve, reject) {
   		let query = [
			{
				"$group" : {
					_id  : "$attacker_outcome",
					total : {$sum : 1}
				}
			},
			{ $sort : { total : -1} }
		];
		req.app.crud.getAllDataByGroup(query, collection, req.app, (err, doc) => {
			if (err) {
				reject({res: false, status : 500, err : "Uncaugth exception"});
			} else if (doc){
				resolve({res: true, status : 200, err : "success", doc : doc});
			} else {
				reject({res: false, status : 200, err : "success"});
			}
		});
	});

	let defenderSizePromise = new Promise(function(resolve, reject) {
   		let query = [
   			{
   				$group:
         	 	{
           			_id: null,
           			max: { $max: "$defender_size" },
           			min: { $min: "$defender_size" },
           			avg: { $avg: "$defender_size" }
       			}
       		}
		];
		req.app.crud.getAllDataByGroup(query, collection, req.app, (err, doc) => {
			if (err) {
				reject({res: false, status : 500, err : "Uncaugth exception"});
			} else if (doc){
				resolve({res: true, status : 200, err : "success", doc : doc});
			} else {
				reject({res: false, status : 200, err : "success"});
			}
		});
	}); 

	let battleTypePromise = new Promise(function(resolve, reject) {
   		let query = [
   			{
   				$group:
         	 	{
           			_id: "$battle_type"
       			}
       		}
		];
		req.app.crud.getAllDataByGroup(query, collection, req.app, (err, doc) => {
			if (err) {
				reject({res: false, status : 500, err : "Uncaugth exception"});
			} else if (doc){
				resolve({res: true, status : 200, err : "success", doc : doc});
			} else {
				reject({res: false, status : 200, err : "success"});
			}
		});
	}); 

	Promise.all([attackerKingPromise, defenderKingPromise, regionPromise, namePromise, attackerOutcomePromise, defenderSizePromise, battleTypePromise]).then((values) => {
	  let response = {};
	  response.most_active = {};
	  response.attacker_outcome = {};
	  response.defender_size = {};
	  response.battle_type = [];
	  response.most_active.attacker_king = values[0].doc[0]._id;
	  response.most_active.defender_king = values[1].doc[0]._id;
	  response.most_active.region = values[2].doc[0]._id;
	  response.most_active.name = values[3].doc[0]._id;
	  response.attacker_outcome.win = values[4].doc[0].total;
	  response.attacker_outcome.loss = values[4].doc[1].total;
	  response.defender_size.average = values[5].doc[0].avg.toFixed(2);
	  response.defender_size.min = values[5].doc[0].min;
	  response.defender_size.max = values[5].doc[0].max;
	  for(let i = 0; i < values[6].doc.length; i++) {
	  	response.battle_type.push(values[6].doc[i]._id);
	  }
	  res.status(200).json({
		message: "success",
		data: response,
		res: true
	});
	}).catch((error) => {
		res.status(error.status).json({
			message: error.err,
			data: {},
			res: false
		});
	});
}
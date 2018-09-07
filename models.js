
exports = module.exports = function (app, mongoose) {
	// Users Schemas
	require('./schemas/battleSchema.js')(app, mongoose);
};
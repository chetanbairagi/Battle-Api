const jwt = require('jwt-simple');
const moment = require('moment');

exports.randomJwt = function createJWT(user, app) {
	user.exp = moment().add(14, 'days').unix();
	user.createdTime = moment().unix();
	console.log('jwt fun',jwt.encode(user, app.config.TOKEN_SECRET));
	return jwt.encode(user, app.config.TOKEN_SECRET);
};
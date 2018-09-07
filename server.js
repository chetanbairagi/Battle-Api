const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');

const app = express();
app.use(logger('dev'));

app.use(passport.initialize());

app.use(bodyParser.urlencoded({
	extended: false,
	limit: '50mb'
}));
app.use(bodyParser.json({
	limit: '50mb'
}));

app.schema = {};

app.set('port', process.env.PORT || 3000);



app.config = require('./config/config.js');

require('./passportAuth/passportAuth.js')(app, passport);

app.common = require('./functions/createJwtRandomToken.js');

require('./onServerStrart/mongooseConnection.js')(app, mongoose);
require('./onServerStrart/uncaughtException.js')(app);	
require('./routes/routes.js')(app, passport);
require('./models')(app, mongoose);

app.crud = require('./dataAccess/crud');


const listener = app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
	require('./onServerStrart/scriptsCsvToJson.js')(app);
});
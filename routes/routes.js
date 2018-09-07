module.exports = function (app, passport) { 
    app.post('/battle/createJwtToken', require('../apis/battleApis.js').createJwtToken);
    
    app.get('/list', function(req, res, next) {
    	passport.authenticate('jwt', { session: false },(err, battle) => {
    		if(!battle) {
    			res.status(401).json({
					message: "Unauthorized",
					data: {},
					res: false
				});
    		} else {
    			next();
    		}
    	})(req, res, next)
    }, require('../apis/battleApis').list);

    app.get('/count', function(req, res, next) {
    	passport.authenticate('jwt', { session: false },(err, battle) => {
    		if(!battle) {
    			res.status(401).json({
					message: "Unauthorized",
					data: {},
					res: false
				});
    		} else {
    			next();
    		}   
    	})(req, res, next)
    }, require('../apis/battleApis').count);
    
    app.get('/search', function(req, res, next) {
    	passport.authenticate('jwt', { session: false },(err, battle) => {
    		if(!battle) {
    			res.status(401).json({
					message: "Unauthorized",
					data: {},
					res: false
				});
    		} else {
    			next();
    		}
    	})(req, res, next)
     }, require('../apis/battleApis.js').search);
    
    app.get('/stats', function(req, res, next) {
    	passport.authenticate('jwt', { session: false },(err, battle) => {
    		if(!battle) {
    			res.status(401).json({
					message: "Unauthorized",
					data: {},
					res: false
				});
    		} else {
    			next();
    		}
    	})(req, res, next)
    }, require('../apis/battleApis').stats);
};
module.exports = function(app){
	var autenticate = function(req, res, next){
		
		if(!req.session.autorizate){
			return res.redirect('/');
		}

		return next();
	}

	var Game = app.controllers.game
	app.get("/jogo", autenticate, Game.index)
}
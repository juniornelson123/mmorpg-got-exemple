module.exports = function(app){
	var notAutenticate = function(req, res, next){
		
		if(req.session.autorizate){
			return res.redirect('/jogo');
		}

		return next();
	}

	var autenticate = function(req, res, next){
		
		if(!req.session.autorizate){
			return res.redirect('/');
		}

		return next();
	}


	var Home = app.controllers.home
	
	app.get("/", notAutenticate, Home.index)
	app.get("/cadastro", notAutenticate, Home.register)
	app.post("/cadastrar", Home.create)
	app.post("/login", Home.login)
	app.get("/sair", autenticate, Home.logout)
}
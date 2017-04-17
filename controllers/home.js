module.exports = function(app){
	var User = app.models.user

	var HomeController = {
		index: function(req, res){
			res.render('index', {validation: {}, data: {}})
		},

		register: function(req, res){
			res.render('register', {validation: {}, data: {}})
		},

		create: function(req, res){
			var user = req.body

			req.assert("name","Nome não pode ficar em branco").notEmpty()
			req.assert("email","Email não pode ficar em branco").notEmpty()
			req.assert("password","Senha não pode ficar em branco").notEmpty()
			req.assert("house","Casa não pode ficar em branco").notEmpty()

			var errors = req.validationErrors()
			console.log(errors)
			if (errors) {
					res.render('register', {validation: errors, data: user})
			}else{
				
				User.create(user).then(function(user){
					res.redirect('/jogo')
				}, function(errors){
					res.render('register', {validation: errors, data: user})
					console.log(errors)
				})		
			}
		},

		login: function(req, res){
			var user = req.body

			req.assert("email", "Email nao pode ficar em branco").notEmpty()
			req.assert("password", "Senha nao pode ficar em branco").notEmpty()

			var errors = req.validationErrors()
			if (errors) {
				console.log(errors)
				res.render("index", {validation: errors, data: user})
			}else{

				User.findOne({email: user.email}).exec().then(function(reqUser){
					if (reqUser) {
						if (reqUser.password === user.password) {
							req.session.autorizate = true
							res.redirect("/jogo")


						}else{
							errors =[{msg: "Senha invalida"}]
							res.render("index", {validation: errors, data: user})

						}
					}else{
							errors =[{msg: "Usuario nao cadastrado"}]
							res.render("index", {validation: errors, data: user})

					}
				}, function(errors){
							errors =[{msg: "Ocorreu um erro ao tentar fazer a requisição"}]
						res.render("index", {validation: errors, data: user})

				})
			}
		},

		logout: function(req, res){
			req.session.destroy()
			res.redirect("/")
		}
	}

	return HomeController
}

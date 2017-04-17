module.exports = function(app){
	var GameController = {
		index: function(req, res){
			res.render('game/index')
		}
	}

	return GameController
}
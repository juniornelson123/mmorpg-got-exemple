var mongoose = require('mongoose')

module.exports = function(uri){
	mongoose.connect(uri)
	mongoose.set('debug', true)

	mongoose.connection.on("connected", function(){
		console.log("Conectado na: "+uri)
	})

	mongoose.connection.on("disconnected", function(){
		console.log("Desconectado: "+uri)
	})

	mongoose.connection.on('error', function(erro){
	 	console.log("Erro "+erro)
	});

	process.on('SIGINT',  function()  {
	    mongoose.connection.close(function()  {
	      console.log('Mongoose!  Desconectado  pelo  término da aplicação');
	        //  0 indica  que a finalização ocorreu sem erros
	        process.exit(0);
	    });
	});
}
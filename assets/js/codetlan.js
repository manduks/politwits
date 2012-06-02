function mostrarNegativos(candidato){/*
	switch (candidato) {
		case 0:
//			var el = $('<tr>').append( $('<td>').text('test') );
			$("#mostrarNegativos").find("small").text("@lopezobrador_");
			var test = [{
				nombre: 'prueba1',
				imagen: 'https://si0.twimg.com/profile_images/2232194836/Pregunton.png',
				tweet: '@miembrosalaire Cuando estarán en Guadalajara, Puebla y Xalapa? Saludos y Felicidades por la nueva temporada!'
			}];
			$.each(test, function(index, tweetNegativo) { 
			  console.log(tweetNegativo);
			  var record = $('<tr>').append( $('<td>').text(tweetNegativo.nombre) ).append( $('<td>').text(tweetNegativo.tweet));
			  console.log(record);
			  $("#mostrarNegativos").find("table").append(record);
			});
			$("#mostrarNegativos").modal();
		break;
		case 1:
			$("#mostrarNegativos").find("small").text("@g_quadri");
			$("#mostrarNegativos").modal();
		break;
		case 2:
			$("#mostrarNegativos").find("small").text("@epn");
			$("#mostrarNegativos").modal();
		break;
		case 3:
			$("#mostrarNegativos").find("small").text("@josefinavm");
			$("#mostrarNegativos").modal();
		break;		
	}
*/};

function activarTooltips(){
	$(".menciones-tooltip").tooltip({
		placement: 'bottom',
		title: 'Número</br>de menciones'
	});
	$(".negativos-tooltip").tooltip({
		placement: 'bottom',
		title: 'Tweets ofensivos'//</br>[Da clic]'
	});
};

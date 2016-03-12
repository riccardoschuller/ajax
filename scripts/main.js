

$(document).ready(function () {

	var root = 'http://jsonplaceholder.typicode.com';
	

	$("#postName").on("click",function(e){
	 		$("#logIn").slideUp();
		 var user = {
		 	name: $("#exampleInputEmail1").val()
		 };
		 e.preventDefault();

	 	$.ajax( 
			{
				url: root + '/users',
				method: 'POST', //GET, POST, PUT, DELETE
				contentType: 'application/json', //ask server to return json
				dataType: 'json',
				data: JSON.stringify(user), //says to server we are sending json
				//Call if request return successfully
				success: function (response) {

					

					alert(user + " è stato salvato.")
				
				},
				//Call in case of request error
				error: function (request, errorType, errorMessage){
					alert('Error: ' + errorType + ', message: ' + errorMessage)
					console.log(request);
				}			
			});	
	 	console.log(user)
	
	});

	$("#start").click(function(){

	$("#first").slideUp();
		
	$.get('./html/user.html', function ( userTemplate ) {

		$.ajax( 
			{
				url: root + '/users',
				method: 'GET', //GET, POST, PUT, DELETE
				contentType: 'application/json', //ask server to return json
				dataType: 'json', //says to server we are sending json
				//Call if request return successfully
				success: function (response) {

					var template = Handlebars.compile($(userTemplate)[0].outerHTML); //convert from jquery to string

					for(var i = 0; i < response.length; i ++) {

						var html = template(response[i]);

						/*
						la variabile html ora e' una stringa con dentro tag HTML
						con append() jQuery la trasforma in elementi javascript e poi li inserisce nel DOM		

						$('.container').append(html)
						*/

						/*
						se invece la convertiamo prima di tutto in un oggetto jQuery
						var $html = $(html);

						possiamo usarlo come base per le ricerche degli elementi HTML. Mi spiego meglio:
						- quando fai una selezione $(".btn-info") jQuery cerca in tutto il DOM elementi con quella classe
						- noi vogliamo cercare il button che sta dento ogni template e volta per volta mettergli la call back sul click

						Quindi perche' non considerare solo il template come base della ricerca, invece che tutto il DOM?.

						facciamo quindi $html.find('.btn-info').on("click", ....)

						Facendo cosi siamo sicuri che mettiamo una e una sola callback per ogni bottone, nel primo caso invece dato che la
						ricerca viene fatta sempre su tutto il DOM la prima volta prende quelli giusti, la seconda prende due volte i primi
						e una i nuovi ecc. come abbiamo visto a lezione.

						ok bene ci siamo quasi:

						Il nostro vero goal e' avere nella callback del click il modello dell'utente corrispondente a quel singolo template
						esattamente quello che abbiamo passato nella riga #59 a Handlebars, response[i]. 
						
						per passare dei dati alla callback vediamo dalla documentazione che la fn on() accetta diversi parametri

						http://api.jquery.com/on/

						.on( events [, selector ] [, data ], handler ) con i parametri tra [] sono opzionali e se non inseriti non vengono considerati

						Nel caso datto da te attualmente infatti usiamo on() cosi: .on( events, handler ) 
						- events: click
						- handler: la funzione che hai definito

						Usando invece anche il data possiamo passare delle info dentro la callback con un oggetto in questo modo

						$html.find('.btn-info').on("click", {user : response[i]}, function() { ...
			     
						per accedere a quel data dobbiamo andarlo a cercare dentro l'oggetto event che viene sempre passato come primo
						parametro della callback (o handler). Esplicitiamo quindi l'oggetto evento per accedere dentro la callback 
						NB: la e (o come la vuoi rinominare)

						$html.find(.btn-info).on("click", {user : response[i]}, function(e) { ...
			     
 					 	ora da e prendiamo il data.user per puoi prendere le coordinate da passare a Google Maps

 					 	alla fine ricordiamoci di append() non html ma $html perche' e' quella che contiene la callback sul button

						*/
					
					var $html = $(html);

					$html.find('.btn-info').on("click", {user : response[i]}, function(e) {
				     
				      		//console.log(e);
				      		//console.log(e.data) //l'oggetto che definisci tu prima
				      		//console.log(e.data.user) //user perche' noi l'abbiamo chiamato cosi sopra
				      		console.log(e.data.user.address.geo)

				      		$.get('./html/map.html', function ( userTemplate ){
				      			$.ajax( {

				      				success: function (response) {
				      					var template = Handlebars.compile($(userTemplate)[0].outerHTML);
				      					console.log(e.data.user.address.geo);
				      					var html = template(response);
				      					$.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCxye_y5iBnACPLQw4G9YZrHAjWLVuA4z4&callback", function () {var mapDiv = document.getElementById('map');
									        var map = new google.maps.Map(mapDiv, {
									          center: {lat: parseInt(e.data.user.address.geo.lat), lng: parseInt(e.data.user.address.geo.lng)},
									          zoom: 8
									        });});

										
										 
										$( e.target ).closest($(".btn-info")).slideUp()
				      					$( e.target ).closest($(".col-lg-6")).append(html)
				      				}

				      			
				      		});

 					 	});

 					 	})		

 					$('.container').append($html);

					}
								

					
				
				},
				//Call in case of request error
				error: function (request, errorType, errorMessage){
					alert('Error: ' + errorType + ', message: ' + errorMessage)
					console.log(request);
				}			
			});

	})
	console.log($("#col-lg-6").length)
	})

	$("#start2").click(function(){
	
	$("#second").slideUp();

	$.get('./html/posts.html', function ( userTemplate ) {

		$.ajax( 
			{
				url: root + '/posts',
				method: 'GET', //GET, POST, PUT, DELETE
				contentType: 'application/json', //ask server to return json
				dataType: 'json', //says to server we are sending json
				//Call if request return successfully
				success: function (response) {

					var template = Handlebars.compile($(userTemplate)[0].outerHTML); //convert from jquery to string

					for(var i = 0; i < 5; i ++) {

						var html = template(response[i]);
					
						$('.container').append(html)
					}
				
				},
				//Call in case of request error
				error: function (request, errorType, errorMessage){
					alert('Error: ' + errorType + ', message: ' + errorMessage)
					console.log(request);
				}			
		});
	})
	
	})


	
	
});


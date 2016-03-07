

$(document).ready(function () {

	var root = 'http://jsonplaceholder.typicode.com';



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


	$("#showMap").click(function(){
		alert();
	})
	
});


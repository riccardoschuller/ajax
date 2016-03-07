

$(document).ready(function () {

	var root = 'http://jsonplaceholder.typicode.com';
	

	$("#postName").on("click",function(e){
	 
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

					

					alert("onowin")
				
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
	$("#second").slideUp();	
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
						alert($(".btn-info").length)
						
					$(".btn-info").off().on("click" , function(){
						alert(Math.random());
					})						

					$(".btn-info")
				
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
	$("#first").slideUp();
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


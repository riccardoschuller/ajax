var confirmation = {

	name: 'Controller',

	init: function () {

		$('.vacations').on('click', 'button', this.showFlightPrice);

		$('.confirmation').on('click', 'button', this.showFlightDetails ); 

	},

	showFlightDetails: function() {

			var dani = $('#param').attr('data-price'),
				_this = this;

			//load html script
			$.ajax('./html/ticket.html', 
			{
				//Call if request return successfully
				success: function (response) {

					var $ticket = $(_this).closest('.confirmation').find('.ticket');

	  				// inject into ul
					$ticket.html(response);

					if (!$ticket.is(':animated')){
						$ticket.slideToggle();
					} 
				},
				//connection timeout
				timeout: 3000, //3000 ms = 3 seconds 
				//Call in case of request error
				error: function (request, errorType, errorMessage){
					alert('Error: ' + errorType + ', message: ' + errorMessage)
					console.log(request);
				},			
				data : {
					//add params to URL (i.e. /?param=123)
					param: dani
				},
				//call before send request
				beforeSend: function () {
					$('#status').addClass('is-loading');
				},
				//call after success or error callbacks
				complete: function(){
					$('#status').removeClass('is-loading');
				}
			});

	},

	showFlightPrice: function () {
		
		var $vacations = $(this).closest('.vacations'),
			price = $vacations.data('price'),
			$price = $('<p>From $' + price + '</p>');

		//this è il button
		//console.log(this)

		$vacations.append($price);
 		
		$(this).remove();

	}

}




//NB capitalized
function Vacation( el ){

	this.$el = el;

	//add fn to instance
	this.init = function () {

		this.bindEventListeners();

	}

	this.bindEventListeners = function () {

		var _this = this;

		this.$el.on('click', 'button', function () {

			//this is the button

			//_this reference the Vaction
			_this.showFlightDetails();
		}); 

	}

	this.showFlightDetails = function () {

		var param = $('#param').attr('data-price');

		//this is Vacation
		this.loadFlightDetails(param);

	}

	this.loadFlightDetails  = function(param) {

		//reference the Vacation
		var _this = this;

		//load html script
		$.ajax('./html/ticket.html', 
		{
			//Call if request return successfully
			success: function (response) {

				//this is the ajax request
				//_this reference the Vaction
				var $ticket = _this.$el.find('.ticket');

  				// inject into ul
				$ticket.html(response);

				if (!$ticket.is(':animated')){
					$ticket.slideToggle();
				} 
			},
			//connection timeout
			timeout: 3000, //3000 ms = 3 seconds 
			//Call in case of request error
			error: function (request, errorType, errorMessage){
				alert('Error: ' + errorType + ', message: ' + errorMessage)
				console.log(request);
			},			
			data : {
				//add params to URL (i.e. /?param=123) from input
				param: param
			},
			//call before send request
			beforeSend: function () {
				$('#status').addClass('is-loading');
			},
			//call after success or error callbacks
			complete: function(){
				$('#status').removeClass('is-loading');
			}
		});

	}

}

$(document).ready(function () {

	//confirmation.init();

	var paris = new Vacation($('#paris'));
	var london = new Vacation($('#london'));
	
	london.init();
	paris.init();

});

*/

$(document).ready(function () {

	var root = 'http://jsonplaceholder.typicode.com';

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
					
						$('#names').append(html)
					}
				
				},
				//Call in case of request error
				error: function (request, errorType, errorMessage){
					alert('Error: ' + errorType + ', message: ' + errorMessage)
					console.log(request);
				}			
			});
	})

});
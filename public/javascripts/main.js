//main.js

$(document).ready(function() {

  function refresh() {
	$('.square').fadeOut('fast')
	$('#squarestream').load('/square/refresh');
  }

  setInterval(refresh, 2000)

 //wrapper from stack overflow that checks inputs for updates
 $('#new_square input').each(function() {
   var elem = $(this);

   // Save current value of element
   elem.data('oldVal', elem.val());

   // Look for changes in the value
   elem.bind("propertychange keyup input paste", function(event){
      // If value has changed...
      if (elem.data('oldVal') != elem.val()) {
       // Updated stored value
       elem.data('oldVal', elem.val());

       // Do action
       if (($('.location').val().length > 0) && ($('.comment').val().length > 0) && ($('.url').val().length > 0)) {
		 $('a.btn').attr('class', 'btn')
       }
       else {
       	 $('a.btn').attr('class', 'btn disabled')
       }
     }
   });
 });

 $('a.btn#square_sub').click(function() {
 	var location = $('.location').val();
 	var comment = $('.comment').val();
 	var url = $('.url').val();
 	$.post('/upload/square', {
 		location: location,
 		comment: comment,
 		url: url
 	});
 	$('input').val('')
 	refresh
 })

$('#create_user').click(function() {
 	var new_username = $('.new_username').val();
 	var new_password = $('.new_password').val();
 	var confirm_password = $('.confirm_password').val();
 	if ((new_password === confirm_password) && (new_password.length > 0) && (new_username.length > 0)) {
 	  $.post('/user/create', {
 		username: new_username,
 		password: new_password
 	  });
 	  window.location = '/'
 	}
 	else {
 		alert('DONE GOOFED')
 	}
});  


 // $('#log_in').click(function() {
 // 	console.log('here')
 // 	var username = $('.username').val();
 // 	var password = $('.password').val();
 // 	if (username.length !== 0 || password.length !== 0) {
 //      $.post('/login/action', {
 //        username: username,
 //        password: password
 // 	  });
 // 	  window.location = '/'
 // 	}
 // 	else {
 // 		alert('DONE GOOFED')
 // 	}
 // });

});
//main.js

$(document).ready(function() {

  function refresh() {
	$('.square').fadeOut('fast')
	$('#squarestream').load('/square/refresh');
  }

  setInterval(refresh, 60000)

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
 	if (url.indexOf('youtube') !== -1) {
 		var cutIndex = url.indexOf('=')+1;
 		if (cutIndex > -1) {
 		  var subIndex = -(url.length - cutIndex)
          var youtubeID = url.substr(subIndex, -subIndex);
 		}
 		$('.alert').fadeOut('fast');
	 	$.post('/upload/square', {
	 		location: location,
	 		comment: comment,
	 		url: 'http://www.youtube.com/v/' + youtubeID
	 	});
	 	$('input').val('')
	 	refresh();
 	}
 	else {
 		$('div.alert').fadeOut('fast');
 		$('#place_error').append('<div class="alert alert-error">Please enter a valid YouTube url!</div>')
 	    $('div.alert').fadeOut(2000);	
 	}
 });

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

});
$(function(){$(document).on('click','a[data-apply-button]',function(e){var $this=$(this)
var label=$this.attr('data-apply-button')
ga('send','event','"Apply" CTA','click',label);});$(document).on('click','a[data-reserve-tour-button]',function(e){var $this=$(this)
var label=$this.attr('data-reserve-tour-button')
ga('send','event','"Reserve a Tour" CTA','click',label);});$('#signup-form').on('valid',function(e){$f=$(this)
$('.signup-form-action').addClass('active');var formData={name:$f.find('input[name=name]').val(),email:$f.find('input[name=email]').val(),password:$f.find('input[name=password]').val(),preferred_campuses:$f.find('input[name=preferred_campuses]').val()};$.ajax({url:"https://dbc-signup.herokuapp.com/v1/users",jsonp:"callback",dataType:"jsonp",data:formData}).done(function(response){if(response.success){$('.form-container').hide();ga('send','event','Signup','success',response.user_id);setTimeout(function(){window.location.replace("/apply/thank-you");},500);}else{if(response.code==10002){alert("Your email address is already in use. Please sign in using the link above the form.")
Rollbar.error("User attempted signup with non-unique email",formData);}else{alert("There was a problem with our website. Please try again.")
Rollbar.critical(("API returned error code "+response.code),formData);}}}).fail(function(){alert("There was a problem with our website. Please try again.")
Rollbar.critical("API request failed",formData);}).always(function(){$('.signup-form-action').removeClass('active')});});});
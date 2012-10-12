function fbLoggedIn(fb)
{
	var returnUrl = document.location.href;
	
	if (fb != "3")
	{
	
		var anchor_index = returnUrl.indexOf('#');
		if (anchor_index != -1) { returnUrl = returnUrl.substring(0, anchor_index); }
	    
		returnUrl = fbRemoveFromQS(returnUrl);
			
		if(returnUrl.lastIndexOf('?') > 0)
		{
			returnUrl = returnUrl + '&fb=' + fb;
			
		} else {
		
			returnUrl = returnUrl + '?fb=' + fb;
		}

		var myPermissions = "email"; // permissions your app needs
		// var myPermissions = "email,read_stream,publish_stream"; // permissions your app needs
	
	} else {
	
		var myPermissions = "read_stream";
	}
		
	// FB.ensureInit( function(){ 
	  
	  FB.Connect.showPermissionDialog(myPermissions , function(perms) {
	  if (!perms)
	  {
	    // handles if the user rejects the request for permissions. This is a good place to log off from Facebook connect
	  }
	  else
	  {
	      document.location.href = returnUrl;
	  };
	  
	});
	// });
	
	// document.location.href = returnUrl;
}

function fbRefresh()
{
	var returnUrl = document.location.href;
	
	var anchor_index = returnUrl.indexOf('#');
	if (anchor_index != -1) { returnUrl = returnUrl.substring(0, anchor_index); }
	
	var qs = returnUrl.indexOf('?');
	if (qs != -1) { returnUrl = returnUrl.substring(0, qs); }
	
	document.location.href = returnUrl;
}

function fbRemoveFromQS(url)
{
	parameter = "fb";
	var urlparts = url.split('?');
	if (urlparts.length>=2) {
	    var prefix= encodeURIComponent(parameter)+'=';
	    var pars= urlparts[1].split(/[&;]/g);
	    for (var i= pars.length; i-->0;)
	        if (pars[i].lastIndexOf(prefix, 0)!==-1)
	            pars.splice(i, 1);
	    url = urlparts[0]+'?'+pars.join('&');
	}
	return (url);
}
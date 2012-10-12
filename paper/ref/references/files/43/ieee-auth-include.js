/**
 * 
 */

var A_POST_MSG_IFRAME_ID = "a-post-msg-iframe";
var A_POST_MSG_BIND_NAME = "a-auth-msg";

var A_COOKIE_OBSSO = "ObSSOCookie";
var A_COOKIE_IEEESSO = "ieeeSSO";

jQuery(function() {
	a_initAuth();
});

function a_initAuth() {
	a_processAuth();	
}

function a_processAuth() {
	var obssoCookie = jQuery.cookie(A_COOKIE_OBSSO);
	var ieeessoCookie = jQuery.cookie(A_COOKIE_IEEESSO);
	
	if (typeof obssoCookie != "undefined" && 
			obssoCookie != null) {
		// validate obsso
		a_validateObSSO();
	} else if (typeof ieeessoCookie != "undefined" && 
			ieeessoCookie != null) {
		// validate ieeesso
		a_validateIEEESSO();
	}
}

function a_authenticateUser(username, password) {
	if (username != null && username != "" && password != null && password != "") {
		// init post message iframe
		if (jQuery("#" + A_POST_MSG_IFRAME_ID).length == 0) {
			jQuery("<iframe style='display:none'/>").attr({"id":A_POST_MSG_IFRAME_ID,
				"name":A_POST_MSG_IFRAME_ID,
				"src":A_AUTH_URL}).load(function() {
				a_processAuthenticateUser(username, password);
			}).prependTo(jQuery("body"));
		} else {
			a_processAuthenticateUser(username, password);
		}
	} else {
		//TODO: Handle error conditions.
	}
}

function a_processAuthenticateUser(username, password) {
	var parentUrl = window.location+"";
	var postMessage = {username : username, password: password, parentUrl:parentUrl };
	pm({
		target : window.frames["" + A_POST_MSG_IFRAME_ID + ""],
		type : A_POST_MSG_BIND_NAME,
		data : postMessage,
		url : A_AUTH_URL
	});
}


function a_validateObSSO() {
	jQuery.ajax({
	      url: A_AUTH_VALIDATOR_URL,
	      type: "GET",
	      data: ({
	    	  action : "validateObSSO"
	    	  }),
	      dataType: "jsonp",
	      success: function(data){
	    	  if(data != null && data.authStatus == "success"){
		    	  if(typeof mn_refreshMetaNav == 'function') {
		    		 mn_refreshMetaNav();
		    	  }
	    	  }
	    	  else {
	    		  var ieeessoCookie = jQuery.cookie(A_COOKIE_IEEESSO);
	    		  if (typeof ieeessoCookie != "undefined" && ieeessoCookie != null) {
	    			  a_validateIEEESSO(ieeessoCookie);
	    		  }
	    	  }
	    	  if(typeof mn_updateCartItemQtyIfNull == 'function') {
	    		  mn_updateCartItemQtyIfNull();
			  }
	    	  
	      },
		  error: function(data){
			  if(typeof mn_updateCartItemQtyIfNull == 'function') {
				  mn_updateCartItemQtyIfNull();
			  }
		  }
	   }
	);
}

function a_validateIEEESSO() {
	jQuery.ajax({
	      url: A_AUTH_VALIDATOR_URL,
	      type: "GET",
	      data: ({
	    	  action : "validateIEEESSO"
	    	  }),
	      dataType: "jsonp",
	      success: function(data){
	    	  if(data != null && data.authStatus == "success"){
		    	  if(typeof mn_refreshMetaNav == 'function') {
		    		 mn_refreshMetaNav();
		    	  }
	    	  }
	    	  if(typeof mn_updateCartItemQtyIfNull == 'function') {
	    		  mn_updateCartItemQtyIfNull();
			  }
	      },
		  error: function(data){
			  if(typeof mn_updateCartItemQtyIfNull == 'function') {
				  mn_updateCartItemQtyIfNull();
			  }
		  }
	   }
	);
}






jQuery(function(){	
var ie7notice = (function(){
	var 
	cookieIE7 = 'ie7detect',
	cookieObj = document.cookie.split(';'),
	cookieExists = function(cookieObj){
		for(var i=0;i < cookieObj.length;i++) {
			var c = cookieObj[i];
			while (c.charAt(0)==' '){
			c = c.substring(1,c.length);
			}
		
			if(c.indexOf(cookieIE7) == 0){
				return true;
			}
		
		}
		return false;
	
	},
	init = function(){ 		
		if(!cookieExists(cookieObj)){ 
		var btag = $$('body');
		var content = "<div id='ie-container'><div id='ie-display'><p style='color:#666;'><img id='ie-ico-exclamation' src='/assets/img/ie6/ico.exclamation.gif' alt='Notice:' name='ie-ico-exclamation'><strong>IEEE <em>Xplore</em><sup>&#174;</sup> will end support for <span style='color:#000;font-size:1.2em;'>Microsoft Internet Explorer 7</span> browser on <span style='color:#000; font-size:1.2em;'>December 31st, 2012</span></strong><br>Please update your browser to a more current version from one of the options below:</p><div id='browser-options'><a href='http://bit.ly/ie6-chrome'><img src='"+ ASSETS_RELATIVE_PATH+"/img/ie6/chrome.gif' alt='Google Chrome' title='Google Chrome' /></a><a href='http://bit.ly/ie6-firefox'><img src='"+ ASSETS_RELATIVE_PATH+"/img/ie6/ff.gif' alt='Mozilla Firefox' title='Mozilla Firefox' /></a><a href='http://bit.ly/ie6-ie'><img src='"+ ASSETS_RELATIVE_PATH+"/img/ie6/ie.gif' alt='Microsoft Internet Explorer' title='Microsoft Internet Explorer' /></a><a href='http://bit.ly/ie6-opera '><img src='"+ ASSETS_RELATIVE_PATH+"/img/ie6/opera.gif' alt='Opera'title='Opera' /></a><a href='http://bit.ly/ie6-safari'><img src='"+ ASSETS_RELATIVE_PATH+"/img/ie6/safari.gif' alt='Apple Safari' title='Apple Safari' /></a></div><a id='close-ie' href='#'>Close</a></div></div>";
		btag[0].insert({
		top: content
		}); 
		var ieContainer = $$('#ie-container');
		var closeBtn = $$('#close-ie');
		Event.observe(closeBtn[0],'click',function(){
			ieContainer[0].slideUp({duration:.5});
			document.cookie = 'ie7detect=true ; path=/;';
		});
	
	} 
	};
	
	return {
	
	init: init
	
	}

})();


if(jQuery.browser.msie && jQuery.browser.version < 8){
ie7notice.init();
}
});

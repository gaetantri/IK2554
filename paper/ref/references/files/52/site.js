/*
Prototype.Browser.IE6 = Prototype.Browser.IE && parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5)) == 6;

/* IMPORTANT FOR PREVENT CONFLICT WITH PROTOTYPE LIBRARY */
if(!j$) var j$ = jQuery.noConflict();


/* ------- */
var  tid;
var loadingImgTimer;
function clearText(id)
{
	j$("#"+id).val('');
}
function changeTypeToPassword(prefix,id)
{
	
    j$("#"+prefix+"password-txt-span").hide();
    j$("#"+prefix+"password-hidden-span").show();	
   
    j$("#"+id).focus();

}
function changeTypeToText(prefix,id)
{
	var pwd_val=j$.trim(j$("#"+id).val());

	if(pwd_val.length<=0)
	{
	    j$("#"+prefix+"password-txt-span").show();
	    j$("#"+prefix+"password-hidden-span").hide();	
	}
}

function showLoadingImageText(id){
	    j$("#"+id).show();
	    j$("#"+id+"-Text").hide();
	    loadingImgTimer=setTimeout(function(){j$("#"+id+"-DefaultText").hide();j$("#"+id+"-Text").show();},10000);
	  
	    
}
function hideLoadingImageText(id)
{
	j$("#"+id).hide();
	j$("#"+id+"-Text").hide();
	j$("#"+id+"-DefaultText").hide();
	clearTimeout(loadingImgTimer);
}
function  setObSSOCookieService(singleSignOnUserName,singleSignOnPassword){
    
    var  millisecondsToWait = IBP_MEMBEER_SIGNIN_TIME_WAIT_IN_MILLIES ;       
    if ( (millisecondsToWait == null  || millisecondsToWait == undefined || millisecondsToWait <= 0)  ){
        millisecondsToWait = 800;
        
    } 

     setTimeout( function () {
              a_authenticateUserByJsonp (singleSignOnUserName,singleSignOnPassword);
         }, millisecondsToWait);
    
}

/* JQUERY REPLACEMENT for Sign On Flyout written in Prototype below. This version is more stable with IE (MCS) */
function loadSSOJs()
{
	if(IBP_WS_ENABLED_FLAG)
	{
		var JS_LOCATION=IBP_WS_ASSETS+'/ieee-mashup/js';
		
		var scripts = ['/common/jquery.json-2.2.min.js', '/common/jquery.cookie.js','/auth/ieee-auth-constants.js','/auth/ieee-auth-include.js','/common/postmessage.js'];
		for(var i = 0; i < scripts.length; i++) {
		  j$.getScript(JS_LOCATION+scripts[i], function() {
		    //alert('script loaded');
		  });
		}
	}
}

/*Begin My projects Browse tags sorting*/
j$('document').ready(function(){
	j$('#tagSortType').bind('change', function(){ 		
		 var buildTagList = function()
		 {	
				var tagArray = [],
				tagName = '',
				tagCount = '',
				tagLink = '',
				$tagContainer = j$('.tags-container li');			
				$tagContainer.each(function(k,v){
					var $this = j$(this),
					tagObj = {};
					
					tagName = $this.find('.tag-name').html();
					tagCount = $this.find('.tag-count').html();
					tagLink = $this.find('a').attr('href');
			
					tagObj['name'] = tagName;
					tagObj['count'] = tagCount;
					tagObj['link'] = tagLink;
					tagArray.push(tagObj);
			
				});
	           return tagArray;
			};
			var nameSort = function(a, b) {
				if (a.name < b.name) {
				return -1;
				} else if (a.name > b.name) {
				return 1;
				} else {
				return 0;
				}
			},
			countSort = function(a, b) {
				return +b.count - +a.count;
		    },
						
			outputTags = function(tagArray){
				var output = '';		 
				tagArray.each(function(k,v){
					var link = k.link,
					name = k.name, 
					count = k.count;
	
					output = output + '<li><a href="'+ link +'"><span class="tag-name">'+ name + '</span>(<span class="tag-count">' + count + '</span>)</a></li>';
					
				});
				return output;
			};
		 
		 var userTags = new Array();
		 userTags = buildTagList();
		 //The select options value have to match for the following comparision to work properly.		 		 
		 if(j$(this).attr('value') == 'tag_count')
		 {			 
			 objCountSorted = userTags.sort(countSort);				 
			 j$('.tags-container ul').html(outputTags(objCountSorted));			
		 }
		 else
		 {			 
			 objNameSorted = userTags.sort(nameSort);
			 j$('.tags-container ul').html(outputTags(objNameSorted));			 		 
		 }		 
	});	

});
/* End my projects Browse sorting */


j$(function(){
	/*set tooltip default behavior */
	j$.fn.qtip.defaults.style.classes = 'ui-tooltip-plain ui-tooltip-shadow ui-tooltip-rounded';
   j$('.qtooltip').qtip(
   {
	    content: j$(this).id, // Give it some content, in this case a simple string
		position: {
			my: 'middle left',
			at: 'middle right'
		}      
   });	
   j$('.qtooltip-left').qtip(
		   {
			    content: j$(this).id, // Give it some content, in this case a simple string
				position: {
					my: 'middle right',
					at: 'middle left'
				}      
		   });	
   j$('.qtooltip-bottom').qtip(
		   {
			    content: j$(this).id, // Give it some content, in this case a simple string
			    position: {  
				    corner: {
				         target: 'middleTop',
				         tooltip: 'middleBottom'
				      }
			   		}
		   });
	j$("#singleSignOnLink").click(function(){
		loadSSOJs();
		j$("#modalWindowSignInError281").hide();
		j$("#loadingImg").hide();
		j$("#singleSignOnFlyout").slideDown(0);
		j$("#singleSignOnLink2").focus();
		return false;
	});
	
	j$('#AuthTools .SubMenu a').width(j$('#SignOutFlyOutLink').width()-20 > 90 ? j$('#SignOutFlyOutLink').width()-20 : 90);
	if  (IBP_WS_ENABLED_FLAG)
	{
		setCurrentCartCount();
	}
});
var iFrame = new Element('iframe').setStyle({'display':'none','height':'auto','width':'auto','z-index':'9','position':'relative'});

//set interval when IBP_WS_ENABLED_FLAG==true.  IBP_WS_ENABLED_FLAG is defined in assets. jsp




var cartCookieRequested=false;

j$.urlParam = function(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (!results) { return 0; }
	return decodeURIComponent(results[1].replace(/\+/g, " ")) || 0};

j$.extend({URLEncode:function(c){var o='';var x=0;c=c.toString();var r=/(^[a-zA-Z0-9_.]*)/;
	  while(x<c.length){var m=r.exec(c.substr(x));
	    if(m!=null && m.length>1 && m[1]!=''){o+=m[1];x+=m[1].length;
	    }else{if(c[x]==' ')o+='+';else{var d=c.charCodeAt(x);var h=d.toString(16);
	    o+='%'+(h.length<2?'0':'')+h.toUpperCase();}x++;}}return o;},
	URLDecode:function(s){var o=s;var binVal,t;var r=/(%[^%]{2})/;
	  while((m=r.exec(o))!=null && m.length>1 && m[1]!=''){b=parseInt(m[1].substr(1),16);
	  t=String.fromCharCode(b);o=o.replace(m[1],t);}return o;}
	});
	
function redirectToWayf()
{
	var url;
	url=j$.urlParam("url");
	
	if(url=="0")
	{
		if(window.parent==null)
    		url=window.location.href;
		else
			url=window.parent.location.href;
	}
	
	if(url.indexOf("guesthome.jsp")>=0)
		url="/Xplore/home.jsp";
	
	url=j$.URLEncode(url);
	
	if(window.parent==null)
		window.location.href="/servlet/wayf.jsp?url="+url;
	else
		window.parent.location.href="/servlet/wayf.jsp?url="+url;
}

function attemptMergeCart()
{
	
	 if(!cartCookieRequested && IS_INDIVIDUAL_USER)
	 {
       var cartCount=0;
  	   abortTimer();
  	   
  	   //alert("About to make ajax call to merge cart");
  	   
	   var html=j$.ajax({
			url: "/xpl/mwGetIeeeUserInfo.jsp",
         method: "POST",
         cache: false,
         timeout: 28000,
         async: false,
         data: {
         }
		}).responseText;
	   
	   //alert("ajax call complete");
	   
	   cartCookie=j$.cookie('ieeeUserInfoCookie');
	   
	   //alert("cartCookie after merge: "+cartCookie);
	   
	   if(cartCookie!=null && cartCookie.length > 0)
	   {
	     cartCookieObj=j$.parseJSON(cartCookie);
	     //alert(cartCookieObj.cartItemQty);
		 if(cartCookieObj.cartItemQty)
		 {
			 cartCount=cartCookieObj.cartItemQty;
		 }
		 j$('#cartCount').html('Cart('+cartCount+')');
		 // refresh mini cart here
		 if (isFunction("mc_forceRefreshMiniCart")== true)
		   mc_forceRefreshMiniCart();
	   }
	   else
    	 j$('#cartCount').html('Cart(0)');
		   
       cartCookieRequested=true;
       
	 }else
	 {
		 j$('#cartCount').html('Cart(0)');
	 }
}

function  cartBoxCheck(){

    var  pcart = j$( '.mc-product-cart' );
    if (pcart)
    {
         if  (pcart.find( '.mc-header' ).length){
              
              if  (!pcart.hasClass( 'box' )){
                   pcart.addClass( 'box box-style-4' );
              }
         } else {
              pcart.removeClass( 'box box-style-4' );
         }
    }
    


}


function repaintWrapper() //evaluates if cart should be fixed scroll or not
{
	
	if (j$('.mc-header').length) {   
    	j$('#flt-container').ibpFloatVertical({"bottomCollisionId":"FooterWrapper"});         	
	} else {
	   j$('#flt-container').unbind('cartScroll').attr('style','');
	}
}


function setCurrentCartCount() {
	var cartCount=0;
	cartBoxCheck();
	if(j$ !=null && j$.cookie !=null)
	{
	 cartCookie=j$.cookie('ieeeUserInfoCookie');
	 if(cartCookie)
	 {
		
		 if(cartCookie.indexOf("userInfoId")==-1)
			 attemptMergeCart();
		 
		 var cartCookieObj=j$.parseJSON(cartCookie);
		 if(cartCookieObj.cartItemQty)
		 {
			 cartCount=cartCookieObj.cartItemQty;
			 
			
		 }
		 j$('#cartCount').html('Cart('+cartCount+')');		 
	 }
	 else
	 {
		 attemptMergeCart();		 
	 }
	}
	
}
function abortTimer() { // to be called when you want to stop the timer
	  clearInterval(tid);
}


//add bottom border to cart if it exists



// ===========================================================================
// ===========================================================================
// prototype_extensions.js

if (!Prototype.Browser.IE6) {
	// looks for IE6 so we can set display properties like min-height vs. height
	Prototype.Browser.IE6 = (function(){
		return (/msie 6/i.test(navigator.userAgent)) && !(/opera/i.test(navigator.userAgent)) && (/win/i.test(navigator.userAgent));
	})();
}
if (!Prototype.Browser.IE7) {
	// looks for IE7 so we can set display properties like min-height vs. height
	Prototype.Browser.IE7 = (function(){
		return (/msie 7/i.test(navigator.userAgent)) && !(/opera/i.test(navigator.userAgent)) && (/win/i.test(navigator.userAgent));
	})();
}
if (!Prototype.Browser.OldWebKit) {
	// look for old, bug-ridden versions of WebKit
	Prototype.Browser.OldWebKit = (function(){
		// Safari: Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en) AppleWebKit/419 (KHTML, like Gecko) Safari/419.3
		// WebKit (as of 2007-07-04): Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en) AppleWebKit/522+ (KHTML, like Gecko) Safari/419.3
		var regex = navigator.userAgent.match(/AppleWebKit\/(\d+)/);
		return (regex && regex.length == 2) ? (parseInt(regex[1]) <= 419) : false;
	})();
}

// this fixes the constructor problem in old versions of WebKit
// FIXME: we may not need this anymore due to LowPro - JSB
function fixWebKitInheritanceBug(obj) {
	if (Prototype.Browser.OldWebKit) obj.prototype.constructor = obj;
}

// ---------------------------------------------------------------------------

// convenience function: $$ with scope as first arg
function $$S() {
	var args = $A(arguments), scope = args.shift();
  return Selector.findChildElements(scope, args);
}

// ---------------------------------------------------------------------------

// returns form elements by form_name and element name
// useful for returning a group of radio buttons as an array
function $FE(form_name, element_name) {
	if ( (typeof(form_name) != 'string') || typeof(element_name) != 'string' ) { return; }

	var f = document.forms[form_name] || $$("FORM#" + form_name)[0];
	var elements = f.elements[element_name];

	if (!f || !elements) {
		return null;
	
	} else {
		return elements;
	}
}
Element.addMethods({
	
	// Used to scroll DIVs. Wouldn't make much sense without {overflow:auto}.
	scrollDiv: function(element, left, top){
		element = $(element);
		element.scrollLeft = left;
		element.scrollTop = top;
	},
	
	// Chainable function used for trading attributes within a single element.
	shiftAttribute: function(element, target, replacement){
		element = $(element);
		element[target] = element[replacement];
		return element;
	},
	
	// Overriding Element.method on line 1935 of Prototype.js, v1.6.0.2
	// Problem: Prototype absolutely positions elements to "preview" them but lets width overflow out of its containing element if width isn't manually set. Caused awkward jumping using Effect.BlindDown in FF + Safari 2/3.
	// Solution: Set the width of the containing element correctly by using Prototype's getStyle on padding + width of containing element. Now scrolls smoothly in FF + Safari 2/3. IE is also affected by this, but has far more issues beneath the surface.
	
	// This modification has been run through the unit tests for 1.6.0.2 with no adverse effects. In the getDimensions() unit test, a comment alludes to this issue:
	// "known failing issue / this.assert($('dimensions-nestee').getDimensions().width <= 500, 'check for proper dimensions of hidden child elements');"
	
	getDimensions: function(element) {
		element = $(element);
		var display = $(element).getStyle('display');
		if (display != 'none' && display != null) // Safari bug
			return {width: element.offsetWidth, height: element.offsetHeight};
		var els = element.style;
		var originalVisibility = els.visibility;
		var originalPosition = els.position;
		var originalDisplay = els.display;
		els.visibility = 'hidden';
		els.position = 'absolute';
		els.display = 'block';
		
		// This was the original method used to get the projected height/width of the element.
		var originalHeight = element.clientHeight;
		var originalWidth = element.clientWidth;

		// But if the element didn't have an explicit width defined, the now-absolutely-positioned element has lost the width constraints it should have had.
		if (els.width.empty()){
			// The width of the element's containing elements will tell us how many pixels the element will need to squeeze into, if it were actually positioned.
			// Keep going up through ancestors until we've got an actual container width.
			var container = element.ancestors().find(function(ancestor){
			  return (ancestor.clientWidth > 0);
			}, this);
			
			// Set the width of the original element to the width of the containing element, taking the original element's padding into account.
			element.setStyle({ 'width' : (
				(container.clientWidth - 
				(parseInt(element.getStyle('padding-left'))) + parseInt(element.getStyle('padding-right')))
				+ 'px')
			});
			
			// Now the original element has sized itself into how it will actually appear on the page. Grab the height value!
			originalHeight = element.clientHeight - (parseInt(element.getStyle('padding-top')) + parseInt(element.getStyle('padding-bottom')));

			// Removing the width style we just set. This element shouldn't have any width attribute.
			element.setStyle({ 'width' : 'auto' });
			
			// We now have the proper height of a hidden element with no defined width!
		}
		els.display = originalDisplay;
		els.position = originalPosition;
		els.visibility = originalVisibility;
		return {width: originalWidth, height: originalHeight};
	}

});


// Fixes document.viewport in Opera 9.5 strict mode, which erronously returns the document.body height.
// This fix will be included in Prototype 1.6.0.3. 
// See core patch: http://github.com/sstephenson/prototype/commit/5db9db2cc856b665fe5e5833f895c0bf7db65634
Object.extend(document.viewport, {
	getDimensions: function() {
    var dimensions = { };
    var B = Prototype.Browser;
    $w('width height').each(function(d) {
      var D = d.capitalize();
      dimensions[d] = (B.WebKit && !document.evaluate) ? self['inner' + D] :
        (B.Opera && parseFloat(opera.version)<9.5) ? document.body['client' + D] : document.documentElement['client' + D];
    });
    return dimensions;
  }	
});

// ===========================================================================
// utils.js

// IE/win background image flicker fix
// http://evil.che.lu/2006/9/25/no-more-ie6-background-flicker
try { document.execCommand('BackgroundImageCache', false, true); } catch(e) {}
	
// ---------------------------------------------------------------------------

if (!String.prototype.getHash) {
	String.prototype.getHash = function() {	
		var idx = this.indexOf("#");
		return (idx >= 0 ) ? this.substring(idx + 1) : null;
	};
}

if (!String.prototype.toSlug) {
	String.prototype.toSlug = function() {	
    return this.gsub(/['"]/, "").gsub(/[^A-Za-z0-9]/, " ").strip().gsub(/ +/, "-").toLowerCase();
	};
}

// ---------------------------------------------------------------------------

/* NOTE: the following code was extracted from the UFO source and extensively reworked/simplified */

/* Unobtrusive Flash Objects (UFO) v3.20 <http://www.bobbyvandersluis.com/ufo/>
	Copyright 2005, 2006 Bobby van der Sluis
	This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/

function createCSS(selector, declaration) {
	// test for IE
	var ua = navigator.userAgent.toLowerCase();
	var isIE = (/msie/.test(ua)) && !(/opera/.test(ua)) && (/win/.test(ua));

	// create the style node for all browsers
	var style_node = document.createElement("style");
	style_node.setAttribute("type", "text/css");
	style_node.setAttribute("media", "screen"); 

	// append a rule for good browsers
	if (!isIE) style_node.appendChild(document.createTextNode(selector + " {" + declaration + "}"));

	// append the style node
	document.getElementsByTagName("head")[0].appendChild(style_node);

	// use alternative methods for IE
	if (isIE && document.styleSheets && document.styleSheets.length > 0) {
		var last_style_node = document.styleSheets[document.styleSheets.length - 1];
		if (typeof(last_style_node.addRule) == "object") last_style_node.addRule(selector, declaration);
	}
};


// ===========================================================================
// base_behaviors.js

// this is the base Behavior Class. all of our widgets should inherit from this.
// NOTE: not sure how much we'll use it for things other than the setOptions method.
var PageWidget = Behavior.create({
	initialize : function(options) {
		this.setOptions(options);
	},

	setOptions : function(config) {
		this.CONFIG = Object.extend(Object.clone(this.constructor.CONFIG), config || {});
	}
});

PageWidget.CONFIG = { };

// ---------------------------------------------------------------------------

// fixes browsers which don't implement <OPTION disabled="disabled">
// FIXME: this should be converted into a Behavior
document.observe("dom:loaded", function(){
	function fixDisabledOptions() { $A(this.options).each(function(opt) { if ($(opt).disabled) opt.selected = false; }); }
	$$("SELECT").each(function(sel){ Event.observe(sel, 'change', fixDisabledOptions.bind(sel)); });
});

// ---------------------------------------------------------------------------

// fixes LABELs not triggering focus on form elements when they have IMG elements inside
// FIXME: this should be converted into a Behavior
if (Prototype.Browser.IE || Prototype.Browser.WebKit) {
	document.observe("dom:loaded", function(){
		$$("LABEL IMG").each(function(image) {
			var el = $(image.parentNode.getAttribute('for') || image.parentNode.attributes['for'].nodeValue);
			if (el) { image.observe('click', function(){ el.focus(); }); }
		});
	});
}


// ===========================================================================
// AdvancedSearch.js

var AdvancedSearch = Behavior.create(PageWidget, {
	initialize : function(config){
		this.setOptions(config);
		this.primary_fields = this.element.select(this.CONFIG['primrary_fields_selector']);
		this.search_interface = $(this.CONFIG['search_interface']);
		this.srchIntElements = this.search_interface.select('input');
		for (var i = 0; i < this.srchIntElements.length; i++) {
			var srchIntElement = this.srchIntElements[i];
			srchIntElement.observe('click', this.srchInterfaceRadioClickHandler.bindAsEventListener(this,srchIntElement));
			if (srchIntElement.checked)
				this.srchInterfaceRadioClickHandler(null, srchIntElement);
		}
		if (this.primary_fields.length < 1)
			return;
		this.add_new_line = $(this.CONFIG['add_new_line_id']);
		this.reset_all_fields = $(this.CONFIG['reset_all_fields_id']);
		this.element.select('.Invisible').invoke('removeClassName','Invisible');
		this.primary_fields.first().select(".button").invoke("remove");
		this.primary_fields.first().select('select').last().setStyle({ marginRight : "56px" });
		this.primary_fields.each(function(field){ 
			this.initializePrimaryField(field); 
		}, this);
		this.add_new_line.observe('click', this.addNewPrimaryFieldClickHandler.bindAsEventListener(this));
		this.reset_all_fields.observe('click', this.resetAllFieldsClickHandler.bindAsEventListener(this));
	},
	initializePrimaryField : function(field){
		var button = field.down(this.CONFIG['move_field_button_selector']);
		var select_menus = field.getElementsByTagName('SELECT');
		if (select_menus.length > 1 && button) {
			button.observe('click', this.moveFieldUpClickHandler.bindAsEventListener(this, button));
			var removeLineButton = button.next('IMG');
			if (removeLineButton)
				removeLineButton.observe('click', this.removeLineClickHandler.bindAsEventListener(this, removeLineButton));
		} else {
			if (button)
				button.addClassName(this.CONFIG['move_field_disabled_button_class']).src = this.CONFIG['disabled_button_image'];
		}
	},
	addNewPrimaryFieldClickHandler : function(){
		this.addNewPrimaryField();
	},
	srchInterfaceRadioClickHandler : function(e, srchIntElement){
		var field_group = this.primary_fields[0];
		var fields = field_group.childElements();
		var srchKeyElement = fields[1].childElements()[1];
		srchKeyElement.options[0].text = srchIntElement.value;
		srchKeyElement.options[0].value = '';
		for(var i = 1; i < this.primary_fields.length; i++) {
			field_group = this.primary_fields[i];
			fields = field_group.childElements();
			srchKeyElement = fields[2].childElements()[1];
			srchKeyElement.options[0].text = srchIntElement.value;
			srchKeyElement.options[0].value = '';
		}
	},
	moveFieldUpClickHandler : function(e, button){
		if (!button.hasClassName(this.CONFIG['move_field_disabled_button_class']))
			this.moveFieldUp(e, button);
	},
	removeLineClickHandler : function(e,button){
		var cElement = button.up();
		var idx = this.primary_fields.indexOf(cElement);
		if (idx >= 0){
			this.primary_fields.splice(idx,1);
			cElement.remove();
		}
	},
	resetAllFieldsClickHandler : function(){
		this.resetAllFields();
	},
  // validateSearchTerms:function(searchTerms){
  //  if (searchTerms == null)
  //    return null;
  //  }
  //   var splitTerms=searchTerms.split(" ");
  //  if(splitTerms==null||splitTerms.length<2){
  //    return searchTerms;
  //  }
  //  var returnTerms = splitTerms[0];
  //  for(i=1; i<splitTerms.length;i++){
  //    returnTerms = returnTerms+ " "+splitTerms[i];
  //  }
  //  return returnTerms;
  // },
	prepareNewPrimaryFieldTemplate : function(){
	    //this is where the new field is being cloned - BM
		var num = this.primary_fields.length + 1;
		this.new_field_template = this.primary_fields.last().cloneNode(true);
		return this.new_field_template.innerHTML.replace(/(name|id|for)\=\"?(\w+_)\d+\"?/g, '$1="$2' + num + '"');
	},
	addNewPrimaryField : function(){
		if (this.primary_fields.length > 10)
			return;
		var wrapper = new Element('p', { 'class' : 'field-group' }).update(this.prepareNewPrimaryFieldTemplate());
		j$(wrapper).find('select[id^="searchin"] option:first').html(j$('#search-interface').find('input:checked').attr('value'));
		this.primary_fields.last().insert({ 'after' : wrapper });
		this.primary_fields.push(wrapper);
		this.initializePrimaryField(wrapper);
	},
	moveFieldUp : function(e, button){
		var original_field = button.up();
		var target_field = original_field.previous(original_field.previousSiblings().length-1);
		var original_selects = original_field.getElementsByTagName('SELECT');
		var target_selects = target_field.select('SELECT');
		if (target_selects.length > 1) 
			this.swapSelectMenu(original_selects[0], target_selects[0]);
		this.swapTextField(original_field.down('INPUT'), target_field.down('INPUT'));
		this.swapSelectMenu(original_selects[1], target_selects.last());
	},
	swapTextField : function(first_field, second_field){
		var savedvalue = $F(second_field);
		second_field.value = $F(first_field);
		first_field.value = savedvalue;
	},
	swapSelectMenu : function(first_menu, second_menu){
		var savedvalue = second_menu.selectedIndex;
		second_menu.selectedIndex = first_menu.selectedIndex;
		first_menu.selectedIndex = savedvalue;
	},
	
	resetAllFields : function(){
        var search_wrapper = $("AdvancedSearchPage");
        search_wrapper.select("input[type=text]").each(function(textbox){
            textbox.clear();
        });
        search_wrapper.select("input[type=checkbox]").each(function(checkbox){
            checkbox.checked = false;
        });
        search_wrapper.select("select").each(function(select){
            select.selectedIndex = 0;
        });
    }
	
});
AdvancedSearch.CONFIG = {
	disabled_button_image : ASSETS_RELATIVE_PATH+'/img/icon.to-top.disabled.gif',
	conditional_prefix : 'op',
	term_prefix : 'query',
	search_interface : 'search-interface',	
	primrary_fields_selector : '.primary-fields .field-group',
	add_new_line_id : 'add-new-line',
	reset_all_fields_id : 'reset-all-fields',
	move_field_button_selector : 'IMG.button',
	move_field_disabled_button_class : 'disabled'
};

Event.addBehavior({
	'.advanced-search .primary-search' : AdvancedSearch
});

// ===========================================================================
// AjaxImageSubmit.js

var AjaxImageSubmit = Behavior.create(PageWidget, {
	initialize : function(config){
		this.ajax_form = this.element.up('FORM');
		if (!this.ajax_form || (!this.element.tagName.toLowerCase() == 'input'))
			{ return; }
		this.setOptions(config);
		this.replaceInputElement();
		this.trigger_observer = this.clickHandler.bindAsEventListener(this);
		this.element.observe('mousedown', this.trigger_observer);
		this.click_handler_callback = this.CONFIG['click_callback'].bind(this);
		this.success_handler_callback = this.CONFIG['success_handler'].bind(this);
		this.failure_handler_callback = this.CONFIG['failure_handler'].bind(this);
		this.parameters = this.CONFIG['ajax_parameters'];
	},
	
	replaceInputElement : function(){
		var button = new Element('IMG', { 'id' : this.element.id, 'class' : this.element.className, 'src' : this.element.src });
		this.element.insert({ after : button }).remove();
		this.element = button;
	},
	
	clickHandler : function(e){
		e.stop(); // stop that form!
		this.submitAjaxForm();
		this.click_handler_callback();
	},
	
	submitAjaxForm : function(){
		var formAction = this.ajax_form.action;		
		new Ajax.Request(formAction, {
			method : this.ajax_form.method,
			evalJSON : 'force',
			parameters : this.parameters,
			onSuccess : this.successHandler.bind(this),
			onFailure : this.failureHandler.bind(this)
		});
	},
	
	successHandler : function(transport){
		if (this.validateResponseJSON(transport)) {
			this.success_handler_callback();
			this.toggleTriggerImage();
		}
	},
	
	failureHandler : function(transport){
		this.element.stopObserving('click', this.trigger_observer);
		this.failure_handler_callback();
	},
	
	validateResponseJSON : function(transport){
		if (this.CONFIG['require_json_validation']) {
			try { // transport.responseJSON might not even exist.
				if (transport.responseJSON[this.CONFIG['valid_json_key']] == this.CONFIG['valid_json_value']) 
					{ return true; } // Valid, the JSON had the correct value.
				else 
					{ return false; } // Invalid, the JSON had a different value.
			} 
			catch(e) {
				return false; // Unable to parse JSON. Since validation was set to true, this == Invalid!
			}
		} else {
			return true; // Validation was not set to required.
		}
	},
	
	toggleTriggerImage : function(){
		if (!this.CONFIG['trigger_image_1'].empty() && !this.CONFIG['trigger_image_2'].empty()) {
			if (this.element.src.split('/').last() == this.CONFIG['trigger_image_1'].split('/').last()) {
				this.element.src = this.CONFIG['trigger_image_2'];
			} else {
				this.element.src = this.CONFIG['trigger_image_1'];
			}
		}
	}
});

AjaxImageSubmit.CONFIG = {
	ajax_parameters : {},
	trigger_image_1 : '',
	trigger_image_2 : '',
	require_json_validation : false,
	valid_json_key : '',
	valid_json_value : '',
	click_callback : Prototype.emptyFunction,
	success_handler : Prototype.emptyFunction,
	failure_handler : Prototype.emptyFunction
};

Event.addBehavior({

	// For saving searches on search results pages
	'#save-this-search-button1' : AjaxImageSubmit({
		require_json_validation : false,
		valid_json_key : 'response',
		valid_json_value : true,
		trigger_image_1 : ASSETS_RELATIVE_PATH+'/img/btn.save-this-search.gif',
		trigger_image_2 : ASSETS_RELATIVE_PATH+'/img/btn.search-saved.gif'
	}),

	// For setting alerts for searches on search results pages
	'#set-alert-on-this-search' : AjaxImageSubmit({
		trigger_image_1 : ASSETS_RELATIVE_PATH+'/img/btn.set-alert-on-search.gif',
		trigger_image_2 : ASSETS_RELATIVE_PATH+'/img/btn.set-alert.alert-set.gif'
	}),
	
	// For setting alerts on journals
	'#set-alert-on-this-journal' : AjaxImageSubmit({
		trigger_image_1 : ASSETS_RELATIVE_PATH+'/img/btn.alert-on-journal.gif',
		trigger_image_2 : ASSETS_RELATIVE_PATH+'/img/btn.alert-on-journal-set.gif'
	}),
	
	// For favoriting journals
	'#favorite-journal' : AjaxImageSubmit({
		trigger_image_1 : ASSETS_RELATIVE_PATH+'/img/btn.favorite-journal.gif',
		trigger_image_2 : ASSETS_RELATIVE_PATH+'/img/btn.journal-favorited.gif'
	})

});


// ===========================================================================
// BrowseBySubject.js

var BrowseBySubject = Behavior.create(PageWidget, {
	initialize : function(config){
		this.setOptions(config);
		this.data_list = $('subjects-data-list');
		if (!this.data_list) 
			{ return; }
		this.column_wrapper = $('column-wrapper');
		this.column_width = this.CONFIG['column_width'];
		this.selected_subjects = [];
		this.expanded_subjects = {};
		this.initializeSubjectList(this.data_list);
	},
	
	initializeSubjectList : function(target){
		var all_subjects = target.select(this.CONFIG['category_selector']);
		var first_level_length = target.down(".ExpandableList").childElements().length;
		all_subjects.each(function(li){
			li.down("a").shiftAttribute('title','href').removeAttribute('href');
			li.observe('click', this.selectExpandableSubjectClickHandler.bindAsEventListener(this,li));
		}, this);
		if (first_level_length == 1) {
			all_subjects[0].shiftAttribute('title','href').removeAttribute('href');
			this.expandSubject(false, all_subjects[0]);
		}
	},
	
	selectExpandableSubjectClickHandler : function(e, subject){
		this.expandSubject(e, subject);
	},
	
	expandSubject : function(e, subject){
		if (subject.hasClassName('Active')) 
			{ return; }
		this.scollToCorrectColumn(subject);
		this.toggleColumnWrapperWidth(true);
		var nextcolumn = subject.down('.Collapsed');
		this.column_wrapper.insert({ 'bottom' : nextcolumn });
		this.expanded_subjects[nextcolumn.id] = subject.id;
		subject.addClassName('Active').down('A').shiftAttribute('href','title');
		nextcolumn.removeClassName('Collapsed').addClassName('Expanded');
		if (e) { e.stop(); }
	},
	
	scollToCorrectColumn : function(target){
		var chain = target.ancestors();
		var nextcolumns = target.up('.Column').nextSiblings();
		nextcolumns.each(function(col){
			if (col.hasClassName('Expanded') && !chain.include(col)) {
				this.removeColumn(col);
			}
		}, this);
	},
	
	toggleColumnWrapperWidth : function(expanding){
		this.column_width = (expanding) ? (this.column_width + 200) : (this.column_width - 200);
		this.column_wrapper.setStyle({ 'width' : (this.column_width + 'px') });
		this.data_list.scrollDiv(this.column_width, 0);
	},
	
	removeColumn : function(col){
		var container = $(this.expanded_subjects[col.id]);
		container.insert({ 'bottom'  : col }).removeClassName('Active').down('A').removeAttribute('href');
		col.removeClassName('Expanded').addClassName('Collapsed');
		this.toggleColumnWrapperWidth(false);
	}
});

BrowseBySubject.CONFIG = {
	column_width : 200,
	category_selector : '.Expandable'
};

Event.addBehavior({
	'#browse-by-subject' : BrowseBySubject
});

// ===========================================================================
// DHTMLMenu.js

var DHTMLMenu = Behavior.create(PageWidget, {
  initialize: function(config){
		this.setOptions(config);

		this.submenus = { };

		// get all the top-level LIs in the menu and iterate over them, adding event handlers
		this.element.immediateDescendants().each(function(item){
			item.observe("mouseover", this.mouseoverHandler.bindAsEventListener(this, item));
			item.observe("click", this.clickHandler.bindAsEventListener(this, item));
			item.observe("mouseout", this.mouseoutHandler.bindAsEventListener(this, item));

			this.submenus[item.id] = item.down().next();
			
			// Used for the Browse menu or any other menu that uses a slightly different structure to package the UL.
			if (this.submenus[item.id] == undefined) {
				if (item.select('UL').length > 0) {
					this.submenus[item.id] = item.down('UL');
				}
			}
			
		}, this);

	},

	initialized       : false,
	menu_hide_timeout : null,  // the JS timeout ID for hiding the menu
	menu_show_timeout : null,  // the JS timeout ID for showing the menu
	last_menu_on      : null,  // the DOM object of the waiting to close

	mouseoverHandler : function(e, item) {
		// stop the menu from closing/opening (this gets called a lot)
		clearTimeout(this.menu_hide_timeout);
		clearTimeout(this.menu_show_timeout);

		// if we're mousing over the menu for the first time, set a timeout so the menu doesn't show up accidentally.
		if (this.last_menu_on == null) {
			this.menu_show_timeout = setTimeout(this.showMenu.bind(this, item),	this.CONFIG["menu_show_time"]);

		// if there's already a menu on, then we know the user is expecting to see another one, so show it immediately.
		} else if (this.last_menu_on != item) {
			this.showMenu(item);
		}
	},
	
	clickHandler : function(e, item) {
		// stop the menu from closing/opening (this gets called a lot)
		clearTimeout(this.menu_hide_timeout);
		clearTimeout(this.menu_show_timeout);

		// if we're mousing over the menu for the first time, set a timeout so the menu doesn't show up accidentally.
		if (this.last_menu_on == null) {
			this.menu_show_timeout = setTimeout(this.showMenu.bind(this, item),	this.CONFIG["menu_show_time"]);

		// if there's already a menu on, then we know the user is expecting to see another one, so show it immediately.
		} else if (this.last_menu_on != item) {
			this.showMenu(item);
		} else {
			if(this.element.down('#browse-content .SubMenu')){
				if(this.element.down('#browse-content .SubMenu').getStyle('display') == "block" && $('byTopicFlyout').getStyle('display') == "block"){
				// only "close" the menu in a little bit if we're over a menu with submenus, otherwise, close it right now
				}else{	
					if (this.submenus[item.id]) {
						this.menu_hide_timeout = setTimeout(this.hideMenu.bind(this, item),	this.CONFIG["menu_hide_time"]);
					} else {
						this.hideMenu(item);
					}
				}
			}
			else{
				if (this.submenus[item.id]) {
					this.menu_hide_timeout = setTimeout(this.hideMenu.bind(this, item),	this.CONFIG["menu_hide_time"]);
				} else {
					this.hideMenu(item);
				}	
			}
		}
	},

	mouseoutHandler : function(e, item) {
		// clear the existing show/hide timeouts (this gets called a lot)
		clearTimeout(this.menu_hide_timeout);
		clearTimeout(this.menu_show_timeout);
		// testing:
		// this part is specific to Browse and byTopicFlyout menu because of the DOM structure 
		if(this.element.down('#browse-content .SubMenu')){
			if(this.element.down('#browse-content .SubMenu').getStyle('display') == "block" && $('byTopicFlyout').getStyle('display') == "block"){
			// only "close" the menu in a little bit if we're over a menu with submenus, otherwise, close it right now
			}else{	
				if (this.submenus[item.id]) {
					this.menu_hide_timeout = setTimeout(this.hideMenu.bind(this, item),	this.CONFIG["menu_hide_time"]);
				} else {
					this.hideMenu(item);
				}
			}
		}
		else{
			if (this.submenus[item.id]) {
				this.menu_hide_timeout = setTimeout(this.hideMenu.bind(this, item),	this.CONFIG["menu_hide_time"]);
			} else {
				this.hideMenu(item);
			}	
		}
	},

	// shows the menu
	showMenu : function(item) {
		// hide the last menu shown
		if (this.last_menu_on != null) { this.hideMenu(this.last_menu_on); }

		// adding the "hover" class turns on the menu
		item.addClassName(this.CONFIG['hover_class']);

		// insert the IFRAME for IE
		if (Prototype.Browser.IE6) {
			// get at the submenu for dimension info
			var submenu = this.submenus[item.id];
			if (submenu) {
				var iframe = submenu.next();

				if (submenu && !iframe) {
					this.createIframe(item, {
						'left'   : submenu.offsetLeft + "px",
						'height' : submenu.offsetHeight + "px",
						'width'  : submenu.offsetWidth + "px"
					});
				}
			}
		}

		// store the last item on
		this.last_menu_on = item;

	}, // END: showMenu()

	// hide the menu
	hideMenu : function(item) {
		// nothing to hide
		if (item == null) return;

		// removing the "hover" class turns off the menu
		item.removeClassName(this.CONFIG['hover_class']);

		// remove the IFRAME for IE
		if (Prototype.Browser.IE6) {
			var submenu = this.submenus[item.id];
			if (submenu) {
				var iframe = submenu.next();
				if (submenu && iframe) {
					item.removeChild(iframe);
				}
			}
		}

		this.last_menu_on = null;
	}, // END: hideMenu()

	// makes an IFRAME the exact size of the menu so elements underneath it are covered
	// (IE-only)
	createIframe : function(node, style) {
		new Insertion.Bottom(node, (new Template('<iframe class="' + this.CONFIG['iframe_class'] + '" frameborder="0" scrolling="no" style="width: #{width}; height: #{height}; left: #{left};"><\/iframe>')).evaluate(style));
	}

});

DHTMLMenu.CONFIG = {
	submenu_class  : "SubMenu",   // the DOM class of the menu container
	hover_class    : "Hover",     // the class to give the top-level LI to "activate" the menu
	menu_hide_time : 500,         // time to keep the menus on after mouseout; in ms
	menu_show_time : 100,         // threshold o
	iframe_class   : "IframeFix"  // used for IE
};

Event.addBehavior({
	
	// For User Tools menus and any other basic drop-downs
  '.DHTMLMenu': DHTMLMenu({ menu_hide_time : 300 })

});


// ===========================================================================
// ExpertSearch.js

var ExpertSearch = Behavior.create(PageWidget, {
	initialize : function(expression){
		this.expression = $(expression);
		if (!this.expression) 
			{ return; }
		this.sortType = $('sortType');
		this.rowsPerPage = $('rowsPerPage');
		this.search_interface = $('search-interface-epression-builder');
 		this.srchIntElements = this.search_interface.select('input');
		
		this.element.setStyle({ display : 'block' });
		this.keyValueArray = new Array();
		this.expOffset=-1;
		this.filterOpKey='';
		for (x=0;x<2;x++) // initialize 4 drop downs
			{ this.initializeDropDownMenu(this.element.down('.DropDown', x)); }
		//$('reset-all').setStyle({ display : 'block' }).observe('click', this.resetTextArea.bindAsEventListener(this));
		$('reset-all').observe('click', this.resetTextArea.bindAsEventListener(this));
		$('submit-search').observe('click', this.submitCommandClickHandler.bindAsEventListener(this));
		this.expression.observe('click', this.expressioneEventHandler.bindAsEventListener(this));
		this.expression.observe('keyup', this.expressioneEventHandler.bindAsEventListener(this));
	},
	initializeDropDownMenu : function(menu){
		menu.select('LI').each(function(li){
			li.observe('click', this.dropDownItemClickHandler.bindAsEventListener(this, li));
		}, this);
	},
	dropDownItemClickHandler : function(e, li){
		string = li.id.split('-').last();
		if (li.hasClassName('Operator')) {
			this.filterOpKey='op';
			this.addItem(li, string);
		} else {
			this.filterOpKey='srchkey';	
			this.addItem(li, string);
		}
		this.expression.focus();
	},
	expressioneEventHandler:function(){
		if(this.expression.selectionStart||this.expression.selectionStart == '0'){ //Mozilla or Netscape or Opera
			var startPos = this.expression.selectionStart;
			var endPos = this.expression.selectionEnd;
			this.expOffset=startPos;
		}else if(document.selection){//IE
			var sel	= document.selection.createRange();
			if(sel.text.length>1){
				this.expOffset==-1;
				return;
			}
			var c= "\001";
			var dul	= sel.duplicate();
			var len	= 0;
			dul.moveToElementText(this.expression);
			var text = sel.text;
			sel.text= c;
			len		= (dul.text.indexOf(c));
			sel.moveStart('character',-1);
			sel.text	= "";
			this.expOffset=len;
		}else
			this.expOffset=-1;
	},
	submitCommandClickHandler:function(){

		if(this.expression.value==null||this.expression.value.length<=0){
			alert("Please enter one or more keywords");
			return;
		}
		
		var url_string = '/search/searchresult.jsp?action=search' + 
								'&' + this.sortType.id + '=' + this.sortType.value + 
								'&' + this.rowsPerPage.id + '=' + this.rowsPerPage.value + 
								'&' + 'matchBoolean=true';
		
		for(var i=0; i<this.srchIntElements.length;i++){
			if(this.srchIntElements[i].checked){
				url_string=url_string+'&searchField='+this.srchIntElements[i].id;
			}
		}
		//url_string = url_string + '&queryText='+getFilteredTermsExt(this.expression.value,true);
		url_string = url_string + '&queryText='+'('+this.expression.value+')';
		window.location=encodeURI(url_string);
	},
	addItem : function(li, string){
		if(string==null||string.length<1){
			return;
		}
		if(this.filterOpKey=='srchkey'){
			string = string+':';
		}
		this.hideParentMenu(li);
		var existing = $F(this.expression);
		
		if(this.expOffset<0){
			if (existing.endsWith(' ')) {
				this.expression.value = existing + string;
			} else {
				if (existing.empty()) {
					this.expression.value = string;
				} else {
					this.expression.value = existing + ' ' + string;
				}
			}
			this.expOffset = this.expression.value.length;
		}else{
			this.expression.value  = this.expression.value.substring(0,this.expOffset)+' '+string+this.expression.value.substring(this.expOffset, this.expression.value.length);
			this.expOffset = this.expOffset+string.length+1;
		}
		this.setSelRange(this.expression, this.expOffset, this.expOffset);
	},
	setSelRange : function (inputEl, selStart, selEnd) { 
		if(this.expression.selectionStart||this.expression.selectionStart == '0'){ //Mozilla or Netscape or Opera
			this.expression.selectionStart = selStart;
			this.expression.selectionEnd = selEnd;
		}else if(document.selection){//IE
			 if (inputEl.setSelectionRange) { 
				  inputEl.focus(); 
				  inputEl.setSelectionRange(selStart, selEnd); 
				 } else if (inputEl.createTextRange) { 
				  var range = inputEl.createTextRange(); 
				  range.collapse(true); 
				  range.moveEnd('character', selEnd); 
				  range.moveStart('character', selStart); 
				  range.select(); 
				 } 
		}
	},
	hideParentMenu : function(li){
		li.up('.DropDown').removeClassName('Hover');
	},
	
	resetTextArea : function(li){
		this.expression.clear();
	}
});
Event.addBehavior({
	'#expression-tools' : ExpertSearch('expression-textarea')
});

// ===========================================================================
// HoverHighlighter.js

var HoverHighlighter = Behavior.create(PageWidget, {
	initialize : function(items_css_selector, config){
		this.setOptions(config);
		this.highlightable_items = this.element.select(items_css_selector);
		if (this.highlightable_items.size() < 1) 
			{ return; }
		this.highlightable_items.each(function(item){
			item.observe('mouseover', this.itemMouseHandler.bindAsEventListener(this, item, true));
			item.observe('mouseout', this.itemMouseHandler.bindAsEventListener(this, item, false));
		}, this);
		this.mouseOverCallback = this.CONFIG['mouseover_callback'];
		this.mouseOutCallback = this.CONFIG['mouseout_callback'];
	},
	
	itemMouseHandler : function(event, li, hovering){
		if (hovering) {
			li.addClassName(this.CONFIG['hover_class']);
			this.mouseOverCallback();
		} else {
			li.removeClassName(this.CONFIG['hover_class']);
			this.mouseOutCallback();
		}		
	}
});

HoverHighlighter.CONFIG = {
	hover_class : 'Hover',
	mouseover_callback : Prototype.emptyFunction,
	mouseout_callback : Prototype.emptyFunction
};

// ===========================================================================

Event.addBehavior({
	
	// == CSS Selctors ==
	// If you need to use more advanced CSS selectors to target the desired hoverable elements, target the 
	// containing element as this.element and use the main argument (items_css_selector) to target
	// the elements more precisely, e.g. "UL.Browsing > LI" returns only UL.Browsing's immediate children LIs.
	// See http://www.prototypejs.org/api/utility/dollar-dollar for more CSS Selector information.
	
	// Adds .Hover to Search Results LIs, which determines the display of background gradient and buttons
	'UL.Results' : HoverHighlighter('LI'),
	
	// Adds .Hover to Browse listing LIs, which determines the display of background gradient and buttons
	'#BrowseContent' : HoverHighlighter('UL.Browsing > LI'),
	
	// Adds .Hover to Profile listing LIs, which determines the display of background gradient and buttons
	'UL.Profiles' : HoverHighlighter('LI'),
	
	// Adds .Hover to listview-highlight LIs, which determines the display of background gradient and buttons
	'UL.listview-highlight' : HoverHighlighter('LI'),
	
	// Adds .browsing to Browse arrow tab for arrow highlighting (but not the menu)
	//'#Browse' : HoverHighlighter('#browse-reveal', { hover_class : 'browsing' }),
	
	// Adds .Hover to drop-down menus on Expert Search Boolean Expression Editor
	'#expression-tools .SubMenu' : HoverHighlighter('LI'),
	
	// Adds .Hover to saved searches options
	'UL.Searches' : HoverHighlighter('LI.Hoverable')
	
	
});

// ===========================================================================
// MaintenanceMessage.js

var MaintenanceMessage = Behavior.create(PageWidget, {
	initialize : function(config){
		this.setOptions(config);
		this.form_input = this.element.down('INPUT');
		this.close_link = this.element.down('SPAN');
		if (!this.form_input || !this.close_link)
			{ return; }
		this.form_input.setStyle({ display : 'none' });
		this.close_link.setStyle({ display : 'block' }).observe('click', this.closeClickHandler.bindAsEventListener(this));
	},
	
	closeClickHandler : function(){
		//Maintenance  message close action comes here
		//alert(this.element.action);
		new Ajax.Request(this.element.action, {
			method : this.element.method,
			evalJSON : 'force',
			onSuccess : this.closeMaintenanceSuccessHandler.bind(this),
			onFailure : this.closeMaintenanceFailureHandler.bind(this)
		});
	},
	
	closeMaintenanceSuccessHandler : function(transport){
		if (transport.responseJSON.response) {
			new Effect.Fade(this.element.id);
			new Effect.SlideUp(this.element.id);
		} else {
			this.closeMaintenanceFailureHandler();
		}
	},
	
	closeMaintenanceFailureHandler : function(){
		if (this.CONFIG['failure_message_text'].empty()) {
			this.removeMaintenanceMessage(false);
		} else {
			this.removeMaintenanceMessage(true);
		}
	},
	
	removeMaintenanceMessage : function(delay){
		if (delay) {
			this.element.innerHTML = this.CONFIG['failure_message_text'];
			new Effect.Fade(this.element.id, { delay : this.CONFIG['failure_message_auto_dismiss_time'] });
			new Effect.SlideUp(this.element.id);
		} else {
			new Effect.Fade(this.element.id);
			new Effect.SlideUp(this.element.id);
		}
	}
});

MaintenanceMessage.CONFIG = {
	failure_message_text : '',
	failure_message_auto_dismiss_time : 3
};

Event.addBehavior({
	
	// For all maintenance messages, assuming that no more than one maintenenace message will be displayed at a time. (otherwise this will be '.maintenance-message' instead of '#maintenance-message')
  '#maintenance-message': MaintenanceMessage({
		failure_message_text : 'Error: Unable to save maintenance message preferences.',
		failure_message_auto_dismiss_time : 1
	})

});

// ===========================================================================
// MasterCheckbox.js

var MasterCheckbox = Behavior.create(PageWidget, {
	initialize : function(master_checkbox, config){
		this.setOptions(config);
		this.master_checkbox = $(master_checkbox);
		this.checkbox_nodes = this.element.select('input[type="checkbox"]').without(this.master_checkbox);
		if (!this.master_checkbox || this.checkbox_nodes.size() < 1) 
			{ return; }
		//this.master_checkbox.checked = true;
		this.masterCheckboxClickHandler();
		this.master_checkbox.observe('click', this.masterCheckboxClickHandler.bindAsEventListener(this));
		this.checkbox_nodes.each(function(checkbox){
			checkbox.observe('click', this.checkboxClickHandler.bindAsEventListener(this));
		}, this);
	},
	
	masterCheckboxClickHandler : function(){
		var none_checked = true;
		if (this.master_checkbox.checked) {
			this.checkbox_nodes.each(function(checkbox){
				checkbox.checked = false;
			});
		} else {
			this.checkbox_nodes.each(function(checkbox){
				if (checkbox.checked) { none_checked = false; }
			});
		}
		this.checkMasterCheckbox(none_checked);
	},
	
	checkboxClickHandler : function(){
		if (this.master_checkbox.checked) {
			this.master_checkbox.checked = false;
		}
		var none_checked = true;
		this.checkbox_nodes.each(function(checkbox){
			if (checkbox.checked) { none_checked = false; }
		});
		this.checkMasterCheckbox(none_checked);
	},
		
	checkMasterCheckbox : function(none_checked){
		if (none_checked) { 
			this.master_checkbox.checked = true; 
		}
	}
});

Event.addBehavior({
	
	// Used for the checkboxes on the Choose Sources popup.
  '#choose-sources .layout' : MasterCheckbox('select-all-checkboxes')

});


// ===========================================================================
// NarrowByAuthors.js

var NarrowByAuthors = Class.create(PageWidget, {
	initialize : function(wrapper_target, search_query,oqs,config){
	//alert('OQS:'+oqs);
		this.setOptions(config);
		this.node = $(wrapper_target);
		this.authors_to_select_list = $(this.CONFIG['authors_to_select_list_id']);
		this.selected_authors_list = $(this.CONFIG['selected_authors_list_id']);
		if (!this.node || !this.authors_to_select_list || !this.selected_authors_list)
			{ return; }
		this.fetchAuthors('citations',oqs);
		this.sorting_by_name = false;
		this.selected_authors = [];
		this.authors_data = {};
		this.selected_authors_input = $(this.CONFIG['selected_authors_input_id']);
		this.select_heading = $(this.CONFIG['select_heading_id']);
		this.most_citations = $(this.CONFIG['most_citations_heading_id']);
		this.sort_by_citations = $(this.CONFIG['sort_by_citations_id']);
		this.sort_by_citations.observe('click', this.setSortAuthorsByCitations.bindAsEventListener(this));
		this.sort_by_last_name = $(this.CONFIG['sort_by_last_name_id']);
		this.sort_by_last_name.observe('click', this.setSortAuthorsByLastName.bindAsEventListener(this));
		$(this.CONFIG['clear_all_selected_id']).observe('click', this.removeAllAuthors.bindAsEventListener(this));
		this.narrow_controls = $(this.CONFIG['narrow_controls_wrapper_id']);
		this.narrow_controls.select('A').each(function(link){
			link.observe('click', this.filterClickHandler.bindAsEventListener(this, link));
		}, this);

		this.boldAuthorSortingByName(this.sorting_by_name);
		this.boldFilterList('most citations');
	},
	
	fetchAuthors : function(query,oqs){
		//alert("fetchAuthors:"+oqs);
		var params = (query == 'citations') ? 'request=citations' : 'request='+query;
		//new Ajax.Request(this.CONFIG['ajax_href']+"&random="+ new Date().getTime(), {		
		//new Ajax.Request(ASSETS_RELATIVE_PATH+'/html/authors.json.php', {
		new Ajax.Request('/search/refinements?'+oqs, {
			method : 'get',
			parameters : params,
			evalJSON : 'force',
			onSuccess : this.fetchAuthorsSuccessHandler.bind(this),
			onFailure : this.fetchAuthorsFailureHandler.bind(this)
		});
	},
	
	fetchAuthorsSuccessHandler : function(transport){
		var data = transport.responseJSON.results;
		if (data)
			{ this.handleFetchedAuthorData(data); }
		else
			{ this.fetchAuthorsFailureHandler(); }
	},
	
	fetchAuthorsFailureHandler : function(){
		this.node.up().setStyle({ display : 'none' });
	},
	
	handleFetchedAuthorData : function(data){
		if (data.citations){
			this.authors_by_citation = data.citations;
			this.displayBatchOfAuthors(this.authors_by_citation);
		} else {
			$H(data).each(function(initial){
				this.loadAuthorByLastName(initial);
			}, this);
			if (this.awaiting_letter) {
				this.displayBatchOfAuthors(this.authors_data[this.awaiting_letter][1]);
				this.awaiting_letter = null;
			}
		}
	},
	
	loadAuthorByLastName : function(batch){
		if (!this.authors_data[batch.key]) {
			this.authors_data[batch.key] = [];
			for (x=0;x < batch.length;x++) {
				this.authors_data[batch.key].push(batch[x]);
			}
		}
	},
	
	displayBatchOfAuthors : function(batch){
		this.clearAuthorsToSelectList();
		batch.each(function(author){
			this.displayAuthorToSelect(author);
		}, this);
	},
	
	displayAuthorToSelect : function(author_node){
		var author = new Element('LI', { 'id' : 'author-' + author_node[0] });
		author.update('<span itemid='+author_node[3]+'>' + author_node[1] + ' (' + author_node[2] + ')</span>');
		if (this.selected_authors) { // [].include() doesn't go over well with IE.
			if (this.selected_authors.include(author_node[0])) { author.addClassName('Selected'); }
		}
		this.authors_to_select_list.insert({ 'bottom' : author });
		author.observe('click', this.selectAuthorClickHandler.bind(this, author, author_node[0]));
	},
	
	filterClickHandler : function(e, click){
		var click_html = click.innerHTML.toLowerCase();
		if (click_html == 'most citations') {
			this.filterAuthorsByCitations();
			this.select_heading.update('Authors with the Most Citations');
		} else {
			this.filterAuthorsByLastName(click_html);
			this.select_heading.update('Authors by Last Name: ' + click.innerHTML);
		}
		this.last_clicked = click_html;
		this.boldFilterList(click_html);
		this.activateSorting(this.sorting_by_name);
	},
	
	filterAuthorsByCitations : function(){
		if (!this.authors_by_citation) {
			this.fetchAuthors('citations');
		} else {
			this.displayBatchOfAuthors(this.authors_by_citation);
		}
	},
	
	filterAuthorsByLastName : function(letter){
		if (this.authors_data[letter]){
			this.displayBatchOfAuthors(this.authors_data[letter][1]);
		} else {
			this.awaiting_letter = letter;
			this.fetchAuthors(letter);
		}
	},
	
	selectAuthorClickHandler : function(node, id, e){
		this.selectAuthor(id, node);
	},
	
	activateSorting : function(by_name){
		if (by_name) { 
			this.setSortAuthorsByLastName();
		} else { 
			this.setSortAuthorsByCitations();
		}
	},
	
	setSortAuthorsByCitations : function(){
		this.sorting_by_name = false;
		this.boldAuthorSortingByName(this.sorting_by_name);
		var by_citation = this.authors_to_select_list.select('LI').sortBy(function(author){
			return parseInt(author.innerHTML.gsub(/(.*)\((.*)\)(.*)/,'#{2}'));
		});
		by_citation.reverse();
		this.clearAuthorsToSelectList();
		this.displaySortedAuthors(by_citation);
	},
	
	setSortAuthorsByLastName : function(){
		this.sorting_by_name = true;
		this.boldAuthorSortingByName(this.sorting_by_name);
		if (this.last_clicked == 'most citations') {
			var by_author = this.authors_to_select_list.select('LI').sortBy(function(author){
				return author.innerHTML.stripTags().gsub(/(.*)\((.*)\)(.*)/,'#{1}').strip().split(' ').pop().slice(0,1);
			});
		} else { // we're already filtering by a letter, so sort through the second character
			var by_author = this.authors_to_select_list.select('LI').sortBy(function(author){
				return author.innerHTML.stripTags().gsub(/(.*)\((.*)\)(.*)/,'#{1}').strip().split(' ').pop().slice(1,2);
			});
		}
		this.clearAuthorsToSelectList();
		this.displaySortedAuthors(by_author);
	},
	
	boldAuthorSortingByName : function(bold_by_name){
		var to_bold = (bold_by_name) ? this.sort_by_last_name : this.sort_by_citations;
		if (bold_by_name) {
			this.sort_by_citations.removeClassName(this.CONFIG['active_filter_class']);
			this.sort_by_last_name.addClassName(this.CONFIG['active_filter_class']);
		} else {
			this.sort_by_last_name.removeClassName(this.CONFIG['active_filter_class']);
			this.sort_by_citations.addClassName(this.CONFIG['active_filter_class']);
		}
	},
	
	boldFilterList : function(to_bold){
		this.narrow_controls.select('A').invoke('removeClassName',this.CONFIG['active_filter_class']);
		if (to_bold == 'most citations') {
			this.most_citations.addClassName(this.CONFIG['active_filter_class']);
		} else {
			$('filter-' + to_bold).addClassName(this.CONFIG['active_filter_class']);
		}
	},
	
	selectAuthor : function(id, node){
		if (!this.selected_authors.include(id)) {
			this.selected_authors.push(id);
			this.copyAuthorNodeToSelectedList(id, node);
			this.updateSelectedAuthorsInput();
			node.addClassName(this.CONFIG['selected_author_class']);
		}
	},
	
	displaySortedAuthors : function(collection){
		collection.each(function(author){
			this.authors_to_select_list.insert({ 'bottom' : author });
		}, this);
	},
		
	copyAuthorNodeToSelectedList : function(id, node) {
		var new_author = new Element('LI');
		new_author.update(node.innerHTML);
		this.selected_authors_list.insert({ 'bottom' : new_author });
		new_author.observe('click', this.removeSelectedAuthor.bind(this, id, new_author));
	},
	
	removeSelectedAuthor : function(id, node, e) {
		node.remove();
		this.selected_authors = this.selected_authors.without(id);
		this.updateSelectedAuthorsInput();
		if ($('author-' + id)) { $('author-' + id).removeClassName(this.CONFIG['selected_author_class']); }
	},
	
	removeAllAuthors : function(){
		this.selected_authors = [];
		this.updateSelectedAuthorsInput();
		this.selected_authors_list.select('LI').invoke('remove');
		this.authors_to_select_list.select('.' + this.CONFIG['selected_author_class']).invoke('removeClassName',this.CONFIG['selected_author_class']);
	},
	
	clearAuthorsToSelectList : function(){
		this.authors_to_select_list.select('LI').invoke('remove');
	},
	
	updateSelectedAuthorsInput : function(){
		this.selected_authors_input.value = this.selected_authors;
	}
});

NarrowByAuthors.CONFIG = {
	ajax_href : '/search/refinements',
	authors_to_select_list_id : 'authors-to-select-list',
	selected_authors_list_id : 'selected-authors-list',
	selected_authors_input_id : 'selected_authors_input',
	select_heading_id : 'authors-to-select-heading',
	most_citations_heading_id : 'most-citations',
	sort_by_citations_id : 'sort-by-citations',
	sort_by_last_name_id : 'sort-by-last-name',
	narrow_controls_wrapper_id : 'narrow-controls',
	clear_all_selected_id : 'clear-all-selected',
	active_filter_class : 'Active',
	selected_author_class : 'Selected'
};

//===========================================================================
//NarrowByAffiliation.js

var NarrowByAffiliation = Class.create(PageWidget, {
	initialize : function(wrapper_target, search_query, config){
		this.setOptions(config);
		this.node = $(wrapper_target);
		this.affiliations_to_select_list = $(this.CONFIG['affiliations_to_select_list_id']);
		this.selected_affiliations_list = $(this.CONFIG['selected_affiliations_list_id']);
		if (!this.node || !this.affiliations_to_select_list || !this.selected_affiliations_list)
			{ return; }
		this.fetchAffiliations('citations');
		this.sorting_by_name = false;
		this.selected_affiliations = [];
		this.affiliations_data = {};
		this.selected_affiliations_input = $(this.CONFIG['selected_affiliations_input_id']);
		this.select_heading = $(this.CONFIG['select_heading_id']);
		this.most_citations = $(this.CONFIG['most_citations_heading_id']);
		this.sort_by_citations = $(this.CONFIG['sort_by_citations_id']);
		this.sort_by_citations.observe('click', this.setSortAffiliationsByCitations.bindAsEventListener(this));
		this.sort_by_last_name = $(this.CONFIG['sort_by_last_name_id']);
		this.sort_by_last_name.observe('click', this.setSortAuthorsByLastName.bindAsEventListener(this));
		$(this.CONFIG['clear_all_selected_id']).observe('click', this.removeAllAffiliations.bindAsEventListener(this));
		this.narrow_controls = $(this.CONFIG['narrow_controls_wrapper_id']);
		this.narrow_controls.select('A').each(function(link){
			link.observe('click', this.filterClickHandler.bindAsEventListener(this, link));
		}, this);
		this.boldAffiliationSortingByName(this.sorting_by_name);
		this.boldFilterList('most citations');
	},
	
	fetchAffiliations : function(query){
		var params = (query == 'citations') ? 'request=citations' : 'request='+query;
		new Ajax.Request(this.CONFIG['ajax_href']+"&random="+ new Date().getTime(), {		
			method : 'get',
			parameters : params,
			evalJSON : 'force',
			onSuccess : this.fetchAffiliationsSuccessHandler.bind(this),
			onFailure : this.fetchAffiliationsFailureHandler.bind(this)
		});
	},
	
	fetchAffiliationsSuccessHandler : function(transport){
		var data = transport.responseJSON.results;
		if (data)
			{ this.handleFetchedAffiliationData(data); }
		else
			{ this.fetchAffiliationsFailureHandler(); }
	},
	
	fetchAffiliationsFailureHandler : function(){
		this.node.up().setStyle({ display : 'none' });
	},
	
	handleFetchedAffiliationData : function(data){
		if (data.citations){
			this.affiliations_by_citation = data.citations;
			this.displayBatchOfAffiliations(this.affiliations_by_citation);
		} else {
			$H(data).each(function(initial){
				this.loadAuthorByLastName(initial);
			}, this);
			if (this.awaiting_letter) {
				this.displayBatchOfAffiliations(this.affiliations_data[this.awaiting_letter][1]);
				this.awaiting_letter = null;
			}
		}
	},
	
	loadAuthorByLastName : function(batch){
		if (!this.affiliations_data[batch.key]) {
			this.affiliations_data[batch.key] = [];
			for (x=0;x < batch.length;x++) {
				this.affiliations_data[batch.key].push(batch[x]);
			}
		}
	},
	
	displayBatchOfAffiliations : function(batch){
		this.clearAffiliationsToSelectList();
		batch.each(function(affiliation){
			this.displayAffiliationToSelect(affiliation);
		}, this);
	},
	
	displayAffiliationToSelect : function(affiliation_node){
		var affiliation = new Element('LI', { 'id' : 'affiliation-' + affiliation_node[0] });
		affiliation.update('<span itemid='+affiliation_node[3]+'>' + affiliation_node[1] + ' (' + affiliation_node[2] + ')</span>');
		if (this.selected_affiliations) { // [].include() doesn't go over well with IE.
			if (this.selected_affiliations.include(affiliation_node[0])) { affiliation.addClassName('Selected'); }
		}
		this.affiliations_to_select_list.insert({ 'bottom' : affiliation });
		affiliation.observe('click', this.selectAffiliationClickHandler.bind(this, affiliation, affiliation_node[0]));
	},
	
	filterClickHandler : function(e, click){
		var click_html = click.innerHTML.toLowerCase();
		if (click_html == 'most citations') {
			this.filterAffiliationByCitations();
			this.select_heading.update('Authors with the Most Citations');
		} else {
			this.filterAffiliationsByLastName(click_html);
			this.select_heading.update('Authors by Last Name: ' + click.innerHTML);
		}
		this.last_clicked = click_html;
		this.boldFilterList(click_html);
		this.activateSorting(this.sorting_by_name);
	},
	
	filterAffiliationByCitations : function(){
		if (!this.affiliations_by_citation) {
			this.fetchAffiliations('citations');
		} else {
			this.displayBatchOfAffiliations(this.affiliations_by_citation);
		}
	},
	
	filterAffiliationsByLastName : function(letter){
		if (this.affiliations_data[letter]){
			this.displayBatchOfAffiliations(this.affiliations_data[letter][1]);
		} else {
			this.awaiting_letter = letter;
			this.fetchAffiliations(letter);
		}
	},
	
	selectAffiliationClickHandler : function(node, id, e){
		this.selectAffiliation(id, node);
	},
	
	activateSorting : function(by_name){
		if (by_name) { 
			this.setSortAuthorsByLastName();
		} else { 
			this.setSortAffiliationsByCitations();
		}
	},
	
	setSortAffiliationsByCitations : function(){
		this.sorting_by_name = false;
		this.boldAffiliationSortingByName(this.sorting_by_name);
		var by_citation = this.affiliations_to_select_list.select('LI').sortBy(function(affiliation){
			return parseInt(affiliation.innerHTML.gsub(/(.*)\((.*)\)(.*)/,'#{2}'));
		});
		by_citation.reverse();
		this.clearAffiliationsToSelectList();
		this.displaySortedAuthors(by_citation);
	},
	
	setSortAuthorsByLastName : function(){
		this.sorting_by_name = true;
		this.boldAffiliationSortingByName(this.sorting_by_name);
		if (this.last_clicked == 'most citations') {
			var by_affiliation = this.affiliations_to_select_list.select('LI').sortBy(function(affiliation){
				return affiliation.innerHTML.stripTags().gsub(/(.*)\((.*)\)(.*)/,'#{1}').strip().split(' ').pop().slice(0,1);
			});
		} else { // we're already filtering by a letter, so sort through the second character
			var by_affiliation = this.affiliations_to_select_list.select('LI').sortBy(function(affiliation){
				return affiliation.innerHTML.stripTags().gsub(/(.*)\((.*)\)(.*)/,'#{1}').strip().split(' ').pop().slice(1,2);
			});
		}
		this.clearAffiliationsToSelectList();
		this.displaySortedAuthors(by_affiliation);
	},
	
	boldAffiliationSortingByName : function(bold_by_name){
		var to_bold = (bold_by_name) ? this.sort_by_last_name : this.sort_by_citations;
		if (bold_by_name) {
			this.sort_by_citations.removeClassName(this.CONFIG['active_filter_class']);
			this.sort_by_last_name.addClassName(this.CONFIG['active_filter_class']);
		} else {
			this.sort_by_last_name.removeClassName(this.CONFIG['active_filter_class']);
			this.sort_by_citations.addClassName(this.CONFIG['active_filter_class']);
		}
	},
	
	boldFilterList : function(to_bold){
		this.narrow_controls.select('A').invoke('removeClassName',this.CONFIG['active_filter_class']);
		if (to_bold == 'most citations') {
			this.most_citations.addClassName(this.CONFIG['active_filter_class']);
		} else {
			$('filter-' + to_bold).addClassName(this.CONFIG['active_filter_class']);
		}
	},
	
	selectAffiliation : function(id, node){
		if (!this.selected_affiliations.include(id)) {
			this.selected_affiliations.push(id);
			this.copyAffiliationNodeToSelectedList(id, node);
			this.updateSelectedAffiliationsInput();
			node.addClassName(this.CONFIG['selected_affiliation_class']);
		}
	},
	
	displaySortedAuthors : function(collection){
		collection.each(function(affiliation){
			this.affiliations_to_select_list.insert({ 'bottom' : affiliation });
		}, this);
	},
		
	copyAffiliationNodeToSelectedList : function(id, node) {
		var new_affiliation = new Element('LI');
		new_affiliation.update(node.innerHTML);
		this.selected_affiliations_list.insert({ 'bottom' : new_affiliation });
		new_affiliation.observe('click', this.removeSelectedAffiliation.bind(this, id, new_affiliation));
	},
	
	removeSelectedAffiliation : function(id, node, e) {
		node.remove();
		this.selected_affiliations = this.selected_affiliations.without(id);
		this.updateSelectedAffiliationsInput();
		if ($('affiliation-' + id)) { $('affiliation-' + id).removeClassName(this.CONFIG['selected_affiliation_class']); }
	},
	
	removeAllAffiliations : function(){
		this.selected_affiliations = [];
		this.updateSelectedAffiliationsInput();
		this.selected_affiliations_list.select('LI').invoke('remove');
		this.affiliations_to_select_list.select('.' + this.CONFIG['selected_affiliation_class']).invoke('removeClassName',this.CONFIG['selected_affiliation_class']);
	},
	
	clearAffiliationsToSelectList : function(){
		this.affiliations_to_select_list.select('LI').invoke('remove');
	},
	
	updateSelectedAffiliationsInput : function(){
		this.selected_affiliations_input.value = this.selected_affiliations;
	}
});

NarrowByAffiliation.CONFIG = {
	ajax_href : '/search/NarrowBySearch.jsp?action=narrowByAffiliations',
	affiliations_to_select_list_id : 'affiliations-to-select-list',
	selected_affiliations_list_id : 'selected-affiliations-list',
	selected_affiliations_input_id : 'selected_affiliations_input',
	select_heading_id : 'affiliations-to-select-heading',
	most_citations_heading_id : 'most-citations',
	sort_by_citations_id : 'sort-by-citations',
	sort_by_last_name_id : 'sort-by-last-name',
	narrow_controls_wrapper_id : 'narrow-controls',
	clear_all_selected_id : 'clear-all-selected',
	active_filter_class : 'Active',
	selected_affiliation_class : 'Selected'
};

// ===========================================================================
// NarrowByDate.js

var NarrowByDate = Class.create(PageWidget, {
	initialize : function(config){
		this.setOptions(config);
		this.start_date_input = $(this.CONFIG['start_date_input']).disable();
		this.end_date_input = $(this.CONFIG['end_date_input']).disable();
		this.slider = $(this.CONFIG['slider']);
		this.slide_scroller = $(this.CONFIG['slide_scroller']);
		this.active_slide_range = $(this.CONFIG['slider_active_range']);
		this.slider_width = this.CONFIG['slider_width'];
		this.start_date_slider = $(this.CONFIG['start_date_slider']);
		this.end_date_slider = $(this.CONFIG['end_date_slider']);


		this.fetchYearRange();
	},
	
	fetchYearRange : function(){
		new Ajax.Request(this.CONFIG['ajax_href']+"&random="+ new Date().getTime(), {
			method : 'get',
			evalJSON : 'force',
			onSuccess : this.fetchSuccessHandler.bind(this),
			onFailure : this.fetchFailureHandler.bind(this)
		});
	},
	
	fetchFailureHandler : function(transport){
		$(this.CONFIG['wrapper_id']).setStyle({ display : 'none' });
	},
	
	fetchSuccessHandler : function(transport){
		this.start_year = transport.responseJSON.start;
		this.end_year = transport.responseJSON.end;
		this.renderLabels();
		this.calculateYears();
		this.createSlider();
		this.drawActiveRange();
		this.original_start_position = this.start_date_slider.style.left;
		this.original_end_position = this.end_date_slider.style.left;
	},
	
	renderLabels : function(){
		var start_date = $(this.CONFIG['start_date_label']);
		var end_date = $(this.CONFIG['end_date_label']);
		if (start_date) {
			start_date.innerHTML = this.start_year;
			this.start_date_input.value = this.start_year;
		}
		if (end_date) { 
			end_date.innerHTML = this.end_year;
			this.end_date_input.value = this.end_year;
		}
	},
	
	calculateYears : function(){
		var d = new Date();
		var current_year = d.getFullYear();
		var outer_date_range = (current_year - this.CONFIG['first_year']);
		this.inner_date_range = (this.end_year - this.start_year);
		this.inner_width = parseInt(this.CONFIG['slider_width'] * (this.inner_date_range / outer_date_range));
		from_left = (Math.round(this.CONFIG['slider_width'] / outer_date_range) * (this.start_year - this.CONFIG['first_year']));
		this.slide_scroller.setStyle({
			width : this.inner_width + 'px',
			marginLeft : from_left + 'px'
		});
		this.increment = (this.inner_date_range / this.slide_scroller.getWidth());
	},
	
	createSlider : function(){
		this.slider_control = new Control.Slider([this.start_date_slider, this.end_date_slider], this.slider, {
			increment : this.increment,
			range : $R(this.start_year,this.end_year),
			minimum : this.start_year,
			maximum : this.end_year,
			restricted : true,
			sliderValue : [this.start_year,this.end_year],
			onSlide : function(value){ this.updateSliderValue(value); }.bind(this),
			onChange : function(value){ this.updateSliderValue(value); }.bind(this)
		});
	},
	
	updateSliderValue : function(value){
		this.start_date_input.value = parseInt(value[0]);
		this.end_date_input.value = parseInt(value[1]);
		this.drawActiveRange();
	},
	
	drawActiveRange : function(){
		this.active_slide_range.setStyle({
			left : this.start_date_slider.style.left,
			width : ((((parseInt(this.end_date_slider.style.left) - 12) - parseInt(this.start_date_slider.style.left)) + this.end_date_slider.getWidth()) - 10) + 'px'
		});
	}
});

NarrowByDate.CONFIG = {
	wrapper_id : 'narrow-by-date',
	ajax_href : '/search/search?action=narrowByDate',
	first_year : 1913,
	slider : 'slider',
	slide_scroller : 'slider-scroll',
	slider_active_range : 'active-range',
	slider_width : 500, // in pixels
	start_date_slider : 'start-date-slider',
	end_date_slider : 'end-date-slider',
	start_date_input : 'start-date',
	end_date_input : 'end-date',
	start_date_label : 'start-label',
	end_date_label : 'end-label'
};



//===========================================================================
//NarrowPubTitle.js
var NarrowByPubTitle = Class.create(PageWidget, {
	initialize : function(wrapper_target, config){
		this.setOptions(config);
		this.data_list = $(this.CONFIG['data_list_id']);
		if (!this.data_list) 
			{ return; }
		this.fetchPubTitles ('citations');
		this.pubtitles_to_select_list = $(this.CONFIG['pubtitles_to_select_list_id']);
		this.selected_pubtitles_list = $(this.CONFIG['selected_pubtitles_id']);
		this.column_wrapper = $(this.CONFIG['column_wrapper_id']);
		this.column_width = this.CONFIG['column_width'];
		this.selected_pubtitles = [];
		this.expanded_pubtitles = {};
		this.initializePubTitleList(this.data_list);
		$(this.CONFIG['clear_selected_id']).observe('click', this.removeAllPubTitless.bindAsEventListener(this));
	},
	
	initializePubTitleList : function(target){
		target.select(this.CONFIG['category_selector']).each(function(li){ 
			li.observe('click', this.selectExpandablePubTitleClickHandler.bindAsEventListener(this, li)); 
		}, this);
		target.select(this.CONFIG['pubtitle_selector']).each(function(li){ 
			li.observe('click', this.selectPubTitleClickHandler.bindAsEventListener(this, li));
		}, this);
	},
	fetchPubTitles : function(query){
//		var params = (query == 'citations') ? 'request=citations' : 'request='+query;
		new Ajax.Request(this.CONFIG['ajax_href']+"&random="+ new Date().getTime(), {
			method : 'get',
//			parameters : params,
			evalJSON : 'force',
			onSuccess : this.fetchPubTitlesSuccessHandler.bind(this),
			onFailure : this.fetchPubTitlesFailureHandler.bind(this)
		});
	},	
	fetchPubTitlesSuccessHandler : function(transport){
         var data = transport.responseJSON;
         if(data){
             this.handleFetchedPubTitleData(data);
         }           
	},
	fetchPubTitlesFailureHandler : function(){
         alert("failure");
     },
 	handleFetchedPubTitleData : function(data){
         this.pubtitles = data.pubtitles;
         this.displayBatchOfPubTitles(this.pubtitles);
	},	
	displayBatchOfPubTitles : function(batch){
		this.clearPubTitlesToSelectList();
		batch.each(function(pubtitle){
			this.displayPubTitleToSelect(pubtitle);
		}, this);
	},
	
	displayPubTitleToSelect : function(title_node){
		var pubtitle = new Element('LI', { 'id' : 'title-' + title_node[0] });
		pubtitle.update('<span itemid='+title_node[3]+'>' + title_node[1] + ' (' + title_node[2] + ')</span>');
//		pubtitle.update('<span>' + title_node[1] + ' (' + title_node[2] + ')</span>');
        if (this.selected_pubtitles) { // [].include() doesn't go over well with IE.
			if (this.selected_pubtitles.include(title_node[0])) { pubtitle.addClassName('Selected'); }
		}
		this.pubtitles_to_select_list.insert({ 'bottom' : pubtitle });
		pubtitle.observe('click', this.selectPubTitleClickHandler.bindAsEventListener(this, pubtitle));
	},
	clearPubTitlesToSelectList : function(){
		this.pubtitles_to_select_list.select('LI').invoke('remove');
	},
     	
	selectPubTitleClickHandler : function(e, pubtitle){
		this.addPubTitle(e, pubtitle);
	},
	
	selectExpandablePubTitleClickHandler : function(e, pubtitle){
		this.selectExpandablePubTitle(e, pubtitle);
	},
	
	selectExpandablePubTitle : function(e, pubtitle){
		var dims = pubtitle.cumulativeOffset();
		if ((e.clientX + this.data_list.scrollLeft) < (dims[0] + 16)) {
			this.addPubTitleContainer(pubtitle);
		} else {
			this.expandPubTitle(pubtitle);
		}
	},
	
	addPubTitle : function(e, pubtitle){
		pubtitle_id = pubtitle.id.split('-')[1];
		if (!this.selected_pubtitles.include(pubtitle_id)) {
			this.selected_pubtitles.push(pubtitle_id);
			this.copyPubTitleNodeToSelectedList(pubtitle);
			pubtitle.addClassName('Selected');
		}
	},
	
	addPubTitleContainer : function(container){
		if (!this.selected_pubtitle.include(container.id.split('-')[1])) {
			this.addPubTitle(this, container);
			var target = (container.hasClassName('Active')) ? container.up('.Column').next('.Column') : container;
			target.select('LI').each(function(li){
				if (!this.selected_pubtitles.include(li.id.split('-')[1])) {
					if (li.hasClassName('Expandable')) {
						this.addPubTitleContainer(li);
					} else {
						this.addPubTitle(this, li);
					}
				}
			}, this);
			this.expandPubTitle(container);
		}
	},
	
	expandPubTitle : function(pubtitle){
		if (pubtitle.hasClassName('Active'))
			{ return; }
		this.scollToCorrectColumn(pubtitle);
		var nextcolumn = pubtitle.down('.Collapsed');
		this.toggleColumnWrapperWidth(true);
		this.column_wrapper.insert({ 'bottom' : nextcolumn });
		this.expanded_pubtitles[nextcolumn.id] = pubtitle.id;
		pubtitle.addClassName('Active');
		nextcolumn.removeClassName('Collapsed').addClassName('Expanded').down('UL').select('LI').each(function(li){
			if (this.selected_pubtitles.include(li.id.split('-')[1])) { 
				li.addClassName('Selected'); 
			}
		}, this);
	},
	
	scollToCorrectColumn : function(target){
		var chain = target.ancestors();
		var nextcolumns = target.up('.Column').nextSiblings();
		nextcolumns.each(function(col){
			if (col.hasClassName('Expanded') && !chain.include(col)) {
				this.removeColumn(col);
			}
		}, this);
	},
	
	toggleColumnWrapperWidth : function(expanding){
		this.column_width = (expanding) ? (this.column_width + 200) : (this.column_width - 200);
		this.column_wrapper.setStyle({ 'width' : (this.column_width + 'px') });
		this.data_list.scrollDiv(this.column_width, 0);
	},
	
	removeColumn : function(col){
		$(this.expanded_titles[col.id]).insert({ 'bottom'  : col }).removeClassName('Active');
		col.removeClassName('Expanded').addClassName('Collapsed');
		this.toggleColumnWrapperWidth(false);
	},	
	
	copyPubTitleNodeToSelectedList : function(pubtitle){
		var new_pubtitle = new Element('LI');
		new_pubtitle.update(pubtitle.innerHTML);		
		this.selected_pubtitles_list.insert({ 'bottom' : new_pubtitle });
		new_pubtitle.observe('click', this.removeSelectedPubTitle.bind(this, new_pubtitle));
	},
	
	removeSelectedPubTitle : function(pubtitle, e){
		pubtitle.remove();
		this.selected_pubtitles = this.selected_pubtitles.without(pubtitle.id);
		var selected_li = $('pubtitle-' + pubtitle.id);
		if (selected_li) { selected_li.removeClassName('Selected'); }
	},
	
	removeAllPubTitles : function(){
		this.selected_pubtitles = [];
		this.selected_pubtitles_list.select('LI').invoke('remove');
		this.data_list.select('.Selected').invoke('removeClassName','Selected');
	}
});

NarrowByPubTitle.CONFIG = {
	ajax_href : '/search/NarrowBySearch.jsp?action=narrowByPubTitle',		
	column_width : 200,
	category_selector : '.Expandable',
	pubtitle_selector : '.PubTitle',
	data_list_id : 'pubtitles-data-list',
	clear_selected_id : 'clear-all-selected',
	column_wrapper_id : 'column-wrapper',
	selected_pubtitles_id : 'selected-pubtitles-list',	
	pubtitles_to_select_list_id : 'pubtitles-to-select-list'
};

// ===========================================================================
// NarrowBySubject.js

var NarrowBySubject = Class.create(PageWidget, {
	initialize : function(wrapper_target, config){
		this.setOptions(config);
		this.data_list = $(this.CONFIG['data_list_id']);
		if (!this.data_list) 
			{ return; }
		this.fetchSubjects ('citations');
        this.subjects_to_select_list = $(this.CONFIG['subjects_to_select_list_id']);
        this.selected_subjects_list = $(this.CONFIG['selected_subjects_id']);
		this.column_wrapper = $(this.CONFIG['column_wrapper_id']);
		this.column_width = this.CONFIG['column_width'];
		this.selected_subjects = [];
		this.expanded_subjects = {};
		this.initializeSubjectList(this.data_list);
		$(this.CONFIG['clear_selected_id']).observe('click', this.removeAllSubjects.bindAsEventListener(this));
	},
	
	initializeSubjectList : function(target){
		target.select(this.CONFIG['category_selector']).each(function(li){ 
			li.observe('click', this.selectExpandableSubjectClickHandler.bindAsEventListener(this, li)); 
		}, this);
		target.select(this.CONFIG['subject_selector']).each(function(li){ 
			li.observe('click', this.selectSubjectClickHandler.bindAsEventListener(this, li));
		}, this);
	},
//***********************************************
	fetchSubjects : function(query){
//		var params = (query == 'citations') ? 'request=citations' : 'request='+query;
		new Ajax.Request(this.CONFIG['ajax_href']+"&random="+ new Date().getTime(), {
			method : 'get',
//			parameters : params,
			evalJSON : 'force',
			onSuccess : this.fetchSubjectsSuccessHandler.bind(this),
			onFailure : this.fetchSubjectsFailureHandler.bind(this)
		});
	},	
	fetchSubjectsSuccessHandler : function(transport){
            var data = transport.responseJSON.taxonomy;
            if(data){
                this.handleFetchedSubjectData(data);
            }           
	},
    fetchSubjectsFailureHandler : function(){
            alert("failure");
        },
    	handleFetchedSubjectData : function(data){
            this.subject_taxonomy = data;
            this.displayBatchOfSubjects(this.subject_taxonomy);
	},
	
	displayBatchOfSubjects : function(batch){
		this.clearSubjectsToSelectList();
		batch.each(function(subject){
			this.displaySubjectToSelect(subject);
		}, this);
	},
	
	displaySubjectToSelect : function(subject_node){
		var subject = new Element('LI', { 'id' : 'subject-' + subject_node[0] });		 		
		subject.update('<span itemid='+subject_node[4]+'>' + subject_node[1] + ' ' + subject_node[2] + ' (' + subject_node[3] + ')</span>');
                if (this.selected_subjects) { // [].include() doesn't go over well with IE.
			if (this.selected_subjects.include(subject_node[0])) { subject.addClassName('Selected'); }
		}
		this.subjects_to_select_list.insert({ 'bottom' : subject });
		subject.observe('click', this.selectSubjectClickHandler.bindAsEventListener(this, subject));
	},
	clearSubjectsToSelectList : function(){
		this.subjects_to_select_list.select('LI').invoke('remove');
	},
        
//***********************************************
	
	selectSubjectClickHandler : function(e, subject){
		this.addSubject(e, subject);
	},
	
	selectExpandableSubjectClickHandler : function(e, subject){
		this.selectExpandableSubject(e, subject);
	},
	
	selectExpandableSubject : function(e, subject){
		var dims = subject.cumulativeOffset();
		if ((e.clientX + this.data_list.scrollLeft) < (dims[0] + 16)) {
			this.addSubjectContainer(subject);
		} else {
			this.expandSubject(subject);
		}
	},
	
	addSubject : function(e, subject){
		subject_id = subject.id.split('-')[1];
		if (!this.selected_subjects.include(subject_id)) {
			this.selected_subjects.push(subject_id);
			this.copySubjectNodeToSelectedList(subject);
			subject.addClassName('Selected');
		}
	},
	
	addSubjectContainer : function(container){
		if (!this.selected_subjects.include(container.id.split('-')[1])) {
			this.addSubject(this, container);
			var target = (container.hasClassName('Active')) ? container.up('.Column').next('.Column') : container;
			target.select('LI').each(function(li){
				if (!this.selected_subjects.include(li.id.split('-')[1])) {
					if (li.hasClassName('Expandable')) {
						this.addSubjectContainer(li);
					} else {
						this.addSubject(this, li);
					}
				}
			}, this);
			this.expandSubject(container);
		}
	},
	
	expandSubject : function(subject){
		if (subject.hasClassName('Active'))
			{ return; }
		this.scollToCorrectColumn(subject);
		var nextcolumn = subject.down('.Collapsed');
		this.toggleColumnWrapperWidth(true);
		this.column_wrapper.insert({ 'bottom' : nextcolumn });
		this.expanded_subjects[nextcolumn.id] = subject.id;
		subject.addClassName('Active');
		nextcolumn.removeClassName('Collapsed').addClassName('Expanded').down('UL').select('LI').each(function(li){
			if (this.selected_subjects.include(li.id.split('-')[1])) { 
				li.addClassName('Selected'); 
			}
		}, this);
	},
	
	scollToCorrectColumn : function(target){
		var chain = target.ancestors();
		var nextcolumns = target.up('.Column').nextSiblings();
		nextcolumns.each(function(col){
			if (col.hasClassName('Expanded') && !chain.include(col)) {
				this.removeColumn(col);
			}
		}, this);
	},
	
	toggleColumnWrapperWidth : function(expanding){
		this.column_width = (expanding) ? (this.column_width + 200) : (this.column_width - 200);
		this.column_wrapper.setStyle({ 'width' : (this.column_width + 'px') });
		this.data_list.scrollDiv(this.column_width, 0);
	},
	
	removeColumn : function(col){
		$(this.expanded_subjects[col.id]).insert({ 'bottom'  : col }).removeClassName('Active');
		col.removeClassName('Expanded').addClassName('Collapsed');
		this.toggleColumnWrapperWidth(false);
	},	
	
	copySubjectNodeToSelectedList : function(subject){
//		var new_subject = new Element('LI', { 'id' : subject.id.split('-')[1] }).update('<span>' + subject.down('SPAN').innerHTML + '</span>');
		var new_subject = new Element('LI');
		new_subject.update(subject.innerHTML);
//		new_subject.update('<span>' + subject.down('SPAN').innerHTML + '</span>');
		this.selected_subjects_list.insert({ 'bottom' : new_subject });
		new_subject.observe('click', this.removeSelectedSubject.bind(this, new_subject));
	},
	
	removeSelectedSubject : function(subject, e){
		subject.remove();
		this.selected_subjects = this.selected_subjects.without(subject.id);
		var selected_li = $('subject-' + subject.id);
		if (selected_li) { selected_li.removeClassName('Selected'); }
	},
	
	removeAllSubjects : function(){
		this.selected_subjects = [];
		this.selected_subjects_list.select('LI').invoke('remove');
		this.data_list.select('.Selected').invoke('removeClassName','Selected');
	}
});

NarrowBySubject.CONFIG = {
	ajax_href : '/search/NarrowBySearch.jsp?action=narrowBySubject',		
	column_width : 200,
	category_selector : '.Expandable',
	subject_selector : '.Subject',
	data_list_id : 'subjects-data-list',
	clear_selected_id : 'clear-all-selected',
	column_wrapper_id : 'column-wrapper',
	selected_subjects_id : 'selected-subjects-list',	
	subjects_to_select_list_id : 'subjects-to-select-list'
};

// ===========================================================================
// Overlabel.js

var OverLabel = Behavior.create({
	initialize : function(){
		this.element.hide();
		this.overlabel = this.element.innerHTML;
		this.input = $(this.element.htmlFor);
		if ($F(this.input) == "" || ($F(this.input) == this.overlabel)) {
			this.initializeOverLabel();
		}
	},
	
	initializeOverLabel : function(){
		this.input.value = this.overlabel;
		this.input.observe('click', this.overLabelFocusHandler.bindAsEventListener(this));
	},
	
	overLabelFocusHandler : function(){
		if ($F(this.input) == this.overlabel || ($F(this.input) == "")) {
			this.input.clear();
			this.input_blur_handler = this.overLabelBlurHandler.bindAsEventListener(this);
			this.input.observe('blur', this.input_blur_handler);
		}
	},
	
	overLabelBlurHandler : function(){
		Event.stopObserving(this.input, 'blur', this.input_blur_handler);
		if ($F(this.input).empty()) {
			this.replaceOverLabel();
		}
	},
	
	replaceOverLabel : function(){
		this.input.value = this.overlabel;
	}
});

Event.addBehavior({
	
	// Generic overlabel class designed for any label that wants to reside inside the Input.
	// Currently used for the Sign In form labels.
	'.overlabel' : OverLabel
	
});

// ===========================================================================
// Popup.js

var Popup = Behavior.create(PageWidget, {
	initialize : function(location, config){
		this.setOptions(config);
		this.popup_location = location;
		this.layout_wrapper = $(this.CONFIG['layout_wrapper']);
		if (!this.layout_wrapper) 
			{ return; }
		this.defineBrowserVariables();
		this.definePopupType();
		this.createOverlay();
		this.element.observe('click', this.popUpClickHandler.bindAsEventListener(this));
		this.overlay_observer = this.overlayClickHandler.bindAsEventListener(this);
		this.initializeCallback = this.CONFIG['initialize_callback'].bind(this);
		this.validateCallback = this.CONFIG['validate_callback'].bind(this);
		this.showCallback = this.CONFIG['show_callback'].bind(this);
		this.hideCallback = this.CONFIG['hide_callback'].bind(this);
		this.initializeCallback();
	},
	
	defineBrowserVariables : function(){
		this.document_height = this.layout_wrapper.getHeight();
		this.vertical_scroll = document.viewport.getScrollOffsets()[1];
		this.window_height = document.viewport.getHeight();
		this.window_width = document.viewport.getWidth();
		this.element_position = this.element.positionedOffset();
	},
	
	definePopupType : function(){
		//tabbing was not working for accessibility. modified code below to support tabbing for searchtips .
		//fixed IBP defect 3707 A keyboard only user cannot reach the search tips link beneath the global header
		
		if(this.element.getAttribute('href') != "#")
		if (this.element.tagName.toLowerCase() == 'a') {
			this.element.setStyle({ cursor : 'pointer' }).removeAttribute('href');
		}
		
		if (!this.CONFIG['use_ajax'] && this.element.hasClassName(this.CONFIG['dhtml_popup_class'])) {
			this.element.addClassName(this.CONFIG['dhtml_trigger_class']).removeClassName(this.CONFIG['dhtml_popup_class']);
		}
	},
	
	createOverlay : function(){
		if (!$('popup_overlay')) {
			var overlay = new Element('DIV', { 'id' : 'popup_overlay', 'style' : 'width: ' + this.window_width + 'px;' });
			$(document.body).insert({ 'bottom' : overlay });
		}
		this.overlay = $('popup_overlay');
	},
	
	popUpClickHandler : function(e){
		this.defineBrowserVariables();
		if (!this.popup_container) {
			this.fetchPopup();
		} else {
			this.displayPopup();
		}
	},
	
	overlayClickHandler : function(e){
		if (e.target == this.overlay) {
			this.hidePopup();
		}
	},
	
	fetchPopup : function(){
		if (this.CONFIG['use_ajax']) {
			new Ajax.Request(this.popup_location, {
				method : 'get',
				onSuccess : this.popUpAjaxSuccessHandler.bind(this),
				onFailure : this.popUpAjaxFailureHandler.bind(this)
			});
		} else {
			if ($(this.popup_location)){
				this.createPopup($(this.popup_location).innerHTML);
				this.displayPopup();
			}
		}
	},
	
	popUpAjaxSuccessHandler : function(transport){
		this.createPopup(transport.responseText);
		this.displayPopup();
	},
	
	popUpAjaxFailureHandler : function(transport){
		alert('The AJAX request failed and the popup cannot load.');
	},
	
	createPopup : function(html){
		if (!$(this.element.id + '_container')) {
			this.popup_container = new Element('DIV', { 'id' : this.element.id + '_container', 'class' : 'popup_container', 'style' : 'position: absolute; width: ' + this.popup_width + 'px; display: none; z-index: 999;' });
			this.overlay.insert({ 'bottom' : this.popup_container });
			Element.extend(this.popup_container);
			if (this.CONFIG['use_ajax']) {
				this.popup_container.update(html);
			} else {
				this.popup_container.insert($(this.popup_location));
			}
			this.calculatePopupDimensions();
		}
	},
	
	calculatePopupDimensions : function(){
		this.displayOverlay();
		this.popup_container.addClassName('Calculating');
		this.popup_width = this.popup_container.getWidth();
		this.popup_height = this.popup_container.getHeight();
		this.popup_container.removeClassName('Calculating');
		this.hideOverlay();
	},
	
	displayPopup : function(){
		if (Prototype.Browser.IE) { this.hideAllContainers(); }
		this.validated = true;
		this.validateCallback();
		if (this.validated) {
			this.positionPopup();
			this.displayOverlay();
			this.insertIframe();
			this.popup_container.setStyle({ display : 'block' });
			this.overlay.observe('click', this.overlay_observer);
			this.initializePopupElements();
			this.showCallback();
		}
	},
	
	initializePopupElements : function(){
		
		if (this.CONFIG['window_submit_selector']){
			this.popup_form = this.popup_container.down('FORM');
			if (this.popup_form) {
				if (this.popup_form.findFirstElement())
				 { this.popup_form.focusFirstElement(); }
				this.popup_form_location = this.popup_form.action;
				this.popup_form_method = this.popup_form.method;
				var submits = this.popup_container.select(this.CONFIG['window_submit_selector']);
				if (submits.size() > 0) {
					submits.each(function(submit){						
						submit.observe('click', this.submitPopupForm.bind(this));
					}, this);
				}
			}
		}
		if (this.CONFIG['window_close_selector']){
			var closes = this.popup_container.select(this.CONFIG['window_close_selector']);
			if (closes.size() > 0) {
				closes.each(function(close){
					close.observe('click', this.hidePopup.bind(this));
				}, this);
			}
		}
	},
	
	submitPopupForm : function(e){
		e.stop();
		if (!this.validation) this.validation = new Validation(this.popup_form);
		if (this.validation.validate()) {
			if (this.popup_form) {		
					new Ajax.Request(this.popup_form_location, {
						parameters : this.popup_form.serialize(),
						onSuccess : this.CONFIG['form_onsuccess_callback'],
						onFailure : this.CONFIG['form_onfailure_callback']
					});
			}
			this.validation = null;
			this.hidePopup();
		}
	},
	
	displayOverlay : function(){
		this.overlay.setStyle({
			height : this.document_height + 'px',
			display : 'block',
			visibility : 'visible'
		});
	},
	
	hideOverlay : function(){
		if (this.popup_container.visible()) { this.hidePopup(); }
		this.overlay.setStyle({
			display : 'none',
			visibility : 'hidden'
		});
	},
	
	insertIframe : function(){
		if (Prototype.Browser.IE6) {
			this.createIframe(this.popup_container, {
				'top'    : this.popup_container.style.top,
				'left'   : this.popup_container.style.left,
				'height' : this.popup_height + "px",
				'width'  : this.popup_width + "px"
			});
		}
	},
	
	removeIframe : function(){
		if (Prototype.Browser.IE6) {
			var iframe = $('popup-iframe');
			if (iframe) {
				iframe.remove();
			}
		}
	},
	
	createIframe : function(node, style) {
		new Insertion.Bottom(node.up(), (new Template('<iframe id="popup-iframe" frameborder="0" scrolling="no" style="width: #{width}; height: #{height}; left: #{left}; top: #{top}; position: absolute; z-index: 502;"><\/iframe>')).evaluate(style));
	},
	
	positionPopup : function(){
		switch (this.CONFIG['position']) {
			case 'auto' :
				this.popup_container.setStyle({
					top : (((this.window_height / 2) - (this.popup_height / 2)) + this.vertical_scroll) + 'px',
					left : ((this.window_width - this.popup_width) / 2) + 'px'
				});
			break;
			case 'vertical' : 
				this.popup_container.setStyle({
					top : (this.element_position[1] + this.element.getHeight()) + 'px',
					left : (this.element_position[0]) + 'px'
				});
			break;
			case 'horizontal' :
				this.popup_container.setStyle({
					top : (((this.window_height / 2) - (this.popup_height / 2)) + this.vertical_scroll) + 'px',
					left : ((this.element_position[0] + this.element.getWidth()) + 1) + 'px'
				});
			break;
		}
	},
	
	hidePopup : function(){
		this.removeIframe();
		this.hideAllContainers();
		this.overlay.setStyle({	display : 'none' }).stopObserving('click', this.overlay_observer);
		this.hideCallback();
	},
	
	hideAllContainers : function(){
		this.removeIframe();
		this.overlay.select('.popup_container').each(function(popup){
			popup.style.display = 'none';
		}, this);
	},
	
	attachCheckboxObserver : function(target, popup, image_states) {
		var checkbox_container = this.layout_wrapper.down(target);
		if (checkbox_container) {
			var checkboxes = checkbox_container.select('INPUT[type="checkbox"]');
			checkboxes.each(function(box){
				box.observe('click', this.toggleCheckboxDisabledPopup.bindAsEventListener(this, checkboxes, popup, image_states));
			}, this);
		}
		this.select_all = $('select-all');
		this.deselect_all = $('deselect-all');
		this.select_all_bottom = $('select-all-bottom');
		this.deselect_all_bottom = $('deselect-all-bottom');		
		if (this.select_all && this.deselect_all) {
			this.select_all.observe('click', this.toggleDisabledPopup.bindAsEventListener(this, true, popup, image_states));
			this.deselect_all.observe('click', this.toggleDisabledPopup.bindAsEventListener(this, false, popup, image_states));
		}
		if (this.select_all_bottom && this.deselect_all_bottom) {
			this.select_all_bottom.observe('click', this.toggleDisabledPopup.bindAsEventListener(this, true, popup, image_states));
			this.deselect_all_bottom.observe('click', this.toggleDisabledPopup.bindAsEventListener(this, false, popup, image_states));
		}		
		if (checkboxes)
		 { this.toggleCheckboxDisabledPopup(this, checkboxes, popup, image_states); }
	},
	
	toggleCheckboxDisabledPopup : function(e, checkboxes, popup, image_states) {
		var something_checked = false;
		checkboxes.each(function(box){
			if (box.checked) { something_checked = true; }
		});
		if (something_checked) {
			this.toggleDisabledPopup(e, true, popup, image_states);
		} else {
			this.toggleDisabledPopup(e, false, popup, image_states);
		}
	},
	
	toggleDisabledPopup : function(e, toggle_status, popup, image_states){
		var container = $(popup);
		if (container) {
		if (toggle_status) {
			container.removeClassName('disabled');
			this.element.src = image_states[0];
			var curAlt = container.readAttribute('alt');
			var newAlt = curAlt.replace(/ Disabled/g,'');
			container.writeAttribute('alt',newAlt);
		} else {
			container.addClassName('disabled');
			this.element.src = image_states[1];
			var curAlt = container.readAttribute('alt');
			var newAlt = curAlt.replace(/ Disabled/g,'');
			newAlt = newAlt + ' Disabled';
			container.writeAttribute('alt',newAlt);
		}
		}
	},
	
	displayUnlessDisabled : function(){
		if (this.element.hasClassName('disabled')) { this.validated = false; }
	}
});

Popup.CONFIG = {
	use_ajax : true,
	position : 'auto', // auto, vertical (pops under element), horizontal (pops to the side) 
	window_submit_selector : '.form-action',
	window_close_selector : '.close-popup',
	layout_wrapper : 'LayoutWrapper',
	dhtml_popup_class : 'DHTMLPopup',
	dhtml_trigger_class : 'DHTMLTrigger',
	initialize_callback : Prototype.emptyFunction,
	validate_callback : Prototype.emptyFunction,
	show_callback : Prototype.emptyFunction,
	hide_callback : Prototype.emptyFunction,
	form_onsuccess_callback : Prototype.emptyFunction,
	form_onfailure_callback : Prototype.emptyFunction
};

Event.addBehavior({
	
	// Search Preferences
	'#popup-search-preferences-old.' : Popup('/xpl/mwPreferences.jsp', {
		show_callback : function() { 
			var qrystr= document.getElementById("oqs").value;
			this.popup_form.oqs.value = qrystr;
		},
		form_onsuccess_callback : function(){
			var oqs = document.getElementById("oqs").value;	
			if (oqs){
				document.location = "/search/searchresult.jsp?"+oqs; // redirect	
			} 
			
		},
		hide_callback : function(){
			this.popup_container.remove();
			this.popup_container = null;
		}
	}),
	
	// Search Preferences
	'#popup-search-preferences.' : Popup('/xpl/mwPreferences.jsp', {
		show_callback : function() { 
		new UserPreferences();
			
		},
		
		form_onsuccess_callback : function(transport) {

			var json = transport.responseText.evalJSON();
	 		if (!json.validates){
	 			var alert_message = new Element("p", { "class" : "validation-failed validation-advice", "style" : "padding: .5em;margin-top:1em;" });
	 		} else {
	 			var alert_message = new Element("p", { "class" : "validation-advice" });
	 		}
	 		alert_message.update(json.message);
	 		if($("SearchBarWrapper"))
	 		{
	 			$("SearchBarWrapper").insert({ "top" : alert_message });
	 		}
	 		else
	 		{
		 		$("Body").down("div").next("div").insert({ "top" : alert_message });
	 		}

	 		new Effect.Fade(alert_message, { delay : 3 });
				
		},
	
		validate_callback : function(){ this.displayUnlessDisabled(); },
		
		hide_callback : function(){
			this.popup_container.remove();
			this.popup_container = null;
		}
	}),
	
	// Search Preferences from my settings
	'#popup-search-preferences-mysettings.' : Popup('/xpl/mwPreferences.jsp', {
		show_callback : function() { 
		new UserPreferences();
			
		},
		
		form_onsuccess_callback : function(transport) {
			var json = transport.responseText.evalJSON();
	 		if (!json.validates){
	 			var alert_message = new Element("p", { "class" : "validation-failed validation-advice", "style" : "padding: .5em;margin-top:1em;" });
	 		} else {
	 			var alert_message = new Element("p", { "class" : "validation-advice" });
	 		}
	 		alert_message.update(json.message);	 		
	 		$("Body").down("div").next("div").insert({ "top" : alert_message });
	 		new Effect.Fade(alert_message, { delay : 3 });
				
		},
	
		validate_callback : function(){ this.displayUnlessDisabled(); },
		
		hide_callback : function(){
			this.popup_container.remove();
			this.popup_container = null;
		}
	}),
	
	
	
	// Choose Sources. This is a DHTML popup and requires that the popup DIV (#choose-sources) be present in the page.
	'#popup-choose-sources' : Popup('choose-sources', {
		position : 'vertical',
		use_ajax : false
	}),
	
	// Save to Project -- on batches of search results
	'#popup-save-selections-to-project' : Popup(ASSETS_RELATIVE_PATH+'/html/save_to_project.html', {
		position : 'vertical',
		initialize_callback : function(){ this.attachCheckboxObserver('UL.Results', 'popup-save-selections-to-project', [ASSETS_RELATIVE_PATH+'/img/btn.save-to-project.gif',ASSETS_RELATIVE_PATH+'/img/btn.save-to-project.disabled.gif']); },
		validate_callback : function(){ this.displayUnlessDisabled(); }
	}),
	
	// Save to Project -- on individual search results
	'.popup-save-to-project' : Popup(ASSETS_RELATIVE_PATH+'/html/save_to_project.html', {
		show_callback : function(){ this.element.up('LI').addClassName('HoverStatic'); },
		hide_callback : function(){ this.element.up('LI').removeClassName('HoverStatic'); }
	}),
	
	// Save Document to Project -- on individual documents
	'#popup-save-document-to-project' : Popup(ASSETS_RELATIVE_PATH+'/html/save_to_project.html', {
		position : 'vertical'
	}),
	
	// Email (from tocResults page) (same as Email Selected Results, but uses a different image as per design/html)
	'#popup-email-selected' : Popup(ASSETS_RELATIVE_PATH+'/html/email_selected_results.html', { 
		position : 'vertical',
		initialize_callback : function(){ this.attachCheckboxObserver('UL.Results', 'popup-email-selected', [ASSETS_RELATIVE_PATH+'/img/btn.email.gif',ASSETS_RELATIVE_PATH+'/img/btn.email.disabled.gif']); },
		
		validate_callback : function(){ this.displayUnlessDisabled(); },
		
		show_callback : function() {
			var checkboxes = $("tocresultform").select("input[type='checkbox']");
			var checked = checkboxes.collect(function(box){ 
				return box.checked ? box.id : '' 
			});		
			$("abs_link").value =  '/xpl/abs_all.jsp?';
			$("hidden_input").value = checked.join(";");
			$("from_page").value = 'tocresult';
		},
		form_onsuccess_callback : function(transport) {
			var json = transport.responseText.evalJSON();
	 		if (!json.validates){
	 			var alert_message = new Element("p", { "class" : "validation-failed validation-advice", "style" : "padding: .5em;margin-top:1em;" });
	 		} else {
	 			var alert_message = new Element("p", { "class" : "validation-advice" });
	 		}
	 		alert_message.update(json.message);
	 		$("Body").down("div").next("div").insert({ "top" : alert_message });
	 		//$("popup-email-selected").up("div").insert({ "bottom" : alert_message });
	 		new Effect.Fade(alert_message, { delay : 3 });
	 		 //  This version of the refresh function will be invoked
	 	    //  for browsers that support JavaScript version 1.2
	 	    //  The argument to the location.reload function determines
	 	    //  if the browser should retrieve the document from the
	 	    //  web-server. 
	 		window.location.reload( false );
	 	},
	 	
	 	hide_callback : function(){
	 		this.popup_container.remove();
	 		this.popup_container = null;
	 	}
	
	}),
	
	// Email Selected Results - search results page
	'#popup-email-selected-results' : Popup(ASSETS_RELATIVE_PATH+'/html/email_selected_results.html', { 
		position : 'vertical',
		initialize_callback : function(){ this.attachCheckboxObserver('UL.Results', 'popup-email-selected-results', [ASSETS_RELATIVE_PATH+'/img/btn.email-selected-results.gif',ASSETS_RELATIVE_PATH+'/img/btn.email-selected-results.disabled.gif']); },
	
		validate_callback : function(){this.displayUnlessDisabled(); },
		
		show_callback : function() {
			var checkboxes = $("search_results_form").select("input[type='checkbox']");
			var checked = checkboxes.collect(function(box){ 
				if (box.checked){
					return box.id;
				}
				//return box.checked ? box.id : '' 
			});			
			$("hidden_input").value = checked.join(";");
			var frompage = this.element.up('LI').up('UL').down(".fromPage").innerHTML;
			$("from_page").value = frompage;
			$("abs_link").value =  '/xpl/articleDetails.jsp?navigation=no';
		},
		form_onsuccess_callback : function(transport) {
			var json = transport.responseText.evalJSON();
	 		if (!json.validates){
	 			var alert_message = new Element("p", { "class" : "validation-failed validation-advice", "style" : "padding: .5em;margin-top:1em;" });
	 		} else {
	 			var alert_message = new Element("p", { "class" : "validation-advice" });
	 		}
	 		alert_message.update(json.message);
	 		$("Body").down("div").next("div").insert({ "top" : alert_message });
	 		//$("popup-email-selected-results").up("div").insert({ "bottom" : alert_message });
	 		new Effect.Fade(alert_message, { delay : 3 });
	 	},
	 	
	 	hide_callback : function(){
	 		this.popup_container.remove();
	 		this.popup_container = null;
	 	}
	
	 	
	}),
	
	// Email Selected Results - from project or tags listing page
	'#popup-email-selected-results-myprojects' : Popup(ASSETS_RELATIVE_PATH+'/html/email_selected_results.html', { 
		position : 'vertical',
		initialize_callback : function(){ this.attachCheckboxObserver('UL.Results', 'popup-email-selected-results-myprojects', [ASSETS_RELATIVE_PATH+'/img/btn.email-selected-results.gif',ASSETS_RELATIVE_PATH+'/img/btn.email-selected-results.disabled.gif']); },
	
		validate_callback : function(){this.displayUnlessDisabled(); },
		
		show_callback : function() {
			var checkboxes = $("myprojects_results_form").select("input[type='checkbox']");
			var checked = checkboxes.collect(function(box){ 
				if (box.checked){
					return box.id;
				}
				//return box.checked ? box.id : '' 
			});			
			$("hidden_input").value = checked.join(";");
			var frompage = this.element.up('LI').up('UL').down(".fromPage").innerHTML;
			$("from_page").value = frompage;
			$("abs_link").value =  '/xpl/articleDetails.jsp?navigation=no';
		},
		form_onsuccess_callback : function(transport) {
			var json = transport.responseText.evalJSON();
	 		if (!json.validates){
	 			var alert_message = new Element("p", { "class" : "validation-failed validation-advice", "style" : "padding: .5em;margin-top:1em;" });
	 		} else {
	 			var alert_message = new Element("p", { "class" : "validation-advice" });
	 		}
	 		alert_message.update(json.message);
	 		$("Body").down("div").next("div").insert({ "top" : alert_message });
	 		//$("popup-email-selected-results").up("div").insert({ "bottom" : alert_message });
	 		new Effect.Fade(alert_message, { delay : 3 });
	 	},
	 	
	 	hide_callback : function(){
	 		this.popup_container.remove();
	 		this.popup_container = null;
	 	}
	
	 	
	}),

	
	'#popup-export-results' : Popup(ASSETS_RELATIVE_PATH+'/html/export_results.html', { 
		position : 'vertical',
	
		validate_callback : function(){this.displayUnlessDisabled(); },
		
		show_callback : function() { 
			if (!$('export-results').hasClassName('Activated')) {
				new ExportSearchResults('export-results');
				$('export-results').addClassName('Activated');
			}			
		},
		
		hide_callback : function(){	
	 		this.popup_container.remove();
	 		this.popup_container = null;
	 	}
	}),

	
	// Email Selected Notes
	'#popup-email-selected-notes' : Popup(ASSETS_RELATIVE_PATH+'/html/email_selected_notes.html', { 
		position : 'vertical',
		initialize_callback : function(){ 
			this.attachCheckboxObserver('UL.Results', 'popup-email-selected-notes',
				[ASSETS_RELATIVE_PATH+'/img/btn.email-selected-notes.gif',
				 ASSETS_RELATIVE_PATH+'/img/btn.email-selected-notes.disabled.gif']); 
			
		},
		validate_callback : function(){ this.displayUnlessDisabled(); }
	}),
	
	// Email Selected Notes -- Two different UL ID's require 2 different checkbox observers. It'd be nice to consolidate.
	'#popup-email-selected-notes-2' : Popup(ASSETS_RELATIVE_PATH+'/html/email_selected_notes.html', { 
		position : 'vertical',
		initialize_callback : function(){ this.attachCheckboxObserver('UL.listview', 'popup-email-selected-notes-2', [ASSETS_RELATIVE_PATH+'/img/btn.email-selected-notes.gif',ASSETS_RELATIVE_PATH+'/img/btn.email-selected-notes.disabled.gif']); },
		validate_callback : function(){ this.displayUnlessDisabled(); }
	}),
	
	// Email Most Popular
	'#popup-email-selected-most-popular' : Popup(ASSETS_RELATIVE_PATH+'/html/email_selected_results.html', {
		position : 'vertical',
		initialize_callback : function(){ this.attachCheckboxObserver('UL.listview', 'popup-email-selected-most-popular', [ASSETS_RELATIVE_PATH+'/img/btn.email-selected-results.gif',ASSETS_RELATIVE_PATH+'/img/btn.email-selected-results.disabled.gif']); },
		validate_callback : function(){ this.displayUnlessDisabled(); }
	}),
	
	// Email Document
	'#popup-email-document' : Popup(ASSETS_RELATIVE_PATH+'/html/email_document.html', { 
		position : 'vertical',
		
		show_callback : function() {
			var fromPage = $("popup-email-document").up("div").down("#fromPage").innerHTML;
			var recordId = $("popup-email-document").up("div").down("#recordId").innerHTML;
			recordId=j$.trim(recordId);
			if(fromPage == 'searchabstract'){
				$("abs_link").value =  '/xpl/articleDetails.jsp?navigation=no&';
				$("from_page").value = 'searchresult';
			}else if(fromPage == 'moduleabstract'){
				$("abs_link").value =  '/xpl/modulesabstract.jsp?';
			}else {
				$("abs_link").value =  '/xpl/abs_all.jsp?';
			}
			$("hidden_input").value = recordId;
		},
		
		form_onsuccess_callback : function(transport) {
			var json = transport.responseText.evalJSON();
	 		if (!json.validates){
	 			var alert_message = new Element("p", { "class" : "validation-failed validation-advice", "style" : "padding: .5em;margin-top:1em;" });
	 		} else {
	 			var alert_message = new Element("p", { "class" : "validation-advice" });
	 		}
	 		alert_message.update(json.message);
	 		$("Body").down("div").next("div").insert({ "top" : alert_message });

	 		//$("popup-email-document").up("div").insert({ "bottom" : alert_message });
	 		new Effect.Fade(alert_message, { delay : 3 });
	 	},
	 	hide_callback : function(){
	 		this.popup_container.remove();
	 		this.popup_container = null;
	 	}
	}),
	
	// Email Selected Files
	'#popup-email-selected-files' : Popup(ASSETS_RELATIVE_PATH+'/html/email_selected_files.html', { 
		position : 'vertical',
		
		initialize_callback : function(){ this.attachCheckboxObserver('UL.listview', 'popup-email-selected-files', [ASSETS_RELATIVE_PATH+'/img/btn.email-selected-files.gif',ASSETS_RELATIVE_PATH+'/img/btn.email-selected-files.disabled.gif']); },
		validate_callback : function(){ this.displayUnlessDisabled(); }
	}),	
	// Download Citations -- on myprojects results
	'#popup-download-myproject-citations' : Popup(ASSETS_RELATIVE_PATH+'/html/download_citations.html', {  // change URL
		position : 'vertical',
		initialize_callback : function(){ this.attachCheckboxObserver('UL.Results', 'popup-download-myproject-citations', [ASSETS_RELATIVE_PATH+'/img/btn-download-selected-citations.png',ASSETS_RELATIVE_PATH+'/img/btn-download-selected-citations-disabled.png']); },
	
		validate_callback : function(){this.displayUnlessDisabled(); },
		
		show_callback : function() {
			if (!$('download-citations').hasClassName('Activated')) {
				new DownloadSearchResultCitations('download-citations');
				$('download-citations').addClassName('Activated');
			}	
		},
		form_onsuccess_callback : function(transport) {
			// add form callback here
	 	},
	 	
	 	hide_callback : function(){
	 		this.popup_container.remove();
	 		this.popup_container = null;
	 	}
	
	 	
	}),
	// Download Browse Citations -- on search results
	'#popup-download-browse-citations' : Popup(ASSETS_RELATIVE_PATH+'/html/download_citations.html', { 
		position : 'vertical',
		initialize_callback : function(){ 
			this.attachCheckboxObserver('UL.Results', 'popup-download-browse-citations', 
				[ASSETS_RELATIVE_PATH+'/img/btn.dl-citations.gif',
				 ASSETS_RELATIVE_PATH+'/img/btn.dl-citations.disabled.gif']);	
		},
		
		validate_callback : function(){this.displayUnlessDisabled(); },
		
		show_callback : function() { 
			if (!$('download-citations').hasClassName('Activated')) {
				new DownloadBrowseCitations('download-citations');
				$('download-citations').addClassName('Activated');
			}			
		},
		
		hide_callback : function(){	
	 		this.popup_container.remove();
	 		this.popup_container = null;
	 	}
	}),
	
	// Download  Citations -- on search results
	'#popup-download-searchresult-citations' : Popup(ASSETS_RELATIVE_PATH+'/html/download_citations.html', { 
		position : 'vertical',
		initialize_callback : function(){ 
			this.attachCheckboxObserver('UL.Results', 'popup-download-searchresult-citations', 
				[ASSETS_RELATIVE_PATH+'/img/btn.dl-citations.gif',
				 ASSETS_RELATIVE_PATH+'/img/btn.dl-citations.disabled.gif']);	
		},
		
		validate_callback : function(){this.displayUnlessDisabled(); },
		
		show_callback : function() { 
			if (!$('download-citations').hasClassName('Activated')) {
				new DownloadSearchResultCitations('download-citations');
				$('download-citations').addClassName('Activated');
			}			
		},
		
		hide_callback : function(){	
	 		this.popup_container.remove();
	 		this.popup_container = null;
	 	}
	}),
	
	// Download Citations -- on individual ICP document
    '#popup-download-citations-icp'  : Popup(ASSETS_RELATIVE_PATH+ '/html/download_citations.html' , { 
         position : 'vertical' ,
         initialize_callback : function (){ 
         },
         show_callback : function () { 
              if  (!$( 'download-citations' ).hasClassName( 'Activated' )) {
                   new  DownloadBrowseCitations( 'download-citations' );
                   $( 'download-citations' ).addClassName( 'Activated' );
              }     
              $( "recordIds" ).value = $( 'popup-download-citations-icp' ).up( '#LayoutWrapper' ).down( '#recordId' ).innerHTML;
          },          
         hide_callback : function (){
              this.popup_container.remove();
              this.popup_container = null ;
         },
         validate_callback : function (){ this.displayUnlessDisabled(); }
    }), 
	
	
	
	// Download Most Popular Citations -- on most popular
	'#popup-download-popular-citations' : Popup(ASSETS_RELATIVE_PATH+'/html/download_citations.html', { 
		position : 'vertical',
		initialize_callback : function(){ this.attachCheckboxObserver('UL.listview', 'popup-download-popular-citations', [ASSETS_RELATIVE_PATH+'/img/btn.dl-citations.gif',ASSETS_RELATIVE_PATH+'/img/btn.dl-citations.disabled.gif']); },
		validate_callback : function(){ this.displayUnlessDisabled(); }
	}),
	
	// Download Project Citations -- on my projects
	'#popup-download-project-citations' : Popup(ASSETS_RELATIVE_PATH+'/html/download_citations.html', { 
		position : 'vertical',
		initialize_callback : function(){ this.attachCheckboxObserver('UL.listview', 'popup-download-project-citations', [ASSETS_RELATIVE_PATH+'/img/btn.dl-citations.gif',ASSETS_RELATIVE_PATH+'/img/btn.dl-citations.disabled.gif']); },
		validate_callback : function(){ this.displayUnlessDisabled(); }
	}),
	
	// Download Citations -- on individual document view
	'#popup-download-document-citations' : Popup(ASSETS_RELATIVE_PATH+'/html/download_citations.html', { 
		position : 'vertical',
		initialize_callback : function(){ 
			this.attachCheckboxObserver('UL.Results', 'popup-download-search-citations', 
				[ASSETS_RELATIVE_PATH+'/img/btn.dl-citations.gif',
				 ASSETS_RELATIVE_PATH+'/img/btn.dl-citations.disabled.gif']);	
		},
		show_callback : function() { 		
			var fromPage = $("popup-email-document").up("div").down("#fromPage").innerHTML;
			var recordId = $("popup-email-document").up("div").down("#recordId").innerHTML;
			if (!$('download-citations').hasClassName('Activated')) {
				new DownloadBrowseCitations('download-citations');
				$('download-citations').addClassName('Activated');
			}	
			recordId=j$.trim(recordId);
			$("recordIds").value = recordId;
		},		
		hide_callback : function(){	
	 		this.popup_container.remove();
	 		this.popup_container = null;
		},
		validate_callback : function(){ this.displayUnlessDisabled(); }
	}),
	
	// Narrow By Author
	'#popup-narrow-by-author' : Popup(ASSETS_RELATIVE_PATH+'/html/narrow_by_authors.html?'+"random="+ new Date().getTime(), { 
		position : 'horizontal',
		show_callback : function() { 
		var oqs = document.getElementById("oqs").value;
			if (!$('narrow-by-authors').hasClassName('Activated')) {
				new NarrowByAuthors('narrow-by-authors','asdf', oqs);
				$('narrow-by-authors').addClassName('Activated');
			}
			this.element.up('LI').addClassName('HoverStatic'); 
		},
		hide_callback : function(){ this.element.up('LI').removeClassName('HoverStatic'); }
	 }),
	// Narrow By Publication Title
	'#popup-narrow-by-pubtitle' : Popup(ASSETS_RELATIVE_PATH+'/html/narrow_by_pubtitle.html?'+ "random="+ new Date().getTime(), {
		position : 'horizontal',
		show_callback : function() {
			if (!$('narrow-by-pubtitle').hasClassName('Activated')) {
				new NarrowByPubTitle('narrow-by-pubtitle');
				$('narrow-by-pubtitle').addClassName('Activated');
			}
			this.element.up('LI').addClassName('HoverStatic'); 
		},
		hide_callback : function(){ this.element.up('LI').removeClassName('HoverStatic'); }
	}),
		
	// Narrow By Subject
	'#popup-narrow-by-subject' : Popup(ASSETS_RELATIVE_PATH+'/html/narrow_by_subject.html?'+ "random="+ new Date().getTime(), {
		position : 'horizontal',
		show_callback : function() {
			if (!$('narrow-by-subject').hasClassName('Activated')) {
				new NarrowBySubject('narrow-by-subject');
				$('narrow-by-subject').addClassName('Activated');
			}
			this.element.up('LI').addClassName('HoverStatic'); 
		},
		hide_callback : function(){ this.element.up('LI').removeClassName('HoverStatic'); }
	}),
	
	// Narrow By Affiliation
	'#popup-narrow-by-affiliation' : Popup(ASSETS_RELATIVE_PATH+'/html/narrow_by_affiliation.html?'+"random="+ new Date().getTime(), { 
		position : 'horizontal',
		show_callback : function() { 
			if (!$('narrow-by-affiliations').hasClassName('Activated')) {
				new NarrowByAffiliation('narrow-by-affiliations','asdf');
				$('narrow-by-affiliations').addClassName('Activated');
			}
			this.element.up('LI').addClassName('HoverStatic'); 
		},
		hide_callback : function(){ this.element.up('LI').removeClassName('HoverStatic'); }
	 }),
	 
	// Related Content
	'.popup-related-content' : Popup(ASSETS_RELATIVE_PATH+'/html/related_content.html'),
	
	// Narrow By Date
	'#popup-narrow-by-date' : Popup(ASSETS_RELATIVE_PATH+'/html/narrow_by_date.html?'+ "random="+ new Date().getTime(), {
		position : 'horizontal',
		show_callback : function() { 
			if (!$('narrow-by-date').hasClassName('Activated')) {
				new NarrowByDate('narrow-by-date','asdf');
				$('narrow-by-date').addClassName('Activated');
			}
			this.element.up('LI').addClassName('HoverStatic'); 
		},		
//		show_callback : function(){ this.element.up('LI').addClassName('HoverStatic'); },
		hide_callback : function(){ this.element.up('LI').removeClassName('HoverStatic'); }
	}),
	
	// Add Tags or Notes to Document
	'#popup-add-tags-or-notes' : Popup(ASSETS_RELATIVE_PATH+'/html/add_tags_or_notes.html', {
		position : 'vertical'
	}),
	
	// Adds Tags or Notes to Batch of Documents (choosing from UL.Results)
	'#popup-add-batch-tags-or-notes' : Popup(ASSETS_RELATIVE_PATH+'/html/add_tags_or_notes.html', {
		position : 'vertical',
		initialize_callback : function(){ this.attachCheckboxObserver('UL.Results', 'popup-add-batch-tags-or-notes', [ASSETS_RELATIVE_PATH+'/img/btn.add-tags-or-notes.gif',ASSETS_RELATIVE_PATH+'/img/btn.add-tags-or-notes.disabled.gif']); },
		validate_callback : function(){ this.displayUnlessDisabled(); }
	}),
	
	'#save-this-search-button' : Popup('/jsp/personalization/save_this_search.jsp?'+"&random="+ new Date().getTime(), {
				position : 'horizontal',
				show_callback : function() { 

					if (!$('save-this-search').hasClassName('Activated')) {
						new SaveSearch({});
						$('save-this-search').addClassName('Activated');
					}
				},
				
				form_onsuccess_callback : function(transport) {
					var json = transport.responseText.evalJSON();
			 		if (!json.validates){
			 			var alert_message = new Element("p", { "class" : "validation-failed validation-advice", "style" : "padding: .5em;margin-top:1em;" });
			 		} else {
			 			var alert_message = new Element("p", { "class" : "validation-advice" });
			 		}
			 		alert_message.update(json.message);
			 		$("Body").down("div").next("div").insert({ "top" : alert_message });
			 		new Effect.Fade(alert_message, { delay : 10 });
			 		
			 	   //  This version of the refresh function will be invoked
			 	    //  for browsers that support JavaScript version 1.2
			 	    //  The argument to the location.reload function determines
			 	    //  if the browser should retrieve the document from the
			 	    //  web-server. 
			 		//window.location.reload( false );

			 	},
			 	
			 	hide_callback : function(){
			 		this.popup_container.remove();
			 		this.popup_container = null;
			 	}
			
	}),
	'LI.EditSavedSearch' : Popup('/jsp/personalization/save_this_search.jsp'+"?random="+ new Date().getTime(), {
		initialize_callback : function(){
		  var id = this.element.id.replace("edit-saved-search-","");
		  this.popup_location = this.popup_location + "?" + id;
		  if($("up-email-address"))
		  {
			  this.ss_email_address=$("up-email-address").innerHTML;
		  }
		  else
		  {
			  this.ss_email_address='Not set';
		  }
         this.popup_data_tr = $("saved-search-" + id);
		  
		  this.ss_display_query = this.popup_data_tr.down(".ss_display_query").innerHTML.stripTags();
		  this.ss_title = this.popup_data_tr.down(".ss_title").innerHTML;
		  this.ss_query_str = this.popup_data_tr.down(".ss_query_str").innerHTML;
		  this.search_id = this.popup_data_tr.down(".search_id").innerHTML;
		  this.div_display_query = this.popup_data_tr.down(".div_display_query").innerHTML;
		  
		  this.ss_alert = this.popup_data_tr.down(".ss_alert").innerHTML;
		  
	},
	form_onsuccess_callback : function(transport) {
		
		var json = transport.responseText.evalJSON();
		
 		if (!json.validates){
 			var alert_message = new Element("p", { "class" : "validation-eror" }).update(json.message);
 		} else {
 			var alert_message = new Element("p", { "class" : "validation-advice" }).update(json.message);
 		}
 		
 		if (json.ID){
 			this.popup_data_tr = $("saved-search-" + json.ID);
 			
 			if (json.queryTitle){ 		
 				this.popup_data_tr.down("td").down(".ss_title").innerHTML = json.queryTitle;
 			} 			
 			var alertElement = this.popup_data_tr.down(0).next("td",2).down("ul").down("li").next("li",2);
 			if (json.alert == 'on'){
 				this.popup_data_tr.down("td").down(".ss_alert").innerHTML = 'Y'; 	 				
 				alertElement.replace('<a href="/search/noAlert?searchID='+json.ID+ '"> Remove Alert </a>');
			} 
 			else {
 				this.popup_data_tr.down("td").down(".ss_alert").innerHTML = 'N'; 	 				
 				alertElement.replace('<a href="/search/setAlert?searchID='+json.ID+ '"> Set Alert </a>');
 				//this.popup_data_tr.down("ul").down("li.alert").down(".setAlert").setStyle = "display:none";	 				
 			}
 			
 		}
 		$("Body").down("div").insert({ "top" : alert_message });
 		new Effect.Fade(alert_message, { delay : 3 });

 		window.location.reload( false );
 	},
 	show_callback : function(){

 		this.popup_container.down(".ss_display_query").value = this.ss_display_query.strip(); 
 		this.popup_container.down(".div_display_query").innerHTML = this.div_display_query; 
 		this.popup_container.down(".ss_title").value = this.popup_data_tr.down(".ss_title").innerHTML;
		this.popup_container.down(".ss_qry_str").value = this.ss_query_str; 
		this.popup_container.down(".search_id").value = this.search_id; 

		this.popup_container.down(".div_email_address").innerHTML=this.ss_email_address;
		this.ss_alert = this.popup_data_tr.down(".ss_alert").innerHTML;
		

		
		if( this.ss_alert == 'Y') {
			this.popup_container.down("#ss_alerts_boolean").checked = 'checked'; 			
		} else {
			this.popup_container.down("#ss_alerts_boolean").checked = ''; 
		}
		
			
 	},
 	hide_callback : function(){	
		if(this.popup_container)
		{
			this.popup_container.remove();
			this.popup_container = null;
		} 		
	}
	}),
		
	'#set-alert-on-this-search' : Popup(ASSETS_RELATIVE_PATH+'/html/saved_search.html'),
	
	'#search-tips-popup' : Popup('/xpl/cmsSearchTips.jsp',{show_callback : function(){	
		
		
		var popUp = this;
		j$('#search-tips-popup_container span.close-popup')
			.attr('tabindex','1')
			.focus()
			.keydown(function(e){
			
			});
		
		
	}})
});


//===========================================================================
//SaveSearch.js

var SaveSearch = Class.create(PageWidget, {
	initialize : function(config){
		this.setOptions(config);
		this.results_header = $("results-hdr");
		this.div_display_query = '';
		if (this.results_header) {
			var chunks = this.results_header.select(".refinement");
			chunks = chunks.collect(function(i) { return i.innerHTML.stripTags(); });
			chunks.each(function(chunk){
				this.div_display_query = this.div_display_query.concat("<p align=\"left\">" + chunk + "<br /> </p>");
			}, this);
		}
		this.ss_display_query = ($("hiddenBreadcrumbContent").innerHTML.stripTags()).strip();
		this.ss_title= $("savedSearchTitle").value;
		this.ss_qry_str = $("oqs").value;
		this.ss_endeca_query =  ($("hiddenEndecaQuery").innerHTML.stripTags()).strip();
		this.renderLabels();
	},
	renderLabels : function(){
		var ss_title = $(this.CONFIG['ss_title']);
		var ss_display_query = $(this.CONFIG['ss_display_query']);
		var ss_qry_str = $(this.CONFIG['ss_qry_str']);
		var div_display_query = $(this.CONFIG['div_display_query']);
		var ss_endeca_query = $(this.CONFIG['ss_endeca_query']);
		if (ss_title)
			ss_title.value = this.ss_title;
		if (ss_display_query)
			ss_display_query.value = this.ss_display_query;
		if (div_display_query)
			div_display_query.innerHTML = this.div_display_query;
		if (ss_qry_str)
			ss_qry_str.value  = this.ss_qry_str;
		if (ss_endeca_query)
			ss_endeca_query.value = this.ss_endeca_query;
	}
});

SaveSearch.CONFIG = {
	wrapper_id : 'save-this-search',
	ajax_href : '/jsp/personalization/save_this_search.jsp?random='+ new Date().getTime(),
	ss_title : 'ss_title',
	ss_display_query : 'ss_display_query',
	ss_qry_str : 'ss_qry_str',
	div_display_query : 'div_display_query',
	ss_endeca_query : 'ss_endeca_query',
	ss_email_address:'ss_email_address'
};

//===========================================================================
//DownloadBrowseCitations.js
var DownloadBrowseCitations = Class.create(PageWidget, {
	initialize : function(wrapper_target,config){
	this.setOptions(config);
	this.node = $(wrapper_target);
	this.fetchUserPref();
	},
	
	fetchUserPref : function(){
		new Ajax.Request(this.CONFIG['ajax_href'], {
			method : 'get',
			evalJSON : 'force',
			onSuccess : this.fetchSuccessHandler.bind(this),
			onFailure : this.fetchFailureHandler.bind(this)
		});
	},
	
	fetchFailureHandler : function(transport){
		$(this.CONFIG['wrapper_id']).setStyle({ display : 'none' });
	},
	
	fetchSuccessHandler : function(transport){
		var json = transport.responseText.evalJSON();		
		this.DL_Format = json.DL_Format;
		this.CIT_Format = json.CIT_Format;		
		this.renderLabels();		
	},
	
	renderLabels : function(){
		//var DL_Format = $(this.CONFIG['DL_Format']);
		//var CIT_Format = $(this.CONFIG['CIT_Format']);
		if( this.CIT_Format == '1') {
			this.node.down("#citation-only").checked = 'checked'; 
		} else if( this.CIT_Format == '2') {			
			this.node.down("#citation-abstract").checked = 'checked'; 
		}  else {			
			this.node.down("#citation-only").checked = 'checked'; 
		}
 		
 		if(this.DL_Format == '1') {
 			this.node.down("#download-ascii").checked = 'checked'; 
 		} 
 		else if (this.DL_Format == '2'){
 			this.node.down("#download-bibtex").checked = 'checked'; 
 		}
 		else if (this.DL_Format == '3') {
 			this.node.down("#download-refworks").checked = 'checked'; 
 		}
 		else if (this.DL_Format == '4'){
 			this.node.down("#download-endnote-procite-refman").checked = 'checked'; 
 		}
 		else {
 			this.node.down("#download-ascii").checked = 'checked'; 
 		}
		var popup_holder = this.node.up("div").id;
		if (popup_holder == 'popup-download-browse-citations_container'){
			var checkboxes = $("tocresultform").select("input[type='checkbox']");
			var checked = checkboxes.collect(function(box){ 
				return box.checked ? box.id : '' 
			});			
			$("recordIds").value = checked.join(' ').strip().gsub(' ', ',');
			//$("from_page").value = 'tocresultform';
		} else {
			var fromPage = $("popup-email-document").up("div").down("#fromPage").innerHTML;
			var recordId = $("popup-email-document").up("div").down("#recordId").innerHTML;
			recordId=j$.trim(recordId);
			$("recordIds").value = recordId;
			//$("from_page").value = fromPage;
		}
		
	}
	
});

DownloadBrowseCitations.CONFIG = {
	wrapper_id : 'download-citations',
	ajax_href : '/jsp/personalization/userpref.jsp',	
	DL_Format : 'DL_Format',
	CIT_Format : 'CIT_Format'
};


//===========================================================================
//ExportSearchResults.js
var ExportSearchResults = Class.create(PageWidget, {
	initialize : function(wrapper_target,config){
		this.setOptions(config);
		this.resultSize = parseInt(j$(this.CONFIG['results_container']).html().split(" ")[0].trim().replace(/\,/g,''));
		this.range_end_container = j$(this.CONFIG['range_end_container']);
		this.stepInterval = this.CONFIG['stepInterval'];	
		this.resultCutOff = 2000;
		this.node = j$('#'+ wrapper_target);
		this.checked_label = this.CONFIG['checked_label'] 
		this.set_label = this.CONFIG['set_label']
		this.checked_items = j$(this.CONFIG['checked_items'] + " input:checked");
		this.checkNum_container = j$(this.CONFIG['checkedNum_container']);
		if (this.checked_items.length > 0) {
				this.showContainer("checked");
		} else{
				this.showContainer("set");
		}			
	},
	showContainer : function(container){
		if (container == "checked"){
			this.renderChecked(this.checked_items);
		} else if(container == "set"){
			this.renderSet(this.stepInterval, this.resultSize);
		}
	},
	
	toggleContainers : function(){
		this.node.find('h2').toggle();
		this.node.find('.export-container').toggle();
	},
	
	renderSet : function(si, rs){
		this.setExportParameters(this.set_label,"1");
		if (rs > this.resultCutOff){
			this.range_end_container.html(this.resultCutOff);
			rs = this.resultCutOff;
			}
			this.range_end_container.html(rs);
			this.buildSlider(si, rs);
		
	},
	
	buildSlider : function(si, rs){
		var self = this;
		j$('#result-end').html(rs);
		this.setExportParameters(this.set_label,rs);
		j$("#slider").slider({
					range: 'min',
					min: 0,
					max: rs,
					step: si,
					value: rs,
					slide: function( event, data){
						var $rEnd = j$("#range-end");
						if (data.value < 1){
							data.value = 1;
						}
						$rEnd.html(data.value);
					  self.setExportParameters(this.set_label,data.value);
					}
  });
	},
	
	
	renderChecked : function(items){
	  var self = this;
		this.toggleContainers();
		this.setARs(items);				
		this.checkNum_container.html(items.length);
		if (items.length > 1){
			this.node.find('#plural').show();
		} else {
			this.node.find('#plural').hide();
		}
		this.node.find('#switch-to-set').click(function(){
			self.toggleContainers();
			self.renderSet(self.stepInterval, self.resultSize)
		});
		
	},
	
	
	
	setARs : function(items){		
		var arNumbers = [];
		var arNum = "";  
		j$.each(items,function(k,v){
			arNum = j$(v).attr('id');
			arNumbers.push(arNum);
		});
		this.setExportParameters(this.checked_label,arNumbers.join());
	},
	
	setExportParameters : function( name, data){
		var searchString = j$('#oqs').val();
		j$('#export-param')
		.val(data + "&" + searchString)
		.attr('name', name);
	}
	
	
	
});

ExportSearchResults.CONFIG = {
	wrapper_id : 'export-results',
	stepInterval: 10,
	range_end_container: '#range-end',
	results_container: '.results-returned',
	set_container: '#set-container',
	check_container: '#checked-container',
	checked_items: '#searchresult .Results',
	checkedNum_container: '#check-num',
	checked_label: 'ar',
	set_label: 'bulkSetSize'
	
};

//===========================================================================
//DownloadSearchResultCitations.js
var DownloadSearchResultCitations = Class.create(PageWidget, {
	initialize : function(wrapper_target,config){
	this.setOptions(config);
	this.node = $(wrapper_target);
	this.fetchUserPref();
	},
	
	fetchUserPref : function(){
		new Ajax.Request('/jsp/personalization/userpref.jsp', {
			method : 'get',
			evalJSON : 'force',
			onSuccess : this.fetchSuccessHandler.bind(this),
			onFailure : this.fetchFailureHandler.bind(this)
		});
	},
	
	fetchFailureHandler : function(transport){
		$(this.CONFIG['wrapper_id']).setStyle({ display : 'none' });
	},
	
	fetchSuccessHandler : function(transport){
		var json = transport.responseText.evalJSON();
		this.DL_Format = json.DL_Format;
		this.CIT_Format = json.CIT_Format;		
		this.renderLabels();		
	},
	
	renderLabels : function(){
		//var DL_Format = $(this.CONFIG['DL_Format']);
		//var CIT_Format = $(this.CONFIG['CIT_Format']);
		if( this.CIT_Format == '1') {
			this.node.down("#citation-only").checked = 'checked'; 
		} else if( this.CIT_Format == '2') {			
			this.node.down("#citation-abstract").checked = 'checked'; 
		}  else {			
			this.node.down("#citation-only").checked = 'checked'; 
		}
		
		if(this.DL_Format == '1') {
			this.node.down("#download-ascii").checked = 'checked'; 
		} 
		else if (this.DL_Format == '2'){
			this.node.down("#download-bibtex").checked = 'checked'; 
		}
		else if (this.DL_Format == '3') {
			this.node.down("#download-refworks").checked = 'checked'; 
		}
		else if (this.DL_Format == '4'){
			this.node.down("#download-endnote-procite-refman").checked = 'checked'; 
		}
		else {
			this.node.down("#download-ascii").checked = 'checked'; 
		}
		var popup_holder = this.node.up("div").id;
		if (popup_holder == 'popup-download-searchresult-citations_container'){
			var checkboxes = $("search_results_form").select("input[type='checkbox']");
			var checked = checkboxes.collect(function(box){ 
				return box.checked ? box.id : '' 
					
			});	
			$("recordIds").value = checked.join(' ').strip().gsub(' ', ',');
			//$("from_page").value = 'tocresultform';
		} 
		else if (popup_holder == 'popup-download-myproject-citations_container'){
			var checkboxes = $("MyProjDocuments").select("input[type='checkbox']");
			var checked = checkboxes.collect(function(box){ 
				return box.checked ? box.id : '' 
					
			});	
			$("recordIds").value = checked.join(' ').strip().gsub(' ', ',');
			//$("from_page").value = 'tocresultform';
		} else {
			var fromPage = $("popup-email-document").up("div").down("#fromPage").innerHTML;
			var recordId = $("popup-email-document").up("div").down("#recordId").innerHTML;
			recordId=j$.trim(recordId);
			$("recordIds").value = recordId;
			//$("from_page").value = fromPage;
		}
		
	
		
	}
	
});

DownloadBrowseCitations.CONFIG = {
	wrapper_id : 'download-citations',
	ajax_href : '/jsp/personalization/userpref.jsp',	
	DL_Format : 'DL_Format',
	CIT_Format : 'CIT_Format'
};



//===========================================================================
//UserPreferences.js
var UserPreferences = Class.create(PageWidget, {
	initialize : function(wrapper_target,config){
	this.setOptions(config);
	this.node = $(wrapper_target);
	this.fetchUserPref();
	},
	
	fetchUserPref : function(){
		new Ajax.Request('/jsp/personalization/userpref.jsp', {
			method : 'post',
			evalJSON : 'force',
			onSuccess : this.fetchSuccessHandler.bind(this),
			onFailure : this.fetchFailureHandler.bind(this)
		});
	},
	
	fetchFailureHandler : function(transport){
		$(this.CONFIG['wrapper_id']).setStyle({ display : 'none' });
	},
	
	fetchSuccessHandler : function(transport){
		var json = transport.responseText.evalJSON();
		this.DL_Format = json.DL_Format;
		this.CIT_Format = json.CIT_Format;		
		this.Email_Format = json.EMAIL_Format;
		this.Email_Address = json.EMAIL_Addr;
		this.Sort_Type		= json.Sort_Type;
		this.ResultsPerPage = json.Result_Num;
		this.Results_Layout = json.Result_Layout;
		this.Search_Type = json.Search_Type;
		this.Return_Type = json.Return_Type;
		this.Save_History = json.Save_History;
		this.hideNonSubscribeContent = json.hideNonSubscribeContent;
		if (json.ERROR){
			$(this.CONFIG['wrapper_id']).setStyle({ display : 'none' });
			alert('Error due to session expiration. PLEASE LOGIN AGAIN');
			return;
		}
		this.renderLabels();
		
	},
	
	renderLabels : function(){
		//if (this.hideNonSubscribeContent) {
			//Bug#1184 says Search_Type for nomember and member userstypes
			//$('Search_Type').setStyle({ display : 'none' });
		//	$('Download_Options').setStyle({ display : 'none' });
		//} 
		
		if( this.CIT_Format == '1') {
			$('CIT_Format').down('#include-citation-only').checked = 'checked'; 
		} else if( this.CIT_Format == '2') {			
			$('CIT_Format').down('#include-citation-abstract').checked = 'checked'; 
		}  else {			
			$('CIT_Format').down('#include-citation-only').checked = 'checked'; 
		}
		
		if(this.DL_Format == '1') {
			$('DL_Format').down("#format-ascii").checked = 'checked'; 
		} 
		else if (this.DL_Format == '2'){
			$('DL_Format').down("#format-bibtext").checked = 'checked'; 
		}
		else if (this.DL_Format == '3') {
			$('DL_Format').down("#format-refworks").checked = 'checked'; 
		}
		else if (this.DL_Format == '4'){
			$('DL_Format').down("#format-endnote").checked = 'checked'; 
		}
		else {
			$('DL_Format').down("#format-ascii").checked = 'checked'; 
		}
	
		if(this.Email_Format == 'plaintext') {
			$('Email_Format').down("#email_format_text").checked = 'checked'; 
		} 
		else if(this.Email_Format == 'html') {
			$('Email_Format').down("#email_format_html").checked = 'checked'; 
		} 
		else  {
			$('Email_Format').down("#email_format_text").checked = 'checked'; 
		}
	
		if(this.Email_Address) {			
			$('EMAIL_ADDR').down("#email_address").value = this.Email_Address; 
		} 
		
		if(this.Results_Layout == '1') {
			$('Results_Layout').down("#layout-title").checked = 'checked'; 
		} 
		else if(this.Results_Layout == '2') {
			$('Results_Layout').down("#layout-title-citation").checked = 'checked'; 
		} 
		else if(this.Results_Layout == '3') {
			$('Results_Layout').down("#layout-title-citation-abstract").checked = 'checked'; 
		} 
		else  {
			$('Results_Layout').down("#layout-title").checked = 'checked'; 
		}
		
		if(this.Search_Type == '1') {
			$('Search_Type').down("#search-all-fields").checked = 'checked'; 
		} 
		else if(this.Search_Type == '2') {
			$('Search_Type').down("#full-text-all-fields").checked = 'checked'; 
		} 
		else  {
			$('Search_Type').down("#search-all-fields").checked = 'checked'; 
		}
	    
		if (this.Save_History == null){
			this.Save_History="Y";
		}
		$(this.Save_History == 'N' ? "save-hist-N" : "save-hist-Y").checked = true;
		
		if(this.Return_Type.match('ALL')) {	
			$('return-search').down("#return-all").checked = 'checked'; 
			$('return-search').down("#return-ieee").checked = ''; 
			$('return-search').down("#return-iet").checked = ''; 
			$('return-search').down("#return-aip").checked = ''; 
			$('return-search').down("#return-avs").checked = ''; 
		} 
		else {		
			if(this.Return_Type.indexOf('IEEE')>-1) {
				$('return-search').down("#return-ieee").checked = 'checked'; 
				$('return-search').down("#return-all").checked = '';
			}
			if(this.Return_Type.indexOf('IET')>-1) {
				$('return-search').down("#return-iet").checked = 'checked'; 
				$('return-search').down("#return-all").checked = '';
			} 
			if(this.Return_Type.indexOf('AIP')>-1) {
				$('return-search').down("#return-aip").checked = 'checked';
				$('return-search').down("#return-all").checked = '';
			} 
			if(this.Return_Type.indexOf('AVS')>-1) {
				$('return-search').down("#return-avs").checked = 'checked';
				$('return-search').down("#return-all").checked = '';
			} if(this.Return_Type.indexOf('IBM')>-1) {
				$('return-search').down("#return-ibm").checked = 'checked';
				$('return-search').down("#return-all").checked = '';
			} if(this.Return_Type.indexOf('VDE')>-1) {
				$('return-search').down("#return-vde").checked = 'checked';
				$('return-search').down("#return-all").checked = '';
			} if(this.Return_Type.indexOf('TUP')>-1) {
				$('return-search').down("#return-tup").checked = 'checked';
				$('return-search').down("#return-all").checked = '';
			}  if(this.Return_Type.indexOf('BIAI')>-1) {
				$('return-search').down("#return-biai").checked = 'checked';
				$('return-search').down("#return-all").checked = '';
			} 
		}
		
		
		if(this.ResultsPerPage == '10') {
			$('results_page').selectedIndex = 0;
		} 
		else if(this.ResultsPerPage == '25') {			
			$('results_page').selectedIndex = 1; 
		} 
		else if(this.ResultsPerPage == '50') {
			$('results_page').selectedIndex = 2;
		} 
		else if(this.ResultsPerPage == '100') {
			$('results_page').selectedIndex = 3;
		} 
		else {
			$('results_page').selectedIndex = 0;
		}
		
		if (this.Sort_Type == '1') {
			$('sort_by').selectedIndex = 0;
		}
		else if (this.Sort_Type == '2') {
			$('sort_by').selectedIndex = 1;
		}
		else if (this.Sort_Type == '3') {
			$('sort_by').selectedIndex = 2;
		}
		else if (this.Sort_Type == '4') {
			$('sort_by').selectedIndex = 4;
		}
		else if (this.Sort_Type == '5') {
			$('sort_by').selectedIndex = 5;
		} 
		else if (this.Sort_Type == '6') {
			$('sort_by').selectedIndex = 3;
		}
		else {
			$('sort_by').selectedIndex = 0;
		}
	}
	
});

UserPreferences.CONFIG = {
	wrapper_id : 'search-preferences',
	ajax_href : '/jsp/personalization/userpref.jsp',	
	DL_Format : 'DL_Format',
	CIT_Format : 'CIT_Format',
	Email_Format : 'Email_Format',
	Email_Address : 'Email_Address',
	Sort_Type: 'Sort_Type',
	ResultsPerPage : 'ResultsPerPage',
	Results_Layout : 'Results_Layout',
	Search_Type : 'Search_Type',
	Return_Type : 'Return_Type',
	Save_History : 'Save_History',
	hideNonSubscribeContent : 'hideNonSubscribeContent'
};


//===========================================================================

// ===========================================================================
// RelatedContent.js

var RelatedContent = Class.create(PageWidget, {
	initialize : function(wrapper, query, options){
		this.node = $(wrapper);
		if (!this.node || !query) 
			{ return; }
		this.setOptions(options);
		this.initializeListElements(query);
	},
	
	initializeListElements : function(query){
		this.reference_list = $(this.CONFIG['references_list']);
		this.citation_list = $(this.CONFIG['citations_list']);
		this.fetchReferencesAndCitations(query);
	},
	
	fetchReferencesAndCitations : function(current_document){
		new Ajax.Request(this.CONFIG['ajax_request'], {
			method : 'get',
			evalJSON : 'force',
			parameters : current_document,
			onSuccess : this.fetchSuccessHandler.bind(this),
			onFailure : this.fetchFailureHandler.bind(this)
		});
	},
	
	fetchSuccessHandler : function(transport){
		if (transport.responseJSON['title'] && transport.responseJSON['references'] && transport.responseJSON['citations']) {
			this.json_references = transport.responseJSON['references'];
			this.json_citations = transport.responseJSON['citations'];
			this.updatePageTitle(transport.responseJSON['title']);
			this.loadReferencesAndCitations();
			this.initializeScrollArrows();
			this.initializeItemHovering();
			this.initializePopupObservers();
		} else {
			this.fetchFailureHandler();
		}
	},
	
	updatePageTitle : function(title){
		var title_span = $(this.CONFIG['document_title']);
		if (title_span) { title_span.update(title); }
	},
	
	loadReferencesAndCitations : function(){
		for (x=0;x<this.json_references.length;x++){
			this.createListItem(this.json_references[x], this.reference_list, x);
		}
		for (x=0;x<this.json_citations.length;x++){
			this.createListItem(this.json_citations[x], this.citation_list, x);
		}
	},
	
	createListItem : function(node, list){
		var item = new Element('LI').update('<span>' + node.title + '</span');
		list.insert({ bottom : item });
	},
	
	fetchFailureHandler : function(transport){
		this.node.up().setStyle({ display : 'none' });
	},
	
	initializeScrollArrows : function(){
		var ref_up = $(this.CONFIG['references_up_arrow']);
		var ref_down = $(this.CONFIG['references_down_arrow']);
		var cit_up = $(this.CONFIG['citations_up_arrow']);
		var cit_down = $(this.CONFIG['citations_down_arrow']);
		if (this.json_references.length > 5) {
			ref_up.observe('mouseover', this.arrowMouseOverHandler.bindAsEventListener(this, ref_up));
			ref_down.observe('mouseout', this.arrowMouseOutHandler.bindAsEventListener(this, ref_down));
			ref_up.observe('click', this.scrollingClickHandler.bindAsEventListener(this, this.reference_list, true));
			ref_down.observe('click', this.scrollingClickHandler.bindAsEventListener(this, this.reference_list, false));
		} else {
			ref_up.addClassName('Disabled');
			ref_down.addClassName('Disabled');
		}
		if (this.json_citations.length > 5) {
			cit_up.observe('mouseover', this.arrowMouseOverHandler.bindAsEventListener(this, cit_up));
			cit_down.observe('mouseout', this.arrowMouseOutHandler.bindAsEventListener(this, cit_down));
			cit_up.observe('click', this.scrollingClickHandler.bindAsEventListener(this, this.citations_list, true));
			cit_down.observe('click', this.scrollingClickHandler.bindAsEventListener(this, this.citations_list, false));
 		} else {
			cit_up.addClassName('Disabled');
			cit_down.addClassName('Disabled');
		}
	},
	
	arrowMouseOverHandler : function(e, arrow){
		var container = arrow.up().down('UL');
		var current_scroll = container.cumulativeScrollOffset()[1];
		if (arrow.id.endsWith('up')){
			if (current_scroll == 0) { arrow.removeClassName('Hovering'); }
			else { arrow.addClassName('Hovering'); }
		} else {
			if (current_scroll == arrow.up().down('UL').getHeight()) { arrow.removeClassName('Hovering'); }
			else { arrow.addClassName('Hovering'); }
		}
	},
	
	arrowMouseOutHandler : function(e, arrow){
		arrow.removeClassName('Hovering');
	},
	
	initializeItemHovering : function(){
		this.node.select('LI').each(function(span){
			span.observe('mouseover', function(){ span.addClassName('Hover'); });
			span.observe('mouseout', function(){ span.removeClassName('Hover'); });
		});
	},

	scrollingClickHandler : function(e, list, scrolling_up){
		if (scrolling_up){
			this.scrollUp(list.up());
		} else {
			this.scrollDown(list.up());
		}
	},
	
	scrollUp : function(list){
		var current_scroll = list.cumulativeScrollOffset()[1];
		if (current_scroll == 0) { return; }
		else { list.scrollTop = (current_scroll - 76); }
	},
	
	scrollDown : function(list, scroll){
		var current_scroll = list.cumulativeScrollOffset()[1];
		if (current_scroll == list.getHeight()) { return; }
		else { list.scrollTop = (current_scroll + 76); }
	},
	
	initializePopupObservers : function(){
		this.node.select('LI SPAN').each(function(span){
			span.observe('click', this.fetchItemDetails.bindAsEventListener(this, span));
		}, this);
	},
	
	fetchItemDetails : function(e, node){
		var list_id = node.up('UL').id;
		var data_position = (node.up('LI').previousSiblings().length);
		var positioning = (list_id == this.CONFIG['references_list']) ? 'right-details' : 'left-details';
		var data = (list_id == this.CONFIG['references_list']) ? this.json_references[data_position] : this.json_citations[data_position];
		this.displayItemDetailPopup(data, positioning);
	},
	
	displayItemDetailPopup : function(data, positioning) {
		this.hideDetailPopups();
		var popup = new Element('DIV', { 'class' : 'content-details ' + positioning });
		var template = new Template('<img class="close-details" src=ASSETS_RELATIVE_PATH+"/img/btn.close.gif" alt="Close"/><h2><a href="#{data.url}">#{title}</a></h2><p class="detail">#{authors}</p><p class="detail"><a href="#{publication_url}">#{publication_title}</a>, Volume #{volume_number}, Issue #{issue_number}, #{publication_date} Page(s) #{page_numbers[0]}-#{page_numbers[1]}</p><h3><a href="#{free_preview_url}">Free Preview</a>&nbsp;|&nbsp;<a href="#{related_url}">Related</a>&nbsp;|&nbsp;<a href="#{citations_url}">Cited by #{citations_number}</a></h3><h4>Abstract</h4><p>#{abstract}</p>');
		popup.update(template.evaluate(data));
		this.node.insert({ bottom : popup }).down('.close-details').observe('click', this.hideDetailPopups.bindAsEventListener(this));
	},
	
	hideDetailPopups : function(){
		this.node.select('.content-details').invoke('remove');
	}
});

RelatedContent.CONFIG = {
	ajax_request : ASSETS_RELATIVE_PATH+'/html/related_content.json.php',
	document_title : 'article-title',
	references_list : 'references-list',
	references_up_arrow : 'buttefly-references-up',
	references_down_arrow : 'buttefly-references-down',
	citations_list : 'citations-list',
	citations_up_arrow : 'buttefly-citations-up',
	citations_down_arrow : 'buttefly-citations-down'
};

// ===========================================================================
// Revealer.js
var Revealer = Behavior.create(PageWidget, {
	initialize: function(config){		
		this.setOptions(config);
		this.nodes = {};
		this.nodes['controller'] = this.element.down(this.CONFIG['controller_class']);
		this.nodes['content'] = this.element.down(this.CONFIG['content_class']);
		if (!this.nodes['controller'] || !this.nodes['content']) {
			this.CONFIG['noRevealedContentCallback'](this);
			return;
		}
		if (this.CONFIG['hidden_by_default']) { 
			this.nodes['content'].hide();
		}
		this.initializeCallback = this.CONFIG['initialize_callback'].bind(this);
		this.controlCallback = this.CONFIG['control_callback'].bind(this);
		this.nodes['controller'].observe('click', this.revealerControlClickHandler.bindAsEventListener(this));
		this.initializeCallback();
	},
	
	revealerControlClickHandler : function(){
		this.revealOrConcealContent();
		this.controlCallback();
	},
	
	revealOrConcealContent : function() {
		if (this.CONFIG['effect']) {
			new Effect.toggle(this.nodes['content'], 'blind', this.CONFIG['effect_options']);
		} else {
			this.nodes['content'].toggle();
		}
	}
});

Revealer.CONFIG = {
	controller_class : '.RevealControl',
	content_class : '.RevealContent',
	effect : false,
	effect_options : { duration : .25 },
	hidden_by_default: true,
	initialize_callback : Prototype.emptyFunction,
	control_callback : Prototype.emptyFunction,
	noRevealedContentCallback : Prototype.emptyFunction
};

// ===========================================================================

Event.addBehavior({
	// Used for expanding/collapsing Quick Abstracts in search results
	'UL.tocResults LI.noAbstract' : Revealer({
		effect : true,
		hidden_by_default : true,
		initialize_callback : function(){
			this.nodes['controller'].writeAttribute('title', 'Click to Reveal Quick Abstract');
			this.nodes['controller'].down(0).writeAttribute('alt', 'Click to Reveal Quick Abstract');
			this.nodes['controller'].writeAttribute('href', '#');
			this.nodes['controller'].writeAttribute('onClick', 'return false;');
		},
		control_callback : function(){
			this.nodes['controller'].down(0).src = (this.nodes['content'].visible()) ? ASSETS_RELATIVE_PATH+'/img/btn.quick-abstract.collapsed.gif' : ASSETS_RELATIVE_PATH+'/img/btn.quick-abstract.expanded.gif';
			this.nodes['controller'].down(0).alt = (this.nodes['content'].visible()) ? 'Click to Reveal Quick Abstract' : 'Click to Close Quick Abstract';
			this.nodes['controller'].writeAttribute('title', (this.nodes['content'].visible()) ? 'Click to Reveal Quick Abstract' : 'Click to Close Quick Abstract');
		}
	}),
	
	'UL.tocResults LI.showAbstract' : Revealer({
			effect : false,
			hidden_by_default : false,
			initialize_callback : function(){
			this.nodes['controller'].writeAttribute('title', 'Click to Reveal Quick Abstract');
			this.nodes['controller'].down(0).writeAttribute('alt', 'Click to Reveal Quick Abstract');
			this.nodes['controller'].writeAttribute('href', '#');
			this.nodes['controller'].writeAttribute('onClick', 'return false;');
		},
		control_callback : function(){
			this.nodes['controller'].down(0).src = (this.nodes['content'].visible()) ? ASSETS_RELATIVE_PATH+'/img/btn.quick-abstract.collapsed.gif' : ASSETS_RELATIVE_PATH+'/img/btn.quick-abstract.expanded.gif';
			this.nodes['controller'].down(0).alt = (this.nodes['content'].visible()) ? 'Click to Reveal Quick Abstract' : 'Click to Close Quick Abstract';
			this.nodes['controller'].writeAttribute('title', (this.nodes['content'].visible()) ? 'Click to Reveal Quick Abstract' : 'Click to Close Quick Abstract');
		}
	}),	
	// Used for expanding/collapsing Quick Abstracts in search results
	'UL.Results LI.noAbstract' : Revealer({
		effect : true,
		hidden_by_default : true,
		initialize_callback : function(){
			this.nodes['controller'].writeAttribute('title', 'Click to Reveal Quick Abstract');
			this.nodes['controller'].down(0).writeAttribute('alt', 'Click to Reveal Quick Abstract');
			this.nodes['controller'].writeAttribute('href', '#');
			this.nodes['controller'].writeAttribute('onClick', 'return false;');
		},
		control_callback : function(){
			this.nodes['controller'].down(0).src = (this.nodes['content'].visible()) ? ASSETS_RELATIVE_PATH+'/img/btn.quick-abstract.collapsed.gif' : ASSETS_RELATIVE_PATH+'/img/btn.quick-abstract.expanded.gif';
			this.nodes['controller'].down(0).alt = (this.nodes['content'].visible()) ? 'Click to Reveal Quick Abstract' : 'Click to Close Quick Abstract';
			this.nodes['controller'].writeAttribute('title', (this.nodes['content'].visible()) ? 'Click to Reveal Quick Abstract' : 'Click to Close Quick Abstract');
		}
	}),
	
	'UL.Results LI.showAbstract' : Revealer({
			effect : false,
			hidden_by_default : false,
			initialize_callback : function(){
			this.nodes['controller'].writeAttribute('title', 'Click to Reveal Quick Abstract');
			this.nodes['controller'].down(0).writeAttribute('alt', 'Click to Reveal Quick Abstract');
			this.nodes['controller'].writeAttribute('href', '#');
			this.nodes['controller'].writeAttribute('onClick', 'return false;');
		},
		control_callback : function(){
			this.nodes['controller'].down(0).src = (this.nodes['content'].visible()) ? ASSETS_RELATIVE_PATH+'/img/btn.quick-abstract.collapsed.gif' : ASSETS_RELATIVE_PATH+'/img/btn.quick-abstract.expanded.gif';
			this.nodes['controller'].down(0).alt = (this.nodes['content'].visible()) ? 'Click to Reveal Quick Abstract' : 'Click to Close Quick Abstract';
			this.nodes['controller'].writeAttribute('title', (this.nodes['content'].visible()) ? 'Click to Reveal Quick Abstract' : 'Click to Close Quick Abstract');
		}
	}),
	
	// Used for expanding/collapsing View Details in browse results
	// Inserts an absolutely positioned link above the other orange arrow
	// and observes it for click events to make the small orange arrow
	// (which is actually just part of the background image) appear to be
	// a clickable button that expands/contracts the abstract.
	
	'UL.Browsing LI.noAbstract' : Revealer({
		effect : true,
		hidden_by_default : true,
		initialize_callback : function(){
			// Accessibility mod (MCS): Create accessibility span and store title information for the clicked element
			var accessibilitySpan = new Element('span');
			this.nodes['controller'].parentNode.insertBefore(accessibilitySpan, this.nodes['controller'].nextSibling);
			accessibilitySpan.addClassName('visuallyhidden');
			accessibilitySpan.update('Click to Reveal');

			this.nodes['controller'].writeAttribute('title', 'Click to Reveal');
			this.nodes['controller'].writeAttribute('href', '#');

			this.element.setStyle({ position: "relative" });
			var arrow = new Element("span");
			this.element.insert({ bottom : arrow });
			arrow.addClassName("ArrowToggler");
			arrow.observe("click", this.revealerControlClickHandler.bindAsEventListener(this));
		},
		control_callback : function(){
			this.nodes['controller'].src = (this.nodes['content'].visible()) ? ASSETS_RELATIVE_PATH+'/img/btn.view-details.collapsed.gif' : ASSETS_RELATIVE_PATH+'/img/btn.view-details.expanded.gif';
			this.nodes['controller'].up('.header').toggleClassName('open');
			this.nodes['controller'].title = (this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close';

			// Accessibility mod (MCS): Update accessibility span
			this.nodes['controller'].next('.visuallyhidden').update((this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close');
		},
		noRevealedContentCallback : function(scope){
			var header = scope.element.down(".header");
			if (header) {
				header.setStyle({ background : "none" });
			}
		}
	}),
	// Used for expanding/collapsing View Details in browse results
	'UL.Browsing LI.showAbstract' : Revealer({
		effect : true,
		hidden_by_default : false,
		initialize_callback : function(){
			// Accessibility mod (MCS): Create accessibility span and store title information for the clicked element
			var accessibilitySpan = new Element('span');
			this.nodes['controller'].parentNode.insertBefore(accessibilitySpan, this.nodes['controller'].nextSibling);
			accessibilitySpan.addClassName('visuallyhidden');
			accessibilitySpan.update('Click to Reveal');

			this.nodes['controller'].writeAttribute('title', 'Click to Reveal');
			this.nodes['controller'].writeAttribute('href', '#');
		},
		control_callback : function(){
			this.nodes['controller'].src = (this.nodes['content'].visible()) ? ASSETS_RELATIVE_PATH+'/img/btn.view-details.collapsed.gif' : ASSETS_RELATIVE_PATH+'/img/btn.view-details.expanded.gif';
			this.nodes['controller'].up('.header').toggleClassName('open');
			this.nodes['controller'].title = (this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close';

			// Accessibility mod (MCS): Update accessibility span
			this.nodes['controller'].next('.visuallyhidden').update((this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close');
		}
	}),	
	// Used for expanding/collapsing form blocks in advanced search 
	'DIV.advanced-search .DHTML' : Revealer({
		effect : true,
		hidden_by_default : false,
		initialize_callback : function(){
			// Accessibility mod (MCS): Create accessibility span and store title information for the clicked element
			var accessibilitySpan = new Element('span');
			this.nodes['controller'].parentNode.insertBefore(accessibilitySpan, this.nodes['controller'].nextSibling);
			accessibilitySpan.addClassName('visuallyhidden');
			accessibilitySpan.update('Click to Reveal');

			this.nodes['controller'].addClassName('link');
			this.nodes['controller'].writeAttribute('title', 'Click to Reveal');
			this.nodes['controller'].writeAttribute('href', '#');
		},
		control_callback : function(){
			this.nodes['controller'].up('.header').toggleClassName('open');
			this.nodes['controller'].title = (this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close';

			// Accessibility mod (MCS): Update accessibility span
			this.nodes['controller'].next('.visuallyhidden').update((this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close');
		}
	}),
	
	// Used for expanding/collapsing form blocks in advanced search 
	'ul.refinement LI.reveal .DHTML' : Revealer({
		effect : true,
		hidden_by_default : true,
		initialize_callback : function(){
			// Accessibility mod (MCS): Create accessibility span and store title information for the clicked element
			var accessibilitySpan = new Element('span');
			this.nodes['controller'].parentNode.insertBefore(accessibilitySpan, this.nodes['controller'].nextSibling);
			accessibilitySpan.addClassName('visuallyhidden');
			accessibilitySpan.update('Click to Reveal');

			this.nodes['controller'].addClassName('link');
			this.nodes['controller'].writeAttribute('title', 'Click to Reveal');
			this.nodes['controller'].writeAttribute('href', '#');
		},
		control_callback : function(){
			this.nodes['controller'].up('.header').toggleClassName('open');
			this.nodes['controller'].title = (this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close';

			// Accessibility mod (MCS): Update accessibility span
			this.nodes['controller'].next('.visuallyhidden').update((this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close');
		
		}
		
	}),

	// Used for expanding/collapsing more options in side column box
	//'DIV.column-side-left DIV.box .DHTML' : Revealer({
	'DIV.box .DHTML' : Revealer({ // now on the right-side for serps
		effect : true,
		hidden_by_default : true,
		initialize_callback : function(){
			// Accessibility mod (MCS): Create accessibility span and store title information for the clicked element
			var accessibilitySpan = new Element('span');
			this.nodes['controller'].parentNode.insertBefore(accessibilitySpan, this.nodes['controller'].nextSibling);
			accessibilitySpan.addClassName('visuallyhidden');
			accessibilitySpan.update('Click to Reveal');			

			this.nodes['controller'].addClassName('link');
			this.nodes['controller'].writeAttribute('title', 'Click to Reveal');
			this.nodes['controller'].writeAttribute('href', '#');
			if($('refinement-open-1')){  // expose publications year refinement
				$('refinement-open-1').addClassName('open').addClassName('link');
				//new Effect.toggle($('pub-year-header').next(), 'blind');
				$('refinement-open-1').next('div').show();
			}
			if($('refinement-open-2')){
				$('refinement-open-2').addClassName('open').addClassName('link');
				$('refinement-open-2').next('div').show();
			}
			
			if($('refinement-open-3')){
				$('refinement-open-3').addClassName('open').addClassName('link');
				$('refinement-open-3').next('div').show();
			}				
		},
		control_callback : function(){
			//this is where the IEEE Recommend triggers are occuring - BM
			this.nodes['controller'].toggleClassName('open');
			this.nodes['controller'].title = (this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close';

			// Accessibility mod (MCS): Update accessibility span
			this.nodes['controller'].next('.visuallyhidden').update((this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close');
		}
			
	}),

	// for index terms on product page when logged in
	'div#index-terms' : Revealer({ // now on the right-side for serps
		effect : false,
		hidden_by_default : true,
		initialize_callback : function(){
			// Accessibility mod (MCS): Create accessibility span and store title information for the clicked element
			var accessibilitySpan = new Element('span');
			this.nodes['controller'].parentNode.insertBefore(accessibilitySpan, this.nodes['controller'].nextSibling);
			accessibilitySpan.addClassName('visuallyhidden');
			accessibilitySpan.update('Click to Reveal');
		
			this.nodes['controller'].addClassName('link');
			this.nodes['controller'].writeAttribute('title', 'Click to Reveal');
			this.nodes['controller'].writeAttribute('href', '#');
		},
		control_callback : function(){
			//this is where the IEEE Recommend triggers are occuring - BM
			this.nodes['controller'].toggleClassName('open');
			this.nodes['controller'].title = (this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close';

			// Accessibility mod (MCS): Update accessibility span
			this.nodes['controller'].next('.visuallyhidden').update((this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close');
		}
			
	})
	
});

// ===========================================================================
// SelectAll.js

var SelectAll = Behavior.create(PageWidget, {
	initialize : function(controls, config){
		this.setOptions(config);
		this.checkbox_nodes = this.element.select('input[type="checkbox"]');
		this.controls_container = $(controls);
		if (this.checkbox_nodes.size() < 1 || !this.controls_container)
			{ return; }
		this.select_all_node = this.controls_container.down('.' + this.CONFIG['select_class']);
		this.deselect_all_node = this.controls_container.down('.' + this.CONFIG['deselect_class']);
		if (this.select_all_node && this.deselect_all_node) {
			this.select_all_node.observe('click', this.toggleAllSelections.bindAsEventListener(this, 'checked'));
			this.deselect_all_node.observe('click', this.toggleAllSelections.bindAsEventListener(this, ''));
			this.controls_container.setStyle({ 'display' : 'block' });
		}
	},
	toggleAllSelections : function(event, state) {
		this.checkbox_nodes.each(function(checkbox){
			checkbox.checked = state;
		});
	}
});

SelectAll.CONFIG = {
	select_class : 'SelectAll',
	deselect_class : 'DeSelectAll'
};

// ===========================================================================

Event.addBehavior({
	// For selecting all search results.
 	'UL.Results' : SelectAll('toggle-all-checkboxes')
});


Event.addBehavior({
	// For selecting all popular results.
	'UL.listview' : SelectAll('toggle-all-checkboxes')
});

Event.addBehavior({
	// for new SERP with 2 select all checkboxes (top and bottom of results
	'UL.Results' : SelectAll('toggle-all-checkboxes-bottom')
});



// ===========================================================================
// SelectObserver.js

var SelectObserver = Behavior.create({
	initialize : function(){
		this.select_fieldset = this.element.up('FIELDSET');
		this.select_form = this.select_fieldset.up('FORM');
		if (!this.select_fieldset || !this.select_form)
			{ return; }
		this.select_fieldset.down('INPUT').setStyle({ display : 'none' });
		this.element.observe('change', this.selectChangeHandler.bindAsEventListener(this));
	},
	selectChangeHandler : function(){
		this.select_form.submit();
	}
});

Event.addBehavior({
	
	// Used on the Sort By SELECT for search results. 
	'#search-results-sort-by' : SelectObserver
	
});

// ===========================================================================
// TabSet.js

var TabSet = Behavior.create(PageWidget, {
	initialize : function(config) {
		// apply the config
		this.setOptions(config);

		// bail out if we're dealing with static tabs
		if (this.element.hasClassName(this.CONFIG['static_class'])) { return; }

		// holds an array of all the tabs
		this.tabs = [];

		// loop over the anchors in the tabnav; create a new tab and store it in order
		this.element.select(this.CONFIG['tab_selector']).each(function(anchor, index){
			this.tabs.push(new TabSet.Tab(anchor, this));
		}, this);

		// grab the desired tab name from the URL
		var thisQueryStr = window.location.search.substring(1);
		var allValues = thisQueryStr.split("&");
		var desired_tab, desired_tab_name = allValues[0];
		
		//alert(desired_tab_name);

		// activate the first tab... or the "Active" (by class or by href) tab, if there is one
		// NOTE: this has to be done in two sweeps to ensure that in case we don't 
		// match on URL, we still get a chance to match on "Active" class
		if (!desired_tab_name.blank()) {
			desired_tab = this.tabs.find(function(tab) {
				//alert(tab.element.href.getHash());
				return tab.element.href.getHash() == desired_tab_name;
			}) || this.tabs[0];
		}

		// if we didn't find the tab via the string match, try via the class name 
		// match, defaulting to the first tab
		if (!desired_tab) {
			desired_tab = this.tabs.find(function(tab){
				return tab.element.up().hasClassName('Active');
			}) || this.tabs[0];
		}
		if(desired_tab)
		{
			// activate the tab, forcing the tab to be shown
			desired_tab.activate(true);
		}
		this.initializeCallback = this.CONFIG['initialize_callback'];
		this.initializeCallback();
	}
});

TabSet.CONFIG = {
	tab_selector : ".TabNav A",
	tab_prefix : "tab_",
	active_class : "Active",
	static_class : "Static",
	initialize_callback : Prototype.emptyFunction
};


TabSet.Tab = Class.create({
	initialize : function(anchor, tab_set) {
		this.element = $(anchor);
		this.tab_set = tab_set;

		this.node_target_id = this.element.href.getHash();
		this.nav_node = this.element.up();
		this.tab_node = $(this.tab_set.CONFIG['tab_prefix'] + this.node_target_id);

		anchor.observe('click', this.handleAnchorClick.bindAsEventListener(this));
//		anchor.onclick = Prototype.False; // fix for dumb older versions of safari
	},

	handleAnchorClick : function(e) {
		e.stop();
		e.element().blur();
		this.activate();
	},
	
	activate : function(force) {
		var ACTIVE_CLASS = this.tab_set.CONFIG['active_class'];

		// bail if this tab is already active
		if (this.nav_node.hasClassName(ACTIVE_CLASS) && !force) { return; }

		// (de)activate the tabs
		this.tab_set.tabs.each(function(tab){
			if (this.node_target_id == tab.node_target_id) {
				tab.nav_node.addClassName(ACTIVE_CLASS);
				tab.tab_node.addClassName(ACTIVE_CLASS);
				tab.tab_node.show();

				// FIXME: onyl scrollTo if not within viewport
				// tab.tab_node.scrollTo();

			} else {
				tab.nav_node.removeClassName(ACTIVE_CLASS);
				tab.tab_node.removeClassName(ACTIVE_CLASS);
				tab.tab_node.hide();
			}
		}, this);
	}
});

// ===========================================================================

Event.addBehavior({
	
	// Used for the main tabs on the Homepage.
	'.tabbed-content' : TabSet({
		tab_selector : '.tab-menu LI A',
		tab_prefix : '',
		active_class : 'selected'
	}),
	
	// Used for the Highlight pagination which is inside the Highlights tab on the Homepage.
	'#highlights' : TabSet({
		tab_selector : '.pagination LI A',
		tab_prefix : '',
		active_class : 'selected',
		initialize_callback : function(){
			var footer = this.element.down('.footer');
			if (footer) { footer.setStyle({ display : 'block' }); }
		}
	})
});

// Directly taken from site.js/*************START:Higilight Rotator***********/

var SLIDE_status, SLIDE_timeout;
var SLIDE_actual = 0;
var SLIDE_speed = 8000;
var SLIDE_fade = 2;
var SLIDE_count = 0;

function SLIDE_toggle(ctl,count){
if(count)SLIDE_count=count;

if (ctl.id == "SLIDE_pause"){
	SLIDE_pause();
	ctl.id = "SLIDE_play";

} else{ 
	ctl.id = "SLIDE_pause"; 
	SLIDE_play();

	}
	
}
function SET_SLIDE_actual(currentSlide)
{
	SLIDE_actual=currentSlide;
}
function SLIDE_play(count)
{
 SLIDE_actual++;
 SLIDE_slide();
 SLIDE_status = 'SLIDE_play';
 SLIDE_timeout = setTimeout("SLIDE_play()",SLIDE_speed);
}

function SLIDE_pause()
{
 clearTimeout(SLIDE_timeout);
 SLIDE_status = 'SLIDE_pause';

} 

function SLIDE_back()
{
  clearTimeout(SLIDE_timeout);
  SLIDE_actual--;
  SLIDE_slide();
  if (SLIDE_status != 'SLIDE_pause') SLIDE_timeout = setTimeout("SLIDE_play()",SLIDE_speed);
}

function SLIDE_forward()
{
  clearTimeout(SLIDE_timeout);
  SLIDE_actual++;
  SLIDE_slide()
  if (SLIDE_status != 'SLIDE_pause') SLIDE_timeout = setTimeout("SLIDE_play()",SLIDE_speed);
}


function SLIDE_slide()
{

  if (SLIDE_actual > (SLIDE_count)) SLIDE_actual=1;
  if (SLIDE_actual < 1) SLIDE_actual = SLIDE_count;
 
  for(i=1;i<=SLIDE_count;i++)
  {

	  if(i==SLIDE_actual)
	  {
		  if (document.getElementById) 
		  {
			  document.getElementById("highlight"+i).style.display='';
			  document.getElementById("li-highlight"+i).className='selected';
		  }
		  
	  }
	  else

	  {
		if (document.getElementById) 
		{
			document.getElementById("highlight"+i).style.display='none';
			document.getElementById("li-highlight"+i).className='';
		}
	  }
  }
}

function SLIDE_speeds(SLIDE_valgt)
{
  SLIDE_speed = SLIDE_valgt.options[SLIDE_valgt.selectedIndex].value;
}
  function toggleDivVisibility(divName) 
  {
    if (document.getElementById) { // DOM3 = IE5, NS6
    
       if(document.getElementById(divName).style.display == 'block')
         document.getElementById(divName).style.display = 'none';
       else
         document.getElementById(divName).style.display = 'block';
    }
    else {
       if (document.layers) { // Netscape 4
          if(eval('document.'+divName+'.display') == 'block')
            eval('document.'+divName+'.display') = 'none';
          else
            eval('document.'+divName+'.display') = 'block';
       }
       else { // IE 4
          if(eval('document.all.'+divName+'.style.display') == 'block')
            eval('document.all.'+divName+'.style.display') = 'none';
          else
            eval('document.all.'+divName+'.style.display') = 'block';
       }
    }
  }
  Modal = {
		   submitForm:function(formName) {
			var url=$(formName).action;
			url=url+"?"+$(formName).serialize();
		    j$.colorbox({href:url,scrolling:false,opacity:0.6,overlayClose:false,close:""}); 
		    return false;    
		  },
		  show:function(url) {
		    j$.colorbox({href:url,scrolling:false,opacity:0.6,overlayClose:false,close:""});
			j$('#cboxTopRight').html('<a id="mdCloseButton" href="javascript:Modal.hide()" title="Close this window"><img src="/assets/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
			
		  },
		  showLegacyAccountTransition:function(url) {
			    j$.colorbox({href:url,scrolling:false,opacity:0.6,overlayClose:false,close:""});
			    j$('#cboxTopRight').html('<a id="mdCloseButton" href="#" title="Close this window"><img src="/assets/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
			  },
		  
		  showIframeInstSignIn:function(url) {
			    j$.colorbox({href:url,width:"680px",height:"320px",scrolling:false,iframe:true,opacity:0,overlayClose:false,close:""});
				j$('#cboxTopRight').html('<a id="mdCloseButton" href="javascript:Modal.hide()" title="Close this window"><img src="/assets/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
			  },
		  showIframeMemberSignIn:function(url) {
			   j$.colorbox({href:url,width:"730px",height:"500px",scrolling:false,iframe:true,opacity:0,overlayClose:false,close:""});
			   j$('#cboxTopRight').html('<a id="mdCloseButton" href="javascript:Modal.hide()" title="Close this window"><img src="/assets/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
		  },
		  showIframeSignOut:function(url) {
			    j$.colorbox({href:url,width:"680px",height:"420px",scrolling:false,iframe:true,opacity:0,overlayClose:false,close:""});
				j$('#cboxTopRight').html('<a id="mdCloseButton" href="javascript:Modal.hide()" title="Close this window"><img src="/assets/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
			  },

		  
		  refresh:function(url) {
		   j$.colorbox({href:url,scrolling:false,overlayClose:false,overlayClose:false,opacity:0.6}); 
		   j$('#cboxTopRight').html('<a id="mdCloseButton" href="javascript:Modal.hide()" title="Close this window"><img src="/assets/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
		  },
		  
		  refreshLegacyAccountTransition:function(url) {
			   j$.colorbox({href:url,scrolling:false,overlayClose:false,overlayClose:false,opacity:0.6}); 
			   j$('#cboxTopRight').html('<a id="mdCloseButton" href="#" title="Close this window"><img src="/assets/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
			  },
		  
		  refreshIframe:function(url) {
			   j$.colorbox({href:url,scrolling:false,iframe:true,overlayClose:false,overlayClose:false,opacity:0.6}); 
			   j$('#cboxTopRight').html('<a id="mdCloseButton" href="javascript:Modal.hide()" title="Close this window"><img src="/assets/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
			  },	  
	

		  hide:function() {
		    j$.colorbox.close();
		  },
		  
		  cancelIframe:function(){
			 parent.j$.fn.colorbox.close(); 
		  },
		  closeAndSubmitForm:function(formName){		  	
		  		var 
				$form       = j$('#' + formName),
				url         = $form.attr('action'),
				projectData = $form.serialize();
				
				j$.post(url,projectData,function(data){
					j$.colorbox({
				    	html:data,
				    	scrolling:false,
				    	opacity:0.6,
				    	overlayClose:true,
				    	close:""
			    	});		    	
				});

				
				return false;    
		  },
		  closeAndRefresh:function(){
				  j$.colorbox.remove();
				  var url = location.href;				  
				  if(url.indexOf("guesthome") > -1 && url.indexOf("signout=success") > -1) {
					  url = url.replace("\?signout=success","");
					  javascript:void(location.href=url);
				  }else
					  location.reload();
		  },
		  closeAndRedirectToUrl:function(url){
			  if (url != undefined && j$.trim(url) != '') {
				j$.colorbox.remove();
				javascript:void(location.href=url);
			  }
		 }
			  
		  
}  
  ///*************END:Higilight Rotator***********/


/******************************************************************
Expand Fixer for Browse Standards
*/

var fixExpander = (function(){
	var init = function(){
		var obj = {},
		argument =  [],
		arguments = [],
		url = location.search.slice(1),
		contentContainer = '',
		pkgPicker = ['4','2','3','empty'];		
		arguments = url.split('&');
		arguments.map(function(val){
			argument = val.split('=');		
			obj[argument[0]] = argument[1];		
		});
		contentContainer = pkgPicker.indexOf(obj.pkg)		
		if (contentContainer >= 0){
			j$('#browse-title-hdr .RevealContent:nth('+ contentContainer+ ')')
				.delay(1000).slideDown()
				.parents('.box').find('.RevealControl')
				.attr('title','Click to Close')
				.addClass('open');		
		}
	};

	return{
		init:init


	}



})();	
function a_authenticateUserByJsonp(singleSignOnUserName,singleSignOnPassword){
 a_authenticateUser(singleSignOnUserName,singleSignOnPassword);
}

/* IMPORTANT FOR PREVENT CONFLICT WITH PROTOTYPE LIBRARY */
if(!j$) var j$ = jQuery.noConflict();
/* ------- */


function _void() {
  return;
}

Prototype.Browser.IE6 = Prototype.Browser.IE && parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5)) == 6;

var iFrame = new Element('iframe').setStyle({'display':'none','height':'auto','width':'auto','z-index':'9','position':'relative'}).writeAttribute({'id':'iFrameFix'});



hoverOptionsClass = {
 swipe:function(obj,down) {    
    if(down) {
      new Effect.BlindDown(obj, { duration: .3 });
    } else {
      new Effect.BlindUp(obj, { duration: .3 });
    }
 },

 init:function(){ 
   
   curswipe = '';


   // --By Topic ---
   $("byTopicLink").observe('click', function(event){
      if($(curswipe)){
	 	$(curswipe).style.display = "none";
	 }
     curswipe = 'byTopicFlyout';
	 if(Prototype.Browser.IE6){ // if IE6, add in an iFrame fix
		$('byTopicFlyoutContent').insert({'top':iFrame});
	}
     hoverOptionsClass.swipe('byTopicFlyout',"down");
   });
   $('byTopicFlyout').observe('mouseover', function(event){
	$('byTopicFlyout').style.width = "664px"; // scriptaculous is setting width:auto, splitting panel
    $('byTopicFlyout').style.display = "block";
	//$('browse-content').addClassName('Hover');
	$('browse-content').addClassName('Hover');
   });
   
   $('byTopicFlyout').observe('mouseout', function(event){ 
		// experience no longer necessary
			//if(navigator.userAgent.match(/MSIE \d\.\d+/)){ //IE fix for flickering problem.
			//	setTimeout("if($('browse-content').hasClassName('Hover')){}else{$('byTopicFlyout').setStyle({'display':'none'});}",2000);
			//}else{
			//	$('byTopicFlyout').setStyle({'display':'none'});
			//}
			
			$('browse-content').addClassName('Hover');
   });
   
   $('byTopicClose').observe('click',function(event) {
     $('byTopicFlyout').style.display = "none";
	 $('browse-content').removeClassName('Hover');
   });
	

	if($('singleSignOnFlyout')){
	   $('singleSignOnFlyout').observe('mouseover', function(event){
		 $('singleSignOnFlyout').style.display = "block";
		 $('singleSignOnFlyout').style.width="520px"; // this is to stop scriptaculous from setting width:auto - breaking FF
	   });
	}
	if($('singleSignOnClose')){
	   $('singleSignOnClose').observe('click',function(event) {
		 $('singleSignOnFlyout').style.display = "none";
	   });
	}
	
 
 }
}  // end hoverOptionsClass


Event.observe(window, 'load', hoverOptionsClass.init, false);


document.observe('dom:loaded',function(){
//Event.observe(window, 'load', function() { 
	var tt = [];
	//tt = $('browse-module').down('ul.tab-menu').childElements('li[id!=topic-tab]');
	tt = $$('#browse-module ul.tab-menu li:not(#topic-tab) a');
	// Observe clicks on our list items 

	tt.each(function(item) {
		Event.observe(item, 'click', function(event){
			$('topic-filter').show();											
		});
    });
	
	
	// close topic filter in the left-coloumn if the main content tab for 'by topic' is selected
	if($('topic-tab')){
		$('topic-tab').down('a').observe('click',function(event){
			$('topic-filter').hide();											
		});
	}
	
	
	
}); // end dom:loaded




Modal = {
 
	  show:function(url) {
	    j$.colorbox({href:url,scrolling:false,opacity:0.6,overlayClose:false,close:""});
		j$('#cboxTopRight').html('<a id="mdCloseButton" href="javascript:Modal.hide()" title="Close this window"><img src="assets/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
	  },
  
	  showLegacyAccountTransition:function(url) {
		    j$.colorbox({href:url,scrolling:false,opacity:0.6,overlayClose:false,close:""});
		    j$('#cboxTopRight').html('<a id="mdCloseButton" href="#" title="Close this window"><img src="/assets/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
	  },
	  
	  refresh:function(url) {
		   j$.colorbox({href:url,scrolling:false,overlayClose:false,opacity:0.6}); 
		   j$('#cboxTopRight').html('<a id="mdCloseButton" href="javascript:Modal.hide()" title="Close this window"><img src="/assets/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
	   },
	  
	  refreshLegacyAccountTransition:function(url) {
		   j$.colorbox({href:url,scrolling:false,overlayClose:false,opacity:0.6}); 
		   j$('#cboxTopRight').html('<a id="mdCloseButton" href="#" title="Close this window"><img src="/assets/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
		  },
  
  hide:function() {
    j$.colorbox.close();
  }
}


// ===========================================================================
// REVEALER - add to site.js

Event.addBehavior({
				  
				  
	// download Selected Citations - toc page
	'#citations-button' : Popup('/xpl/ajax/email_selected_results.html', {  // change URL
		position : 'vertical',
		initialize_callback : function(){ this.attachCheckboxObserver('UL.Results', 'citations-button', [ASSETS_RELATIVE_PATH+'/img/btn-download-selected-citations.png',ASSETS_RELATIVE_PATH+'/img/btn-download-selected-citations-disabled.png']); },
	
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
			
			// add more callback stuff here
		},
		form_onsuccess_callback : function(transport) {
			// add form callback here
	 	},
	 	
	 	hide_callback : function(){
	 		this.popup_container.remove();
	 		this.popup_container = null;
	 	}
	
	 	
	}),
	// end download selected citations

				  
				  
	// Used for expanding/collapsing View More Past Proceedings in browse results
	'.proceedings-list' : Revealer({
		
		effect : true,
		hidden_by_default : true,
		initialize_callback : function(){
			this.nodes['controller'].writeAttribute('title', 'Click to Reveal');
		},
		control_callback : function(){
			this.nodes['controller'].src = (this.nodes['content'].visible()) ? ASSETS_RELATIVE_PATH+'/img/btn.view-proceedings.collapsed.gif' : ASSETS_RELATIVE_PATH+'/img/btn.view-proceedings.expanded.gif';
			//this.nodes['controller'].up('.header').toggleClassName('open');
			this.nodes['controller'].title = (this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close';
		}
	}),
	

	'ul.Results li.noVersionDetails' : Revealer({
		effect : true,
		hidden_by_default : true,
		initialize_callback : function(){
			this.nodes['controller'].writeAttribute('title', 'Click to Reveal');
			this.nodes['controller'].writeAttribute('href', '#');
			this.nodes['controller'].writeAttribute('onClick', 'return false;');
			this.element.setStyle({ position: "relative" });
			var arrow = new Element("span");
			this.element.insert({ bottom : arrow });
			arrow.addClassName("ArrowToggler");
			arrow.observe("click", this.revealerControlClickHandler.bindAsEventListener(this));
		},
		control_callback : function(){
			this.nodes['controller'].down(0).src = (this.nodes['content'].visible()) ? ASSETS_RELATIVE_PATH+'/img/btn.view-version.collapsed.gif' : ASSETS_RELATIVE_PATH+'/img/btn.view-version.expanded.gif';
			this.nodes['controller'].up('.header').toggleClassName('open');
			this.nodes['controller'].title = (this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close';
		},
		noRevealedContentCallback : function(scope){
			var header = scope.element.down(".header");
			if (header) {
				header.setStyle({ background : "none" });
			}
		}
	}),
	// Used for expanding/collapsing View Details in browse results
	'ul.Results li.showVersionDetails' : Revealer({
		effect : true,
		hidden_by_default : false,
		initialize_callback : function(){
			this.nodes['controller'].writeAttribute('title', 'Click to Reveal');
		},
		control_callback : function(){
			this.nodes['controller'].src = (this.nodes['content'].visible()) ? ASSETS_RELATIVE_PATH+'/img/btn.view-version.collapsed.gif' : ASSETS_RELATIVE_PATH+'/img/btn.view-version.expanded.gif';
			this.nodes['controller'].up('.header').toggleClassName('open');
			this.nodes['controller'].title = (this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close';
		}
	}),
		
	'ul.Results li.noTitleHistory' : Revealer({
		effect : true,
		hidden_by_default : true,
		initialize_callback : function(){
			this.nodes['controller'].writeAttribute('title', 'Click to Reveal');
			this.element.setStyle({ position: "relative" });
			var arrow = new Element("span");
			this.element.insert({ bottom : arrow });
			arrow.addClassName("ArrowToggler");
			arrow.observe("click", this.revealerControlClickHandler.bindAsEventListener(this));
		},
		control_callback : function(){
			this.nodes['controller'].src = (this.nodes['content'].visible()) ? ASSETS_RELATIVE_PATH+'/img/btnViewTitleHistory.png' : ASSETS_RELATIVE_PATH+'/img/btnViewTitleHistory.expand.gif';
			this.nodes['controller'].up('.header').toggleClassName('open');
			this.nodes['controller'].title = (this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close';
		},
		noRevealedContentCallback : function(scope){
			var header = scope.element.down(".header");
			if (header) {
				header.setStyle({ background : "none" });
			}
		}
	}),
	// Used for expanding/collapsing View Details in browse results
	'ul.Results li.showTitleHistory' : Revealer({
		effect : true,
		hidden_by_default : false,
		initialize_callback : function(){
			this.nodes['controller'].writeAttribute('title', 'Click to Reveal');
		},
		control_callback : function(){
			this.nodes['controller'].src = (this.nodes['content'].visible()) ? ASSETS_RELATIVE_PATH+'/img/btnViewTitleHistory.png' : ASSETS_RELATIVE_PATH+'/img/btnViewTitleHistory.expand.gif';
			this.nodes['controller'].up('.header').toggleClassName('open');
			this.nodes['controller'].title = (this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close';
		}
	}),
	
	// Used for the main tabs on the Homepage.
	'#context-content' : TabSet({
		tab_selector : '.tabs li a',
		tab_prefix : '',
		active_class : 'selected'
	})
	
});

// end Event.addBehavior add to site.js

function toggleButton(buttonID) { 
	$(buttonID).setStyle({ "display" : "block" });
}



function autoCompleteSubmit(li)
	{
		if(li.id==-1)
		{
			searchByKeyword();
		}
		else
		{		
			//get li label and pass in as title
			document.getElementById("psf_pn").value=1;
			document.getElementById("psf_tarid").value=li.id;
			document.getElementById("psf_tarn").value=li.title;
			document.getElementById("psf_t").value="";
			
			submitpublicationSearchForm();
		}
}


function searchWithin() {
	 // 
 	var good_query = filterQuery("swr_query");
 	if (good_query) {
 		var swr_query = getFilteredTerms($F("swr_query"));
 	    var url_string =  '/search/freesearchresult.jsp?' + 
    	$F("oqs") +'&' + 'searchWithin'+ '=' + swr_query;
		url_string = url_string  +  '&'  + 'pageNumber' + '='+ '1'+ '&resultAction=REFINE';
    window.location = encodeURI(url_string);
    } else {
        return;
    }
 }



/** jQuery dom:load events start */
j$(document).ready(function(){

/** get the best price module - in jQuery with jQuery noConflict variable defined at top */

	j$('#product-purchase-options').delegate('a#qualify-price-ad','click',function(evt){
		var targetContainer = j$(this);
		var tPosition = j$(targetContainer).children('img').position();
		//var tPosition = j$(targetContainer).parent().position();
		var offSetLeft = -7; // if changing this value, make sure to change it in the resize call to setOverlayDimensionsToCurrentDocumentDimensions() below
		var offSetTop = -11;
		
        var top_pos;
		var left_pos;
		
		j$('#qualify-price-ad-overlay hr').remove();
		top_pos = parseInt(tPosition.top+offSetTop);
		left_pos = parseInt(tPosition.left+offSetLeft);
		j$('#qualify-price-ad-overlay .header').after('<hr />');
		j$('#qualify-price-ad-overlay').css({
			'left':left_pos + 'px',
			'top':top_pos + 'px'
		}).show();
	
		return false;
	});


/* end best price module */



/** close button for the price ad module */
	j$('#product-purchase-options').delegate('a.close-module','click',function(evt){
		j$('#qualify-price-ad-overlay').hide();
		
		evt.preventDefault();
		return false;
	});
/** end clsoe button for the price ad module */


	/** when the window is resized, move the overlays if there are any: */
	j$(window).resize(function(){
		//setOverlayDimensionsToCurrentDocumentDimensions('#qualify-price-ad-overlay','#qualify-price-ad',-7);
		
		if(j$('#qualify-price-ad').is(':visible')){
			var overlay = '#qualify-price-ad-overlay';
			var target='#qualify-price-ad';
			//var targetPosition = j$('#best-price-ad').position();
			var targetPosition = j$(target).position();
			var offSetL = -7;

			var left_pos = parseInt(targetPosition.left+offSetL);
			j$(overlay).css({'left':left_pos + 'px'});
		}
		
	});
	
	
});
/** end jQuery dom:load events */


function sendLoginRedirect() {
	var location_url = location.href;
	//location_url = location_url.replace('freesrchabstract','srchabstract');
    //var url_string = '/Xplore/login.jsp?url='+ encodeURI(location_url);
    //var url_string = '/Xplore/login.jsp?url='+ location_url;
    //By Swati, added fromgateway to the url to send it login.jsp correctly from searchabstract page
    var url_string = '/Xplore/login.jsp?url='+ location_url+'&fromGateway=true';
     
    window.location = encodeURI(url_string);
    
}




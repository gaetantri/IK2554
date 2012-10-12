/* IMPORTANT FOR PREVENT CONFLICT WITH PROTOTYPE LIBRARY */
if(!j$) var j$ = jQuery.noConflict();
/* ------- */



Prototype.Browser.IE6 = Prototype.Browser.IE && parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5)) == 6;

//var iFrame = new Element('iframe').setStyle({'display':'none','height':'auto','width':'auto','z-index':'9','position':'relative'});

function _void() {
  return;
}

SearchOptionsClass = {
 swipe:function(obj,down) {    
    if(down) {
      new Effect.BlindDown(obj, { duration: .3 });
    } else {
      new Effect.BlindUp(obj, { duration: .3 });
    }
 },

 init:function(){ 
   
   curswipe = 'searchOptions';
   
   
  	if($('moreSearchOptions')){
	$('moreSearchOptions').observe('click', function(event){
		if($(curswipe)){
			$(curswipe).style.display = "none";
		}
		$('browse-content').removeClassName('Hover');
		curswipe='searchOptions';
		SearchOptionsClass.swipe('searchOptions',"down");
		}).observe('mouseout',function(event){
			if(navigator.userAgent.match(/MSIE \d\.\d+/)){ //IE only.
			Event.stop(event);
			//$('searchOptions').style.display = "none";
			}else{
				$('searchOptions').style.display = "none";
			}
		});
		
	   $('searchOptions').observe('mouseout', function(event){
			if(navigator.userAgent.match(/MSIE \d\.\d+/)){ //IE only.
				$('searchOptions').style.display = "none";
			}else{
				$('searchOptions').style.display = "none";
			}
	   }).observe('mouseover', function(event){
		   if(navigator.userAgent.match(/MSIE \d\.\d+/)){ //IE only.
				Event.stop(event);
			}else{
				$('searchOptions').style.width = "195px";
				$('searchOptions').style.display = "block";
			}
   });
  	}
   
	if(navigator.userAgent.match(/MSIE \d\.\d+/)){ //IE only.
		$('Body').observe('mouseover',function(event){
			if($('searchOptions').getStyle('display') == 'block'){
				$('searchOptions').setStyle({'display':'none'});
				Event.stop(event);
			}
		});
   		$('searchOptions').descendants().invoke('observe','mouseover', function(event){
	   		$('searchOptions').style.width = "195px";
     		$('searchOptions').style.display = "block";
			Event.stop(event);
   		}).invoke('observe','mouseout', function(event){
	   		$('searchOptions').style.width = "195px";
     		$('searchOptions').style.display = "block";
			Event.stop(event);
   		});
	}
// MOVED JQUERY FOR THIS TO searchDropDown.jsp to centralize. - MCS   
   // -- Search dropdown hover
/*
	$('queryText').observe('keydown', function(event){
	 if($('queryText').value.length>2)
	 {
	     $(curswipe).style.display = "none";
	     curswipe = 'searchDropDown';
	     SearchOptionsClass.swipe('searchDropDown',"down");
	 }
    });
   if($('searchDropDown'))
   {
	   $('searchDropDown').observe('mouseover', function(event){
	     $('searchDropDown').style.display = "block";
	   });  
	   if($('searchDropClose'))
	   {
		   $('searchDropClose').observe('click',function(event) {
		        $('searchDropDown').style.display = "none";
		      });
	   }
   } 
*/

   // --By Topic ---
   $("byTopicLink").observe('click', function(event){
      if($(curswipe)){
	 	$(curswipe).style.display = "none";
	 }
     curswipe = 'byTopicFlyout';
     SearchOptionsClass.swipe('byTopicFlyout',"down");
   });
   $('byTopicFlyout').observe('mouseover', function(event){
	$('byTopicFlyout').style.width = "664px"; // scriptaculous is setting width:auto, splitting panel
	if(Prototype.Browser.IE6){ // if IE6, add in an iFrame fix
		$('byTopicFlyoutContent').insert({'top':iFrame});
	}
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
}  // end SearchOptionsClass


Event.observe(window, 'load', SearchOptionsClass.init, false);





Modal = {
		   submitForm:function(formName) {
			var url=$(formName).action;
			url=url+"?"+$(formName).serialize();
		    j$.colorbox({href:url,scrolling:false,opacity:0.6,overlayClose:false,close:""}); 
		    return false;    
		  },
		  show:function(url) {
		    j$.colorbox({href:url,scrolling:false,opacity:0.6,overlayClose:false,close:""});
			j$('#cboxTopRight').html('<a id="mdCloseButton" href="javascript:Modal.hide()" title="Close this window"><img src="'+ASSETS_RELATIVE_PATH+'/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
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
		  
		  submitForm:function(formName) {
			  var url=$(formName).action;
			  url=url+"?"+$(formName).serialize();
			  j$.colorbox({href:url,scrolling:false,opacity:0.6,overlayClose:false,close:""}); 
			  return false; 
		  },

		  hide:function() {
		    j$.colorbox.close();
		  },
		  showIframeInstSignIn:function(url) {
			    j$.colorbox({href:url,width:"680px",height:"420px",scrolling:false,opacity:0,overlayClose:false,close:""});
				j$('#cboxTopRight').html('<a id="mdCloseButton" href="javascript:Modal.hide()" title="Close this window"><img src="/assets/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
			  },
		 
			showIframeMemberSignIn:function(url) {
				   j$.colorbox({href:url,width:"730px",height:"500px",scrolling:false,opacity:0,overlayClose:false,close:""});
				   j$('#cboxTopRight').html('<a id="mdCloseButton" href="javascript:Modal.hide()" title="Close this window"><img src="/assets/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
			},
			
			showIframeSignOut:function(url) {
			    j$.colorbox({href:url,width:"680px",height:"420px",scrolling:false,opacity:0,overlayClose:false,close:""});
				j$('#cboxTopRight').html('<a id="mdCloseButton" href="javascript:Modal.hide()" title="Close this window"><img src="/assets/img/btnCloseModalWindow.gif" alt="Close this window" /></a>');
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
			var btnImg=this.nodes['controller'];
			if(btnImg)
			btnImg.src = (this.nodes['content'].visible()) ? ASSETS_RELATIVE_PATH+'/img/btn.view-version.collapsed.gif' : ASSETS_RELATIVE_PATH+'/img/btn.view-version.expanded.gif';
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
	
	'ul.Results li.noDetails' : Revealer({
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
			this.nodes['controller'].src = (this.nodes['content'].visible()) ? ASSETS_RELATIVE_PATH+'/img/btn.view-details.collapsed.gif' : ASSETS_RELATIVE_PATH+'/img/btn.view-details.expanded.gif';
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
	'ul.Results li.showDetails' : Revealer({
		effect : true,
		hidden_by_default : false,
		initialize_callback : function(){
			this.nodes['controller'].writeAttribute('title', 'Click to Reveal');
		},
		control_callback : function(){
			this.nodes['controller'].src = (this.nodes['content'].visible()) ? ASSETS_RELATIVE_PATH+'/img/btn.view-details.collapsed.gif' : ASSETS_RELATIVE_PATH+'/img/btn.view-details.expanded.gif';
			this.nodes['controller'].up('.header').toggleClassName('open');
			this.nodes['controller'].title = (this.nodes['content'].visible()) ? 'Click to Reveal' : 'Click to Close';
		}
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
			location.href = '/xpl/RecentIssue.jsp?punumber=' + li.id;
		}
}

function autoCompleteBookSubmit( li )
{
	if(li.id==-1)
	{
		searchByKeyword();
	}
	else
	{
		location.href = '/xpl/bkabstractplus.jsp?bkn=' + li.id;
	}
}

function autoCompleteCourseSubmit( li )
{
	if(li.id==-1)
	{
		searchByKeyword();
	}
	else
	{
		location.href = '/xpl/modulesabstract.jsp?mdnumber=' + li.id;
	}
}


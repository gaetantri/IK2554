function frameBuster(){
	if(($("#content div.bloghead")) || ($("#topleftcol div.blogCarHead"))){
		return;
	}
	 if ( top != self ){
	 	top.location.href = unescape(window.location.pathname);
	 }
}

function bookmarksite(title, url){
  ATTR_RE= /^http:\/\//gi;
  if (ATTR_RE.test(url)) url = url;
  else url = 'http://' +location.host + url;

    if (document.all) {
        window.external.AddFavorite(url, title);
    }
    else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "")
    }
}

var xmlHttp
function displayPoll() {
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete") {
		document.getElementById("list_poll").innerHTML=xmlHttp.responseText
	}
}

function GetXmlHttpObject() {
	var objXMLHttp=null
	if (window.XMLHttpRequest) {
		objXMLHttp=new XMLHttpRequest()
	} else if (window.ActiveXObject) {
		objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP")
	}
	return objXMLHttp
}

function submitPoll() {
	var count = 0;
	var parameter = "";
	xmlHttp=GetXmlHttpObject()
	if (xmlHttp==null) {
		return
	}

	for (var i = 0; i < document.zdpoll.elements.length; i++) {
		var value = "";

		if (document.zdpoll.elements[i].type == 'hidden') {
			count++;
			value = document.zdpoll.elements[i].value;
		}

		if(value != "") {
			if(count == 1)
				parameter = document.zdpoll.elements[i].name + "=" + value;
			else
				parameter = parameter + "&" + document.zdpoll.elements[i].name + "=" + encodeURI(document.zdpoll.elements[i].value);
		}
	}

	var rlen = document.zdpoll.OPTION_ID.length;
	for(var j=0; j<rlen; j++) {
		if(document.zdpoll.OPTION_ID[j].checked) {
			parameter = parameter + "&OPTION_ID=" + document.zdpoll.OPTION_ID[j].value;
		}
	}

	url = "/2007/templates/ne/common/rightcolumn_poll.htm";
	xmlHttp.onreadystatechange=displayPoll;
	xmlHttp.open("POST", url, true);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.setRequestHeader("Content-length", parameter.length);
	xmlHttp.setRequestHeader("Connection", "close");
	xmlHttp.send(parameter);
}



var functions = {
/**
*/
	'openThickBox':function(url)
	{

		tb_show('',url+'?height=635&width=635');

	},

	'facebookOn':function()
	{
		launchFaceBook();
		window.clearTimeout();
	},

	'closeThickBox':function()
	{
		tb_remove();
	},
	'showAndHideBrothers':function(id, switcherTab)
	{
		var papaLI = switcherTab.parent();
		var pepeUL = papaLI.parent();
		var toShow = $(id);
		var papa = $(id).parent();
		if(!papaLI.hasClass("selected"))
		{	//si l element est deja ouvert on fait rien
			papa.children().slideUp("fast");
			papa.children().removeClass("selected");
			toShow.removeClass("hidden");
			toShow.slideDown("fast");
			toShow.addClass("selected");

			//on selectionne l onglet donne
			pepeUL.children().removeClass("selected");
			papaLI.addClass("selected");
		}
	}

}


// Page keyword : slideUp / slideDown description marque
$(function(){
    var descHeight = $("#keywordDescription p").height();
    $("#keywordDescription p").css('height', '15px');

     $("#keywordDescription .open-close").toggle(
            function(){
                $(this).next('p').animate({height: descHeight});
                $(this).html("Refermer");
            },
             function(){
                $(this).next('p').animate({height: '15px'});
                $(this).html("Voir plus");
            }
     );

    if($.browser.msie && $.browser.version<="7.0") {

         $("#keywordDescription .open-close").toggle(
            function(){
                $(this).next('p').css('height', descHeight);
                $(this).html("Refermer");
            },
             function(){
                $(this).next('p').css('height', '15px');
                $(this).html("Voir plus");
            }
     );

    }


});


$(document).ready(function(){
	//active png fix
        $(document).pngFix();

	//init header
	$(".dropDown").each(function(){

		$(this).addClass('hidden');
		$(this).css({position:"absolute", top:"100%",left:"0"});
		$(this).parents(".dropDownTarget:eq(0)").css({position:"relative"});
		//$(this).parent().css({position:"relative"});
		$(this).parent("li").hoverIntent({
			sensitivity: 3, /* number = sensitivity threshold (must be 1 or higher)    */
			interval: 200, /* number = milliseconds for onMouseOver polling interval    */
			timeout: 500, /* number = milliseconds delay before onMouseOut    */
			over:function(){
				var dropDown = $(this).find(".dropDown");
				dropDown.removeClass("hidden");
				dropDown.slideDown();

				//$(this).find(".dropDown").removeClass("hidden");
			},
			out: function(){
				var dropDown = $(this).find(".dropDown");
				dropDown.slideUp();
				dropDown.addClass("hidden");
				//$(this).find(".dropDown").addClass("hidden");
			}
		});
	});
	$("#header .dropDown").each(function(){
		var bandeau = $("#main .aLaUne:eq(0)");
		//console.log(bandeau.length);
		if (bandeau.length>0) {
			var heightToHave = bandeau.height();//.css('height');
			if($.browser.msie && $.browser.version=="6.0") {
				// ie6
				$(this).css({height:heightToHave} );
			} else {
				$(this).css({minHeight:heightToHave} );
			}
		}
		$(this).parent("ul").bind("mouseover", function(e){
	   	 	$("#main .aLaUne:eq(0) *").css({visibility:"hidden"});


	   	 });
	   	$(this).parent("ul").bind("mouseout", function(e){
	   	 	$("#main .aLaUne:eq(0) *").css({visibility:"visible"});
	   	 });
	});


	//init footer
	$("#cnet").addClass("hidden");
	$("#bottomlinks a").bind("click", function(e){
		$("#bottomlinks a").removeClass("selected");
		$(this).addClass("selected");
      		var target = $(this).attr('href');
      		$("#bottomlinks > ul").addClass("hidden");
      		$(target).removeClass("hidden");
      		//console.log(target);
   	 });


   	 //init memberZone
   	 $("#connexionBar").css("visibility", 'visible');

   	 //mailto friend
   	 $(".mailtofriend").click(function(){
		$("#emailtoafriend").slideToggle("slow");
	});

	 //ecouter
   	 $("#ecouter a").click(function(){
		$("#storyaudio").slideToggle("slow");
	});

	 //partager video
   	 $("a#sharebtn").click(function(){
		$("#embed").slideToggle("slow");
	});

	 //embed video
   	 $("a#embedbtn").click(function(){
		$("#share").slideToggle("slow");
	});

	$("a.myJQPopup").open({
		width: 600,
		height: 300,
		scrollbars: false
	});

});
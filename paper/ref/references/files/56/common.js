function hide_broken_img (img, value) {
   img.src=value;
}

<!-- Archive -->
function displayCal(id) {
	cal = document.getElementById(id);
	if (cal.style.display == "none"){
		cal.style.display = "";
	} else {
		cal.style.display ="none";
	}
}
<!-- Archive /-->

<!--  Comments and Comment form -->
function validateCommentForm() {

	//var anonymous 	= document.getElementById("anonymous").checked;
	//var email 		= document.getElementById("comment_email");
	//var url 		= document.getElementById("comment_website");
	var comment 	= document.getElementById("comment_description");
	var blogpost_id 	= document.getElementById("blogpost_id");
	var author 		= document.getElementById("comment_fullname");
	//var title 		= document.getElementById("comment_title");

	var reply_comment_id 	= document.getElementById("reply_comment_id");

	/*
	if (!author.value && !anonymous) {
		alert("Please enter a name.");	
		return false;
	}
	*/
	/*
	if (!anonymous) {
		if (!email.value) {
			alert("Please enter an email.");	
			return false;

		} else {
			var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (!filter.test(email.value)) {
				alert("Please enter a valid email");
				return false;

			} 
		}
	}
	*/	
    
	/*
	if (!url.value && !anonymous) {
		alert("Please enter a website.");	
		return false;

	}
	*/

	// Missing Comment
	if (!comment.value) {
		alert("Please enter your comment.");	
		return false;

	}

	/*
	var verify_code = document.getElementById("VERIFY_CODE");
	if (!verify_code.value) {
		alert("Please enter the verification code as shown in the box.");	
		return false;
	}  
	*/                  

	return true;
}

function postAnonymous(post) {
	var author = document.getElementById("comment_fullname");
	var email = document.getElementById("comment_email");
	var url = document.getElementById("comment_website");
	var commentfields = document.getElementById("commentfields");
	
	if (post) {
		author.disabled = true;
		email.disabled = true;
		url.disabled = true;
		commentfields.style.display = "none";

		author.value = "";
		email.value = "";
		url.value = "";
		
	} else {
		author.disabled = false;
		email.disabled = false;
		url.disabled = false;
		commentfields.style.display = "inline";

	
	}
}

function showChildReplies(commentID) {
	var comment_replies = document.getElementById('comment_replies' + commentID);
	var display = comment_replies.style.display;
	if (display == "none") {
		comment_replies.style.display = "block";
	} else {
		comment_replies.style.display = "none";
	}
}

function postReply(reply, commentID) {

	var replydiv = document.getElementById("replydiv");
	var replyto  = document.getElementById("replyto");
	var reply_comment_id = document.getElementById("reply_comment_id");	

	if (reply == 1) {
		var authorname = document.getElementById("postauthor" + commentID).innerHTML;

		replyto.innerHTML = "<b>Replying to ";
		replyto.innerHTML += "<a href=\"#comment" + commentID + "\">" + authorname + "</a></b>";
		replydiv.style.display = "inline";

		reply_comment_id.value = commentID;
	} else {
		replydiv.style.display = "none";
		reply_comment_id.value = "";
	
	}
	
}

/* Function Ads ELU */

function fermerilu(){
	$("#lbilu").css('visibility',"visible");
	$("#expandilu").slideUp();
	$("#lbilu").slideDown();
	if(fermeriluTraffic!=undefined){
	fermeriluTraffic();
	}
	}

	function fermerpdu(){
	fermerilu();
	}
	function ouvririlu(){
	$("#expandilu").slideDown();
	$("#lbilu").slideUp();
	if(ouvririluTraffic!=undefined){
	ouvririluTraffic();
	}
	}
	function ouvrirpdu(){
	ouvririlu();
	}

<!--  Comments and Comment form /-->
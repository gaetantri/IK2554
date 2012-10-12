function setThisActive(thisItem) {
    aObj = document.getElementById('circles').getElementsByTagName('li');
    for(i=0;i<aObj.length;i++) {
        aObj[i].className = 'menuListOff';
    }
    document.getElementById(thisItem).className = 'menuListOn';
}
function selectMostDiv(myTab, myDiv) {
	//HD 193208, temporarily remove most viewed since it's broken
    var divArr = new Array('recentContent', 'emailedContent', 'commentedContent');
    var classArr = new Array('mosttabs_rcnt', 'mosttabs_email', 'mosttabs_cmmntd');
    for (var i=0; i<divArr.length; i++) {
        document.getElementById(classArr[i]).className = classArr[i];
        document.getElementById(divArr[i]).style.display = 'none';
    }
    document.getElementById(myTab).className = myTab + "On";
    document.getElementById(myDiv).style.display = 'block';
}

function applySelectedTo(myTab) {
	//HD 193208, temporarily remove most viewed since it's broken
    var classArr = new Array('mstemldhdr', 'mstcmmntdhdr');
    for (var i=0; i<classArr.length; i++) {
        document.getElementById(classArr[i]).className = classArr[i];
        document.getElementById(classArr[i]+"Txt").style.display = 'none';
    }
    document.getElementById(myTab).className = myTab + "On";
    document.getElementById(myTab).className = myTab + "On";
    document.getElementById(myTab+"Txt").style.display = 'block';
}

function MM_findObj(n, d) { //v4.01
    var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
    if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
    for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
    if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function P7_Snap() { //v2.67 by PVII
    var g,x,y,ox,bx,oy,p,tx,a,b,k,d,da,e,el,tw,q0,xx,yy,w1,pa='px',args=P7_Snap.arguments;a=parseInt(a);
    if(document.layers||window.opera){pa='';}for(k=0;k<(args.length);k+=4){
    if((g=MM_findObj(args[k]))!=null){if((el=MM_findObj(args[k+1]))!=null){
    a=parseInt(args[k+2]);b=parseInt(args[k+3]);x=0;y=0;ox=0;oy=0;p="";tx=1;
    da="document.all['"+args[k]+"']";if(document.getElementById){
    d="document.getElementsByName('"+args[k]+"')[0]";if(!eval(d)){
    d="document.getElementById('"+args[k]+"')";if(!eval(d)){d=da;}}
    }else if(document.all){d=da;}if(document.all||document.getElementById){while(tx==1){
    p+=".offsetParent";if(eval(d+p)){x+=parseInt(eval(d+p+".offsetLeft"));y+=parseInt(eval(d+p+".offsetTop"));
    }else{tx=0;}}ox=parseInt(g.offsetLeft);oy=parseInt(g.offsetTop);tw=x+ox+y+oy;
    if(tw==0||(navigator.appVersion.indexOf("MSIE 4")>-1&&navigator.appVersion.indexOf("Mac")>-1)){
    ox=0;oy=0;if(g.style.left){x=parseInt(g.style.left);y=parseInt(g.style.top);}else{
    w1=parseInt(el.style.width);bx=(a<0)?-5-w1:-10;a=(Math.abs(a)<1000)?0:a;b=(Math.abs(b)<1000)?0:b;
    x=document.body.scrollLeft+event.clientX+bx;y=document.body.scrollTop+event.clientY;}}
    }else if(document.layers){x=g.x;y=g.y;q0=document.layers,dd="";for(var s=0;s<q0.length;s++){
    dd='document.'+q0[s].name;if(eval(dd+'.document.'+args[k])){x+=eval(dd+'.left');y+=eval(dd+'.top');
    break;}}}e=(document.layers)?el:el.style;xx=parseInt(x+ox+a),yy=parseInt(y+oy+b);
    if(navigator.appVersion.indexOf("MSIE 5")>-1 && navigator.appVersion.indexOf("Mac")>-1){
    xx+=parseInt(document.body.leftMargin);yy+=parseInt(document.body.topMargin);}
    e.left=xx+pa;e.top=yy+pa;}}}
}

function MM_showHideLayers() { //v9.0
    var i,p,v,obj,args=MM_showHideLayers.arguments;
    for (i=0; i<(args.length-2); i+=3)
    with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
        if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
        obj.visibility=v; }
}


var selectedNav = '';

function turnNavOn(navItem){
//	selectedNav = navItem;
//    document.getElementById(navItem).className = "navmenuSelected";
}
function turnNavOff(navItem){
//	selectedNav = navItem;
//    document.getElementById(navItem).className = "navmenu";
}
function changeTo(navItem){
	//selectedNav = navItem;
    //alert(selectedNav);
    //document.getElementById(navItem).src = "/imgs_cntnt/"+navItem.replace(/_off\./, '_hvr.');
}

function changeBack(navItem){
    //document.getElementById(navItem).src = "/imgs_cntnt/"+navItem;
}

//calculates the width of the subchannel menu and positions it under the selected div
function setVars(channelId, subchannelId, theAmount, thePosition){
    changeTo(channelId);
    if(thePosition <= theAmount-3){
        P7_Snap(channelId, subchannelId, 0, 27);
    }else{
        console.log('finding element: ' + channelId)
        var channel_width = document.getElementById(channelId).width;
        var subchannel_width = document.getElementById(subchannelId).width;
        var new_width = channel_width-subchannel_width;
        P7_Snap(channelId, subchannelId, new_width, 27);
        //alert('thisone'+new_width);
    }
}

function setVarsforOn(theFileName, theID, theShadowID, theAmount, thePosition){
    setWidth(theID, theShadowID);
    if(thePosition <= theAmount-3){
        P7_Snap(theFileName,theID,-9,27);
    }else{
        var new_width = 0;
        var channel_width = document.getElementById(theFileName).offsetWidth;
        var subchannel_width = document.getElementById(theID).offsetWidth;
        new_width = channel_width-subchannel_width+9;
        P7_Snap(theFileName,theID,new_width,27);
        //alert('thisone'+new_width);
    }
}
// dynamic placement of 'sideAd1-c' wide ad
function showd(obj,id,div) {
    var el = document.getElementById(id);
    el.style.display = "block";
    el.style.left=zxcPos(obj)[0]+0+'px';
    el.style.top=zxcPos(obj)[1]+13+'px';

    //alert(document.getElementById('sideAd1-c').offsetHeight)
    var td = document.getElementById(id);
    if(div == 'tobsideAd' || div == 'tobsideAd2'){
        document.getElementById(div).style.height = td.offsetHeight+10+"px";
    }else{
        document.getElementById(div).style.height = td.offsetHeight+30+"px";
    }
    if(td.offsetWidth < 240){
        td.style.width = 240+"px"
        td.style.textAlign = "center";
        document.getElementById(div).style.textAlign = "center";
    }
}

function zxcPos(obj){
    var theobj = document.getElementById(obj);
    var rtn=[theobj.offsetLeft,theobj.offsetTop];
    while(theobj.offsetParent!=null){
        var objp=theobj.offsetParent;
        rtn[0]+=objp.offsetLeft-objp.scrollLeft;
        rtn[1]+=objp.offsetTop-objp.scrollTop;
        theobj=objp;
    }
    return rtn;
}
//

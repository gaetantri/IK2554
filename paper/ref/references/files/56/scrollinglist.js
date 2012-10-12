var datas = new Array();
var ScrollingList = {
	domready: function(e){
		$('.scrollingList').each(function(){
			ScrollingList.init(this);
		});
	},
	init: function(target){
		if(!target.id){
			target.id = "ScrollingList-" + Math.floor(Math.random()*10000);
		}
		//var data[target].ul=$("#"+target.id);

		this.ul = $("#"+target.id);
		var lis = $('#' + target.id+ ' li');

		//construit la structure du carrousel
		this.clip = this.ul.wrap("<div class='clip'></div>").parent();
		this.container = this.clip.wrap("<div class='scrollingListContainer'></div>").parent();
		this.buttonPrev = this.clip.before('<a href="javascript://" class="prev " style="display: block;" ></a>').prev();
		this.buttonNext = this.clip.before('<a href="javascript://" class="next " style="display: block;" ></a>').prev();

		//calcule la largeur et la hauteur d'un LI
		this.liWidth=null;
		this.liHeight=null;
            	for (var i=0; (i<lis.length)&(this.liWidth==null); i++)
            	{
            		var lii = this.ul.find('li:eq('+i+')');
            		this.liWidth= lii.width();
            		this.liHeight=lii.height();
			if(this.liWidth!=null){
				break;
			}
		}
		if(this.liWidth==null)
			this.liWidth=80;

		if(this.liHeight==null)
			this.liHeight=80;

		this.liHeight = this.liHeight+10;

		//set la largeur du scrollinglist
		this.ulWidth=(this.liWidth+4)*lis.length;
		this.ul.css("width", this.ulWidth+'px');

		//set la hauteur du scrolling List
		this.ul.css("height", this.liHeight+'px');
		this.clip.css("height", this.liHeight+'px');
		var topButtons=Math.max(0,Math.ceil((this.liHeight-69)/2));
		this.buttonPrev.css("top",topButtons+'px');
		this.buttonNext.css("top",topButtons+'px');

		//current offset = 0
		this.currentOffset=0;
		this.liCount = lis.length;
		this.visibleLis = Math.floor(this.clip.width()/this.liWidth);

		datas[''+target.id]=new Array();
		datas[''+target.id] = {
			'ul': this.ul,
			'clip': this.clip,
			'container': this.container,
			'buttonPrev': this.buttonPrev,
			'buttonNext': this.buttonNext,
			'liWidth': this.liWidth,
			'liHeight':this.liHeight,
			'ulWidth': this.ulWidth,
			'currentOffset':0,
			'liCount':this.liCount,
			'visibleLis':this.visibleLis
		};

		this.buttonPrev.bind('mouseover',{objet:target.id},function(e){
			var objet = ''+e.data.objet;
			if(datas[objet]['currentOffset'] <0)
			{
				var time = -datas[objet]['currentOffset']*300;
				datas[objet]['ul'].animate({left: "0px"}, time);
				datas[objet]['buttonPrev'].removeClass("prev-disabled");
				datas[objet]['buttonNext'].removeClass("next-disabled");

			} else {
				datas[objet]['buttonPrev'].addClass("prev-disabled");
			}
		});
		this.buttonNext.bind('mouseover',{objet:target.id},function(e){
			var objet = ''+e.data.objet;

			if(datas[objet]['visibleLis'] -datas[objet]['currentOffset'] <= datas[objet]['liCount'])
			{
				var objLeft = (-(datas[objet]['liCount']-datas[objet]['visibleLis'])*datas[objet]['liWidth'])+"px";
				var time=(datas[objet]['liCount']+datas[objet]['currentOffset']-datas[objet]['visibleLis'])*300;
				datas[objet]['ul'].animate({left: objLeft},time);
				datas[objet]['buttonNext'].removeClass("next-disabled");
				datas[objet]['buttonPrev'].removeClass("prev-disabled");
			} else{
				datas[objet]['buttonNext'].addClass("next-disabled");
			}
		});

		this.buttonPrev.bind('mouseout',{objet:target.id},function(e){
			var objet = ''+e.data.objet;
			datas[objet]['ul'].stop();
			var offset = datas[objet]['ul'].offset();
			var offsetClip = datas[objet]['clip'].offset();
			datas[objet]['currentOffset']=Math.ceil((offset.left-offsetClip.left)/datas[objet]['liWidth']);
		});
		this.buttonNext.bind('mouseout',{objet:target.id},function(e){
			var objet = ''+e.data.objet;
			datas[objet]['ul'].stop();
			var offset = datas[objet]['ul'].offset();
			var offsetClip = datas[objet]['clip'].offset();
			datas[objet]['currentOffset']=Math.ceil((offset.left-offsetClip.left)/datas[objet]['liWidth']);
		});
	}
}

$(document).ready(function(){ScrollingList.domready()});
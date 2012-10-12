
var carrouselDatas = new Array(); 

var defaultPaginationClass = "logos";

var defaultItemClass = "slide";

var defaultEventPagination = 'mouseenter';

var Carrousel = {

	showSlide : function(target, index) {

		$('#' + target.id + ' > .'+carrouselDatas[''+target.id]['paginationClass']+' li:eq('+parseInt(target.currentSlide)+')').removeClass('selected');

		$('#' + target.id + ' > .'+carrouselDatas[''+target.id]['itemClass']+'s > .'+carrouselDatas[''+target.id]['itemClass']+':eq('+parseInt(target.currentSlide)+')').fadeOut();

		$('#' + target.id + ' > .'+carrouselDatas[''+target.id]['paginationClass']+' li:eq('+index+')').addClass('selected');

		$('#' + target.id + ' > .'+carrouselDatas[''+target.id]['itemClass']+'s > .'+carrouselDatas[''+target.id]['itemClass']+':eq('+index+')').fadeIn();

		target.currentSlide = index;

	},

	

	initGeneric: function(target, itemClass, paginationClass, eventPagination){

		if(!target.id){

			target.id = "Carrousel-" + Math.floor(Math.random()*10000);

		}

		target.state = 'out';

		target.currentSlide = 0;

		carrouselDatas[''+target.id]=new Array(); 

		

		carrouselDatas[''+target.id] = {

			'timeFlip': 6000, 

			'itemClass': itemClass, 

			'paginationClass' :paginationClass,

			'eventPagination':eventPagination

		}; 

		//var timeFlip = 6000;

		target.slides = '<ul class="horizontalList clearfix '+paginationClass+'">';

		var conteneur = $("#"+target.id);

		var elements = $('#' + target.id+ ' .'+itemClass+'');

		var maxHeight=null;

		

		if($('#' + target.id).hasClass('carrouselSection'))

		{

			carrouselDatas[''+target.id]['timeFlip'] = 17000;

			//timeFlip = 12000;

			target.slides = '<ul class="horizontalList '+paginationClass+' paginationSection">';

			



		}//hauteur

			for (var i=0; i<elements .length; i++)

	            	{

	            		var lii = conteneur.find('.'+itemClass+':eq('+i+')');

	            		

	            		maxHeight=Math.max(maxHeight,lii.height()); 

				

			}

			if(maxHeight==null){

				maxHeight=160;

			}

			

		

		//definit maxHeight

		//var items = $('#' + target.id + ' > .items > .item');

		//var itemContainer = $('#' + target.id + ' > .items');

		

		//calcule la largeur et la hauteur d'une item

		var targetBlank = '';

		if($('#' + target.id).hasClass('targetBlank')) {

			targetBlank = ' target="_blank" ';

		}

		

		$('#' + target.id + ' > .'+itemClass+'s > .'+itemClass+'').each(function(i){

			//hauteur

			//maxHeight = Math.max(maxHeight,$(this).height()); 

			

			//indices ou texte

			var caption = ''+(i+1);

			var background ="";

			if($(this).attr('name'))

				caption = $(this).attr('name');

			if($(this).attr('background'))

				background = 'style="background-image: url('+$(this).attr('background')+');" ';

			if(i == target.currentSlide){

				target.slides += '<li class="selected"><a '+targetBlank +' index="' + i + '" href="' + $(this).find('a').attr('href') + '" '+background+'>' + caption + '</a></li>';

			}else{

				target.slides += '<li><a '+targetBlank +' index="' + i + '" href="' + $(this).find('a').attr('href') + '" '+background+'>' + caption + '</a></li>';

			}

			$(this).css("height", maxHeight);

			$(this).hide();



		});

		target.slides += '</ul>';

		//fixe la hauteur : 

		if($('#' + target.id).hasClass('carrouselSection'))

		{

			$('#' + target.id + ' > .'+itemClass+'s').css('height', (maxHeight+10));

		} else {

			$('#' + target.id + ' > .'+itemClass+'s').css('height', (maxHeight+0));

		}

		$('#'+target.id).append(target.slides);

			

		$('#' + target.id + ' > .'+paginationClass+' a').bind(eventPagination, function(e){

			$('#' + target.id + ' > .'+carrouselDatas[''+target.id]['paginationClass']+' li:eq('+parseInt(target.currentSlide)+')').removeClass('selected');

			$('#' + target.id + ' > .'+carrouselDatas[''+target.id]['itemClass']+'s > .'+carrouselDatas[''+target.id]['itemClass']+':eq('+parseInt(target.currentSlide)+')').fadeOut();



			$('#' + target.id + ' > .'+carrouselDatas[''+target.id]['paginationClass']+' li:eq('+parseInt($(this).attr('index'))+')').addClass('selected');

			$('#' + target.id + ' > .'+carrouselDatas[''+target.id]['itemClass']+'s > .'+carrouselDatas[''+target.id]['itemClass']+':eq('+parseInt($(this).attr('index'))+')').fadeIn();

			target.currentSlide = $(this).attr('index');

			

			if(target.state == 'out'){

				clearTimeout(target.ival);

				target.ival = setTimeout(function(){

					if((parseInt(target.currentSlide)+1) == $('#' + target.id + ' > .'+carrouselDatas[''+target.id]['paginationClass']+' li').length){

						$('#' + target.id + ' > .'+carrouselDatas[''+target.id]['paginationClass']+' li:eq(0) a').trigger(carrouselDatas[''+target.id]['eventPagination']);

					}else{

						$('#' + target.id + ' > .'+carrouselDatas[''+target.id]['paginationClass']+' li:eq('+(parseInt(target.currentSlide)+1)+') a').trigger(carrouselDatas[''+target.id]['eventPagination']);

					}

				}, carrouselDatas[''+target.id]['timeFlip'] );

			}

			return false;

		});

		$('#' + target.id).hover(

			function () {

				target.state = 'over';

				clearTimeout(target.ival);

			}, 

			function () {

				target.state = 'out';

				target.ival = setTimeout(function(){

					if((parseInt(target.currentSlide)+1) == $('#' + target.id + ' .'+carrouselDatas[''+target.id]['paginationClass']+' li').length){

						$('#' + target.id + ' > .'+carrouselDatas[''+target.id]['paginationClass']+' li:eq(0) a').trigger(carrouselDatas[''+target.id]['eventPagination']);

					}else{

						$('#' + target.id + ' > .'+carrouselDatas[''+target.id]['paginationClass']+' li:eq('+(parseInt(target.currentSlide)+1)+') a').trigger(carrouselDatas[''+target.id]['eventPagination']);

					}

				}, 6000);		

			}

		);

		$('#' + target.id + ' > .'+paginationClass+' li:eq(0) a').trigger(eventPagination);

	},

	init: function(target){

		Carrousel.initGeneric(target, defaultItemClass,defaultPaginationClass, defaultEventPagination);

	}

}


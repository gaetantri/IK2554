/*
	Coded By:       David Walsh, http://davidwalsh.name
	Last Modded:    03/06/2008
	Functionality:  This class allows for tables to be Zebra-ized, based on the class passed in.
	
*/

/* classes */
var ZebraTables = new Class({
	//initialization
	initialize: function(table_class) {
		
		//add table shading
		$$('table.' + table_class + ' tr').each(function(el,i) {
			
			//do regular shading
			var _class = i % 2 ? 'odd' : 'even'; el.addClass(_class);
			
			//do mouseover
			el.addEvent('mouseenter',function() { if(!el.hasClass('highlight')) { el.addClass('mo').removeClass(_class); } });
			
			//do mouseout
			el.addEvent('mouseleave',function() { if(!el.hasClass('highlight')) { el.removeClass('mo').addClass(_class); } });
			
			//do click
			el.addEvent('click',function() {
				//click off
				if(el.hasClass('highlight'))
				{
					el.removeClass('highlight').addClass(_class);
				}
				//clock on
				else
				{
					el.removeClass(_class).removeClass('mo').addClass('highlight');
				}
			});
			
			//highlight
			if(el.getProperty('alt') != null &&  el.getProperty('alt') == '')
			{
				el.removeClass(_class).addClass('highlight');
			}
			
		});
	}
});

/* do it! */ 

window.addEvent('domready', function() { 

  var zTables = new ZebraTables('joomlatable'); 

});
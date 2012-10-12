var Omniture = new function()
{
	
	this.clearEvents = function()
	{
		s.linkTrackEvents = 'None';
	};			
	
	this.trackSearchResult = function(search_term, page, position)
	{
		s.linkTrackVars = 'eVar41,events,products';
		var event = null;
		switch (position)
		{
			case 1:
				event = 'event40';					
			break;				
			case 2:
				event = 'event41';
			break;				
			case 3:
				event = 'event42';	
			break;				
			case 4:
				event = 'event43';	
			break;				
			default:
				event = 'event44';
			break;
		}
        if(page == 2)
        {
			event = 'event46';
		}
		else if(page >= 3)
		{
			event = 'event47';
		}
		
		s.linkTrackEvents = event;
        s.events = s.linkTrackEvents;
        s.eVar41 = search_term;
        s.products = 'sitesearch';
        this.clearEvents();
        /*return false;*/		
	}
}



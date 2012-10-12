
/** this function assumes that GA has already been run on the target page */
function trackNavigationHandler(event){
	//console.debug('tracked event: ' + event.data.action)
	_gaq.push(['_trackEvent','Navigation', 'clicked', event.data.action, 0, true]);
}
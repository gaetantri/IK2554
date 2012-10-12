/*
 * SimpleModal Contact Form
 * http://www.ericmmartin.com/projects/simplemodal/
 * http://code.google.com/p/simplemodal/
 *
 * Copyright (c) 2010 Eric Martin - http://ericmmartin.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Revision: $Id: contact.js 254 2010-07-23 05:14:44Z emartin24 $
 */

jQuery(function ($) {
	var connect = {
		container: null,
		init: function () {
			$("a.thickbox").click(function (e) {
				e.preventDefault();	
				var src= this.href;
				// load the contact form using ajax
				$.modal('<iframe src="' + src + '" height="550" width="700" style="border:0">',{
						closeHTML: "<a href='#' title='Close' class='modal-close'>Fermer</a>",
						containerCss:{
							height:400,
							padding:0,
							width:600
						},
						overlayClose:true
					});
				/*$.get(src, function(data){
					// create a modal dialog with the data
					$(data).modal('<iframe src="' + src + '" height="601" width="900" style="border:0">',{
						closeHTML: "",
						containerCss:{
							height:601,
							padding:0,
							width:900
						},
						overlayClose:true
					});
				});*/
			});
		},
		open: function (d) {
			var self = this;
			self.container = d.container[0];
			d.overlay.fadeIn('slow', function () {
				$("#simplemodal-content", self.container).show();
				var title = $("#simplemodal-title", self.container);
				title.show();
				d.container.slideDown('slow', function () {
					setTimeout(function () {
						var h = $("#simplemodal-data", self.container).height()
							+ title.height()
							+ 20; // padding
						d.container.animate(
							{height: h}, 
							200,
							function () {
								$("div.close", self.container).show();
								$("#simplemodal-data", self.container).show();
							}
						);
					}, 300);
				});
			})
		},
		close: function (d) {
			var self = this; // this = SimpleModal object
			d.container.animate(
				{top:"-" + (d.container.height() + 20)},
				500,
				function () {
					self.close(); // or $.modal.close();
				}
			);
		}
	};

	connect.init();

});
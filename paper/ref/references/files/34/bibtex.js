
/**
* BibTeX formatted bibliography display
* JavaScript for Joomla plugin
*
* @version     1.0
* @author      Levente Hunyadi
* @copyright   Copyright (C) 2009 Levente Hunyadi
* @license     GNU/GPLv3, see http://www.gnu.org/licenses/gpl-3.0.html
* @link        http://hunyadi.freehostia.com
*/

window.addEvent('domready', function () {
	$$('a.bibtexLink').each(function (obj) {
		obj.onclick = function () {
			var parent = obj.getParent();
			while (parent != null && parent.tagName.toLowerCase() != 'div') {
				parent = parent.getParent();
			}
			if (parent != null) {
				var codeblock = parent.getLast();
				codeblock.style.display = codeblock.style.display != 'block' ? 'block' : 'none';
			}
		}
	});

	$$('pre.bibtexCode').each(function (obj) {
		obj.style.display = 'none';
	});
});
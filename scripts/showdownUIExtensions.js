// LICENSE: © Jan Dittrich & Contributors, 2015, MIT License (See LICENSE.md)
// This is a showdown extension which enables adding Checkboxes  – [ ] and [x] – and Radiobuttons – ( ) and (x) – to your markdown. 

//was helpful: https://jsfiddle.net/t6f9yz7y/

showdown.extension('mdui', function() {
		'use strict';

		return [
				{
						type: 'lang',
						regex: /([\(|\[])([ |x|o])([\]|\)])/g,
						replace: function(text, firstBracket,checkedChar) {
								var type = (firstBracket==="(")?"radio":"checkbox";
								var checked = (checkedChar ===" ")?" ":"checked";
								var inputElement =  '<input type="'+type+'" '+checked+">"
								return inputElement;
						}
				}
		];
});

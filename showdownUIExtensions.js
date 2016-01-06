//helpful: https://jsfiddle.net/t6f9yz7y/

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

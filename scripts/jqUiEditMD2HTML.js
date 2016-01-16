// LICENSE: © Jan Dittrich & Contributors, 2015, MIT License (See LICENSE.md)
//This is a jqueryUI plugin for editing the HTML-element’s  text.



(function($){
	$.widget('mock.editText',{
		options:{},
		widgetEventPrefix: "inlineMDEdit",
		inputElement:null,
		_init:function(){ //init is called 1)on creation  2)each time when the plugin in called without further arguments

			if(this.element.find(".editableArea").length === 0){return;} //if the element can't be edited TODO: cleaner solution?

			//if the editable element has a markdown area, render it to the element
			var editableContent = this.element.attr("data-editable-content");


			this.$editableElement.html(this.toHTML(editableContent));

		},
		_create:function(){//create is only fired on creation. Use it to create markup and bind events
			var idNr = this.element.attr("id").split("_")[1]; //takes the part behind the "_"
			var markdownConverter = null;

			this.$editableElement = this.element.find("#"+"editableArea_"+idNr);

			this.editType = this.element.attr("data-editable-mode");

			if(this.editType==="plain"){
				this.toHTML = function(string){
					return string;}; //does nothing
			} else if (this.editType==="uielements"){
				this.toHTML = uiElementsConverter;
			} else {
				markdownConverter = new showdown.Converter({
					literalMidWordUnderscores:true,
					tables:true,
				});
				markdownConverter.useExtension("mdui");


				//without the bind, jquery object is "this", causing trouble ("Uncaught TypeError: globals.converter._dispatch is not a function")
				this.toHTML = markdownConverter.makeHtml.bind(markdownConverter);
				//mdui enables checkboxes and radio button lists in Markdown;
			}

			this._on(this.element,{"dblclick":this._goToEditMode});
		},
		_destroy:function(){//is called via an destroy event
		//remove here all additional Dom
		//and all elements which were not
		//added via this._on

		},
		_goToEditMode:function(event){
			var editableContent =  this.element.attr("data-editable-content");
			//write to edit window

			if($(event.target).closest(".mockElement")[0] !== this.element[0]){
				return;
			}

			var editablePosition = this.$editableElement.position();

			/*if(this.element.find(".editableArea").first().hasClass("editableContent-plaintext")){*/
			if(this.editType === 'plain'){
				this.inputElement = $('<input>',{
				type:"text",
				class:"plaintextinput",
				title:"plain text entry"
			});} else if (this.editType === 'uielements'){
				this.inputElement = $('<input>',{
				type:"text",
				class:"uielementsinput",
				title:"Example: Item; 2nd Item; * I'm highlighted via ›*‹ at begin"
			});} else {
				this.inputElement = $('<textarea>',{
				class:"markdowninput",
				title:"Markdown: **bold**, *italic* etc. + ( ) for radio, [ ] for checkboxes"
			});
			}

			this.inputElement.css({
				position:"absolute",
				top:parseInt(editablePosition.top)+"px",
				left:parseInt(editablePosition.left)+"px",
				width:parseInt(this.$editableElement.width())
			});

			this._on(this.inputElement,{"blur":this._leaveEditMode});
			this._off(this.element,"dblclick");

			this.
				inputElement.
				val(editableContent);

			this.
				element.
				append(this.inputElement);

			this.
				element.
				addClass("isEditing");

			this.
				inputElement.
				focus();

			this._trigger("isEditing");
		},
		_leaveEditMode:function(){
			var editableContent = this.inputElement.val(); //reads what the user wrote
			/*if(this.element.find(".editableArea").first().hasClass("editableContent-plaintext")){*/

			var html = this.toHTML(editableContent);

			 //convert to html

			//write markdown to data attribute
			this.
				element.
				attr("data-editable-content",editableContent);

			//write content
			this.
				$editableElement.
				html(html);

			this.
				element.
				removeClass("isEditing");

			this.
				inputElement.
				remove();

			this._on(this.element,{"dblclick":this._goToEditMode});

			this._trigger("leaveEditing");
		}
	});

	function uiElementsConverter(string){
		var itemsArray = string.split(/;/);
		var highlightRegex = /^\s*\*/; //if this matches, the element around this text should be emphazied
		var newString = "";
		itemsArray.forEach(function(value, index, array){
			if (value===""){
				return false;
			}
			//if the string does start with an *
			if(value.match(highlightRegex)!==null){
				//... add the class "highlighted
				newString = newString+'<li class="item-highlighted">';
				//and strip the *
				value = value.replace(highlightRegex,"");

			}else{
				newString = newString+'<li>';
			}
			//anyway, close the li
			newString = newString+value+'</li>';
		});

		return "<ul>"+newString+"</ul>";
	}

})(jQuery);

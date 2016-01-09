

(function($){
	$.widget('mock.editText',{
		options:{},
		widgetEventPrefix: "inlineMDEdit",
		inputElement:null,
		_init:function(){ //init is called 1)on creation  2)each time when the plugin in called without further arguments

			if(this.element.find(".editableArea").length === 0){return;} //if the element can't be edited TODO: cleaner solution?

			//if the editable element has a markdown area, render it to the element
			var editableContent = this.element.attr("data-editable-content");

			var editType = this.element.find(".editableArea").first().attr("data-editable-mode");

			if(editType==="plain"){
				var html = editableContent;
			} else if (editType==="uielements"){


			} else {


			}
			if(this.element.find(".editableArea").first().attr("editableContent-plaintext")){
				var html = editableContent;
			} else {
				var html = this.converter.makeHtml(editableContent);
			}

			this.$editableElement.html(html);

		},
		_create:function(){//create is only fired on creation. Use it to create markup and bind events
			if(this.element.find(".editableArea").length === 0){return;} //if the element can't be edited TODO: cleaner solution?

			//TODO:S
			this.$editableElement = this.
				element.
				find(".editableArea").
				first();

			var editType = this.element.find(".editableArea").first().attr("data-editable-mode");

			if(editType==="plain"){
				this.toHTML = function(string){return string}; //does nothing
			} else if (editType==="uielements"){
				this.toHTML = uiElementsConverter;
			} else {
				this.toHTML = new showdown.Converter({
					literalMidWordUnderscores:true,
					tables:true,
				}).useExtension("mdui").makeHtml;
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

			if(this.element.find(".editableArea").first().hasClass("editableContent-plaintext")){
				this.inputElement = $('<input type="text">',{
				class:"plaintextinput",
			});}else{
				this.inputElement = $('<textarea>',{
				class:"markdowninput",
			});
			}

			this.inputElement.css({
				position:"absolute",
				top:parseInt(editablePosition.top)+"px",
				left:parseInt(editablePosition.left)+"px"
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
			if(this.element.find(".editableArea").first().hasClass("editableContent-plaintext")){
				var html = editableContent;
			} else {
				var html = this.converter.makeHtml(editableContent);
			}

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

		var newString = ""
		itemsArray.forEach(function(value, index, array){
			//if the string does start with an *
			if(value.match(/^\s*\*/)!==null){
				//... add the class "highlighted
				newString = newString+'<li class="item-highlighted">'
			}else{
				newString = newString+'<li>'
			}

			//anyway, close the li
			newString = newString+value+'</li>'
		})

		return "<ul>"+newString+"</ul>";
	}

})(jQuery);

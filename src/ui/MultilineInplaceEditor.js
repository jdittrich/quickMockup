export default draw2d.ui.LabelInplaceEditor.extend({
    start: function(label) {
        this.label = label;

        this.commitCallback = this.commit.bind(this);

        // commit the editor if the user clicks anywhere in the document
        //
        $("body").bind("click",this.commitCallback);

        // append the input field to the document and register
        // the ENTER and ESC key to commit /cancel the operation
        //
        this.html = $('<textarea id="inplacemultilineeditor">');
        this.html.val(label.getText());
        this.html.hide();

        $("body").append(this.html);

        this.html.bind("keydown",function(e){
            if (!e.shiftKey && e.which === 13) {
                e.preventDefault()
            }
        })

        this.html.bind("keyup",function(e){
            switch (e.which) {
            case 13:
                if (!e.shiftKey) {
                    this.commit()
                }
                break;
            case 27:
                this.cancel();
                break;
           }
         }.bind(this));

         this.html.bind("blur",this.commitCallback);

         // avoid commit of the operation if we click inside the editor
         //
         this.html.bind("click",function(e){
             e.stopPropagation();
             e.preventDefault();
         });

        // Position the INPUT and init the autoresize of the element
        //
        var canvas = this.label.getCanvas();
        var bb = this.label.getBoundingBox();

        bb.setPosition(canvas.fromCanvasToDocumentCoordinate(bb.x,bb.y));

        // remove the scroll from the body if we add the canvas directly into the body
        var scrollDiv = canvas.getScrollArea();
        if(scrollDiv.is($("body"))){
           bb.translate(canvas.getScrollLeft(), canvas.getScrollTop());
        }

        bb.translate(-1,-1);
        bb.resize(3,3);

        this.html.css({position:"absolute","top": bb.y, "left":bb.x, "min-width":bb.w*(1/canvas.getZoom()), "height":bb.h*(1/canvas.getZoom())});
        this.html.fadeIn(()=>{
            this.html.focus();
            this.listener.onStart()
        });
    }
})

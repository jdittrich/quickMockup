function createSidebarElement(type, dropCallback, jquery, className) {

    var $ = jQuery;

    var sidebarElement = $("<div>")
        .text(type)
        .draggable({
            stop: dropCallback,
            helper: "clone"
        });

    return sidebarElement;
}


export default createSidebarElement

jQuery.fn.animateAuto = function(prop, speed, callback){
    var elem, height, width;
    return this.each(function(i, el){
        el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
        height = elem.css("height"),
        width = elem.css("width"),
        elem.remove();
        
        if(prop === "height")
            el.animate({"height":height}, speed, callback);
        else if(prop === "width")
            el.animate({"width":width}, speed, callback);  
        else if(prop === "both")
            el.animate({"width":width,"height":height}, speed, callback);
    });  
}

$(".project-component-desc-readmore").click(function() {
    var targetElemLeft = $("#" + $(this).data("target") + "-left");
    var targetElemRight = $("#" + $(this).data("target") + "-right");
    var targetElemDesc = $("#" + $(this).data("target") + "-right"
                          + " .project-component-desc-body");
    var currentContainerElemHeight = targetElemLeft.height();
    
    if (currentContainerElemHeight == 225) {
        targetElemLeft.css("height", "auto");
        targetElemRight.css("height", "auto");
        targetElemDesc.css("height", "auto");
        $(this).html('Less <i class="fa fa-chevron-circle-down fa-rotate-180"></i>');
        
    } else {
        targetElemLeft.css("height", "225px");
        targetElemRight.css("height", "225px");
        targetElemDesc.css("height", "146px");
        $(this).html('More <i class="fa fa-chevron-circle-down"></i>');
    }
    
});
    
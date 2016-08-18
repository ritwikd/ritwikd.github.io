$(document).ready(function() {
    
    $(".project-component-desc-readmore").click(function(e) {
        
        var targetElemLeft = $("#" + $(this).data("target") + "-left");
        var targetElemRight = $("#" + $(this).data("target") + "-right");
        var targetElemDesc = $("#" + $(this).data("target") + "-right"
                              + " .project-component-desc-body");
        
        var currentContainerElemHeight = targetElemRight.height();

        if (currentContainerElemHeight == 225) {
            targetElemLeft.css("height", "auto");
            targetElemRight.css("height", "auto");
            targetElemDesc.css("height", "auto");
            $(this).html('Less <i class="fa fa-chevron-circle-down fa-rotate-180"></i>');

        } else {
            targetElemLeft.css("height", "225px");
            targetElemRight.css("height", "225px");
            targetElemDesc.css("height", "152px");
            $(this).html('More <i class="fa fa-chevron-circle-down"></i>');
        }
        
    });
}); 

    
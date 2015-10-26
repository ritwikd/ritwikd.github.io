$(document).ready(function() {
    
    $(".project-component-desc-readmore").click(function(e) {
        
        var targetElemLeft = $("#" + $(this).data("target") + "-left");
        var targetElemRight = $("#" + $(this).data("target") + "-right");
        var targetElemDesc = $("#" + $(this).data("target") + "-right"
                              + " .project-component-desc-body");
        var currentContainerElemHeight = targetElemLeft.css("height");

        if (currentContainerElemHeight != "auto") {
            alert("Minimizing");
            targetElemLeft.css("height", "auto");
            targetElemRight.css("height", "auto");
            targetElemDesc.css("height", "auto");
            $(this).html('<a class="project-component-desc-readmore-link" href="#">Less <i class="fa fa-chevron-circle-down fa-rotate-180"></i></a>');

        } else {
            targetElemLeft.css("height", "225px");
            targetElemRight.css("height", "225px");
            targetElemDesc.css("height", "146px");
            $(this).html('<a class="project-component-desc-readmore-link" href="#">More <i class="fa fa-chevron-circle-down"></i><a>');
        }
    
        e.preventDefault();
    });
}); 

    
$(".project-link").click(function() {
    var targetDesc = $(this).data("target");
    
    var currentOverflow = $("#" + targetDesc).css("overflow-y");
    var currentHeight = $("#" + targetDesc).css("height");
    var currentHeightRow = $("#" + targetDesc + "-td").css("height");
    var currentHTML = $(this).html();
    
    var newOverflow = (currentOverflow == "hidden") ? "auto" : "hidden";
    var newHeight = (currentHeight == "145px") ? "300px" : "145px";
    var newHeightRow = (currentHeightRow == "0px") ? "120px" : "0px";
    var newHTML = (currentHTML == 'Close <i class="fa fa-chevron-circle-up"></i>') ? 
        'Read more <i class="fa fa-chevron-circle-down"></i>' : 
        'Close <i class="fa fa-chevron-circle-up"></i>' ;
    
    $("#" + targetDesc).css("height", newHeight);
    $("#" + targetDesc + "-td").css("height", newHeightRow); 
    $("#" + targetDesc).css("overflow-y", newOverflow);
    
    
    
    $(this).html(newHTML);
    
});
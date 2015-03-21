$(document).ready(function() {

  var startingTab = 1;
  var startingURLHash = location.hash.substring(1);
  location.hash = "";
  if (startingURLHash.length > 0) {
    switch(startingURLHash) {
      case "projects":
        startingTab = 2;
        break;
      case "contact":
        startingTab = 3;
        break;
      case "blog":
        window.location.replace("http://blog.ritwikd.com");
        break;
    }
  }

   $('.tabs').tabslet({
    active: startingTab, 
    animation: true
	});

   $(".tabs").on("_after", function () {
   		if ( $("#tab-1").css("display") === "block") {
        location.hash = "about";
      }
      if ( $("#tab-2").css("display") === "block") {
        location.hash = "projects";
      }
      if ( $("#tab-3").css("display") === "block") {
        location.hash = "contact";
      }
   });

	var nav = responsiveNav('.nav', {
        animate: true,
        transition: 250,
        label: '<i class="fa fa-bars"></i>',
        insert: 'before',
        customToggle: '',
        closeOnNavClick: true,
        openPos: 'relative',
        navClass: 'nav-collapse',
        navActiveClass: 'js-nav-active',
        jsClass: 'js',
        init: function(){},
        open: function(){},
        close: function(){}
    });
});
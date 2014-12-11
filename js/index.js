String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

var postTemplate = [
  '<div class="blog-cont"><div class="post-content" id="',
  'par"><div class="blog-title emph">',
  '</div><p class="post-date"><i>', 
  '</i></p><p class="post-body">',
  '</p></div></div><br>'
];

var readOptions = {
              moreLink: '<a class="link-link" href="#"><div class="special link-cont"> <div class="link-text"> <i class="left fa fa-chevron-circle-down"></i>Read more </div> </div> </a>',
              lessLink: '<a class="link-link" href="#"><div class="special link-cont"> <div class="link-text"> <i class="left fa fa-chevron-circle-up"></i>Close </div> </div> </a>'
            };

function makePost(postTitle, postDate, postBody, titleHash) {
  var postHTML = '';
  postHTML += postTemplate[0] + titleHash;
  postHTML += postTemplate[1] + postTitle;
  postHTML += postTemplate[2] + postDate.substring(0, 16);
  postBody = postBody.replace(/\u00a0/g, " ");
  postHTML += postTemplate[3] + postBody;
  postHTML += postTemplate[4];
  return postHTML;
}

var blogMax = [0,5];

function loadBlog(blogMax) {

  var currentPosts = $(".blogholder").html();

  $(".blogholder").html("");

  var loadedPosts = 0;

  $.getJSON('http://ritwikdutta.tumblr.com/api/read/json?callback=?',
  function(response) {
        $.each(response.posts, function(postIndex) {
          blogPost = response.posts[postIndex];
          if (postIndex >= blogMax[0] && postIndex < blogMax[0] + blogMax[1]) {
            
            loadedPosts++;
            var titleHash = md5(blogPost['regular-title']);
            var postHTML = makePost(blogPost['regular-title'],
              blogPost.date,
              blogPost['regular-body'],
              titleHash);

            $(".blogholder").append(postHTML);
            $("#" + titleHash + "par").readmore(readOptions);

          }
        });

        if (loadedPosts == 0) {
            $(".blogholder").html(currentPosts);
            blogMax[0] -= 5;
        }

  });

  var images = $('img');
  for (var i = 0; i < images.length; i++) {
    images[i].onerror = function () {
      images[i].css("display", "none");
    };
  }
}

function nextPage(blogMax) {
  blogMax[0] += 5;
  loadBlog(blogMax);
}

function prevPage(blogMax) {
  if (blogMax[0] > 0) {
    blogMax[0] -= 5;
  }
  loadBlog(blogMax);
}



$(document).ready(function() {
   $('.tabs').tabslet({
		controls: {
			prev: '.prev',
			next: '.next'
		}
	});

   $(".tabs").on("_after", function () {
   		if ($("#blog").attr('class').contains('active')) {
   			loadBlog(blogMax);
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
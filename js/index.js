//Readmore.js


var postTemplate = [
  '<li><div class="card wow animated fadeInRightBig"><div class="post-content" id="',
  'par"><h3 class="blog-title">',
  '</h3><p class="post-date">', 
  '</p><p class="post-body">',
  '</p></div></div></li>'
];

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

  var currentPosts = $(".blog-cards").html();

  $(".blog-cards").html("");

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

            if (postIndex == blogMax[0]) {
              postHTML = postHTML.substring(0, 50) +'<p class="card-title">Blog</p><hr class="card-hr">' +
                '<p>Tech, gaming, and whatever else I find interesting.</p>' +
                '<hr class="blog-line">' + postHTML.substring(50);
            }
            $(".blog-cards").append(postHTML);
            $("#" + titleHash + "par").readmore({
              moreLink: '<p class="url"><a href="#"> <i class="fa fa-chevron-circle-down"></i>Read more</a></p>',
              lessLink: '<p class="url"><a href="#"> <i class="fa fa-chevron-circle-up"></i>Close</a></p>'
            });

          }
        });

        if (loadedPosts == 0) {
            $(".blog-cards").html(currentPosts);
            blogMax[0] -= 5;
        }

  $($(".card")[$(".card").length - 1]).append('<br><p class="url"><a href="#" onclick="prevPage(blogMax);"> <i class="fa fa-chevron-circle-left"></i>Newer Posts</a></p> <br> <p class="url"><a href="#" onclick="nextPage(blogMax);"> <i class="fa fa-chevron-circle-right"></i>Older Posts</a></p>');

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

function centerCards() {
  $("#col1").css("padding-left", (($(window).width()/2) - 450).toString()  + "px");
  $(".header").css("left", (($(window).width()/2) - 440).toString()  + "px");
}

window.onresize = function(event) {
  centerCards();
};

centerCards();
loadBlog(blogMax);

new WOW().init();
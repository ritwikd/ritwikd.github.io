var postTemplate = [
	'<div class="post wrapper">' + 
	'<div class="post title centered bold">',
	'</div><div class="post date centered">',
	'</div><div class="post body">',
	'</div></div>'
];

var staticContent = {
	'About' : 'Hello. I\'m a student, programmer, and web-developer, located in California. I am currently working on finishing high school and expanding my technological skillset. <br><br> ' +
	'In my personal time, I enjoy making websites, listening to music, playing video games, watching movies and TV, and reading books. <br><br>' + 
	'If you want to contact me, shoot me an email, and I\'ll respond as soon as possible.' +
	'<h3>Skills</h3><ul><li><h5>Python</h5></li><li><h5>Java</h5></li><li><h5>Linux</h5></li><li><h5>SDL</h5></li><li><h5>Unreal</h5></li><li><h5>HTML</h5></li><li><h5>CSS</h5></li><li><h5>JS</h5></li></ul>',
	'Projects' : 'Here are some of my recent projects. <br>' +
				'<h3 class="project title">GT Health Dashboard</h3>' +
					'<div class="project description">The GT Health Dashboard is a software project I implemented at Georgia Tech over the summer under the guidance of a professor. It is about creating a free and open-source end-to-end software system for monitoring long term care patients in smart homes.' +
					'<br><div class="project links"><a class="project link" href="http://gtd.ritwikd.com">home</a> <a class="project link" href="http://github.com/ritwikd/gt-dashboard/">github</a><a class="project link" href="assets/gthd.pdf">report</a></div> ' +
				'<h3 class="project title">Max Keyboards Key Configuration Utility</h3>' +
					'<div class="project description">I created this keyboard configuration utility for Max Keyboards. It can be used to create a customized keyboard with a variety of layouts and options. Each key can be individually customized with respect to LED and keycap color. Every key on the page is rendered entirely in CSS. I created this entire page from scratch.' +
					'<br><div class="project links"><a class="project link" href="http://maxkey.ritwikd.com">home</a>' +
				'<h3 class="project title">K.A.R.E</h3>' +
					'<div class="project description">K.A.R.E is a project that I started at a hackathon with some friends. It is a GitHub recommendation engine that provides repositories similar to user selected repositories. I worked on some of the frontend and backend components of this project.' +
					'<br><div class="project links"><a class="project link" href="http://kare.progger.io">home</a> <a class="project link" href="https://github.com/arshsab/K.A.R.E">github</a></div>' +
				'<h3 class="project title">securewallet</h3>' +
					'<div class="project description">securewallet is a cool little password manager I wrote as a side project. It uses 128-bit AES encryption. It\'s written in pure Python, so theoretically it should work on any platform, but I\'ve only tested on Linux. I wrote this entire application.' +
					'<br><div class="project links"><a class="project link" href="http://securewallet.ritwikd.com">home</a> <a class="project link" href="http://github.com/ritwikd/securewallet/">github</a></div>',
	'Contact' : '<div class="contact item"><div class="icon"><span class="entypo-direction"></span></div><a href="mailto:ritzymail@gmail.com">ritzymail@gmail.com</a><br></div>' +
				'<div class="contact item"><div class="icon"><span class="entypo-phone"></span></div><a href="tel:14084063722">1 408 406 3722</a></div>' +
				'<div class="contact item"><div class="icon"><span class="entypo-github"></span></div><a href="http://github.com/ritwikd">ritwikd</a></div>' +
				'<div class="contact item"><div class="icon"><span class="entypo-gplus"></span></div><a href="http://plus.google.com/+RitwikDutta/about">Ritwik Dutta</a></div>' +
				'<div class="contact item"><div class="icon"><span class="entypo-twitter"></span></div><a href="http://twitter.com/ritzymail">ritzymail</a></div>'
}

var blogLoaded = false;

function generatePost(postTitle, postDate, postBody) {
	var postHTML = '';
	postHTML += postTemplate[0] + postTitle;
	postHTML += postTemplate[1] + postDate.substring(0, 16);
	postHTML += postTemplate[2] + postBody;
	postHTML += postTemplate[3];
	return postHTML;
}

function addPost(postTitle, postDate, postBody, postHolderElem) {
	var postHTML = generatePost(postTitle, postDate, postBody);
	postHolderElem.append(postHTML);
}

function getBlogData(postHolderElem) {
	var blogPost = {};
	blogData = $.getJSON('http://ritwikdutta.tumblr.com/api/read/json?callback=?',
		function(response) {
        	$.each(response.posts, function(postIndex) {
        		blogPost = response.posts[postIndex];
        		addPost(blogPost['regular-title'],
        			blogPost.date,
        			blogPost['regular-body'],
        			postHolderElem);
        	});

    });

    var images = $('img');
    for (var i = 0; i < images.length; i++) {
    	images[i].onerror = function () {
    		images[i].css("display", "none");
    	};
    }

    blogLoaded = true;
}


function loadLink(link) {
	var linkType = $(link).attr('data-type');
	loadData(linkType);
}

function loadData(linkType) {
	$('.content.wrapper').html('');	
	if (linkType === '') {
		location.hash = '#About';
		loadData(location.hash.substring(1));
	} else {
		$('.header.nav.link.bold')[0].className = $('.header.nav.link.bold')[0].className.substring(0, 16);
		$('*[data-type="' + linkType + '"]')[0].className += ' bold';
		switch(linkType) {
			case 'About' :
				$(".content.wrapper").append(staticContent[linkType]);
				break;
			case 'Projects' :
				$(".content.wrapper").append(staticContent[linkType]);
				break;
			case 'Resume':
				window.location = 'assets/resume.pdf';
				break;
			case 'Blog':
				if (blogLoaded == false) {
					console.log("NYAH");
					getBlogData($('.content.wrapper'));	
				} else{
					console.log("NYOH");
					$('.content.wrapper').html($('.hidden.holder').html());
				}
				
				break;
			case 'Contact':
				$(".content.wrapper").append(staticContent[linkType]);
				break;
		}
	}
}

function bindEvent(e, eventName, callback) {
    if(e.addEventListener) {
        e.addEventListener(eventName, callback, false);
    }
    else if(e.attachEvent) {
        e.attachEvent('on'+ eventName, callback);
    }
};

bindEvent(document.body, 'scroll', function(e) {
    document.body.scrollLeft = 0;
});

loadData(location.hash.substring(1));
getBlogData($('.hidden.holder'));


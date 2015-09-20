var photos, gallery, modalOverlay, leftModalButton, rightModalButton;

var instagram_response = function(data) {
	document.getElementById('loadingMessage').style.display = "none";

	photos = data.data;

	var errorMessage = document.getElementById('errorMessage');
	if (photos.length === 0) {
		errorMessage.style.display = "block";
		return;
	} else {
		errorMessage.style.display = "none";
	}

	for(var i = 0; i < photos.length; i++) {
		// access to the photo-template created in html
		var template = document.getElementById('photoTemplate').cloneNode(true);
		// <template> tag is not supported by IE; clear ID of "template" div
		template.id = '';
		// append title data to title id in template
		// template.querySelector('.title').textContent = photos[i].caption.text;

		var title = photos[i].caption.text;
		var words = title.split(' ');
		for(var j = 0; j < words.length; j++) {
			var word = words[j];
			if(word[0] == "#") {
				var tag = '<span class="hashtag">' + word + '</span>';
				title = title.replace(word, tag);
			}
		}
		template.querySelector('.title').innerHTML = title;

		// append imgSrc data to imgSrc id in template
		template.querySelector('.imgSrc').src = photos[i].images.low_resolution.url;
		// append data-index to anchor in template
		template.querySelector('.imgSrc').setAttribute('data-index', i);
		// append the template data to div with gallery id
		gallery.appendChild(template);
	}

	addLightboxEventListeners();
};

var addLightboxEventListeners = function() {
	var anchors = document.getElementsByClassName('lightboxAnchor');

	for(var i = 0; i < anchors.length; i++) {
		anchors[i].addEventListener('click', anchorClicked);
	}
};

var anchorClicked = function(event) {
	event.preventDefault();
	// getting anchor
	var anchor = event.target;
	// getting data-index on image
	var photoIndex = parseInt(anchor.getAttribute('data-index'), 10);
	// show image at index
	showModalImage(photoIndex);
	// setting the modalOverlay visibility to visible
	modalOverlay.style.visibility = 'visible';
};

var showModalImage = function(index) {
	// set photoIndex for left and right anchor on modal
	leftModalButton.setAttribute('data-index', index - 1);
	rightModalButton.setAttribute('data-index', index + 1);
	if (index === 0) {
		leftModalButton.style.visibility = "hidden";
	} else if (index === 19) {
		rightModalButton.style.visibility = "hidden";
	} else {
		leftModalButton.style.visibility = "inherit";
		rightModalButton.style.visibility = "inherit";
	}
	// getting photos standard_resolution url
	var displayPhoto = photos[index].images.standard_resolution.url;
	// getting photos caption
	var displayTitle = photos[index].caption.text;
	// setting the caption to modalTitle
	document.getElementById('modalTitle').textContent = displayTitle;

	// setting the image to the modalImg
	var loadingImage = document.getElementById('loadingImg');
	var modalImage = document.getElementById('modalImg');

	// show loading image, hide modal image
	loadingImage.style.display = 'inline-block';
	modalImage.style.display = 'none';

	modalImage.onload = function() {
		// hide loading image, show modal image after it loads
		loadingImage.style.display = 'none';
		modalImage.style.display = 'inline-block';
	};

	// set source of modal image
	modalImage.src = displayPhoto;
};

window.onload = function() {
	// access to div where photos will be appended
	gallery = document.getElementById('gallery');

	// getting context of modalOverlay
	modalOverlay = document.getElementsByClassName('modalOverlay')[0];

	document.getElementById('searchForm').addEventListener('submit', function(event) {
		event.preventDefault();

		// clear the gallery
		while (gallery.hasChildNodes()) {
			gallery.removeChild(gallery.lastChild);
		}

		var clientId = "8ee7de05d3674afbaaafe5a26648b705";
		var tagInput = document.getElementById('tagInput').value.replace(/\s+/g, '');
		var errorMessage = document.getElementById('errorMessage');
		if (tagInput === '') {
			errorMessage.style.display = "block";
			return;
		} else {
			errorMessage.style.display = "none";
		}
		var url = "https://api.instagram.com/v1/tags/" + tagInput + "/media/recent?client_id="+ clientId + "&callback=instagram_response";

		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = url;

		document.getElementById('loadingMessage').style.display = "block";

		document.body.appendChild(script);

		document.getElementById('tagInput').value = "";
	});

	var closeModalButton = document.getElementById('closeButton');
	closeModalButton.addEventListener('click', function(event) {
		// setting the modalOverlay visibility to hidden
		modalOverlay.style.visibility = 'hidden';
	});

	modalOverlay.addEventListener('click', function(event) {
		// do not hide modal unless overlay was clicked
		// (we could have clicked on the image or the text, etc)
		if(event.target == modalOverlay) {
			// setting the modalOverlay visibility to hidden
			modalOverlay.style.visibility = 'hidden';
		}
	});

	leftModalButton = document.getElementById('leftModalButton');
	rightModalButton = document.getElementById('rightModalButton');

	leftModalButton.addEventListener('click', anchorClicked);
	rightModalButton.addEventListener('click', anchorClicked);

	// add keyboard event listeners
	document.addEventListener('keydown', function(event) {
		if(event.target === document.getElementById('tagInput')) {
			// we want left and right keys to work in the form
			return;
		}

		var index;
		// left
		if(event.keyCode == 37) {
			event.preventDefault();
			index = parseInt(leftModalButton.getAttribute('data-index'), 10);
			if(index >= 0) {
				showModalImage(index);
			}
		}
		// right
		else if(event.keyCode == 39) {
			event.preventDefault();
			index = parseInt(rightModalButton.getAttribute('data-index'), 10);
			if(index < 20) {
				showModalImage(index);
			}
		}
		// escape
		else if(event.keyCode == 27) {
			event.preventDefault();
			modalOverlay.style.visibility = 'hidden';
		}
	});
};
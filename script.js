window.onload = function() {
	// access to div where photos will be appended
	var gallery = document.getElementById('gallery');
	var photos = [];
	// getting context of modalOverlay
	var modalOverlay = document.getElementsByClassName('modalOverlay')[0];

	document.getElementById('searchForm').addEventListener('submit', function(event) {
		event.preventDefault();

		// var http = new XMLHttpRequest();
		var clientId = "8ee7de05d3674afbaaafe5a26648b705";
		var tagInput = document.getElementById('tagInput').value.replace(/\s+/, '');
		var url = "https://api.instagram.com/v1/tags/" + tagInput + "/media/recent?client_id="+ clientId + "&callback=instagram_response";

		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = url;
		document.body.appendChild(script);

		document.getElementById('tagInput').value = "";
	});

	var closeModal = document.getElementById('closeButton');
	closeModal.addEventListener('click', function(event) {
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

	window.instagram_response = function(data) {
		// clear the gallery
		while (gallery.hasChildNodes()) {
			gallery.removeChild(gallery.lastChild);
		}

		photos = data.data;

		for(var i = 0; i < photos.length; i++) {
			// access to the photo-template created in html
			var template = document.getElementById('photoTemplate').content.cloneNode(true);
			// append title data to title id in template
			template.querySelector('.title').innerText = photos[i].caption.text;
			// append imgSrc data to imgSrc id in template
			template.querySelector('.imgSrc').src = photos[i].images.low_resolution.url;
			// append data-index to anchor in template
			template.querySelector('.imgSrc').setAttribute('data-index', i);
			// append the template data to div with gallery id
			gallery.appendChild(template);
		}

		addLightboxEventListeners();
	};

	window.addLightboxEventListeners = function() {
		var anchors = document.getElementsByClassName('lightboxAnchor');

		for(var i = 0; i < anchors.length; i++) {
			anchors[i].addEventListener('click', anchorClicked);
		}
	};

	window.anchorClicked = function(event) {
		event.preventDefault();
		// getting anchor
		var anchor = event.target;
		// getting data-index on image
		var photoIndex = parseInt(anchor.getAttribute('data-index'), 10);
		// set photoIndex for left and right anchor on modal
		leftModalButton.setAttribute('data-index', photoIndex - 1);
		rightModalButton.setAttribute('data-index', photoIndex + 1);
		if (photoIndex === 0) {
			leftModalButton.style.visibility = "hidden";
		} else if (photoIndex === 19) {
			rightModalButton.style.visibility = "hidden";
		} else {
			leftModalButton.style.visibility = "inherit";
			rightModalButton.style.visibility = "inherit";
		}
		// show image at index
		showModalImage(photoIndex);
		// setting the modalOverlay visibility to visible
		modalOverlay.style.visibility = 'visible';
	};

	var leftModalButton = document.getElementById('leftModalButton');
	leftModalButton.addEventListener('click', anchorClicked);
	var rightModalButton = document.getElementById('rightModalButton');
	rightModalButton.addEventListener('click', anchorClicked);

	window.showModalImage = function(index) {
		// getting photos standard_resolution url
		var displayPhoto = photos[index].images.standard_resolution.url;
		// getting photos caption
		var displayTitle = photos[index].caption.text;
		// setting the caption to modalTitle
		document.getElementById('modalTitle').innerText = displayTitle;
		// setting the image to the modalImg
		document.getElementById('modalImg').src = displayPhoto;
	};
};














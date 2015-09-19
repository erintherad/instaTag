window.onload = function() {
	// access to div where photos will be appended
	var gallery = document.getElementById('gallery');
	var photos = [];

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
		var photoIndex = anchor.getAttribute('data-index');
		// getting photos standard_resolution url
		var displayPhoto = photos[photoIndex].images.standard_resolution.url;
		// getting photos caption
		var displayTitle = photos[photoIndex].caption.text;
		// setting the caption to modalTitle
		document.getElementById('modalTitle').innerText = displayTitle;
		// setting the image to the modalImg
		document.getElementById('modalImg').src = displayPhoto;
		// getting context of modalOverlay
		var modalOverlay = document.getElementsByClassName('modalOverlay')[0];
		// setting the modalOverlay visibility to visible
		modalOverlay.style.visibility = 'visible';
	};
};















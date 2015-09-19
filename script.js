window.onload = function() {
  // access to div where photos will be appended
  var gallery = document.getElementById('gallery');
  // access to the photo-template created in html
	var template = document.getElementById('photoTemplate').content.cloneNode(true);

  document.getElementById('tagSubmit').addEventListener('click', function(event) {
		event.preventDefault();

		// var http = new XMLHttpRequest();
		var clientId = "8ee7de05d3674afbaaafe5a26648b705";
		var tagInput = document.getElementById('tagInput').value;
		var url = "https://api.instagram.com/v1/tags/" + tagInput + "/media/recent?client_id="+ clientId + "&callback=instagram_response";

		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = url;
		document.body.appendChild(script);

		document.getElementById('tagInput').value = "";
  });

  var photoArr =[];
  var photo;

  window.instagram_response = function(data) {
		var allPhotos = data;

		// iterate through array of photos
		for(var i = 0; i < allPhotos.data.length; i++) {

			photo = allPhotos.data[i];
			photoArr.push(photo);
		}

		for (var j = 0; j < photoArr.length; j++) {
			console.log(photoArr);
			// append title data to title id in template
			template.querySelector('.title').innerText = photoArr[j].caption.text;
			// append imgSrc data to imgSrc id in template
			template.querySelector('.imgSrc').src = photoArr[j].images.low_resolution.url;
			// append the template data to div with gallery id
			gallery.appendChild(template);
		}
  };


};
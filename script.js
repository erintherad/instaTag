window.onload = function() {

  // array to store photo data
  var photos = [
		{ title: "This is a title", imgSrc: "http://rs65.pbsrc.com/albums/h235/Ignwar/Album%20Deserts/JoshuaTreeSunsetMojaveDesertCalifor.jpg~c200"},
		{ title: "This is a title", imgSrc: "http://rs65.pbsrc.com/albums/h235/Ignwar/Album%20Deserts/JoshuaTreeSunsetMojaveDesertCalifor.jpg~c200"},
		{ title: "This is a title", imgSrc: "http://rs65.pbsrc.com/albums/h235/Ignwar/Album%20Deserts/JoshuaTreeSunsetMojaveDesertCalifor.jpg~c200"},
		{ title: "This is a title", imgSrc: "http://rs65.pbsrc.com/albums/h235/Ignwar/Album%20Deserts/JoshuaTreeSunsetMojaveDesertCalifor.jpg~c200"},
		{ title: "This is a title", imgSrc: "http://rs65.pbsrc.com/albums/h235/Ignwar/Album%20Deserts/JoshuaTreeSunsetMojaveDesertCalifor.jpg~c200"},
		{ title: "This is a title", imgSrc: "http://rs65.pbsrc.com/albums/h235/Ignwar/Album%20Deserts/JoshuaTreeSunsetMojaveDesertCalifor.jpg~c200"},
		{ title: "This is a title", imgSrc: "http://rs65.pbsrc.com/albums/h235/Ignwar/Album%20Deserts/JoshuaTreeSunsetMojaveDesertCalifor.jpg~c200"},
		{ title: "This is a title", imgSrc: "http://rs65.pbsrc.com/albums/h235/Ignwar/Album%20Deserts/JoshuaTreeSunsetMojaveDesertCalifor.jpg~c200"},
		{ title: "This is a title", imgSrc: "http://rs65.pbsrc.com/albums/h235/Ignwar/Album%20Deserts/JoshuaTreeSunsetMojaveDesertCalifor.jpg~c200"},
		{ title: "This is a title", imgSrc: "http://rs65.pbsrc.com/albums/h235/Ignwar/Album%20Deserts/JoshuaTreeSunsetMojaveDesertCalifor.jpg~c200"},
  ];

  // access to div where photos will be appended
  var gallery = document.getElementById('gallery');

  // iterate through array of photos
  for(var i = 0; i < photos.length; i++) {
		// set variable to photos[i]
		var photo = photos[i];
		// access to the photo-template created in html
		var template = document.getElementById('photoTemplate').content.cloneNode(true);
		// append title data to title id in template
		template.querySelector('.title').innerText = photo.title;
		// append imgSrc data to imgSrc id in template
		template.querySelector('.imgSrc').src = photo.imgSrc;
		// append the template data to div with gallery id
		gallery.appendChild(template);
  }

  window.instagram_response = function(data) {
		console.log(data);
  };


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

  });


};
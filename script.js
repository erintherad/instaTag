window.onload = function() {
  event.preventDefault();

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

};
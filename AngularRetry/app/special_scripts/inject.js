'use strict';

$(document).ready(function() {
	var createMarkticleButton = function() {
		var styles = 'position: fixed; z-index: 9999; bottom: 20px; left: 20px;';
		$('body').append('<button id="markticle_button" style="' + styles + '">Mark me!</button>');
	};

	$(document).on('click', '#markticle_button', function() {
		var title = document.title;
		var url = window.location.href;
		var tags = [];
		var description = "";
		var color = ""; // should include # if hex
		var screenshot = "";
		var icon = "http://www.google.com/s2/favicons?domain=" + window.location.href;
		var date = new Date();
		var group = "";
		chrome.extension.sendMessage({
		   	action : 'add',
		   	data: {
				title: title,
				url: url,
				tags: tags;
				description: description;
				notes: notes;
				color: color;
				screenshot: screenshot;
				icon: icon;
				dateAdded: date;
				dateVisited: date;
				visited: 0;
				order: 0;
				group: group;
			}
		});

		alert('Marked!');
	});



	createMarkticleButton();
});

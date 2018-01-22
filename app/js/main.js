$(document).ready(function($) {
	$('#connectBtn').click(function() {
		var parameters = { search: $('#athlete').val() };

		$.get("/search", parameters, function(data) {
			$('#data').html(data);
		});
	});
});
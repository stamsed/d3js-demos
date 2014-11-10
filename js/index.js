$(document).ready
(
	function()
	{
		$(document).on
		(
			"click",
			"#homelink",
			function()
			{
				$(".appWrapper").hide();
				$("#home").show();
			}
		);
		
		$(document).on
		(
			"click",
			".divlink",
			function()
			{
				var href = $(this).attr("app-href");
				OpenInNewTab(href);
			}
		);
		
		$(document).on
		(
			"mouseenter",
			".divlink",
			function()
			{
				var desc = $(this).attr("app-desc");
				$("#headerSubTitle").html(desc);
				$(this).css({"border-color":"#86A7A0"});
			}
		);
		
		$(document).on
		(
			"mouseleave",
			".divlink",
			function()
			{
				$("#headerSubTitle").html("");
				$(this).css({"border-color":"#518F8E"});
			}
		);
		
	}
);

function showDemo(href)
{
	$.get(href, function(demo) {
	
		$(".appWrapper").hide();
		$("#demos").html(demo);
		$("#demos").show();
	
	});
}

function OpenInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}
(function(){
	var csrf = '<!-- csrf_token -->';
	csrf=csrf.split("<script>");
	csrf=csrf[1].split("</script>");
	csrf=csrf[0];
	eval(csrf);
})();
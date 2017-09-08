
frappe.provide("ps.user");
ps.user.avatar = function(user, css_class, title) {


	user_info = {
		image: frappe.get_gravatar(user.name),
		fullname: user.full_name,
		abbr: frappe.get_abbr(user.full_name),
		color: frappe.get_palette(user.full_name)
	};

	if(!title) {
		title = user_info.fullname;
	}

	if(!css_class) {
		css_class = "avatar-small";
	}

	if(user_info.image) {

		var image = (window.cordova && user_info.image.indexOf('http')===-1) ?
			frappe.base_url + user_info.image : user_info.image;

		return repl('<span class="avatar %(css_class)s" title="%(title)s">'+
			'<span class="avatar-frame" style="background-image: url(%(image)s)"'+
			 'title="%(title)s"></span></span>', {
				image: image,
				title: title,
				abbr: user_info.abbr,
				css_class: css_class
			});
	} else {
		var abbr = user_info.abbr;
		if(css_class==='avatar-small' || css_class=='avatar-xs') {
			abbr = abbr.substr(0, 1);
		}
		return repl('<span class="avatar %(css_class)s" title="%(title)s">'+
			'<div class="standard-image" style="background-color: %(color)s;">%(abbr)s</div></span>', {
				title: title,
				abbr: abbr,
				css_class: css_class,
				color: user_info.color
			});
	}
};
// this.currentUser=ps.initCurrentUser();
// this.currentUser.get({},function(items){
// 	if(this.currentUser.items.username=="Guest"){
// 		window.location = "/login";
// 	}else{
// 		$(document).trigger("userLoaded");
// 	}
// }.bind(this));

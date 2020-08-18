(function () {

	//get share button css class selector
	var share_btn_selector = 'good-share';

	//get share modal
	var share_modal = document.querySelector('.good-share-modal');

	//get close button css class selector
	var close_button_selector = 'close-btn';

	//get overlay
	var overlay_selector = 'good-share-overlay';

	//store element before share modal opened
	var active_element;

	//share parameters
	var share_title;
	var share_text;
	var share_url;

	//share urls
	var facebook_url;
	var twitter_url;
	var email_url;

	//twitter + email parameters
	var twitter_url_params;
	var email_url_params;

	//get current url + page title
	var current_url = window.location.href;
	var current_page_title = document.title;

	//get open graph tags
	var og_url_element = document.querySelector("meta[property='og:url']");
	var og_title_element = document.querySelector("meta[property='og:title']");
	var og_description_element = document.querySelector("meta[property='og:description']");

	//check if open graph tags exist
	if( og_url_element && og_title_element && og_description_element ){
		var og_url = og_url_element.getAttribute("content");
		var og_title = og_title_element.getAttribute("content");
		var og_description = og_description_element.getAttribute("content");
	}

	//social media icons
	var facebook_icon = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z"/></svg>';
	var twitter_icon = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.954 4.569a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.061a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.937 4.937 0 0 0 4.604 3.417 9.868 9.868 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 0 0 2.46-2.548l-.047-.02z"/></svg>';
	var email_icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16"><rect x=".5" y=".5" width="19" height="15" rx="1.609" fill="#fff" stroke="#000" stroke-miterlimit="10"/><path fill="none" stroke="#000" stroke-miterlimit="10" d="M17.124 3.13l-3.562 2.435L10 8 6.438 5.565 2.876 3.13"/></svg>';

	//create share modal for fallback browsers
	var create_share_modal = function() {
		//create share modal html
		var div = document.createElement('div');
		div.classList.add('good-share-modal');
		div.setAttribute('role', 'dialog');

	    div.innerHTML = '<button class="close-btn" aria-label="close share modal"></button>' +
	    				'<div class="good-share-modal-buttons">' +
			            	'<button class="btn facebook-btn">' + facebook_icon + 'Facebook</button>' +
			            	'<button class="btn twitter-btn">' + twitter_icon + 'Twitter</button>' +
			            	'<button class="btn email-btn">' + email_icon + 'Email</button>'+
			            '</div>';

	    document.body.appendChild(div);
	}

	create_share_modal();

	//create share overlay
	var create_overlay = function() {
	   	var div = document.createElement('div');
	   	div.classList.add("good-share-overlay");
	    document.body.appendChild(div);
	}

	create_overlay();

	//check if using Samsung Browser
	var isSamsungBrowser = navigator.userAgent.match(/SamsungBrowser/i);

	//open share modal
	var open_share_modal = function( share_title, share_text, share_url ) {

		if ( navigator.share && isSamsungBrowser === null ) {

			//web share API is supported
			navigator.share({
				title: share_title,
				text: share_text,
				url: share_url
			}).then(() => {
				console.log('Thanks for sharing!');
			})
			.catch(console.error);

	    } else {
			//fallback
			document.body.classList.add('good-share-modal-open');

			//remember which element before share modal opened
			active_element = document.activeElement;

			//focus on first social button in share modal
			document.querySelector(".good-share-modal-buttons > button").focus();

	    }
	}

	//close share modal
	var close_share_modal = function() {
		document.body.classList.remove('good-share-modal-open');

		//restore focus to element before we opened the share modal
		active_element.focus();
	}

	//open facebook share modal
	var open_facebook_window = function( facebook_url ) {
	    window.open(
	        facebook_url, 'share-facebook','width=580,height=296'
	    );
	    return false;
	}

	//open twitter share window
	var open_twitter_window = function( twitter_url ) {
	    window.open(
	        twitter_url, 'share-twitter', 'width=550,height=235'
	    );
	    return false;
	}

	//open email share window
	var open_email_window = function( email_url ) {
	    window.open(
	        email_url, 'share-email'
	    );
	    return false;
	}

	//add event listeners
	document.addEventListener('click', function (event) {

	    if ( event.target.classList.contains( share_btn_selector ) ) {
	    	//get share title, text and url
	    	//set fallback values if not defined
	    	share_title = event.target.dataset.shareTitle || og_title || current_page_title;
	    	share_text = event.target.dataset.shareText || og_description || '';
	    	share_url = event.target.dataset.shareUrl || og_url || current_url;

	    	//check if fallback share
	    	if( navigator.share == null ){
	    		//escape special characters
	    		share_title = encodeURIComponent(share_title);
	    		share_text = encodeURIComponent(share_text);
	    		share_url = encodeURIComponent(share_url);
	    	}

	    	//open share window
	    	open_share_modal( share_title, share_text, share_url );
	    }

	    if ( event.target.classList.contains( close_button_selector ) || event.target.classList.contains( overlay_selector ) ) {
	    	close_share_modal();
	    }

	    if ( event.target.classList.contains( 'facebook-btn' ) ) {
	    	//construct facebook share url
	    	facebook_url = "https://www.facebook.com/sharer/sharer.php?u=" + share_url;

	    	//open share window
	    	open_facebook_window(facebook_url);
	    }

	    if ( event.target.classList.contains( 'twitter-btn' ) ) {

	    	//check if share text exists
	    	if( share_text ){
	    		twitter_url_params = share_title + ' / ' + share_text + "&url=" + share_url;
	    	}else{
	    		twitter_url_params = share_title + "&url=" + share_url;
	    	}

	    	//construct twitter share url
	    	twitter_url = "https://twitter.com/intent/tweet?text=" + twitter_url_params ;

	    	//open share window
	    	open_twitter_window(twitter_url);
	    }

	    if ( event.target.classList.contains( 'email-btn' ) ) {

	    	//check if share text exists
	    	if( share_text ){
	    		email_url_params = share_text + '%0D%0A%0D%0A' + share_url + "&subject=" + share_title;
	    	}else{
	    		email_url_params = share_url + "&subject=" + share_title;
	    	}

	    	//construct email share url
	    	email_url = "mailto:?&body=" + email_url_params;

	    	//open share window
	    	open_email_window(email_url);
	    }

	}, false);

	//close share window on escape key
	document.addEventListener('keyup', function ( event ) {
	    if (event.defaultPrevented) {
	        return;
	    }

	    var key = event.key || event.keyCode;

	    if ( key === 'Escape' || key === 'Esc' || key === 27 ) {
	        close_share_modal();
	    }
	});

})();
(function () {

	//get share button css class selector
	var share_btn_selector = 'good-share';

	//get share modal
	var share_modal = document.querySelector('.good-share-modal');

	//get close button css class selector
	var close_button_selector = 'close-btn';

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

	//social media icons
	var facebook_icon = '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook icon</title><path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"/></svg>';
	var twitter_icon = '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter icon</title><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg>';
	var email_icon = '<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16"><title>Email icon</title><rect x="0.5" y="0.5" width="19" height="15" rx="1.609" fill="#fff" stroke="#000" stroke-miterlimit="10"/><polyline points="17.124 3.13 13.562 5.565 10 8 6.438 5.565 2.876 3.13" fill="none" stroke="#000" stroke-miterlimit="10"/></svg>';

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

	//open share modal
	var open_share_modal = function( share_title, share_text, share_url ) {

		if ( navigator.share ) {

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
	    	share_title = event.target.dataset.shareTitle || current_page_title;
	    	share_text = event.target.dataset.shareText || '';
	    	share_url = event.target.dataset.shareUrl || current_url;
	    	focus_selector = event.target.dataset.focus;

	    	//open share window
	    	open_share_modal( share_title, share_text, share_url );
	    }

	    if ( event.target.classList.contains( close_button_selector ) ) {
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

	//get overlay
	var overlay = document.querySelector( '.good-share-overlay' );

	//add event listener to overlay
	overlay.addEventListener('click', function ( event ) {
		//close share window
	    close_share_modal();
	});

})();
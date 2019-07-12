(function () {

	//get share button css class selector
	var share_btn_selector = 'good-share';

	//get share modal
	var share_modal = document.querySelector('.good-share-modal');

	//get close button css class selector
	var close_button_selector = 'close-btn';

	//share parameters
	var share_title;
	var share_text;
	var share_url;

	//get current url + page title
	var current_url = window.location.href;
	var current_page_title = document.title;

	//create share modal for fallback browsers
	var create_share_modal = function() {
	   	//create share modal html
	   	var div = document.createElement('div');
	   	div.classList.add("good-share-modal");

	    div.innerHTML = '<button class="close-btn">close</button>' +
	    				'<div class="good-share-modal-buttons">' +
			            '<button class="facebook-btn">facebook</button>' +
			            '<button class="twitter-btn">twitter</button>' +
			            '<button class="email-btn">email</button>'+
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
	    }
	}

	//close share modal
	var close_share_modal = function() {
		document.body.classList.remove('good-share-modal-open');
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
	    	share_text = event.target.dataset.shareText || current_page_title;
	    	share_url = event.target.dataset.shareUrl || current_url;

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
	    	//construct twitter share url
	    	twitter_url = "https://twitter.com/share?text=" + share_title + "&url=" + share_url;

	    	//open share window
	    	open_twitter_window(twitter_url);
	    }

	    if ( event.target.classList.contains( 'email-btn' ) ) {
	    	//construct email share url
	    	email_url = "mailto:?&body=" + share_url + "&subject=" + share_title;

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
(function () {

	//get share button css class selector
	var share_btn_selector = 'good-share';

	//get share dialog
	var share_dialog = document.querySelector('.share-dialog');

	//get close button css class selector
	var close_button_selector = 'close-btn';

	//share parameters
	var share_title;
	var share_text;
	var share_url;

	//create share dialog for fallback browsers
	var create_share_dialog = function() {
	   	//create share dialog html
	   	var div = document.createElement('div');
	   	div.classList.add("share-dialog");

	    div.innerHTML = '<button class="close-btn">close</button>' +
	    				'<div class="share-dialog-buttons">' +
			            '<button class="facebook-btn">facebook</button>' +
			            '<button class="twitter-btn">twitter</button>' +
			            '<button class="email-btn">email</button>'+
			            '</div>';

	    document.body.appendChild(div);
	}

	create_share_dialog();

	//create overlay
	var create_overlay = function() {
	   	//create share dialog html
	   	var div = document.createElement('div');
	   	div.classList.add("overlay");
	    document.body.appendChild(div);
	}

	create_overlay();

	//open share window
	var open_share_window = function( share_title, share_text, share_url ) {
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
	      document.body.classList.add('share-modal-open');
	    }
	}

	//close share window
	var close_share_window = function() {
		document.body.classList.remove('share-modal-open');
	}

	//open facebook share window
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
	    	share_title = event.target.dataset.shareTitle;
	    	share_text = event.target.dataset.shareText;
	    	share_url = event.target.dataset.shareUrl;

	    	//open share window
	    	open_share_window( share_title, share_text, share_url );
	    }

	    if ( event.target.classList.contains( close_button_selector ) ) {
	    	close_share_window();
	    }

	    if ( event.target.classList.contains( 'facebook-btn' ) ) {
	    	facebook_url = "https://www.facebook.com/sharer/sharer.php?u=" + share_url;
	    	open_facebook_window(facebook_url);
	    }

	    if ( event.target.classList.contains( 'twitter-btn' ) ) {
	    	twitter_url = "https://twitter.com/share?text=" + share_title + "&url=" + share_url;
	    	open_twitter_window(twitter_url);
	    }

	    if ( event.target.classList.contains( 'email-btn' ) ) {
	    	email_url = "mailto:?&body=" + share_url + "&subject=" + share_title;
	    	console.log(email_url);
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
	        close_share_window();
	    }
	});

	//get overlay
	var overlay = document.querySelector( '.overlay' );

	//add event listener to overlay
	overlay.addEventListener('click', function ( event ) {
	    close_share_window();
	});

})();
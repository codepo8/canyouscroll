(function(){
var form = document.getElementsByTagName('form')[0],
		out = document.getElementById('distract'),
		result = document.getElementsByTagName('output')[0],
		scrollison = false,
		start = 0,
		end = 0,
		goal = 0;

result.tabIndex = '-1';

form.addEventListener('submit', function(ev){
	var val = document.getElementById('amount');
	window.scrollTo( 0, 0 );
	if( +val.value > 0 ) {
		form.className = 'hidden';
		out.className = 'visible';
		scrollison = true;
		goal = +val.value;
	}
	ev.preventDefault();
},false);

window.addEventListener('scroll',function(ev){
	if (scrollison) {
		// this is so cheating :)
		//console.log(document.body.scrollTop);
	}
}, false);

document.body.addEventListener('click',function(ev){
	if (scrollison) { endthisnonsense(); }
}, false);

out.addEventListener('click',function(ev){
	if (scrollison) { endthisnonsense(); }
}, false);

function endthisnonsense() {
	end = document.body.scrollTop || document.documentElement.scrollTop;
	start = 0;
	window.scrollTo( 0, 0 );
	scrollison = false;
	out.className = '';
	form.className = '';
	var msg = 'You said you will scroll ' + goal + ' pixels. ';
	var off = goal - end;
	var tweet = '';
	if (off === 0) {
		msg += 'You totally nailed it!';
    tweet = 'I tried to scroll ' + goal + ' pixels at ' +
    				'http://codepo8.github.com/canyouscroll/ and I got it'+
            ' right! Your turn! #canyouscroll';
	}
	if (off > 0) {
		msg += 'But you were ' + off + ' pixels short.';
    tweet = 'I tried to scroll ' + goal + ' pixels at '+
            'http://codepo8.github.com/canyouscroll/ and was '+
            off + ' pixels short. Your turn! #canyouscroll';
	} 
	if (off < 0) {
		msg += 'But you were ' + -off + ' pixels over.';
    tweet = 'I tried to scroll ' + goal + ' pixels at '+
    				'http://codepo8.github.com/canyouscroll/ and was '+
            -off + ' pixels over. Your turn! #canyouscroll';
	}
	result.innerHTML = msg + ' <a href="http://twitter.com/home?status='+
	                   encodeURIComponent(tweet)+'">Tweet this</a>';
	result.focus();
}

})();

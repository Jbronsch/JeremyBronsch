//Retrieve Flickr Api information using key. Using .getJSON method instead of regular AJAX call. 
$container = $('.flickr-stream');

//If need to limit amount of pictures/page, append just past + User ID 
//'&per_page=25&page='+page+

function getFlickr(page){
	Key = '59c1d949d5f27a9e1c573fac39ec6f09';
    UserID = '135925601@N08';
    API = 'https://api.flickr.com/services/rest/';
    var photoInfo = API + '?&method=flickr.people.getPublicPhotos&api_key=' + Key + '&user_id=' + UserID +'&format=json&jsoncallback=?';
    $.getJSON(photoInfo, function(data) {
        $.each(data.photos.photo, function(i,item){
            var photoURL = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret +".jpg";
            var largePhoto = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret +"_b.jpg";
            var imgOutput = '<div class="image grid-item"><img src="' + photoURL + '" id="lightboxImage" data-featherlight="' + largePhoto + '"></div>';
            $(imgOutput).appendTo($container);
        });
    })
    .fail(function(){
        $container.append('An error has occurred');
    });
}
getFlickr(1);

$(".animsition").animsition({
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 1500,
    outDuration: 800,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^=#])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });

$(window).load(function(){
    $("html").fadeIn(3000);
    $container.masonry({
        isFitWidth: true
    });
});

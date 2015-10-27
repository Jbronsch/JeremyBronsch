//Retrieve Flickr Api information using key. Using .getJSON method instead of regular AJAX call. 
$container = $('#flickrStream');

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
            var imgOutput = '<div id="id' + item.id + '" class="item id' + item.id + ' grid gallery"><div class="image grid-item"><img src="' + photoURL + '" id="lightboxImage" data-featherlight="' + largePhoto + '"></div>';
            $(imgOutput).appendTo($container);
        });
    })
    .fail(function(){
        $container.append('An error has occurred');
    });
}
getFlickr(1);

$('.grid').masonry({
  // options...
  itemSelector: '.grid-item',
  columnWidth: 'grid-item',
  percentPosition: true,
  isFitWidth: true
});

$(window).load(function(){
    $("#flickrStream").fadeIn(2000);
    $container.masonry();
    $(".spinner").hide()
});

$(document).ready(function(){
	$('.gallery').featherlightGallery();
});

$('a.gallery').featherlightGallery({
    openSpeed: 300
});

$(function() {
    $("img.lazy").lazyload();
});

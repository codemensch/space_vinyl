$( document ).ready(function() {
  //Choose Album/Playlist
  $('i:nth-child(1), i:nth-child(2)').click(function(){
    //Put all albums in a node
    let albums = document.getElementsByClassName('album');
    //Click previous button
    if (this.id == 'prev'){
      //Pull out album from bottom of stack
      $(albums[0]).addClass('animate-album');
      //Wait for animation to finish
      $(albums[0]).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        //Set explicit element margin
        $(albums[0]).css('margin-left', '400px');
        //Remove animation styles/margin so doesn't re-fire on append
        $(albums[0]).removeClass('animate-album');
        //Put bottom album on top
        $('#stack').append($(albums[0]));
        //Force browser to calculate margin value
        $(albums[albums.length - 1]).css('margin-left');
        //Transition album back to original position
        $(albums[albums.length - 1]).css('margin-left', '0px');
      });
    }
    else{
      //Push album to bottom of stack
      $(albums[albums.length - 1]).addClass('animate-album');
      //Wait for animation to finish
      $(albums[albums.length - 1]).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        //Set explicit element margin
        $(albums[albums.length - 1]).css('margin-left', '400px');
        //Remove animation styles/margin so doesn't re-fire on prepend
        $(albums[albums.length - 1]).removeClass('animate-album');
        //Put top album on bottom
        $('#stack').prepend($(albums[albums.length - 1]));
        //Force browser to calculate margin value
        $(albums[0]).css('margin-left');
        //Transition album back to original position
        $(albums[0]).css('margin-left', '0px');
      });
    }
  });
  /*
  $('#sc-widget').on('load', function(){

  });

  function getArtwork(){
    let contents = $('#sc-widget').contents();
    console.log(contents);
    //let artwork = document.querySelectorAll('iframe');
    //console.log(artwork);
    //let albums = document.querySelectorAll('.album');
    //for (let i=0; i<artwork.length; i++){
      //albums[i].style.backgroundImage = artwork[i].style.backgroundImage;
    //}
  //}

  getArtwork();
*/

  (function(){
    var widgetIframe = document.getElementById('sc-widget'),
        widget       = SC.Widget(widgetIframe);
    var vintageIframe = document.getElementById('vintage-widget'),
        vintage       = SC.Widget(vintageIframe);
    var rocketIframe = document.getElementById('rocket-widget'),
        rocket       = SC.Widget(rocketIframe);    

    widget.bind(SC.Widget.Events.READY, function() {      
      
    });

    vintage.bind(SC.Widget.Events.READY, function() {
     
    });

    rocket.bind(SC.Widget.Events.READY, function() {
     
    });

  }());
});
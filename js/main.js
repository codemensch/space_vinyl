$( document ).ready(function() {
  

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
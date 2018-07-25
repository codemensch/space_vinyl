$('#vinyl-rotate').css('animation-play-state', 'paused');

$(window).bind("load", function() {

  let onOff = 'off';
  let recordLoaded = false;



  $('#on-off-knob').click(function(){
    if(onOff == 'off'){
      onOff = 'on';
      $('#vinyl-rotate').css('animation-play-state', 'running');
    }
    else {
      onOff = 'off';
      $('#vinyl-rotate').css('animation-play-state', 'paused');
    }
    $('#on-off-knob').toggleClass('knob-rotate');
  });
  


  var albums = document.getElementsByClassName('album');
  var playlists = document.getElementsByTagName('iframe');
  var activeAlbum = albums[albums.length - 1];
  var activeAlbumID = activeAlbum.id;
  var activeAlbumPre = activeAlbumID.split('-');
  var activePlaylist = activeAlbumPre[0] + '-widget';
  //var widgetSRC = $('#' + activePlaylist).attr('src');
  
  var widget = SC.Widget(document.getElementById(activePlaylist));
  widget.bind(SC.Widget.Events.READY, function() {
    console.log('Ready...');
  });


  //This will be the play/pause function
  $('#tone-arm').click(function() {
    if (onOff == 'off'){
      onOff = 'on';
      widget.toggle();
    }
    else {
      onOff = 'off';
      widget.toggle();  
    }
  });


  //Choose Album/Playlist
  $('i:nth-child(1), i:nth-child(2)').click(function(){
    //Click previous button
    if (this.id == 'prev'){
      //$("[src='js/widget_load.js']").remove();
      //$('body').append('<script type="text/javascript" src="js/widget_load.js"></script>');
      //Pull out album from bottom of stack
      $(albums[0]).addClass('animate-album');
      //Wait for animation to finish
      $(albums[0]).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        //Set explicit element margin
        $(albums[0]).css('margin-left', '400px');
        //Remove animation styles/margin so doesn't re-fire on append
        $(albums[0]).removeClass('animate-album');
        //Put bottom album on top
        $('#stack').append(albums[0]);
        //Force browser to calculate margin value
        $(albums[albums.length - 1]).css('margin-left');
        //Transition album back to original position
        $(albums[albums.length - 1]).css('margin-left', '0px');
        
        albums = document.getElementsByClassName('album');
        activeAlbum = albums[albums.length - 1];
        activeAlbumID = activeAlbum.id;
        activeAlbumPre = activeAlbumID.split('-');
        activePlaylist = activeAlbumPre[0] + '-widget';
        //widgetSRC = $('#' + activePlaylist).attr('src');
        widget = SC.Widget(document.getElementById(activePlaylist));
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
        albums = document.getElementsByClassName('album');
        activeAlbum = albums[albums.length - 1];
        activeAlbumID = activeAlbum.id;
        activeAlbumPre = activeAlbumID.split('-');
        activePlaylist = activeAlbumPre[0] + '-widget';
        //widgetSRC = $('#' + activePlaylist).attr('src');
        widget = SC.Widget(document.getElementById(activePlaylist));
      });
    }
  });

  //Click event to load vinyl record
  $('#btn-overlay').click(function(){
    loadAlbum(onOff);
  });

  function loadAlbum(onOrOff){
    if (onOrOff == 'off'){
      console.log('the table is off');
      $('#vinyl').addClass('animate-vinyl-on');
      $('#vinyl').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(f) {
        $('#vinyl').css('margin-left', '-464px');
        $('#vinyl').removeClass('animate-vinyl-on');
        $('#matt').prepend(document.getElementById('vinyl'));
        $('#vinyl').css('margin-left', '0px');
        //$('#matt').append(document.getElementById('spindle'));
        //load the vinyl record
      });
      recordLoaded = true;
    }
    else {
      //tell user to replace the tone arm or turn off the turntable
    }
  }

    


  /*
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
});

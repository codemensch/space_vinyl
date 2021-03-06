//Fade in the loading graphic
$('.loader').fadeIn(1000);

//Wait for everything to load before running
$(window).on("load", function() {
  //Immediately pause infinite rotation of vinyl and platter
  $('#vinyl-rotate, #matt').css('animation-play-state', 'paused');

  //Fade out loader
  $('.loader').css('opacity', 0);
  //Wait for load fade to finish
  $('.loader').one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(e) {
    $('.loader').css('animation-play-state', 'paused');
    //Fade in turntable and albums
    $('#wrapper').css({'visibility':'visible', 'opacity': 1});
  });
  
  //Initialize action states
  let onOff = 'off';
  let recordLoaded = false;
  let toneArm = 'off';
  let animated = false;

  //On/Off knob action
  $('#on-off-knob').on('click', function(){
    console.log(animated);
    //Check if animation in progress
    if(animated == false){
      //Animation in progress
      animated = true;
      //Make sure not playing
      if(toneArm == 'off'){
        //Turn table on or off
        $('#on-off-knob').toggleClass('knob-rotate');
        //Check if off
        if(onOff == 'off'){
          //Update action state
          onOff = 'on';
          //Check rotate vinyl or matt
          if(recordLoaded == true){
            //Rotate vinyl
            $('#vinyl-rotate').css('animation-play-state', 'running');
          }
          else{
            //Rotate matt
            $('#matt').css('animation-play-state', 'running');
          }
        }
        //Table is on
        else {
          //Change on/off state
          onOff = 'off';
          //Choose vinyl or matt to stop rotating
          if(recordLoaded == true){
            //Stop vinyl
            $('#vinyl-rotate').css('animation-play-state', 'paused');
          }
          else{
            //Stop matt
            $('#matt').css('animation-play-state', 'paused');
          }
        }
      }
      //Animation already in progress
      else{
        alert("Album playing. Click tone arm to stop, then click the on/off knob to turn off the table.")
      }
    }
    //Animation is finished
    animated = false;
  });
  

  //Put all albums in a node object
  let albums = document.getElementsByClassName('album');
  //Put all soundcloud playlists in a node object
  let playlists = document.getElementsByClassName('iframes');
  //Make album on top of the stack/last in the node the active album
  let activeAlbum = albums[albums.length - 1];
  //Get the active albums ID
  let activeAlbumID = activeAlbum.id;
  //Get the album ID prefix
  let activeAlbumPre = activeAlbumID.split('-');
  //Attach prefix to -widget to call associated iframe
  let activePlaylist = activeAlbumPre[0] + '-widget';
  //Get SRC of the iframe
  let widgetSRC = document.getElementById(activePlaylist).getAttribute('src');

  //Refresh album variables after append/prepend
  function albumRefresh(){
    activeAlbum = albums[albums.length - 1];
    activeAlbumID = activeAlbum.id;
    activeAlbumPre = activeAlbumID.split('-');
    activePlaylist = activeAlbumPre[0] + '-widget';
    widgetSRC = document.getElementById(activePlaylist).getAttribute('src');
    widget = SC.Widget(document.getElementById(activePlaylist));
    soundCloud();
  }
  
  //Soundcloud Widget API
  //Import active playlist
  var widget = SC.Widget(document.getElementById(activePlaylist));
  function soundCloud(){
    //Load widget API
    widget.bind(SC.Widget.Events.READY, function() {
      //Get array of sound objects
      widget.getSounds(function(currentPlaylist){
        //Last sound in playlist
        let lastSound = currentPlaylist.length - 1;
        //Widget play event
        widget.bind(SC.Widget.Events.PLAY, function() {
          //Get the index of the current sound
          widget.getCurrentSoundIndex(function(currentSoundIndex){
            let currentTitle = currentPlaylist[currentSoundIndex].title;
            document.getElementById('title').innerHTML = currentTitle;
            //If last sound return the arm
            if(currentSoundIndex == lastSound){
              widget.bind(SC.Widget.Events.FINISH, function() {
                returnArm();
              });
            }
          });
        });
      });
    });
  }

  soundCloud();

  //Choose Album/Playlist
  $('#prev, #next').click(function(){
    //Check if record already loaded
    //No record loaded
    if(recordLoaded == false){
      //Check if animation in progress
      if(animated == false){
        animated = true;
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
            $('#stack').append(albums[0]);
            //Force browser to calculate margin value
            $(albums[albums.length - 1]).css('margin-left');
            //Transition album back to original position
            $(albums[albums.length - 1]).css('margin-left', '0px');

            //Reinitialize album variables
            albumRefresh();
            //Animation finished
            animated = false;
          });
        }
        //Choose next album
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

            //Reinitialize album variables
            albumRefresh();
            //Animation finished
            animated = false;
          });
        }
      }
    }
    //Record already loaded
    else{
      alert("Record already loaded. Unload record before choosing a new one.")
    }
  });

  var returnArm = function(){
    animated = true;
    //Stop playing
    toneArm = 'off';
    let toneArmReturn = document.getElementById('tone-arm');
    toneArmReturn.setAttribute('class', 'tone-arm-off');
    //Don't play sound, playlist is done
    //Clear title
    document.getElementById('title').innerHTML = '';
    //Return tone arm
    $('#tone-arm').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
      //Wait for transition to end
      animated = false;
    });
  }

  //Tone arm, play/pause action
  $('#tone-arm').click(function() {
    //Check if animation in progress
    if(animated == false){
      //Function that plays sound
      let play = function(){
          widget.toggle();
      }
      //Table is off and no record loaded
      if (onOff == 'off' && recordLoaded == false){
        alert("No record loaded. Load a record and turn on the table. Then click the tone arm to play.")
      }
      //Table is off and record is loaded
      else if(onOff == 'off' && recordLoaded == true) {
        alert("Table not on. Turn on the table, then click the tone arm to play.")
      }
      //Table is on but no record loaded
      else if(onOff == 'on' && recordLoaded == false){
        alert("No record loaded. Turn off the table, load a record, and turn the table back on. Then click the tone arm to play.")  
      }
      //Table is on and record loaded
      else{
        //Check if already playing
        if(toneArm == 'off'){
          toneArm = 'on';
          //Animation started
          animated = true;
          $('#tone-arm').toggleClass('tone-arm-off tone-arm-on');
          //Wait for transition to end
          $('#tone-arm').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
            //play sound
            play();
            //Animation finished
            animated = false;
          });
        }
        //Already playing
        else{
          //Stop playing
          toneArm = 'off';
          $('#tone-arm').toggleClass('tone-arm-on tone-arm-off');
          //Play sound
          play();
          returnArm();
        }
      }
    }
  });


  //Click event to load vinyl record
  $('.album').click(function(){
    //Check if animations are running
    if(animated == false){
      //Check that table is off and no record loaded
      if (onOff == 'off' && recordLoaded == false){
        //Animation start
        animated = true;
        $('#vinyl').addClass('animate-vinyl-on');
        //Wait animation end
        $('#vinyl').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(f) {
          //Explicitly set margin
          $('#vinyl').css('margin-left', '-464px');
          //Remove animation from vinyl
          $('#vinyl').removeClass('animate-vinyl-on');
          //Place vinyl in new location
          $('#vinyl-placeholder').prepend(document.getElementById('vinyl'));
          //Reset margin back to 0
          $('#vinyl').css('margin-left', '0px');
          //Make spindle visible
          $('#table-base').append(document.getElementById('spindle'));
          //Reposition spindle
          $('#spindle').css({'margin-left': '213px', 'margin-top': '168px'});
          //Give tone arm higher z-index while record loaded
          $('#tone-arm').css('z-index', '1');
          //Animation finished
          animated = false
        });
        recordLoaded = true;
      }
      //Album click exceptions
      //Table is off and record is loaded
      else if(onOff == 'off' && recordLoaded == true){
        alert("Record already loaded. Click the vinyl to return or turn on table to play")
      }
      //Table is on and record is loaded
      else if(onOff == 'on' && recordLoaded == true && toneArm == 'off'){
        alert("Record already loaded. Click the tone arm to play, or turn off table to unload")
      }
      //Record is playing
      else if(onOff == 'on' && recordLoaded == true && toneArm == 'on'){
        alert("Record already playing. Click the tone arm to stop playing, turn off turntable, and click the vinyl to return and choose a new album")
      }
      //Table is on
      else{
        alert("Turn off table to load album.")
      }
    }
  });

  //Vinyl click event
  $('#vinyl').click(function(){
    //Check if other animations happening
    if(animated == false){
      //Check if table is on or off
      if(onOff == 'off'){
        //Animation starts
        animated = true;
        //Make tone arm lower z-index while vinyl is unloading
        $('#tone-arm').css('z-index', 'initial');
        //Animate vinyl unload
        $('#vinyl').addClass('animate-vinyl-off');
        //Replace spindle back to position
        $('#matt').append(document.getElementById('spindle'));
        $('#spindle').css({'margin-left': '162px', 'margin-top': '162px'});
        //Wait for animation
        $('#vinyl').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(g) {
          //Animate back to original margin
          $('#vinyl').css('margin-left', '464px');
          //Remove animation
          $('#vinyl').removeClass('animate-vinyl-off');
          //Place vinyl back in the stack
          $('#collection').prepend(document.getElementById('vinyl'));
          //Set margin back to 0
          $('#vinyl').css('margin-left', '0px');
          //Set vinyl rotate back to beginning
          $('#vinyl').css('transform', 'rotate(0deg)');
          //Animation end
          animated = false;
        });
        recordLoaded = false;
      }
      //Vinyl click exceptions
      //Table is on tone arm is off
      else if(onOff == 'on' && toneArm == 'off'){
        alert("Turn off table to unload album or click the tone arm to play.")
      }
      //Record playing
      else {
        alert("Album playing. Click tone arm to stop and turn off table to unload album.")
      }
    }
  }); 
});

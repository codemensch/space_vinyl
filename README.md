# space_vinyl
Welcome to Space Vinyl

This Javascript web app is based off of SoundCloud's Widget API (https://developers.soundcloud.com/docs/api/html5-widget).

Space Vinyl Works just like a real turntable, you have to load a record (click an album), 
turn the platter on (click the on/off knob), then move the needle into place (click the tone arm). If you don't do it in the 
right sequence it will let you know!

Originally, NASA stored it's sounds as a space sounds API, but moved the sounds to 
SoundCloud (https://soundcloud.com/nasa). Unfortunately, as of this writing, SoundCloud's 
developer API is currently unavailable and no new app registrations are being given. 
This severely restricts the type of data manipulation possible, so for now the scope 
of this app is simply to play NASA sound playlists in a "vinyl format" using the Widget API.

A playlist "import" feature may be possible with the Widget API and would be a next step, 
so any SoundCloud playlist could be played. Also, displaying track information somewhere in 
the UI using the API's get functions is a planned addition. Enjoy!

Go here to view the app https://codemensch.github.io/space_vinyl/

**Maintenance to be done**
-Re-factoring of css and javascript where possible.
-Fix choppy fadeIn() happening in Firefox and Safari.
-Fix choppy fade out happening on alert confirm.
-Object orientation of "albums" for future album information feature.
-Bug affecting ability to reload a widget (only way to start at beginning of playlist is to refresh page).

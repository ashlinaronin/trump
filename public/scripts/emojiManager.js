var app = app || new Object(); //check if app already exists

app.emojiManager = new Object();

app.emojiManager.hexStringToChar = function (hexString) {
  return String.fromCodePoint( parseInt("0x" + hexString) )
}
app.emojiManager.getEmojiData = function() {
  // make AJAX request for emoji.json
  // when loaded save JSON to local scope
  var that = this;

  $.getJSON( "emoji.json", function( data ) {

    var items = [];

    $.each( data, function( key, val ) {
      console.log(val);

      //var emoj = val.unified.hexDecode();
      // need to convert
      var emoj = that.hexStringToChar(val.unified);

      $("body").append( "<span class='emoji'>" + emoj + "</span>" );
    });

});
}
app.emojiManager.hexStringToChar = function (hexString) {
  return String.fromCodePoint( parseInt("0x" + hexString) )
}


var button = document.getElementById("drawButton");
button.onclick = function() {
  app.canvas.draw();
}

app.emojiManager.getEmojiData()

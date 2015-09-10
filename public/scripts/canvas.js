var app = app || new Object(); // check if app already exists

app.canvas = new Object();
app.canvas.el = document.getElementById("canvas");
app.canvas.draw = function() {

  if (this.el.getContext) {
    var ctx = this.el.getContext("2d");
    var text = document.getElementById("textToDraw");
    var textX = Math.floor(Math.random() * 400); //rand number b/t 0 & 300
    var textY = Math.floor(Math.random() * 300); //rand number b/t 0 & 150

    ctx.font = "20px serif";
    ctx.fillText(text.value, textX, textY);
  }
}

CanvasRenderingContext2D.prototype.drawStar=function(cx, cy, spikes, outerRadius, innerRadius,fillStyle) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    this.strokeSyle = "#000";
    this.beginPath();
    this.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        this.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        this.lineTo(x, y)
        rot += step
    }
    this.lineTo(cx, cy - outerRadius)
    this.closePath();
    this.lineWidth=5;
    this.strokeStyle='gray';
    this.stroke();
    this.fillStyle=fillStyle;
    this.fill();
}
//  Here is a custom game object
Rating = function (game, x, y,radius, border,stars) {
	var height=2*border+2*radius;
	var width=height*stars;
	this._bmd = new Phaser.BitmapData(game, '', width, height);
	GUIObject.call(this, game, x, y, width, height);

	this._border=border;
	this._radius=radius;
    this._stars=stars;
    this._stared=0;
};
Rating.prototype = Object.create(GUIObject.prototype);
Rating.prototype.constructor = Rating;
Rating.prototype.update = function() {
	this.draw();
};
Rating.prototype.draw=function(){
    var r=this._radius;
    var b=this._border;
    for(var i=1;i<=this._stars*2;i+=2)
    this._bmd.ctx.drawStar((r+b)*i,r+b,5, r,r/2,'darkgray');
    for(var i=1;i<=this._stared*2;i+=2)
    this._bmd.ctx.drawStar((r+b)*i,r+b,5, r,r/2,'yellow');
};
Rating.prototype.setStared=function(star){
    this._stared=star;
}

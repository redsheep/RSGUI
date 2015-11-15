CanvasRenderingContext2D.prototype.drawStar=
function(cx,cy,spikes,outerRadius,innerRadius) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;
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
}
Rating = function (game, x, y, stars) {

	GUIObject.call(this, game, x, y, 16, 16*3);
    this._stars=stars;
    this._stared=1;
};
Rating.prototype = Object.create(GUIObject.prototype);
Rating.prototype.constructor = Rating;
Rating.prototype.draw=function(){
    var r=this._radius;
    var b=this._border;
	this._bmd.cls();
	this._bmd.ctx.lineWidth=b;
	this._bmd.ctx.strokeStyle = this._borderColor;
    for(var i=1;i<=this._stars*2;i+=2){
		this._bmd.ctx.fillStyle='darkgray';
		this._bmd.ctx.drawStar((r+b)*i,r+b,5, r,r/2);
		this._bmd.ctx.fill();
		this._bmd.ctx.strokeBorder(b);
	}
    for(var i=1;i<=this._stared*2;i+=2){
		this._bmd.ctx.fillStyle='yellow';
		this._bmd.ctx.drawStar((r+b)*i,r+b,5, r,r/2);
		this._bmd.ctx.fill();
	}
};
Rating.prototype.fit=function(){
	height = 2*this._radius+2*this._border;
	width = height*this._stars;
	this.resize(parseInt(width),parseInt(height));
}
Rating.prototype.getType=function(){
	return 'rating';
}
Rating.prototype.getValue=function(){
	return this._stared;
}
Rating.prototype.setStared=function(star){
    this._stared=star;
}

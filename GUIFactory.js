function getTextSize(font,fontSize,text,bold,warp){
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    ctx.font = fontSize+"px "+font;
    var width=ctx.measureText(text).width;
    var size = {width:width, height:fontSize};
    if(warp!=null)
        if(width>warp)
            size={width:warp,height:(Math.floor(width/warp)+1)*fontSize};
    return size;
}
CanvasRenderingContext2D.prototype.strokeBorder=function(border){
	if(border==0) return;
	this.lineWidth=border;
	this.stroke();
}
CanvasRenderingContext2D.prototype.roundRect =
function(x, y, width, height, radius, round) {
	this.beginPath();
	if(round=='down'){
		this.moveTo(x, y);
		this.lineTo(x + width, y);
	}else{
		this.moveTo(x , y+ radius);
		this.quadraticCurveTo(x, y, x + radius, y);
		this.lineTo(x + width - radius, y);
		this.quadraticCurveTo(x + width, y, x + width, y + radius);
	}
	if(round=='up'){
		this.lineTo(x + width, y + height);
		this.lineTo(x, y + height);
	}else{
		this.lineTo(x + width, y + height - radius);
		this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		this.lineTo(x + radius, y + height);
		this.quadraticCurveTo(x, y + height, x, y + height - radius);
	}
	this.closePath();
}
CanvasRenderingContext2D.prototype.warpText= 
function(text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = this.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            this.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    this.fillText(line, x, y);
}
Phaser.BitmapData.prototype.generateNinePatchTexture=
function(tex,x,y,w,h,r,W,H){
	var mw=w-2*r;
	var mh=h-2*r;
	var mW=W-2*r;
	var mH=H-2*r;
	this.copy(tex,0,0,r,r,x,y);
	this.copy(tex,W-r,0,r,r,w-r+x,y);
	this.copy(tex,W-r,H-r,r,r,w-r+x,h-r+y);
	this.copy(tex,0,H-r,r,r,x,h-r+y);

	this.copy(tex,r,0,mW,r,x+r,y,mw,r);
	this.copy(tex,r,H-r,mW,r,x+r,h-r+y,mw,r);
	this.copy(tex,0,r,r,mH,x,y+r,r,mh);
	this.copy(tex,W-r,r,r,mH,w-r+x,y+r,r,mh);
	this.copy(tex,r,r,mW,mH,x+r,y+r,mw,mh);
}
Phaser.BitmapData.prototype.horizontalThreePatchTexture=
function(tex,x,y,w,h,r,W,H){
	var mw=w-2*r;
	var mh=h-2*r;
	var mW=W-2*r;
	var mH=H-2*r;
	this.copy(tex,0,0,r,H,x,y,r,h);
	this.copy(tex,r,0,mW,H,x+r,y,mw,h);
	this.copy(tex,W-r,0,r,H,x+w-r,y,r,h);
}
Phaser.BitmapData.prototype.verticalThreePatchTexture=
function(tex,x,y,w,h,r,W,H){
	var mw=w-2*r;
	var mh=h-2*r;
	var mW=W-2*r;
	var mH=H-2*r;
	this.copy(tex,0,0,W,r,x,y,w,r);
	this.copy(tex,0,r,mW,H,x,y+r,w,mh);
	this.copy(tex,0,H-r,W,r,x,y+h-r,w,r);
}

RSGUI = function(game){
	this.add = new GUIFactory(game);
}
RSGUI.prototype.constructor = RSGUI;

RSGUI.prototype.loadTheme=function(url){
	var self=this;
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', url, true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			theme=JSON.parse(xobj.responseText);
			theme.path=url.substring(0, url.lastIndexOf("/") + 1);
			self.add.setTheme(theme);
		}
	};
	xobj.send(null);
}
RSGUI.prototype.loadAsset=function(){
	this.add.loadAsset();
}

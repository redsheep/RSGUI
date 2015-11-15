function getTextSize(font,fontSize,text,warp,bold){
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    ctx.font = fontSize+"px "+font;
    var width=0; var height=0;
	if(warp!=false){
		var lines = text.split("\n");
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			width=Math.max(width,ctx.measureText(line).width);
			height+=fontSize;
		}
	}else{
		width=ctx.measureText(text).width;
		height=fontSize;
	}
    var size = {width:width, height:height};
    return size;
}
CanvasRenderingContext2D.prototype.warpText=
function(text, x, y ) {
	property=this.font.split(' ');
	for(i=0;i<property.length;i++)
		if(property[i].indexOf('px')!=-1)
			lineHeight=parseInt(property[i].substring(0,property[i].length-2));
	var lines = text.split("\n");
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i].trim();
		this.fillText(line, x, y);
		y += lineHeight;
	}
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
Phaser.BitmapData.prototype.generateNinePatchTexture=
function(tex,x,y,w,h,r,W,H){
	mw=w-2*r; mh=h-2*r;
	mW=W-2*r; mH=H-2*r;
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
	this.copy(tex,0,0,r,H,x,y,r,h);
	this.copy(tex,r,0,W-2*r,H,x+r,y,w-2*r,h);
	this.copy(tex,W-r,0,r,H,x+w-r,y,r,h);
}
Phaser.BitmapData.prototype.verticalThreePatchTexture=
function(tex,x,y,w,h,r,W,H){
	this.copy(tex,0,0,W,r,x,y,w,r);
	this.copy(tex,0,r,W,H-2*r,x,y+r,w,h-2*r);
	this.copy(tex,0,H-r,W,r,x,y+h-r,w,r);
}

RSGUI = function(game){
	this.add = new GUIFactory(game);
}
RSGUI.prototype.constructor = RSGUI;
RSGUI.prototype.loadTheme=function(url){
	var self=this;
  self.add.waitTheme();
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

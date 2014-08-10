var Ball = cc.Sprite.extend ({
  aY: 0,
  aX: 0,
  vYNow: 0,
  vXNow: 0,
  ctor:function(res) {
    this._super(res);
  },
  spawn:function() {
    var scale = this.scale;
    this.scale = 0;
    this.runAction(cc.ScaleTo(0.2, scale));
  },
  moving:function(aX, aY, vX, vY) {
    cc.log(aX+"_"+aY);
    if (Math.abs(aX) < 1 && Math.abs(aY) < 1) {
      cc.log("too slow");
      this.despawn();
      return;
    }
    
    this.vXNow = vX;
    this.vYNow = vY;
    
    if (Math.abs(aX) > 10 || Math.abs(aY) > 10) {
      var timeX = Math.abs(aX/10);
      var timeY = Math.abs(aY/10);
      if (timeX > timeY) {
        aX /= timeX;
        aY /= timeX;
      } else {
        aX /= timeY;
        aY /= timeY;
      }
    }
    
    this.aX = aX;
    this.aY = aY;
    this.schedule(this.update, 1/60);
  },
  update:function() {
    var winSize = cc.director.getWinSize();
    var sizeW = this.width * this.scaleX;
    var sizeH = this.height * this.scaleY;
    if (this.x > winSize.width + sizeW/2 || this.x < -sizeW/2 || this.y < -sizeH/2 || this.y > winSize.height +sizeH/2) {
      this.unschedule(this.update);
      this.cleanUp();
    } else {
      this.updatePos();
    }
  },
  updatePos:function() {
    this.vXNow += this.aX;
    this.vYNow += this.aY;
    this.x += this.vXNow;
    this.y += this.vYNow;
//    cc.log("updatePos");
//    cc.log(this.vXNow+"_"+this.vYNow+" "+this.x+"_"+this.y);
  },
  cleanUp:function() {
    this.removeFromParent(true);
  },
  despawn:function() {
    this.runAction(cc.Sequence.create(cc.ScaleTo.create(0.2, 0), cc.CallFunc.create(this.CleanUp, this, null)));
  }
});
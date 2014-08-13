var Enemy = cc.Sprite.extend({
  walkAnimate:null,
  hp:2,
  speed:20, // pixel per second
  ctor:function() {
    this._super("res/enemy/00001.png");
    var walkAnimation = cc.Animation.create();
    if (walkAnimation == null) {
      cc.log("null animation");
    }
    
//    var type = Math.floor(Math.random()*10);
//    if (type == 1) {
//      this.scale = 3;
//      this.speed /= 2;
//    } else {
      this.scale = 2;
//    }
    for (var i = 1; i <= 8; i++) {
      var fileName = "res/enemy/0000" + i + ".png";
      walkAnimation.addSpriteFrameWithFile(fileName);
    }
    walkAnimation.setDelayPerUnit(1/12);
    walkAnimation.setRestoreOriginalFrame = (true);
    this.walkAnimate = cc.RepeatForever.create(cc.Animate.create(walkAnimation));

    this.runAction(this.walkAnimate);
  },
  walk:function() {
    this.stopAllActions();
    this.runAction(this.walkAnimate);
    var walkAction = cc.Sequence.create(cc.DelayTime.create(1), cc.CallFunc.create(this.walkAction, this, null));
    this.runAction(cc.RepeatForever.create(walkAction));
  },
  walkAction:function(pSender) {
    var moveTo = this.getPosition();
    moveTo.y -= this.speed;
    var rdm = Math.floor(Math.random()*2);
    if (rdm == 0) {
      moveTo.x += 10;
    } else if (rdm == 1) {
      moveTo.x -= 10;
    }
    this.runAction(cc.MoveTo.create(1, moveTo));
  },
  hit:function() {
    
  },
  kill:function() {
    
  },
  killAction:function() {
    
  },
  cleanUp:function() {
    this.removeFromParent(true);
  },
  collideRect:function(x, y) {
    var w = this.width*this.scaleX, h = this.height*this.scaleY;
    return cc.rect(x - w / 2*0.8, y - h / 2*0.8, w*0.8, h*0.8);
  }
});
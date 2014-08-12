var Enemy = cc.Sprite.extend({
  walkAnimate:null,
  ctor:function() {
    this._super("res/enemy/00001.png");
    var walkAnimation = cc.Animation.create();
    if (walkAnimation == null) {
      cc.log("null animation");
    }
    this.scale = 2;
    for (var i = 1; i <= 8; i++) {
      var fileName = "res/enemy/0000" + i + ".png";
      walkAnimation.addSpriteFrameWithFile(fileName);
    }
    walkAnimation.setDelayPerUnit(1/12);
    walkAnimation.setRestoreOriginalFrame = (true);
    this.walkAnimate = cc.RepeatForever.create(cc.Animate.create(walkAnimation));
    cc.log(walkAnimation.getFrames().length);
    this.runAction(this.walkAnimate);
  },
  
});
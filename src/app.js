var HelloWorldLayer = cc.Layer.extend({
    touchStartTime: null,
    lastMoveTime: null,
    touchStartPos: null,
    lastMovePos: null,
    isAcc: false,
    curBall: null,
    aScale : 8000, // scale for object's acceration
    battleLayer: null,
    ctor:function () {
        this._super();
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
        }, this);
        var bg = cc.Sprite.create(res.Bg_png);
        var winSize = cc.director.getWinSize();
        bg.x = winSize.width/2;
        bg.y = winSize.height/2;
        this.addChild(bg);
        
        this.battleLayer = new BattleLayer();
        this.addChild(this.battleLayer);
        
        return true;
    },
    onTouchBegan:function(touch, event) {
      var target = event.getCurrentTarget();
      if (target.touchStartPos != null) {
        return true;
      }
      target.touchStartPos = touch.getLocation();
      target.curBall = new Ball(res.Ball_png);
      var winSize = cc.director.getWinSize();
      var ballPos = cc.p(0, 100);
      if (target.touchStartPos.x < winSize.width/3) {
        ballPos.x = winSize.width/6;
      } else if (target.touchStartPos.x >= winSize.width/3 && target.touchStartPos.x <= winSize.width*2/3) {
        ballPos.x = winSize.width/2;
      } else {
        ballPos.x = winSize.width*5/6;
      }
      target.curBall.setPosition(ballPos);
      target.addChild(target.curBall);
      target.curBall.scale = 0.1;
      target.curBall.spawn();

      return true;
    },
    onTouchMoved:function(touch, event) {
      var target = event.getCurrentTarget();
      var curPos = touch.getLocation();
      var now = new Date();
//      target.curBall.setPosition(curPos);
      if (target.isAcc) {
        return;
      }
      
      if (target.lastMoveTime == null || target.lastMovePos == null) {
        target.lastMoveTime = now;
        target.lastMovePos = curPos;
        return;
      }
      
      var deltaT = (now.getTime() - target.lastMoveTime.getTime())/1000; // second
      var deltaX = curPos.x - target.lastMovePos.x;
      var deltaY = curPos.y - target.lastMovePos.y;
      var aX = deltaX * 2 / (deltaT*deltaT) / target.aScale;
      var aY = deltaY * 2 / (deltaT*deltaT) / target.aScale;
      target.lastMoveTime = now;
      
      if (Math.abs(aX) > 50 || Math.abs(aY) > 50) {
//        cc.log("time start!");
        target.touchStartPos = target.lastMovePos;
        target.touchStartTime = target.lastMoveTime;
        target.isAcc = true;
      } else {
        target.touchStartPos = null;
        target.touchStartTime = null;
        target.lastMoveTime = now;
        target.lastMovePos = curPos;
      }
    },
    onTouchEnded:function(touch, event) {
      var target = event.getCurrentTarget();
      if (target.touchStartPos == null || target.touchStartTime == null || target.isAcc == false) {
        if (target.curBall != null) {
          target.curBall.despawn();
        }
        target.resetStat();
        return;
      }
      var endPos = touch.getLocation();
      var now = new Date();
      var deltaT = (now.getTime() - target.touchStartTime.getTime())/1000; // second
      var deltaX = endPos.x - target.touchStartPos.x;
      var deltaY = endPos.y - target.touchStartPos.y;
      var aX = deltaX * 2 / (deltaT*deltaT) / target.aScale;
      var aY = deltaY * 2 / (deltaT*deltaT) / target.aScale;
      var vX = aX * deltaT;
      var vY = aY * deltaT;
      if (target.curBall != null) {
        target.curBall.moving(aX, aY, vX, vY);
      }
      target.resetStat();
    },
    resetStat:function() {
      this.touchStartTime = null;
      this.touchStartPos = null;
      this.curBall = null;
      this.lastMoveTime = null;
      this.lastMovePos = null;
      this.isAcc = false;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


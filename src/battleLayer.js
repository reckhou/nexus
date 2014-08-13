var g_sharedBattleLayer;

var BattleLayer = cc.Layer.extend({
  enemyArray: new Array(),
  bulletArray: new Array(),
  charArray: new Array(),
  spawnXMin: 50,
  spawnXMax:0,
  ctor:function() {
    this._super();
    var winSize = cc.director.getWinSize();
    this.spawnXMax = winSize.width - this.spawnXMin;
    
    var avatar = cc.Sprite.create(res.Avatar_png);
    avatar.setPosition(cc.p(winSize.width/6, 100));
    this.addChild(avatar);

    var avatar1 = cc.Sprite.create(res.Avatar_png);
    avatar1.setPosition(cc.p(winSize.width/2, 100));
    this.addChild(avatar1);

    var avatar2 = cc.Sprite.create(res.Avatar_png);
    avatar2.setPosition(cc.p(winSize.width*5/6, 100));
    this.addChild(avatar2);
    this.schedule(this.spawnEnemy, 2);
    this.schedule(this.update, 1/60);
  },
  spawnEnemy:function() {
    var spawnCnt = Math.floor(Math.random()*5+5);
    var spawnWidthPerChar = (this.spawnXMax - this.spawnXMin)/spawnCnt;
    var winSize = cc.director.getWinSize();
    for (var i = 0; i < spawnCnt; i++) {
      var spawnPos = cc.p(Math.random()*spawnWidthPerChar + this.spawnXMin + spawnWidthPerChar * i,
          winSize.height-100);
      var enemy  = new Enemy();
      enemy.setPosition(spawnPos);
      this.addChild(enemy);
      enemy.walk();
      this.enemyArray.push(enemy);
    }
  },
  spawnBullet:function(pos) {
    
  },
  update:function() {
    // collide chk
    
    // remove enemy out of bootom window
    for (var i = 0; i < this.enemyArray.length; i++) {
      var enemy = this.enemyArray[i];
      if (enemy.y < 0) {
        this.enemyArray.splice(i, 1);
        i--;
        enemy.cleanUp();
      }
    }
    
    // reorder all enemies
    var enemyCnt = this.enemyArray.length;
    var curZorder = enemyCnt;
    for (var i = 0; i < enemyCnt; i++) {
      var enemy = this.enemyArray[i];
      this.reorderChild(enemy, curZorder);
      curZorder--;
    }
  },
  collideChk:function() {
    
  }
});

BattleLayer.create = function () {
	var sg = new BattleLayer();
	if (sg && sg.init()) {
		return sg;
	}
	return null;
};

BattleLayer.scene = function () {
	var scene = cc.Scene.create();
	var layer = BattleLayer.create();
	scene.addChild(layer, 1);
	return scene;
};

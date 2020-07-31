class Player extends egret.Sprite {
  public arrow: egret.Bitmap = null;
  public disk: egret.Bitmap = null;
  public pig: egret.Bitmap = null;
  public diskShow: boolean = false;
  public bg = null;
  //   是否移动猪
  public moving: boolean = false;
  public body: p2.Body = null;
  //   batmans
  private batmans: egret.Bitmap[];
  //   batmans body
  private batmanBodys: p2.Body[];
  // 黑洞们
  public holes: egret.Bitmap[];
  public world: p2.World;
  constructor(
    bg,
    body,
    batmans: egret.Bitmap[],
    holes: egret.Bitmap[],
    batmanBodys: p2.Body[],
    world: p2.World
  ) {
    super();
    // batmans
    this.batmans = batmans;
    // batmans body
    this.batmanBodys = batmanBodys;
    // 黑洞们
    this.holes = holes;
    // world
    this.world = world;
    // 刚体
    this.body = body;

    this.bg = bg;
    // 创建对象
    this.createObject();
    // 绑定事件
    this.bindTouchEvent();
  }

  //   猪的装备
  private createObject() {
    // 箭头
    let arrow: egret.Bitmap = new egret.Bitmap();
    arrow.texture = RES.getRes("arrow_png");
    arrow.anchorOffsetY = arrow.height / 2;
    arrow.visible = false;
    this.addChild(arrow);
    this.arrow = arrow;

    // 面板
    let dp: egret.Bitmap = new egret.Bitmap();
    dp.texture = RES.getRes("disk_png");
    dp.anchorOffsetX = dp.width / 2;
    dp.anchorOffsetY = dp.height / 2;
    dp.visible = false;
    this.addChild(dp);
    this.disk = dp;

    // 猪
    let pig: egret.Bitmap = new egret.Bitmap();
    pig.texture = RES.getRes("player_png");
    pig.width = pig.width / 3;
    pig.height = pig.height / 3;
    pig.anchorOffsetX = pig.width / 2;
    pig.anchorOffsetY = pig.height / 2;
    this.addChild(pig);
    pig.touchEnabled = true;
    this.pig = pig;
  }

  //   猪的移动
  private bindTouchEvent() {
    this.pig.addEventListener(
      egret.TouchEvent.TOUCH_BEGIN,
      (e) => {
        this.disk.visible = true;
        this.arrow.visible = true;
        this.moving = true;
        this.checkHit();
      },
      this
    );
    this.pig.addEventListener(
      egret.TouchEvent.TOUCH_END,
      (e) => {
        this.disk.visible = false;
        this.arrow.visible = false;
        this.moving = false;
      },
      this
    );

    this.bg.addEventListener(
      egret.TouchEvent.TOUCH_MOVE,
      (e) => {
        if (this.moving) {
          let handPoint = new egret.Point(e.stageX, e.stageY);
          let pigPoint = this.localToGlobal(this.pig.x, this.pig.y);

          // 获取角度
          let angle: number = Math.atan2(
            handPoint.y - pigPoint.y,
            handPoint.x - pigPoint.x
          );

          // 箭头旋转
          this.arrow.rotation = angle * (180 / Math.PI);

          // 箭头长度
          let distance = egret.Point.distance(handPoint, pigPoint);
          if (distance > 75) distance = 75;
          if (distance < 10) distance = 10;
          // 对应到比例 0 ~ 1
          this.arrow.scaleX = distance / 100;
          this.arrow.scaleY = distance / 100;
        }
      },
      this
    );

    this.bg.addEventListener(
      egret.TouchEvent.TOUCH_END,
      (e) => {
        if (this.moving) {
          let handPoint = new egret.Point(e.stageX, e.stageY);
          let pigPoint = this.localToGlobal(this.pig.x, this.pig.y);

          let xpower = handPoint.x - pigPoint.x;
          let ypower = handPoint.y - pigPoint.y;

          this.body.applyForce([xpower / 5, ypower / 5], [0, 0]);

          this.disk.visible = false;
          this.arrow.visible = false;
          this.moving = false;
        }
      },
      this
    );
  }
  // 积分
  public score: number = 0;

  // 被world的endContact事件调用.
  public checkHit() {
    this.holes.forEach((h) => {
      //   黑洞检测点
      let rectH = new egret.Rectangle(h.x, h.y, h.width, h.height);
      // 检测batman
      this.batmans.forEach((b, index) => {
        //   batman 检测点
        const rectB = new egret.Rectangle(b.x, b.y, b.width, b.height);
        // 判断是否相交撞击
        if (rectH.intersects(rectB)) {
          // 吃掉batman
          egret.Tween.get(b).to({ alpha: 0 }, 200);
          //    移除batman
          this.batmans.splice(index, 1);
          //    移除掉刚体
          this.world.removeBody(this.batmanBodys[index]);
          this.batmanBodys.splice(index, 1);
          // 得分增加
          this.incrementScore(10);
          // 在batman被吃掉位置生成得分反馈
          this.feedbackScore(10, b.x, b.y, this.bg);
          // 播放一次吃掉的音效
          this.playHitSound();
        }
      });
      // 检测猪是否掉进黑洞
      this.checkPig(rectH);
    });
    // 最后看是否吃完了batman，再给制造一些
    if (this.batmans.length === 0) {
      this.dispatchEvent(new PostEvent(PostEvent.INCREMENT_BATMANS));
      // 提示关卡
      this.feedbackPassCount(this.bg);
    }
  }
  /**
   * 检测猪是否与一个黑洞碰撞
   */
  public checkPig(hole: egret.Rectangle) {
    // 检测pig
    const pigRect = new egret.Rectangle(
      this.body.position[0],
      this.body.position[1],
      this.pig.width,
      this.pig.height
    );
    if (hole.intersects(pigRect)) {
      // 吃掉pig
      egret.Tween.get(this.pig).to({ alpha: 0 }, 200);
      // 播放输掉音效
      this.loseSound();
      // 通知GameView游戏结束了
      this.dispatchEvent(new PostEvent(PostEvent.GAME_OVER));
    }
  }
  /**
   * 增加积分
   * @param score 要增加的分数
   */
  public incrementScore(score: number) {
    this.score += score;
    this.dispatchEvent(
      new PostEvent(PostEvent.INCREMNT_SCORE, false, false, this.score)
    );
  }
  /**
   * 反馈得分
   * @param score 反馈分数
   * @param x 生成x位置
   * @param y 生成y位置
   * @param area 添加到的区域（显示容器）
   */
  public feedbackScore(
    score: number,
    x: number,
    y: number,
    area: egret.DisplayObjectContainer
  ) {
    let t = new eui.Label("+" + score);
    t.x = x;
    t.y = y;
    t.textColor = 0xfaed36;
    t.fontFamily = "Consolas";
    t.size = 18;
    egret.Tween.get(t).to({ alpha: 0, y: y - 10 }, 1000).call(() => {
      area.removeChild(t);
      t = null;
    });
    area.addChild(t);
  }

  /**
   * 反馈关数 并 自增关数
   */
  public passCount: number = 1;
  public feedbackPassCount(
    area: egret.DisplayObjectContainer,
    content: string = "第 " + this.passCount + " 关",
    x: number = this.bg.width / 2,
    y: number = this.bg.height / 2,
  ) {
    let t = new eui.Label(content);
    t.x = x - t.textWidth / 4 - 10;
    t.y = y;
    t.anchorOffsetX = t.textWidth / 2;
    t.anchorOffsetY = t.textHeight / 2;
    t.textColor = 0xffffff;
    t.fontFamily = "Mircrosoft YaHei";
    t.size = 50;
    t.bold = true;
    egret.Tween.get(t).to({ alpha: 1, y: y - 30 }, 2000).call(() => {
      area.removeChild(t);
      t = null;
    });
    area.addChild(t);
    // 自增关数
    this.passCount++;
  }

  /**
   * 播放吃掉声效
   */
  private playHitSound() {
    if (LoadBGM.getInstance().getPlayStatus()) {
      var sound: egret.Sound = RES.getRes("add_mp3");
      sound.play(0, 1);
    }
  }
  /**
   * 播放输掉音效
   */
  private loseSound() {
    if (LoadBGM.getInstance().getPlayStatus()) {
      var sound: egret.Sound = RES.getRes("lose_mp3");
      sound.play(0, 1);
    }
  }
}

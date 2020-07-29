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
    this.bg.touchEnabled = true;
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
    pig.anchorOffsetX = pig.width / 2;
    pig.anchorOffsetY = pig.height / 2;
    pig.scaleX = 0.6;
    pig.scaleY = 0.6;
    this.addChild(pig);
    pig.touchEnabled = true;
    this.pig = pig;
  }

  //   猪的移动
  private bindTouchEvent() {
    this.pig.addEventListener(
      egret.TouchEvent.TOUCH_BEGIN,
      (e) => {
        // console.log( 'TOUCH_BEGIN' )
        this.disk.visible = true;
        this.arrow.visible = true;
        this.moving = true;
      },
      this
    );
    this.pig.addEventListener(
      egret.TouchEvent.TOUCH_END,
      (e) => {
        // console.log( 'TOUCH_END' )
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

          let angle: number = Math.atan2(
            handPoint.y - pigPoint.y,
            handPoint.x - pigPoint.x
          );
          let theta: number = angle * (180 / Math.PI);
          this.arrow.rotation = theta;

          // 箭头长短
          let distance = egret.Point.distance(handPoint, pigPoint);
          if (distance > 120) distance = 120;
          this.arrow.scaleX = distance / 120;
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

          // if(xpower > 80) {
          //     xpower = 80
          // }

          // let power = 80

          // if(xpower > power) xpower = power
          // if(xpower < -power) xpower = -power

          // if(ypower > power) ypower = power
          // if(ypower < -power) ypower = -power

          this.body.applyForce([xpower / 5, ypower / 5], [0, 0]);

          this.disk.visible = false;
          this.arrow.visible = false;
          this.moving = false;
        }
      },
      this
    );
  }

  // 必须为公开，因为他是被main调用的.
  // 在每次触摸结束时调用
  public checkHit() {
    this.holes.forEach((h) => {
      //   黑洞检测点
      const rectH = new egret.Rectangle(h.x, h.y, h.width, h.height);
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
        }
      });
    });
  }
}

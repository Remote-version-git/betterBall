// 游戏界面
class GameView extends eui.Component implements eui.UIComponent {
  // 玩家生成区域
  public player_area: eui.Group;
  // 喇叭组
  private trumpet_check: eui.Button;
  // 喇叭声音图标
  private is_trumpet: eui.Image;
  public constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
  }
  /**
   * 初始化游戏场景
   */
  // 背景
  private bg: egret.Bitmap;
  // 解释面板
  private explain_panel: GameExplainPanel;
  // 游戏区域
  private game_scene: eui.Group;
  private status_bar: eui.Group;
  private score: eui.Label;
  private onComplete() {
    // 监听面板被点击事件
    this.explain_panel.addEventListener(
      PostEvent.READ_EXPLAIN,
      this.createGameScene,
      this
    );

    // 侦听声音按钮的触摸点击事件
    this.trumpet_check.addEventListener(
      egret.TouchEvent.TOUCH_TAP,
      this.trumpetCheck,
      this
    );

    this.trumpet_check.addEventListener(
      egret.TouchEvent.TOUCH_BEGIN,
      () => {
        TouchEvents.onEvent(this.trumpet_check);
        egret.Tween.get(this.trumpet_check).to(
          { scaleX: 0.9, scaleY: 0.9 },
          150
        );
      },
      this
    );
  }

  // 喇叭声音切换
  private trumpetCheck() {
    // 获取声音实例
    const s = LoadBGM.getInstance();
    // 切换播放状态
    s.SwitchPlay();
    // 切换音标图标
    if (s.getPlayStatus()) {
      this.is_trumpet.visible = true;
    } else {
      this.is_trumpet.visible = false;
    }
  }
  /**
   * 创建游戏场景
   * Create a game scene
   */
  private createGameScene() {
    // this.preTime = egret.getTimer();
    // 生成物理世界
    let world: p2.World = new p2.World({
      // 重力
      gravity: [0, 0],
    });
    world.defaultContactMaterial.restitution = 1;
    world.defaultContactMaterial.friction = 0.1;
    world.on(
      "endContact",
      (e) => {
        this.player.checkHit();
        // if (e.bodyB.name == "batman") {
        //   this.world.removeBody(e.bodyB);
        //   this.removeChild(e.bodyB.displays[0]);
        //   e.bodyB.displays[0] = null;
        // }
      },
      this
    );
    this.world = world;
    // this.world.on('postBroadphase', this.a)
    // this.world.on('preSolve', this.b)
    // this.world.on('endContact', this.d)

    // 添加四个黑洞
    this.holeAroundMap();

    // 添加四周四面墙壁
    this.add4Wall();

    // 添加玩家
    this.addPlayer(this);

    // 制造batman到物理世界并显示在舞台
    this.productBatman();

    // 制造 mask 到物理世界并显示在舞台
    this.productMask();

    // p2 调试
    // this.enableP2Debug(world);

    // 添加 player
    this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdate, this);

    // 提示关卡
    this.player.feedbackPassCount(this);
  }

  private isEnableP2Debug: boolean = false;
  private enableP2Debug(world: p2.World) {
    let sprite = new egret.Sprite();
    this.addChild(sprite);
    this.p2debug = new p2DebugDraw(world);
    this.p2debug.setSprite(sprite);
    this.isEnableP2Debug = true;
  }

  //   存储四个黑洞 用于碰撞检测
  private holes: egret.Bitmap[] = new Array(4);

  // 制造黑洞
  private hole() {
    let hole: egret.Bitmap = new egret.Bitmap(RES.getRes("hole_png"));
    // 调整大小
    hole.width = hole.width / 1.8;
    hole.height = hole.height / 1.8;
    // 锚点到中心
    hole.anchorOffsetX = hole.width / 2;
    hole.anchorOffsetY = hole.height / 2;
    return hole;
  }

  // 黑洞布置到地图
  private holeAroundMap() {
    // 创建黑洞并添加到舞台 并 缓存到黑洞数组
    for (let index = 0; index < this.holes.length; index++) {
      let item = this.hole();
      const w = item.width / 2;
      let h = item.height / 2;
      const sw = this.width;
      const sh = this.height;
      // 计算包含锚点
      switch (index) {
        case 0:
          item.x = w;
          item.y = h + this.status_bar.height + 13;
          break;
        case 1:
          item.x = -w + sw;
          item.y = h + this.status_bar.height + 13;
          break;
        case 2:
          item.x = w;
          item.y = -h + sh;
          break;
        case 3:
          item.x = -w + sw;
          item.y = -h + sh;
          break;
        default:
          break;
      }
      this.addChild(item);
      this.holes[index] = item;
    }
  }

  // 物理世界
  private world: p2.World = null;
  private p2debug: p2DebugDraw = null;

  // private preTime: number;
  // 屏幕刷新函数
  private onUpdate() {
    // let pass = egret.getTimer() - this.preTime;
    // 执行的时间间隔 单位秒
    this.world.step(1);

    // 遍历每个刚体
    this.world.bodies.forEach((body) => {
      // 如果不为null，则更新素材的坐标和角度
      if (body.displays) {
        // 位置
        body.displays[0].x = body.position[0];
        body.displays[0].y = body.position[1];
        // 角度
        // body.displays[0].rotation = body.angle * 180 / Math.PI;
      }
    });

    // this.preTime = egret.getTimer();

    // p2 测试
    if (this.isEnableP2Debug) {
      this.p2debug.drawDebug();
    }
  }

  // 制造一个batman
  private makeBatman() {
    let batman: egret.Bitmap = new egret.Bitmap(RES.getRes("batman_png"));
    batman.width = batman.width / 2;
    batman.height = batman.height / 2;
    batman.anchorOffsetX = batman.width / 2;
    batman.anchorOffsetY = batman.height / 2;
    return batman;
  }
  private makeMask() {
    let mask: egret.Bitmap = new egret.Bitmap(RES.getRes("mask_png"));
    mask.width = mask.width / 3;
    mask.height = mask.height / 3;
    mask.anchorOffsetX = mask.width / 2;
    mask.anchorOffsetY = mask.height / 2;
    return mask;
  }

  // 随机范围
  public randomNum(minNum, maxNum, decimalNum = 2) {
    var max = 0,
      min = 0;
    minNum <= maxNum
      ? ((min = minNum), (max = maxNum))
      : ((min = maxNum), (max = minNum));
    switch (arguments.length) {
      case 1:
        return Math.floor(Math.random() * (max + 1));
      case 2:
        return Math.floor(Math.random() * (max - min + 1) + min);
      case 3:
        return (Math.random() * (max - min) + min).toFixed(decimalNum);
      default:
        return Math.random();
    }
  }
  public randomInteger(minNum, maxNum) {
    var max = 0,
      min = 0;
    minNum <= maxNum
      ? ((min = minNum), (max = maxNum))
      : ((min = maxNum), (max = minNum));
    switch (arguments.length) {
      case 1:
        return Math.floor(Math.random() * (max + 1));
      case 2:
        return Math.floor(Math.random() * (max - min + 1) + min);
      default:
        return Math.random();
    }
  }

  // 为batman附加物理计算
  private appendToBatman(): [p2.Body, egret.Bitmap] {
    // 产生一个新的batman
    let batman = this.makeBatman();

    // 用于随机产生计算位置
    let x = batman.width / 2;
    let y = batman.height / 2;
    let sx = this.game_scene.width;
    let sy = this.game_scene.height - 76;

    let batmanShape = new p2.Circle({
      radius: x,
    });

    let rigidBody = new p2.Body({
      mass: 1,
      position: [
        this.randomInteger(10, sx - x),
        this.randomInteger(76 + this.holes[0].height, sy - y),
      ],
    });

    rigidBody.addShape(batmanShape);
    rigidBody.displays = [batman];

    // 返回 batman刚体 和  batman显示对象
    return [rigidBody, batman];
  }
  // 为 mask 附加随机位置
  private appendToMask(): egret.Bitmap {
    // 产生一个新的batman
    let mask = this.makeMask();

    // 用于随机产生计算位置
    let x = mask.width / 2;
    let y = mask.height / 2;
    let sx = this.game_scene.width;
    let sy = this.game_scene.height - 76 - this.holes[0].height;

    mask.x = this.randomInteger(10, sx - x);
    mask.y = this.randomInteger(76 + this.holes[0].height, sy - y);

    // 返回 mask显示对象
    return mask;
  }

  // batman初始生成数量，最小1 最多 20个
  public batmanCount: number = 1;
  // 保存全部batman显示对象
  private batmans: egret.Bitmap[] = [];
  private batmanBodys: p2.Body[] = [];
  // 按指定数量产生batman
  public productBatman() {
    var nums: number = this.batmanCount;
    for (let index = 0; index < nums; index++) {
      let batman = this.appendToBatman();
      // 向物理世界添加本次batman刚体
      this.world.addBody(batman[0]);
      this.batmanBodys.push(batman[0]);
      // 添加batman
      this.batmans.push(batman[1]);
      this.addChild(batman[1]);
    }
    if (this.batmanCount <= 20) {
      this.batmanCount++;
    } else {
      // 大于20个后，数量在 10 到 20 之间随机
      this.batmanCount = this.randomInteger(10, 20);
    }
  }

  // mask 初始生成数量，最小1 最多 5 个
  public maskCount: number = 1;

  // 保存全部 mask 显示对象
  private masks: egret.Bitmap[] = [];
  private maskBodys: p2.Body[] = [];
  // 按指定数量产生 mask
  public productMask() {
    var nums: number = this.maskCount;
    for (let index = 0; index < nums; index++) {
      // 添加mask
      let mask = this.appendToMask();
      this.masks.push(mask);
      this.addChild(mask);
    }

    // 数量检测
    if (this.maskCount <= 5) {
      this.maskCount++;
    }
    {
      // 大于 5 个后，数量在 2 到 5 之间随机
      this.batmanCount = this.randomInteger(2, 5);
    }
  }

  private addWall(x: number, y: number) {
    let lwall: egret.Bitmap = new egret.Bitmap();
    lwall.texture = RES.getRes("wall2_png");
    // // 图片加到页面
    this.addChild(lwall);

    let wallShape = new p2.Box({
      width: lwall.width,
      height: lwall.height,
    });
    let wallBody = new p2.Body({
      type: p2.Body.STATIC,
      position: [x, y],
    });
    wallBody.addShape(wallShape);
    wallBody.displays = [lwall];
    this.world.addBody(wallBody);
  }

  // 四面墙壁
  private add4Wall() {
    // 下
    let planeShape: p2.Plane = new p2.Plane();
    let planeBody: p2.Body = new p2.Body({
      type: p2.Body.STATIC,
      position: [0, this.stage.stageHeight],
    });

    planeBody.angle = Math.PI;
    // planeBody.displays = [];
    planeBody.addShape(planeShape);
    this.world.addBody(planeBody);

    // 墙面 - 左
    let planeShapel: p2.Plane = new p2.Plane();
    let planeBodyl: p2.Body = new p2.Body({
      type: p2.Body.STATIC,
      position: [0, 0],
    });
    planeBodyl.angle = -Math.PI / 2;
    planeBodyl.addShape(planeShapel);
    this.world.addBody(planeBodyl);

    // 墙面 - 右
    let planeShaper: p2.Plane = new p2.Plane();
    let planeBodyr: p2.Body = new p2.Body({
      type: p2.Body.STATIC,
      position: [this.stage.stageWidth, 0],
    });
    planeBodyr.angle = Math.PI / 2;
    planeBodyr.addShape(planeShaper);
    this.world.addBody(planeBodyr);

    // 墙面 - 上
    let planeShapet: p2.Plane = new p2.Plane();
    let planeBodyt: p2.Body = new p2.Body({
      type: p2.Body.STATIC,
      position: [0, 63],
    });
    planeBodyt.addShape(planeShapet);
    this.world.addBody(planeBodyt);
  }
  private player: Player;
  // 生成游戏猪
  private addPlayer(bg) {
    let body = new p2.Body({
      mass: 1,
      position: [this.player_area.x + 42.25, this.player_area.y + 25.5],
    });

    let player = new Player(
      bg,
      body,
      this.batmans,
      this.holes,
      this.batmanBodys,
      this.world,
      this.masks,
      this.maskBodys
    );
    // 侦听 通知游戏结束
    player.addEventListener(
      PostEvent.GAME_OVER,
      () => {
        // 取消监听
        this.player.watchX.unwatch();
        // 游戏结束
        this.gameOver();
      },
      this
    );
    // 侦听积分增加
    player.addEventListener(
      PostEvent.INCREMNT_SCORE,
      (e) => {
        // 游戏结束
        this.score.text = e.score;
      },
      this
    );
    // 侦听是否吃完了batman
    player.addEventListener(
      PostEvent.INCREMENT_BATMANS,
      (e) => {
        this.productBatman();
      },
      this
    );
    // 侦听是否吃完了口罩 而且 batman 也吃完了
    player.addEventListener(
      PostEvent.INCREMENT_MASKS,
      (e) => {
          this.productMask();
      },
      this
    );
    this.player = player;

    this.addChild(player);

    let shape = new p2.Circle({
      radius: (player.pig.width * player.pig.scaleX) / 2,
    });

    body.addShape(shape);
    body.displays = [player];
    this.world.addBody(body);
  }

  protected partAdded(partName: string, instance: any): void {
    super.partAdded(partName, instance);
  }

  private nickname: eui.Label;
  private avatar: eui.Image;
  protected createChildren(): void {
    super.createChildren();
    // 名称
    if (window && window.playerInfo) {
      this.nickname.text = window.playerInfo.nickname;
      this.avatar.source = window.playerInfo.headimgurl;
    }
    // 头像
    // 把音乐放起来
    let s = LoadBGM.getInstance();
    if (s.prePlayStatus) {
      s.playBGM();
      s.setPlayStatus(true);
    }
    this.is_trumpet.visible = s.getPlayStatus();
  }

  protected childrenCreated(): void {
    super.childrenCreated();
    // 设置音乐播放状态
  }

  // 游戏结束
  public gameOver() {
    // 关闭掉声音
    LoadBGM.getInstance().stopBGM();
    // 更新积分
    try {
      if (window.playerInfo && window.playerInfo.openid) {
        window.platform.addJifen(parseInt(this.score.text)).then((res) => {
          console.log(res);
        });
      }
    } catch (error) {
      console.log("添加积分失败!");
    }
    // 让 main 打开游戏结束界面
    let p = new PostEvent(
      PostEvent.GAME_OVER,
      false,
      false,
      parseInt(this.score.text)
    );
    this.dispatchEvent(p);
  }
}

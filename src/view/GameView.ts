// 游戏界面
class GameView extends eui.Component implements eui.UIComponent {
  // 玩家生成区域
  public player_area: eui.Group;
  // 喇叭组
  private trumpet_check: eui.Button;
  // 喇叭声音图标
  private is_trumpet: eui.Image;
  // 关卡分
  private passScore: eui.Label;
  // 提示文本
  public tip: eui.Label;
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
    this.width = this.stage.stageWidth;
    this.height = this.stage.stageHeight;
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
    // 生成物理世界
    let world: p2.World = new p2.World({
      // 重力
      gravity: [0, 0],
    });

    // Pre-fill object pools. Completely optional but good for performance!
    world.overlapKeeper.recordPool.resize(16);
    world.narrowphase.contactEquationPool.resize(1024);
    world.narrowphase.frictionEquationPool.resize(1024);

    // Enables sleeping of bodies
    world.sleepMode = p2.World.BODY_SLEEPING;

    // 弹性
    world.defaultContactMaterial.restitution = 1;

    world.on(
      "endContact",
      (e) => {
        this.player.checkHit();
      },
      this
    );
    this.world = world;

    // 添加四个黑洞
    this.holeAroundMap();

    // 添加四周四面墙壁
    this.add4Wall();

    // 添加玩家
    this.addPlayer(this);

    // 制造batman到物理世界并显示在舞台
    this.productBatman();

    // 制造 mask 显示在舞台
    this.productMask();

    // 制造 boom 显示在舞台
    this.productBoom();

    // 添加 player
    this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdate, this);

    // 提示关卡
    this.player.feedbackPassCount(this);
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

  // 屏幕刷新函数
  private onUpdate() {
    this.world.step(1);

    // 遍历每个刚体
    this.world.bodies.forEach((body) => {
      // 如果不为null，则更新素材的坐标和角度
      if (body.displays) {
        // 位置
        body.displays[0].x = body.position[0];
        body.displays[0].y = body.position[1];
      }
    });
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

  /**
  * 产生炸弹
  */
  public makeBoom() {
    let boom: egret.Bitmap = new egret.Bitmap(RES.getRes("boom_png"));
    boom.width = boom.width / 2;
    boom.height = boom.height / 2;
    boom.anchorOffsetX = boom.width / 2;
    boom.anchorOffsetY = boom.height / 2;
    return boom;
  }

  private makeMask() {
    let mask: egret.Bitmap = new egret.Bitmap(RES.getRes("mask_png"));
    mask.width = mask.width / 3;
    mask.height = mask.height / 3;
    mask.anchorOffsetX = mask.width / 2;
    mask.anchorOffsetY = mask.height / 2;
    return mask;
  }

  public static randomInteger(minNum, maxNum) {
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
    let sx = this.game_scene.width - x - 20;
    let sy = this.game_scene.height - 76 - this.holes[0].height;

    let batmanShape = new p2.Circle({
      radius: x,
    });

    let rigidBody = new p2.Body({
      mass: 1,
      position: [
        GameView.randomInteger(x, sx - x),
        GameView.randomInteger(y + 76 + this.holes[0].height, sy - y),
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
    let sx = this.game_scene.width - x - 20;
    let sy = this.game_scene.height - 76 - this.holes[0].height;

    mask.x = GameView.randomInteger(x, sx - x);
    mask.y = GameView.randomInteger(y + 76 + this.holes[0].height, sy - y);

    // 返回 mask显示对象
    return mask;
  }
    // 为 boom 附加随机位置
  private appendToBoom(): egret.Bitmap {
    // 产生一个新的batman
    let boom = this.makeBoom();

    // 用于随机产生计算位置
    let x = boom.width / 2;
    let y = boom.height / 2;
    let sx = this.game_scene.width - x - 20;
    let sy = this.game_scene.height - 76 - this.holes[0].height;

    boom.x = GameView.randomInteger(x, sx - x);
    boom.y = GameView.randomInteger(y + 76 + this.holes[0].height, sy - y);

    // 返回 mask显示对象
    return boom;
  }
  // batman初始生成数量，最小3 最多 20个
  public batmanCount: number = 3;
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
      this.batmanCount = GameView.randomInteger(10, 20);
    }
  }

  // mask 初始生成数量，最小1 最多 5 个
  public maskCount: number = 1;

  // 保存全部 mask 显示对象
  private masks: egret.Bitmap[] = [];
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
    } else {
      // 大于 5 个后，数量在 2 到 5 之间随机
      this.batmanCount = GameView.randomInteger(2, 5);
    }
  }
  private booms: egret.Bitmap[] = [];
  private boomCount: number = 1;
    // 按指定数量产生 boom
  public productBoom() {
     var nums: number = this.boomCount;
    for (let index = 0; index < nums; index++) {
      const boom = this.appendToBoom();
      this.booms.push(boom);
      // 添加 boom 到舞台
      this.addChild(boom);
    }
        // 数量检测
    if (this.boomCount <= 5) {
      this.boomCount++;
    } else {
      // 大于 5 个后，数量在 2 到 5 之间随机
      this.boomCount = GameView.randomInteger(2, 5);
    }
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
      this.tip,
      this.booms
    );
    // 侦听 通知游戏结束
    player.addEventListener(
      PostEvent.GAME_OVER,
      () => {
        // 取消属性监听 和 事件侦听
        this.player.watchX.unwatch();
        this.bg.removeEventListener(egret.TouchEvent.TOUCH_END, () => {}, this);
        this.bg.removeEventListener(
          egret.TouchEvent.TOUCH_MOVE,
          () => {},
          this
        );
        player.pig.removeEventListener(
          egret.TouchEvent.TOUCH_BEGIN,
          () => {},
          this
        );
        player.pig.removeEventListener(
          egret.TouchEvent.TOUCH_END,
          () => {},
          this
        );
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onUpdate, this);
        this.world.off("endContact", () => {});
        // 监听面板被点击事件
        this.explain_panel.removeEventListener(
          PostEvent.READ_EXPLAIN,
          this.createGameScene,
          this
        );

        // 侦听声音按钮的触摸点击事件
        this.trumpet_check.removeEventListener(
          egret.TouchEvent.TOUCH_TAP,
          this.trumpetCheck,
          this
        );

        this.trumpet_check.removeEventListener(
          egret.TouchEvent.TOUCH_BEGIN,
          () => {},
          this
        );
        // 取消监听
        player.removeEventListener(PostEvent.GAME_OVER, () => {}, this);
        player.removeEventListener(PostEvent.INCREMNT_SCORE, () => {}, this);
        player.removeEventListener(
          PostEvent.DECREMENT_PASSSCORE,
          () => {},
          this
        );
        player.removeEventListener(PostEvent.INCREMENT_BATMANS, () => {}, this);
        player.removeEventListener(PostEvent.INCREMENT_MASKS, () => {}, this);
        player.removeEventListener(PostEvent.INCREMENT_BOOMS, () => {}, this);
        // 游戏结束
        this.gameOver();
      },
      this
    );
    // 侦听成绩积分
    player.addEventListener(
      PostEvent.INCREMNT_SCORE,
      (e) => {
        // 赋积分
        this.score.text = e.score;
      },
      this
    );
    // 侦听关卡分
    player.addEventListener(
      PostEvent.DECREMENT_PASSSCORE,
      (e) => {
        // 赋关卡分
        this.passScore.text = e.passScore;
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
    // 侦听增加新的口罩
    player.addEventListener(
      PostEvent.INCREMENT_MASKS,
      (e) => {
        // 从显示列表拿下来之前没吃完的
        if (this.masks.length > 0) {
          this.masks.forEach((item) => {
            this.removeChild(item);
          });
        }
        // 清除掉没吃完的
        this.masks.splice(0);
        // 生产新的
        this.productMask();
      },
      this
    );
    // 侦听增加新的炸弹
    player.addEventListener(
      PostEvent.INCREMENT_BOOMS,
      (e) => {
        // 从显示列表拿下来之前没吃完的
        if (this.booms.length > 0) {
          this.booms.forEach((item) => {
            this.removeChild(item);
          });
        }
        // 清除掉没吃完的
        this.booms.splice(0);
        // 生产新的
        this.productBoom();
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
    if (window && window.PlayerInfo) {
      if (window.PlayerInfo.nickname) {
        this.nickname.text = window.PlayerInfo.nickname;
      }
      if (window.PlayerInfo.headimgurl) {
        // 加载网络图片
        var imgLoader: egret.ImageLoader = new egret.ImageLoader();
        egret.ImageLoader.crossOrigin = "anonymous";
        imgLoader.load(window.PlayerInfo.headimgurl);
        imgLoader.once(
          egret.Event.COMPLETE,
          (e, index) => {
            if (e.currentTarget.data) {
              let texture = new egret.Texture();
              texture.bitmapData = e.currentTarget.data;
              this.avatar.source = texture;
            }
          },
          this
        );
      }
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
      if (window.PlayerInfo && window.PlayerInfo.openid) {
        window.platform.postUserScore(this.score.text);
      }
    } catch (error) {}
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

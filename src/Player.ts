enum FeedbackType {
  // 自定义反馈内容
  none = 0,
  // 反馈得分
  score = 1,
  // 反馈减少成绩
  descoreScore = 2,
  // 反馈减少的关卡分
  descorePassScore = 3,
}
class Player extends egret.Sprite {
  public arrow: egret.Bitmap = null;
  public disk: egret.Bitmap = null;
  public pig: egret.Bitmap = null;
  public diskShow: boolean = false;
  public bg = null;
  public body: p2.Body = null;
  // 当前关卡的，通关加成分数
  private passScore: number = 0;
  // batmans
  private batmans: egret.Bitmap[];
  // batmans body
  private batmanBodys: p2.Body[];
  // 黑洞们
  public holes: egret.Bitmap[];
  public world: p2.World;
  // mask
  private masks: egret.Bitmap[];
  private maskBodys: p2.Body[];
  // 监听属性实例
  public watchX: eui.Watcher;

  // 节流函数
  throttle(func, delay) {
    var timer = null;
    return function () {
      var context = this;
      var args = arguments;
      if (!timer) {
        timer = setTimeout(function () {
          func.apply(context, args);
          timer = null;
        }, delay);
      }
    };
  }

  // 倒计时减分的定时器标识
  private _countdownTimer: number;
  public tip: eui.Label;
  public booms: egret.Bitmap[];
  constructor(
    bg,
    body,
    batmans: egret.Bitmap[],
    holes: egret.Bitmap[],
    batmanBodys: p2.Body[],
    world: p2.World,
    masks: egret.Bitmap[],
    tip: eui.Label,
    booms: egret.Bitmap[]
  ) {
    super();

    // 炸弹
    this.booms = booms;

    // 提示文本
    this.tip = tip;

    // batmans
    this.batmans = batmans;
    // batmans body
    this.batmanBodys = batmanBodys;
    // masks
    this.masks = masks;
    // 黑洞们
    this.holes = holes;
    // world
    this.world = world;
    // 刚体
    this.body = body;
    this.bg = bg;
    // 创建对象
    this.createObject();

    this.addEventListener(egret.Event.ADDED, this.initStep, this);
  }
  /**
   * 需要在player初始以后，完成的初始工作在这里写
   */
  private initStep() {
    // 移除侦听
    this.removeEventListener(egret.Event.ADDED, this.initStep, this);
    // 执行初始化工作
    // 初始关卡分
    // 当x发生变化就检测是否吃到东西
    this.watchX = eui.Watcher.watch(
      this,
      ["x"],
      this.throttle(() => {
        this.checkHit();
      }, 20),
      this
    );
    // 绑定触摸移动事件
    this.bindTouchEvent();
    // 绑定倒计时减分数事件
    this.bindCountdownEvent();
    // 打开每秒减少通关分
    this.openDecrePassScore();
  }
  /**
   * 初始化通关分数
   */
  private initPassScore() {
    // 根据通关数，生成不同的通关成绩
    switch (this.passCount) {
      case 1:
        this.passScore = GameView.randomInteger(10, 20);
        break;
      case 2:
        this.passScore = GameView.randomInteger(20, 50);
        break;
      case 3:
        this.passScore = GameView.randomInteger(30, 50);
        break;
      case 4:
        this.passScore = GameView.randomInteger(60, 80);
        break;
      case 5:
        this.passScore = GameView.randomInteger(80, 100);
        break;
      case 6:
        this.passScore = GameView.randomInteger(100, 150);
        break;
      case 7:
        this.passScore = GameView.randomInteger(150, 200);
        break;
      default:
        // 关卡大的时候，就直接 50 - 500 随机
        this.passScore = GameView.randomInteger(100, 500);
        break;
    }
  }

  /**
   * 绑定倒计时扣分事件
   */
  private tipContent: string[] = [
    "推到黑洞消灭大反派",
    "不动起来会扣分呢！",
    "还有4秒就扣分了",
    "还有3秒就扣分了",
    "还有2秒就扣分了",
    "还有1秒就扣分了",
    "哎呀, 掉了3分！",
    "哎呀，掉了1分！",
  ];
  // 计数
  private fallScoreCount: number = 0;
  private bindCountdownEvent() {
    this._countdownTimer = setInterval(() => {
      this.feedbackCountdonw();
      // 计数提示
      if (this.score > 3) {
        // 掉3分
        this.fallScoreCount++;
      } else {
        // 掉一分
        this.fallScoreCount = this.tipContent.length - 1;
      }
      if (this.fallScoreCount > 6) {
        // 重置计数
        this.fallScoreCount = 0;
        // 判断是否足够扣3分成绩
        let decrementScore = this.score > 3 ? 3 : 1;
        // 如果分数大 3 就扣分
        if (this.score != 0) {
          // 减掉分数
          this.decrementScore(decrementScore);
          // 发出游戏场景更新显示的分数事件
          this.dispatchEvent(
            new PostEvent(PostEvent.INCREMNT_SCORE, false, false, this.score)
          );
        } else {
          // 分数不够减的时候 清除掉倒计时
          clearInterval(this._countdownTimer);
          // 发出游戏场景更新显示的分数事件
          this.dispatchEvent(
            new PostEvent(PostEvent.INCREMNT_SCORE, false, false, this.score)
          );
        }
      }
    }, 1000);
  }

  // 倒计时扣分反馈
  private feedbackCountdonw() {
    // 提示
    this.tip.text = this.tipContent[this.fallScoreCount];
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
    this.bg.addChild(dp);
    this.disk = dp;

    // 猪
    let pig: egret.Bitmap = new egret.Bitmap();
    pig.texture = RES.getRes("player_png");
    pig.width = pig.width / 2.5;
    pig.height = pig.height / 2.5;
    pig.anchorOffsetX = pig.width / 2;
    pig.anchorOffsetY = pig.height / 2;
    this.addChild(pig);
    pig.touchEnabled = true;
    this.pig = pig;
  }

  //  触摸控制
  private bindTouchEvent() {
    // 触摸背景时，控制面板启动

    // 开始移动
    this.bg.addEventListener(
      egret.TouchEvent.TOUCH_BEGIN,
      (e) => {
        // 每次移动清除掉定下的减分数定时器
        window.clearInterval(this._countdownTimer);
        // 倒计时扣分反馈重置
        this.fallScoreCount = 0;
        this.feedbackCountdonw();

        this.disk.x = e.stageX;
        this.disk.y = e.stageY;
        this.disk.visible = true;
        this.arrow.visible = true;
      },
      this
    );

    // 移动中
    this.bg.addEventListener(
      egret.TouchEvent.TOUCH_MOVE,
      (e) => {
        let handPoint = new egret.Point(e.stageX, e.stageY);
        let diskPoint = new egret.Point(this.disk.x, this.disk.y);

        // 获取角度
        let angle: number = Math.atan2(
          handPoint.y - diskPoint.y,
          handPoint.x - diskPoint.x
        );

        // 箭头旋转
        this.arrow.rotation = angle * (180 / Math.PI);

        // 箭头长度
        let distance = egret.Point.distance(diskPoint, handPoint);
        if (distance > 75) distance = 75;
        if (distance < 10) distance = 10;
        // 对应到比例 0 ~ 1
        this.arrow.scaleX = distance / 100;
        this.arrow.scaleY = distance / 100;
      },
      this
    );

    // 移动结束
    this.bg.addEventListener(
      egret.TouchEvent.TOUCH_END,
      (e) => {
        // 将倒计时开启
        this.bindCountdownEvent();
        let handPoint = new egret.Point(e.stageX, e.stageY);
        let diskPoint = new egret.Point(this.disk.x, this.disk.y);

        let xpower = handPoint.x - diskPoint.x;
        let ypower = handPoint.y - diskPoint.y;

        this.body.applyForce([xpower / 5, ypower / 5], [0, 0]);

        // 重置回初始状态
        this.disk.visible = false;
        this.arrow.visible = false;
      },
      this
    );
  }
  // 积分
  public score: number = 0;

  /**
   * 扣分函数
   * @param decrementScore 要减掉的分数
   */
  public decrementScore(decrementScore: number) {
    // 减掉分数
    this.score -= decrementScore;
    // 在 pig 边上生成提示
    this.feedbackTips(
      FeedbackType.descoreScore,
      decrementScore,
      -30,
      -50,
      this
    );
  }

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
          // 显示列表取下
          this.bg.removeChild(b);
          //    移除batman
          this.batmans.splice(index, 1);
          //    移除掉刚体
          this.world.removeBody(this.batmanBodys[index]);
          this.batmanBodys.splice(index, 1);
          this.incrementScore(10);
          // 在batman被吃掉位置生成得分反馈
          this.feedbackTips(FeedbackType.score, 10, b.x, b.y, this.bg);
          // 解除引用
          b = null;
          // 播放一次吃掉的音效
          this.playHitSound();
        }
      });
      // 检测猪是否掉进黑洞
      this.checkPig(rectH);
    });
    // 检测口罩
    this.masks.forEach((m, index) => {
      let rectM = new egret.Rectangle(m.x, m.y, m.width, m.height);
      // 检测口罩是否被猪吃了
      if (this.checkMask(rectM)) {
        // 吃掉 mask
        egret.Tween.get(m).to({ alpha: 0 }, 200);
        //    移除 mask
        this.masks.splice(index, 1);
        // 得分增加 20
        this.incrementScore(20);
        // 在 mask 被吃掉位置生成得分反馈
        this.feedbackTips(FeedbackType.score, 20, m.x, m.y, this.bg);
        // 播放一次吃掉的音效
        this.playHitSound();
      }
    });
    // 检测炸弹是否被猪吃了
    this.booms.forEach((boom, index) => {
      let rectBoom = new egret.Rectangle(
        boom.x,
        boom.y,
        boom.width,
        boom.height
      );
      // 检测口罩是否被猪吃了
      if (this.checkBoom(rectBoom)) {
        // 吃掉 boom
        egret.Tween.get(boom).to({ alpha: 0 }, 200);
        //    移除 boom
        this.booms.splice(index, 1);
        const luckValue = GameView.randomInteger(1, 2);
        if (this.score >= 5 && luckValue != 1) {
          // 得分减 5
          this.decrementScore(5);
        } else {
          // 在 pig 边上生成提示
          this.feedbackTips(
            FeedbackType.none,
            0,
            -90,
            -65,
            this,
            "假炸弹不扣分, 辛运"
          );
        }
        // 播放一次吃掉的音效
        this.playHitSound();
      }
    });

    // 最后看是否吃完了batman，再给制造一些, 吃完就通关
    if (this.batmans.length === 0) {
      // 将本次关卡加成分加到成绩上
      this.incrementScore(this.passScore);
      // 提示通关得分加成
      this.feedbackTips(FeedbackType.score, this.passScore, 0, -60, this);
      // 打开每秒减少通关分
      this.openDecrePassScore();
      // 提示新关卡
      this.feedbackPassCount(this.bg);
      // 制造新关卡怪
      // 新的口罩
      this.dispatchEvent(new PostEvent(PostEvent.INCREMENT_MASKS));
      // 新的batman
      this.dispatchEvent(new PostEvent(PostEvent.INCREMENT_BATMANS));
      // 新的炸弹
      this.dispatchEvent(new PostEvent(PostEvent.INCREMENT_BOOMS));
    }
  }

  // 通关分减少，每秒减1分，每次通关被重置
  private _decrePassScoreTimer: number;
  private openDecrePassScore() {
    // 重置关卡分
    this.passScore = 0;
    // 清除之前开启的
    clearInterval(this._decrePassScoreTimer);
    // 调用生成新的通关分
    this.initPassScore();
    // 发出游戏场景更新显示的分数事件
    this.dispatchEvent(
      new PostEvent(
        PostEvent.DECREMENT_PASSSCORE,
        false,
        false,
        0,
        this.passScore
      )
    );
    this._decrePassScoreTimer = setInterval(() => {
      if (this.passScore === 0) {
        // 停止减分
        clearInterval(this._decrePassScoreTimer);
      } else {
        // 减通关加成分的百分之2分
        // 得出要减的分数，并取整
        const decre = Math.ceil(this.passScore * 0.02);
        // 减分
        this.passScore -= decre;
        // 反馈提示
        this.feedbackTips(FeedbackType.descorePassScore, decre, 15, -50, this);
        // 更新游戏场景的通关分显示
        this.dispatchEvent(
          new PostEvent(
            PostEvent.DECREMENT_PASSSCORE,
            false,
            false,
            0,
            this.passScore
          )
        );
      }
    }, 5000);
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
      // 通知 GameView 游戏结束了
      this.dispatchEvent(new PostEvent(PostEvent.GAME_OVER));
    }
  }

  /**
   * 检测口罩 是否被猪吃了
   * @returns true 被吃了 false没被吃
   */
  public checkMask(mask: egret.Rectangle): boolean {
    // 检测pig
    const pigRect = new egret.Rectangle(
      this.body.position[0],
      this.body.position[1],
      this.pig.width,
      this.pig.height
    );

    if (pigRect.intersects(mask)) {
      return true;
    }
    return false;
  }

  /**
   * 检测炸弹 是否被猪吃了
   * @returns true 被吃了，false没被吃
   */
  public checkBoom(boom: egret.Rectangle): boolean {
    // 检测 pig
    const pigRect = new egret.Rectangle(
      this.body.position[0],
      this.body.position[1],
      this.pig.width,
      this.pig.height
    );

    if (pigRect.intersects(boom)) {
      return true;
    }
    return false;
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
   * 在某个显示容器生成反馈提示，包含 加分、减分、自定义提示内容
   * @param type 反馈类型
   * @param value 反馈的值
   * @param x 提示的x位置
   * @param y 提示的y位置
   * @param area 要添加提示的显示容器
   */
  public feedbackTips(
    type: FeedbackType,
    score: number,
    x: number,
    y: number,
    area: egret.DisplayObjectContainer,
    customVal: string = "击退大反派，加油！"
  ) {
    let value = "",
      delayTime = 1000;
    let t = new eui.Label();
    t.x = x;
    t.y = y;
    t.fontFamily = "Consolas";
    t.size = 24;
    switch (type) {
      case FeedbackType.none:
        value = customVal;
        // 绿色
        t.textColor = 0x16a05d;
        delayTime = 2000;
        break;
      case FeedbackType.score:
        value = `+${score}分`;
        // 绿色
        t.textColor = 0x16a05d;
        break;
      case FeedbackType.descoreScore:
        value = `-${score}分`;
        // 黄色
        t.textColor = 0xffce44;
        break;
      case FeedbackType.descorePassScore:
        value = `-${score}关卡分`;
        // 黄色
        t.textColor = 0xffce44;
        break;
      default:
        break;
    }
    // 赋提示文本
    t.text = value;
    // 附加动画
    egret.Tween.get(t)
      .to({ alpha: 0, y: y - 10 }, delayTime)
      .call(() => {
        // 在动画后移除
        area.removeChild(t);
        // 解除引用
        t = null;
      });

    // 添加到显示容器
    area.addChild(t);
  }

  /**
   * 反馈关数 并 自增关数
   */
  public passCount: number = 1;
  public feedbackPassCount(
    area: egret.DisplayObjectContainer,
    passCount: number = this.passCount,
    y: number = this.bg.height / 2
  ) {
    let t = new eui.Label();
    t.width = this.stage.stageWidth;
    t.y = y;
    t.textAlign = egret.HorizontalAlign.CENTER;
    t.textColor = 0xffffff;
    t.fontFamily = "Mircrosoft YaHei";
    t.textFlow = <Array<egret.ITextElement>>[
      {
        text: "第 ",
        style: {
          textColor: 0xffce45,
          size: 50,
          stroke: 1,
          strokeColor: 0xf1f1f1,
        },
      },
      {
        text: `${passCount}`,
        style: {
          textColor: 0xdd5145,
          size: 80,
          stroke: 1,
          strokeColor: 0xf1f1f1,
        },
      },
      {
        text: " 关",
        style: {
          textColor: 0xffce45,
          size: 50,
          stroke: 1,
          strokeColor: 0xf1f1f1,
        },
      },
      { text: "\n" },
      {
        text: "关卡分:" + this.passScore,
        style: {
          textColor: 0x16a05d,
          size: 24,
        },
      },
    ];
    t.size = 50;
    t.bold = true;
    egret.Tween.get(t)
      .to({ alpha: 1, y: y - 30 }, 2000)
      .call(() => {
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

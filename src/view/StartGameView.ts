// 进入游戏界面
class StartGameView extends eui.Component implements eui.UIComponent {
  // 开始游戏背景
  private start_bg: eui.Image;
  // 开始游戏界面
  private start_group: eui.Group;
  // 开始按钮
  private start_button: eui.Button;
  // 排行榜
  private ranking_button: eui.Button;
  // 喇叭
  private trumpet_check: eui.Button;
  // 喇叭声音图标
  private is_trumpet: eui.Image;
  // 朱望仔图片
  private pig_bg_img: eui.Image;
  // 大反派图片
  private batman_bg_img: eui.Image;

  public constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
  }

  // 组件实例化完之后，自动调用这个函数
  private onComplete() {
    // 提交用户信息
    platform.postUserInfo()
    this.width = this.stage.stageWidth;
    this.height = this.stage.stageHeight;
    // 播放音乐
    let ms = LoadBGM.getInstance();
    ms.SwitchPlay();
    // 设置音乐播放状态
    this.is_trumpet.visible = ms.getPlayStatus();
    // 侦听开始按钮的触摸点击事件
    this.start_button.addEventListener(
      egret.TouchEvent.TOUCH_TAP,
      this.startButton,
      this
    );

    // 按钮 触摸动画
    this.start_button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
      TouchEvents.onEvent(this.start_button)
      egret.Tween.get(this.start_button).to({ scaleX: 0.95, scaleY: 0.95 }, 150)
    }, this)

    this.trumpet_check.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
      TouchEvents.onEvent(this.trumpet_check)
      egret.Tween.get(this.trumpet_check).to({ scaleX: 0.9, scaleY: 0.9 }, 150)
    }, this)

    this.ranking_button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
      TouchEvents.onEvent(this.ranking_button)
      egret.Tween.get(this.ranking_button).to({ scaleX: 0.95, scaleY: 0.95 }, 150)
    }, this)

    // 侦听排行榜按钮的触摸点击事件
    this.ranking_button.addEventListener(
      egret.TouchEvent.TOUCH_TAP,
      this.rankingButton,
      this
    );

    // 侦听声音按钮的触摸点击事件
    this.trumpet_check.addEventListener(
      egret.TouchEvent.TOUCH_TAP,
      this.trumpetCheck,
      this
    );
  }

  private startButton() {
    // 隐藏开始游戏界面
    this.parent.removeChild(this);
    // 构建一个事件
    let p: PostEvent = new PostEvent(PostEvent.START_GAME);
    // 派发出去
    this.dispatchEvent(p);
  }

  // 排行榜
  private rankingButton() {
    this.dispatchEvent(new PostEvent(PostEvent.Ranking_List))
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

  protected partAdded(partName: string, instance: any): void {
    super.partAdded(partName, instance);
  }

  //元素第一次被添加到舞台时回调一次。此时才可以获取元素
  protected createChildren(): void {
    super.createChildren();
  }

  // 创建元素之后，被回调执行,紧接 onComplete 之后
  protected childrenCreated(): void {
    super.childrenCreated();
    // 动画出现
    this.startAnimate();
  }

  private startAnimate() {
    egret.Tween.get(this.pig_bg_img, { loop: true }).to({ x: 45, y: -96 }, 1000).wait(100)
      .to({ x: 42.87, y: -88.13 }, 1000).wait(100)
    egret.Tween.get(this.batman_bg_img, { loop: true }).to({ rotation: 5, width: 280, height: 211.6 }, 1000).wait(100)
      .to({ rotation: 0, width: 270, height: 201.6 }, 1000).wait(100)
  }
}

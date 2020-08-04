// 成绩单
class ReportCard extends eui.Component implements eui.UIComponent {
  // 返回
  private go_back: eui.Button;
  // 用户最高成绩
  public score: eui.Label;
  // 昵称
  private nickname: eui.Label;

  private bg: eui.Image;

  // 用户当前的成绩
  public currentScore: string;

  public constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
  }

  private onComplete() {
    this.width = this.stage.stageWidth;
    this.height = this.stage.stageHeight;
    // 返回按钮
    this.go_back.addEventListener(
      egret.TouchEvent.TOUCH_TAP,
      this.goBack,
      this
    );

    this.go_back.addEventListener(
      egret.TouchEvent.TOUCH_BEGIN,
      () => {
        TouchEvents.onEvent(this.go_back);
        egret.Tween.get(this.go_back).to({ scaleX: 0.95, scaleY: 0.95 }, 150);
      },
      this
    );
  }

  private goBack() {
    // 销毁自己的界面
    this.parent.removeChild(this);
    this.dispatchEvent(
      new PostEvent(
        PostEvent.GAME_OVER,
        false,
        false,
        Number(this.currentScore)
      )
    );
  }

  protected partAdded(partName: string, instance: any): void {
    super.partAdded(partName, instance);
  }

  protected childrenCreated(): void {
    super.childrenCreated();
  }
  protected createChildren(): void {
    super.createChildren();
    if (window && window.PlayerInfo && window.PlayerInfo.nickname) {
      this.nickname.text = window.PlayerInfo.nickname;
      if (window.PlayerInfo.openid) {
        platform.getScoreByOpenid().then((res) => {
          let r = JSON.parse(res);
          if (r.data && r.data.score) {
            this.score.text = r.data.score;
          } else {
            this.score.text = "数据异常";
          }
        });
      }
    } else {
      this.nickname.text = "数据异常";
    }
  }
}

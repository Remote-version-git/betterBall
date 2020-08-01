// 成绩单
class ReportCard extends eui.Component implements eui.UIComponent {
  // 返回
  private go_back: eui.Button;
  // 成绩
  public score: eui.Label;
  // 昵称
  private nickname: eui.Label;

  private bg: eui.Image;

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

    this.go_back.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
      TouchEvents.onEvent(this.go_back)
      egret.Tween.get(this.go_back).to({ scaleX: 0.95, scaleY: 0.95 }, 150)
    }, this)
  }

  private goBack() {
    // 销毁自己的界面
    this.parent.removeChild(this);
    this.dispatchEvent(new PostEvent(PostEvent.GAME_OVER, false, false, Number(this.score.text)));
  }

  protected partAdded(partName: string, instance: any): void {
    super.partAdded(partName, instance);
  }

  protected childrenCreated(): void {
    super.childrenCreated();
    if (window && window.playerInfo && window.playerInfo.nickname) {
      this.nickname.text = window.playerInfo.nickname;
    } else {
      this.nickname.text = "获取名称失败";
    }
  }
}

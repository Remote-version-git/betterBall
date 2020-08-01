// 游戏结束后 游戏得分
class ScoreGameView extends eui.Component implements eui.UIComponent {
  // 再玩一次
  private restart_button: eui.Button;
  public score: eui.Label;
  // 查看排行榜
  private showRankingList: eui.Button;
  // 奖杯
  private trophy_img: eui.Image;
  // 生成成绩单
  private report_card_btn: eui.Button;

  private bg: eui.Image;

  public constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
  }

  private onComplete() {
    this.bg.width = this.stage.stageWidth;
    this.bg.height = this.stage.stageHeight;
    // 侦听再玩一次的触摸点击事件
    this.restart_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
    this.restart_button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
      TouchEvents.onEvent(this.restart_button)
      egret.Tween.get(this.restart_button).to({ scaleX: 0.95, scaleY: 0.95 }, 150)
    }, this)
    // 侦听查看排行榜的触摸点击事件
    this.showRankingList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.RankingButton, this);
    this.showRankingList.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
      TouchEvents.onEvent(this.showRankingList)
      egret.Tween.get(this.showRankingList).to({ scaleX: 0.95, scaleY: 0.95 }, 150)
    }, this)
    // 侦听生成成绩单的触摸点击事件
    this.report_card_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reportCardButton, this);
    this.report_card_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
      TouchEvents.onEvent(this.report_card_btn)
      egret.Tween.get(this.report_card_btn).to({ scaleX: 0.95, scaleY: 0.95 }, 150)
    }, this)
  }

  protected partAdded(partName: string, instance: any): void {
    super.partAdded(partName, instance);
  }

  protected createChildren(): void {
    super.createChildren();
  }

  protected childrenCreated(): void {
    super.childrenCreated();
    // 动画出现
    this.startAnimate();
  }

  private startAnimate() {
    let trophy = egret.Tween.get(this.trophy_img, { loop: true });
    trophy.to({ scaleX: 1.1, scaleY: 1.1 }, 1000).wait(100)
      .to({ scaleX: 1, scaleY: 1 }, 1000).wait(100)
  }

  private reportCardButton() {
    // 销毁自已的界面
    this.parent.removeChild(this);
    this.dispatchEvent(new PostEvent(PostEvent.Report_Card, false, false, Number(this.score.text)));
  }

  private RankingButton() {
    this.dispatchEvent(new PostEvent(PostEvent.Ranking_List))
  }

  private restartGame() {
    // 销毁自已的界面
    this.parent.removeChild(this);
    // 构建一个事件
    let p: PostEvent = new PostEvent(PostEvent.RESTART_GAME);
    // 派发出去
    this.dispatchEvent(p);
  }
}

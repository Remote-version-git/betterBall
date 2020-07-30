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

  public constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
  }

  private onComplete() {
    let s: egret.Sound = RES.getRes("bgm_mp3");
    s.play();
    this.restart_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
    this.showRankingList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.RankingButton, this);
    this.report_card_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reportCardButton, this);
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
    let trophy = egret.Tween.get(this.trophy_img);
    trophy.to({ scaleX: 1.1, scaleY: 1.1 }, 1000).wait(100)
      .to({ scaleX: 1, scaleY: 1 }, 1000).wait(100)
  }

  private reportCardButton() {
    // 销毁自已的界面
    this.parent.removeChild(this);
    this.dispatchEvent(new PostEvent(PostEvent.Report_Card))
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

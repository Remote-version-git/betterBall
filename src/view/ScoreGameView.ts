// 游戏结束后 游戏得分
class ScoreGameView extends eui.Component implements eui.UIComponent {
  // 再玩一次
  private restart_button: eui.Button;
  // 查看排行榜
  private showRankingList: eui.Button;

  public constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
  }

  private onComplete() {
    this.restart_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
    this.showRankingList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.RankingButton, this);
  }

  protected partAdded(partName: string, instance: any): void {
    super.partAdded(partName, instance);
  }

  protected childrenCreated(): void {
    super.childrenCreated();
  }

  private RankingButton() {
    console.log('查看排行榜');

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

// 游戏结束后 游戏得分
class ScoreGameView extends eui.Component implements eui.UIComponent {
  private restart_button: eui.Button;
  public score: eui.Label;
  public constructor() {
	super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
  }

  private onComplete() {
	  this.restart_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
  }

  protected partAdded(partName: string, instance: any): void {
    super.partAdded(partName, instance);
  }
  protected createChildren(): void {
    super.createChildren();
  }

  protected childrenCreated(): void {
    super.childrenCreated();
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

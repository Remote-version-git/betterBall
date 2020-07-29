// 游戏界面
class GameView extends eui.Component implements eui.UIComponent {
  public constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
  }

  private onComplete() {
	测试代码，一秒后进入结束界面
    window.setTimeout(() => {
		this.gameOver();
	}, 1000)
  }

  protected partAdded(partName: string, instance: any): void {
    super.partAdded(partName, instance);
  }

  protected childrenCreated(): void {
    super.childrenCreated();
  }

  public gameOver() {
    // 自身销毁
    this.parent.removeChild(this);

    // 让 main 打开游戏结束界面
    let p = new PostEvent(PostEvent.GAME_OVER);
    this.dispatchEvent(p);
  }
}

class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {
  public constructor() {
    super();
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this);
  }

  private createView(): void {
    this.graphics.beginFill(0xffffff);
    this.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
    this.graphics.endFill();

    let t = new egret.TextField();
    t.text = "朱望仔大战大反派";
    t.size = 50;
    t.textColor = 0x333333;
    t.fontFamily = "Microsoft YaHei";
    t.y = this.stage.stageHeight / 2 / 2;
    t.x = this.stage.stageWidth / 2;
    t.anchorOffsetX = t.width / 2;
    let t2 = this.textField = new egret.TextField();
    t2.textColor = 0x333333;
    t2.width = this.stage.stageWidth;
    t2.height = this.stage.stageHeight;
    t2.textAlign = egret.HorizontalAlign.CENTER;
    this.textField.text = '正在加载...';

    t2.y = this.stage.stageHeight / 2;
    t2.x = this.stage.stageWidth / 2;
    t2.anchorOffsetX = t2.width / 2;
    this.addChild(t);
    this.addChild(t2);
  }

  private textField: egret.TextField;

  public onProgress(current: number, total: number): void {
    this.textField.text = `正在加载...${current}/${total}`;
  }
}

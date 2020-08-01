class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {
  public constructor() {
    super();
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this);
  }

  private createView(): void {
    this.graphics.beginFill(0x200040);
    this.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
    this.graphics.endFill();

    let t2 = this.textField = new egret.TextField();
    t2.textColor = 0xffce45;
    t2.width = this.stage.stageWidth;
    t2.height = this.stage.stageHeight;
    t2.textAlign = egret.HorizontalAlign.CENTER;
    t2.textFlow = <Array<egret.ITextElement>>[
      {
        text: "正在加载...",
        style: { textColor: 0xffce45, size: 50, stroke: 1, strokeColor: 0xf1f1f1 },
      },
      {
        text: "0",
        style: { textColor: 0xdd5145, size: 80, stroke: 1, strokeColor: 0xf1f1f1 },
      },
      {
        text: "/",
        style: { textColor: 0xdd5145, size: 80, stroke: 1, strokeColor: 0xf1f1f1 },
      },
      {
        text: "0",
        style: { textColor: 0xffce45, size: 50, stroke: 1, strokeColor: 0xf1f1f1 },
      },
    ];

    t2.y = this.stage.stageHeight / 2;
    t2.x = this.stage.stageWidth / 2;
    t2.anchorOffsetX = t2.width / 2;
    this.addChild(t2);
    egret.Tween.get(t2, { loop: true }).to({ alpha: 0.8, scaleX: 0.8, scaleY: 0.8 }, 300, egret.Ease.bounceOut).wait(200).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300, egret.Ease.bounceIn);
  }

  private textField: egret.TextField;

  public onProgress(current: number, total: number): void {
    this.textField.textFlow = <Array<egret.ITextElement>>[
      {
        text: "正在加载...",
        style: { textColor: 0xffce45, size: 50, stroke: 1, strokeColor: 0xf1f1f1 },
      },
      {
        text: `${current}`,
        style: { textColor: 0xdd5145, size: 80, stroke: 1, strokeColor: 0xf1f1f1 },
      },
      {
        text: "/",
        style: { textColor: 0xdd5145, size: 80, stroke: 1, strokeColor: 0xf1f1f1 },
      },
      {
        text: `${total}`,
        style: { textColor: 0xffce45, size: 50, stroke: 1, strokeColor: 0xf1f1f1 },
      },
    ];
  }
}

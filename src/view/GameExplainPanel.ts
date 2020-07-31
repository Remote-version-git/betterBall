class GameExplainPanel extends eui.Component implements eui.UIComponent {

	// 游戏说明下的确定按钮
	private confirm_start: eui.Button;

	// 解释面板
	private explain_panel: eui.Group;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
	}

	// 组件实例化完之后，自动调用这个函数
	private onComplete() {

		// 侦听确定按钮的触摸点击事件
		this.confirm_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmBtn, this)
		this.confirm_start.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
			TouchEvents.onEvent(this.confirm_start)
			egret.Tween.get(this.confirm_start).to({ scaleX: 0.95, scaleY: 0.95 }, 150)
		}, this)
	}

	// 点击确定 开始游戏
	private confirmBtn() {
		this.explain_panel.visible = false;
		// 通知可以进行初始化游戏了
		this.dispatchEvent(new PostEvent(PostEvent.READ_EXPLAIN));
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

}
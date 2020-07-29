// 排行榜
class RankingListView extends eui.Component implements eui.UIComponent {

	// 滚动容器
	private _scroller: eui.Scroller;
	// list 列表
	private dataList: eui.List;
	// 关闭按钮
	private close_button: eui.Button;

	public constructor() {
		super();
		this.addEventListener(
			eui.UIEvent.COMPLETE,
			this.onComplete,
			this
		);
	}

	private rankingData;
	private onComplete() {
		// 发送 Http 请求
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open("https://xwfintech.qingke.io/_api/5f01dfe0d676280036a2e1ff/openapi/pinball/list?pageSize=100", egret.HttpMethod.GET);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		request.send();
		request.addEventListener(egret.Event.COMPLETE, e => {
			var request = e.currentTarget;
			// ok(request.response)
			let rankingData = JSON.parse(request.response)

			// 加载网络图片
			rankingData.rows.forEach((item, index) => {
				item.rank = index + 1;
				item.score = item.score + '分';
				var imgLoader: egret.ImageLoader = new egret.ImageLoader;
				egret.ImageLoader.crossOrigin = "anonymous";
				imgLoader.load(item.avatar);
				imgLoader.once(egret.Event.COMPLETE, (e, index) => {
					if (e.currentTarget.data) {
						let texture = new egret.Texture();
						texture.bitmapData = e.currentTarget.data;
						if (this.rankingData.rows[index] && this.rankingData.rows[index].avatar) {
							this.rankingData.rows[index].avatar = texture;
						}
					}
				}, this);
			})

			this.rankingData = rankingData;
			var collection = new eui.ArrayCollection(rankingData.rows);
			this.dataList.dataProvider = collection;

		}, this);
		request.addEventListener(egret.ProgressEvent.PROGRESS, e => { }, this);

		// 去掉滚动条
		// this._scroller.verticalScrollBar.autoVisibility = false;
		// this._scroller.verticalScrollBar.visible = false;

		this.close_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeButton, this)
	}

	private closeButton() {
		// 关闭排行榜
		this.parent.removeChild(this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();

	}

}

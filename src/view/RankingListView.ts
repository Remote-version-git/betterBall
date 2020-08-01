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
		try {

			platform.getRank().then(res => {
				// 解析过滤空数据
				let rankingData = JSON.parse(res).rows.filter(v => v.nickname !== null && v.avatar !== null);

				rankingData.forEach((item, index) => {

					item.rank = index + 1;
					item.score = item.score + '分';
					// 加载网络图片
					var imgLoader: egret.ImageLoader = new egret.ImageLoader;
					egret.ImageLoader.crossOrigin = "anonymous";
					imgLoader.load(item.avatar);
					imgLoader.once(egret.Event.COMPLETE, (e, index) => {
						if (e.currentTarget.data) {
							let texture = new egret.Texture();
							texture.bitmapData = e.currentTarget.data;
							if (this.rankingData[index] && this.rankingData[index].avatar) {
								this.rankingData[index].avatar = texture;
							}
						}
					}, this);
				})
				this.rankingData = rankingData;
				// 渲染数据
				var collection = new eui.ArrayCollection(rankingData);
				this.dataList.dataProvider = collection;
			})

		} catch (error) {
			return
		}

		this.close_button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
			TouchEvents.onEvent(this.close_button)
			egret.Tween.get(this.close_button).to({ scaleX: 0.9, scaleY: 0.9 }, 150)
		}, this)

		// 关闭
		this.close_button.addEventListener(
			egret.TouchEvent.TOUCH_TAP,
			this.closeButton,
			this
		)
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

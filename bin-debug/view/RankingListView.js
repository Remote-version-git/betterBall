var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// 排行榜
var RankingListView = (function (_super) {
    __extends(RankingListView, _super);
    function RankingListView() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    RankingListView.prototype.onComplete = function () {
        var _this = this;
        // 发送 Http 请求
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("https://xwfintech.qingke.io/_api/5f01dfe0d676280036a2e1ff/openapi/pinball/list?pageSize=100", egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, function (e) {
            var request = e.currentTarget;
            // ok(request.response)
            var rankingData = JSON.parse(request.response);
            // 加载网络图片
            rankingData.rows.forEach(function (item, index) {
                item.rank = index + 1;
                item.score = item.score + '分';
                var imgLoader = new egret.ImageLoader;
                egret.ImageLoader.crossOrigin = "anonymous";
                imgLoader.load(item.avatar);
                imgLoader.once(egret.Event.COMPLETE, function (e, index) {
                    if (e.currentTarget.data) {
                        var texture = new egret.Texture();
                        texture.bitmapData = e.currentTarget.data;
                        if (_this.rankingData.rows[index] && _this.rankingData.rows[index].avatar) {
                            _this.rankingData.rows[index].avatar = texture;
                        }
                    }
                }, _this);
            });
            _this.rankingData = rankingData;
            var collection = new eui.ArrayCollection(rankingData.rows);
            _this.dataList.dataProvider = collection;
        }, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, function (e) { }, this);
        // 去掉滚动条
        // this._scroller.verticalScrollBar.autoVisibility = false;
        // this._scroller.verticalScrollBar.visible = false;
        this.close_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeButton, this);
    };
    RankingListView.prototype.closeButton = function () {
        // 关闭排行榜
        this.parent.removeChild(this);
    };
    RankingListView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    RankingListView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return RankingListView;
}(eui.Component));
__reflect(RankingListView.prototype, "RankingListView", ["eui.UIComponent", "egret.DisplayObject"]);

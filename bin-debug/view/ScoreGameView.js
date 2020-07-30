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
// 游戏结束后 游戏得分
var ScoreGameView = (function (_super) {
    __extends(ScoreGameView, _super);
    function ScoreGameView() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    ScoreGameView.prototype.onComplete = function () {
        var s = RES.getRes("bgm_mp3");
        this.restart_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
        this.showRankingList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.RankingButton, this);
    };
    ScoreGameView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ScoreGameView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    ScoreGameView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // 动画出现
        this.startAnimate();
    };
    ScoreGameView.prototype.startAnimate = function () {
        var trophy = egret.Tween.get(this.trophy_img);
        trophy.to({ scaleX: 1.1, scaleY: 1.1 }, 1000).wait(100)
            .to({ scaleX: 1, scaleY: 1 }, 1000).wait(100);
    };
    ScoreGameView.prototype.RankingButton = function () {
        console.log('查看排行榜');
        this.dispatchEvent(new PostEvent(PostEvent.Ranking_List));
    };
    ScoreGameView.prototype.restartGame = function () {
        // 销毁自已的界面
        this.parent.removeChild(this);
        // 构建一个事件
        var p = new PostEvent(PostEvent.RESTART_GAME);
        // 派发出去
        this.dispatchEvent(p);
    };
    return ScoreGameView;
}(eui.Component));
__reflect(ScoreGameView.prototype, "ScoreGameView", ["eui.UIComponent", "egret.DisplayObject"]);

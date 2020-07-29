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
// 游戏界面
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    GameView.prototype.onComplete = function () {
        var _this = this;
        测试代码;
        一秒后进入结束界面;
        window.setTimeout(function () {
            _this.gameOver();
        }, 1000);
    };
    GameView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    GameView.prototype.gameOver = function () {
        // 自身销毁
        this.parent.removeChild(this);
        // 让 main 打开游戏结束界面
        var p = new PostEvent(PostEvent.GAME_OVER);
        this.dispatchEvent(p);
    };
    return GameView;
}(eui.Component));
__reflect(GameView.prototype, "GameView", ["eui.UIComponent", "egret.DisplayObject"]);

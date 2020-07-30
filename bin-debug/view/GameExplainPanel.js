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
var GameExplainPanel = (function (_super) {
    __extends(GameExplainPanel, _super);
    function GameExplainPanel() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    // 组件实例化完之后，自动调用这个函数
    GameExplainPanel.prototype.onComplete = function () {
        // 侦听确定按钮的触摸点击事件
        this.confirm_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmBtn, this);
    };
    // 点击确定 开始游戏
    GameExplainPanel.prototype.confirmBtn = function () {
        this.explain_panel.visible = false;
        // 通知可以进行初始化游戏了
        this.dispatchEvent(new PostEvent(PostEvent.READ_EXPLAIN));
    };
    GameExplainPanel.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameExplainPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return GameExplainPanel;
}(eui.Component));
__reflect(GameExplainPanel.prototype, "GameExplainPanel", ["eui.UIComponent", "egret.DisplayObject"]);

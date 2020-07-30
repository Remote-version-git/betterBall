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
// 成绩单
var ReportCard = (function (_super) {
    __extends(ReportCard, _super);
    function ReportCard() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    ReportCard.prototype.onComplete = function () {
        this.go_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goBack, this);
    };
    ReportCard.prototype.goBack = function () {
        // 销毁自己的界面
        this.parent.removeChild(this);
        this.dispatchEvent(new PostEvent(PostEvent.GAME_OVER));
    };
    ReportCard.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ReportCard.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return ReportCard;
}(eui.Component));
__reflect(ReportCard.prototype, "ReportCard", ["eui.UIComponent", "egret.DisplayObject"]);

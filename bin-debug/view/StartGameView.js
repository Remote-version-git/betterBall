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
// 进入游戏界面
var StartGameView = (function (_super) {
    __extends(StartGameView, _super);
    function StartGameView() {
        var _this = _super.call(this) || this;
        _this.isShow = false;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    // 组件实例化完之后，自动调用这个函数
    StartGameView.prototype.onComplete = function () {
        // 侦听开始按钮的触摸点击事件
        this.start_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startButton, this);
        // 侦听排行榜按钮的触摸点击事件
        this.ranking_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rankingButton, this);
        // 侦听声音按钮的触摸点击事件
        this.trumpet_check.addEventListener(egret.TouchEvent.TOUCH_TAP, this.trumpetCheck, this);
    };
    StartGameView.prototype.startButton = function () {
        // 隐藏开始游戏界面
        this.parent.removeChild(this);
        // 构建一个事件
        var p = new PostEvent(PostEvent.START_GAME);
        // 派发出去
        this.dispatchEvent(p);
    };
    // 排行榜
    StartGameView.prototype.rankingButton = function () {
        this.dispatchEvent(new PostEvent(PostEvent.Ranking_List));
    };
    // 点击喇叭
    StartGameView.prototype.trumpetCheck = function () {
        if (this.isShow == true) {
            // 关闭声音
            this.is_trumpet.visible = false;
            this.isShow = false;
            console.log("关闭");
            LoadSound.startLoad("stop");
        }
        else if (this.isShow == false) {
            // 开启声音
            this.is_trumpet.visible = true;
            this.isShow = true;
            console.log("开启");
            LoadSound.startLoad("start");
        }
    };
    StartGameView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    //元素第一次被添加到舞台时回调一次。此时才可以获取元素
    StartGameView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    // 创建元素之后，被回调执行,紧接 onComplete 之后
    StartGameView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // 动画出现
        this.startAnimate();
    };
    StartGameView.prototype.startAnimate = function () {
        egret.Tween.get(this.pig_bg_img, { loop: true }).to({ x: 45, y: -96 }, 1000).wait(100)
            .to({ x: 42.87, y: -88.13 }, 1000).wait(100);
        egret.Tween.get(this.batman_bg_img, { loop: true }).to({ rotation: 5, width: 280, height: 211.6 }, 1000).wait(100)
            .to({ rotation: 0, width: 270, height: 201.6 }, 1000).wait(100);
    };
    return StartGameView;
}(eui.Component));
__reflect(StartGameView.prototype, "StartGameView", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=StartGameView.js.map
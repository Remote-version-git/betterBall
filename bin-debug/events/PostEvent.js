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
var PostEvent = (function (_super) {
    __extends(PostEvent, _super);
    function PostEvent(type, bubbles, cancelable, score) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        if (score === void 0) { score = 0; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        if (score !== 0) {
            _this.score = score;
        }
        return _this;
    }
    // 事件类型
    // 进入游戏界面
    PostEvent.START_GAME = "Start Game";
    // 进入结束游戏界面
    PostEvent.GAME_OVER = "Game Over";
    // 重新开始游戏
    PostEvent.RESTART_GAME = "restart game";
    // 点击游戏说明按钮后触发
    PostEvent.READ_EXPLAIN = "read explain";
    // 排行榜
    PostEvent.Ranking_List = 'Ranking List';
    PostEvent.INCREMNT_SCORE = "incremnt score";
    // 增加batman
    PostEvent.INCREMENT_BATMANS = "incremnt batmanas";
    // 成绩单
    PostEvent.Report_Card = "Report Card";
    return PostEvent;
}(egret.Event));
__reflect(PostEvent.prototype, "PostEvent");
//# sourceMappingURL=PostEvent.js.map
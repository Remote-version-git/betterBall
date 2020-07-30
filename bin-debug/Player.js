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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(bg, body, batmans, holes, batmanBodys, world) {
        var _this = _super.call(this) || this;
        _this.arrow = null;
        _this.disk = null;
        _this.pig = null;
        _this.diskShow = false;
        _this.bg = null;
        //   是否移动猪
        _this.moving = false;
        _this.body = null;
        // 积分
        _this.score = 0;
        // batmans
        _this.batmans = batmans;
        // batmans body
        _this.batmanBodys = batmanBodys;
        // 黑洞们
        _this.holes = holes;
        // world
        _this.world = world;
        // 刚体
        _this.body = body;
        _this.bg = bg;
        // 创建对象
        _this.createObject();
        // 绑定事件
        _this.bindTouchEvent();
        return _this;
    }
    //   猪的装备
    Player.prototype.createObject = function () {
        // 箭头
        var arrow = new egret.Bitmap();
        arrow.texture = RES.getRes("arrow_png");
        arrow.anchorOffsetY = arrow.height / 2;
        arrow.visible = false;
        this.addChild(arrow);
        this.arrow = arrow;
        // 面板
        var dp = new egret.Bitmap();
        dp.texture = RES.getRes("disk_png");
        dp.anchorOffsetX = dp.width / 2;
        dp.anchorOffsetY = dp.height / 2;
        dp.visible = false;
        this.addChild(dp);
        this.disk = dp;
        // 猪
        var pig = new egret.Bitmap();
        pig.texture = RES.getRes("player_png");
        pig.anchorOffsetX = pig.width / 2;
        pig.anchorOffsetY = pig.height / 2;
        pig.scaleX = 0.6;
        pig.scaleY = 0.6;
        this.addChild(pig);
        pig.touchEnabled = true;
        this.pig = pig;
    };
    //   猪的移动
    Player.prototype.bindTouchEvent = function () {
        var _this = this;
        this.pig.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.disk.visible = true;
            _this.arrow.visible = true;
            _this.moving = true;
        }, this);
        this.pig.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            _this.disk.visible = false;
            _this.arrow.visible = false;
            _this.moving = false;
        }, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            if (_this.moving) {
                var handPoint = new egret.Point(e.stageX, e.stageY);
                var pigPoint = _this.localToGlobal(_this.pig.x, _this.pig.y);
                var angle = Math.atan2(handPoint.y - pigPoint.y, handPoint.x - pigPoint.x);
                var theta = angle * (180 / Math.PI);
                _this.arrow.rotation = theta;
                // 箭头长短
                var distance = egret.Point.distance(handPoint, pigPoint);
                if (distance > 120)
                    distance = 120;
                _this.arrow.scaleX = distance / 120;
            }
        }, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            if (_this.moving) {
                var handPoint = new egret.Point(e.stageX, e.stageY);
                var pigPoint = _this.localToGlobal(_this.pig.x, _this.pig.y);
                var xpower = handPoint.x - pigPoint.x;
                var ypower = handPoint.y - pigPoint.y;
                // if(xpower > 80) {
                //     xpower = 80
                // }
                // let power = 80
                // if(xpower > power) xpower = power
                // if(xpower < -power) xpower = -power
                // if(ypower > power) ypower = power
                // if(ypower < -power) ypower = -power
                _this.body.applyForce([xpower / 5, ypower / 5], [0, 0]);
                _this.disk.visible = false;
                _this.arrow.visible = false;
                _this.moving = false;
            }
        }, this);
    };
    // 被world的endContact事件调用.
    Player.prototype.checkHit = function () {
        var _this = this;
        this.holes.forEach(function (h) {
            //   黑洞检测点
            var rectH = new egret.Rectangle(h.x, h.y, h.width, h.height);
            // 检测batman
            _this.batmans.forEach(function (b, index) {
                //   batman 检测点
                var rectB = new egret.Rectangle(b.x, b.y, b.width, b.height);
                // 判断是否相交撞击
                if (rectH.intersects(rectB)) {
                    // 吃掉batman
                    egret.Tween.get(b).to({ alpha: 0 }, 200);
                    //    移除batman
                    _this.batmans.splice(index, 1);
                    //    移除掉刚体
                    _this.world.removeBody(_this.batmanBodys[index]);
                    _this.batmanBodys.splice(index, 1);
                    // 得分增加
                    _this.incrementScore(10);
                }
            });
            // 检测pig
            var pigRect = new egret.Rectangle(_this.body.position[0], _this.body.position[1], _this.pig.width, _this.pig.height);
            if (rectH.intersects(pigRect)) {
                // 吃掉pig
                egret.Tween.get(_this.pig).to({ alpha: 0 }, 200);
                // 通知GameView游戏结束了
                _this.dispatchEvent(new PostEvent(PostEvent.GAME_OVER));
            }
        });
        // 最后看是否吃完了batman，再给制造一些
        if (this.batmans.length === 0) {
            this.dispatchEvent(new PostEvent(PostEvent.INCREMENT_BATMANS));
        }
    };
    /**
     * 增加积分
     * @param score 要增加的分数
     */
    Player.prototype.incrementScore = function (score) {
        this.score += score;
        this.dispatchEvent(new PostEvent(PostEvent.INCREMNT_SCORE, false, false, this.score));
    };
    return Player;
}(egret.Sprite));
__reflect(Player.prototype, "Player");

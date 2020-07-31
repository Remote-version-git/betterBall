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
        _this.isEnableP2Debug = false;
        //   存储四个黑洞 用于碰撞检测
        _this.holes = new Array(4);
        // 物理世界
        _this.world = null;
        _this.p2debug = null;
        _this.playerTouch = false;
        // 保存全部batman显示对象
        _this.batmans = [];
        _this.batmanBodys = [];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    GameView.prototype.onComplete = function () {
        // 监听面板被点击事件
        this.explain_panel.addEventListener(PostEvent.READ_EXPLAIN, this.createGameScene, this);
        // 侦听声音按钮的触摸点击事件
        this.trumpet_check.addEventListener(egret.TouchEvent.TOUCH_TAP, this.trumpetCheck, this);
    };
    // 喇叭声音切换
    GameView.prototype.trumpetCheck = function () {
        // 获取声音实例
        var s = LoadBGM.getInstance();
        // 切换播放状态
        s.SwitchPlay();
        // 切换音标图标
        if (s.getPlayStatus()) {
            this.is_trumpet.visible = true;
        }
        else {
            this.is_trumpet.visible = false;
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    GameView.prototype.createGameScene = function () {
        var _this = this;
        // this.preTime = egret.getTimer();
        // 生成物理世界
        var world = new p2.World({
            // 重力
            gravity: [0, 0],
        });
        world.defaultContactMaterial.restitution = 1;
        world.defaultContactMaterial.friction = 0.1;
        world.on("endContact", function (e) {
            _this.player.checkHit();
            // if (e.bodyB.name == "batman") {
            //   this.world.removeBody(e.bodyB);
            //   this.removeChild(e.bodyB.displays[0]);
            //   e.bodyB.displays[0] = null;
            // }
        }, this);
        this.world = world;
        // this.world.on('postBroadphase', this.a)
        // this.world.on('preSolve', this.b)
        // this.world.on('endContact', this.d)
        // 添加四个黑洞
        this.holeAroundMap();
        // 添加四周四面墙壁
        this.add4Wall();
        // 添加玩家
        this.addPlayer(this.game_scene);
        // 添加障碍物
        this.addWall(300, 300);
        this.addWall(300, 300 * 2);
        this.addWall(200, 300 * 3);
        // 制造6个batman到物理世界并显示在舞台
        this.productBatman(5);
        // p2 调试
        // this.enableP2Debug(world);
        // 添加 player
        this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdate, this);
    };
    GameView.prototype.enableP2Debug = function (world) {
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.p2debug = new p2DebugDraw(world);
        this.p2debug.setSprite(sprite);
        this.isEnableP2Debug = true;
    };
    // 制造黑洞
    GameView.prototype.hole = function () {
        var hole = new egret.Bitmap(RES.getRes("hole_png"));
        // 调整大小
        hole.width = hole.width / 2;
        hole.height = hole.height / 2;
        // 锚点到中心
        hole.anchorOffsetX = hole.width / 2;
        hole.anchorOffsetY = hole.height / 2;
        return hole;
    };
    // 黑洞布置到地图
    GameView.prototype.holeAroundMap = function () {
        // 创建黑洞并添加到舞台 并 缓存到黑洞数组
        for (var index = 0; index < this.holes.length; index++) {
            var item = this.hole();
            var w = item.width / 2;
            var h = item.height / 2;
            var sw = this.game_scene.width;
            var sh = this.game_scene.height;
            // 计算包含锚点
            switch (index) {
                case 0:
                    item.x = w;
                    item.y = h;
                    break;
                case 1:
                    item.x = -w + sw;
                    item.y = h;
                    break;
                case 2:
                    item.x = w;
                    item.y = -h + sh;
                    break;
                case 3:
                    item.x = -w + sw;
                    item.y = -h + sh;
                    break;
                default:
                    break;
            }
            this.game_scene.addChild(item);
            this.holes[index] = item;
        }
        console.log(this.holes[0].x, this.holes[0].y);
        console.log(this.holes[1].x, this.holes[1].y);
        console.log(this.holes[2].x, this.holes[2].y);
        console.log(this.holes[3].x, this.holes[3].y);
    };
    // private preTime: number;
    // 屏幕刷新函数
    GameView.prototype.onUpdate = function () {
        // let pass = egret.getTimer() - this.preTime;
        // 执行的时间间隔 单位秒
        this.world.step(1);
        // 遍历每个刚体
        this.world.bodies.forEach(function (body) {
            // 如果不为null，则更新素材的坐标和角度
            if (body.displays) {
                // 位置
                body.displays[0].x = body.position[0];
                body.displays[0].y = body.position[1];
                // 角度
                // body.displays[0].rotation = body.angle * 180 / Math.PI;
            }
        });
        // this.preTime = egret.getTimer();
        // p2 测试
        if (this.isEnableP2Debug) {
            this.p2debug.drawDebug();
        }
    };
    // 制造一个batman
    GameView.prototype.makeBatman = function () {
        var batman = new egret.Bitmap(RES.getRes("batman_png"));
        batman.width = batman.width / 3;
        batman.height = batman.height / 3;
        batman.anchorOffsetX = batman.width / 2;
        batman.anchorOffsetY = batman.height / 2;
        return batman;
    };
    // 为batman附加物理计算
    GameView.prototype.appendToBatman = function () {
        // 产生一个新的batman
        var batman = this.makeBatman();
        // 用于随机产生计算位置
        var x = batman.width / 2;
        var y = batman.height / 2;
        var sx = this.game_scene.width - x;
        var sy = this.game_scene.height - y;
        var batmanShape = new p2.Circle({
            radius: x,
        });
        var rigidBody = new p2.Body({
            mass: 1,
            position: [
                Math.floor(Math.random() * (-x + sx - x + 1) + x),
                Math.floor(Math.random() * (-y + sy - y + 1) + y),
            ],
        });
        rigidBody.addShape(batmanShape);
        rigidBody.displays = [batman];
        // 返回 batman刚体 和  batman显示对象
        return [rigidBody, batman];
    };
    // 按指定数量产生batman
    GameView.prototype.productBatman = function (nums) {
        for (var index = 0; index < nums; index++) {
            var batman = this.appendToBatman();
            // 向物理世界添加本次batman刚体
            this.world.addBody(batman[0]);
            this.batmanBodys.push(batman[0]);
            // 添加batman
            this.batmans.push(batman[1]);
            this.addChild(batman[1]);
        }
    };
    GameView.prototype.addWall = function (x, y) {
        var lwall = new egret.Bitmap();
        lwall.texture = RES.getRes("wall2_png");
        lwall.anchorOffsetX = lwall.width / 2;
        lwall.anchorOffsetY = lwall.height / 2;
        // // 图片加到页面
        this.addChild(lwall);
        var wallShape = new p2.Box({
            width: lwall.width,
            height: lwall.height,
        });
        var wallBody = new p2.Body({
            type: p2.Body.STATIC,
            position: [x, y],
        });
        wallBody.addShape(wallShape);
        wallBody.displays = [lwall];
        this.world.addBody(wallBody);
    };
    // 四面墙壁
    GameView.prototype.add4Wall = function () {
        // 下
        var planeShape = new p2.Plane();
        var planeBody = new p2.Body({
            type: p2.Body.STATIC,
            position: [0, this.stage.stageHeight],
        });
        planeBody.angle = Math.PI;
        // planeBody.displays = [];
        planeBody.addShape(planeShape);
        this.world.addBody(planeBody);
        // 墙面 - 左
        var planeShapel = new p2.Plane();
        var planeBodyl = new p2.Body({
            type: p2.Body.STATIC,
            position: [0, 0],
        });
        planeBodyl.angle = -Math.PI / 2;
        planeBodyl.addShape(planeShapel);
        this.world.addBody(planeBodyl);
        // 墙面 - 右
        var planeShaper = new p2.Plane();
        var planeBodyr = new p2.Body({
            type: p2.Body.STATIC,
            position: [this.stage.stageWidth, 0],
        });
        planeBodyr.angle = Math.PI / 2;
        planeBodyr.addShape(planeShaper);
        this.world.addBody(planeBodyr);
        // 墙面 - 上
        var planeShapet = new p2.Plane();
        var planeBodyt = new p2.Body({
            type: p2.Body.STATIC,
            position: [0, 63],
        });
        planeBodyt.addShape(planeShapet);
        this.world.addBody(planeBodyt);
    };
    // 生成游戏猪
    GameView.prototype.addPlayer = function (bg) {
        var _this = this;
        var body = new p2.Body({
            mass: 1,
            position: [200, 200],
        });
        var player = new Player(bg, body, this.batmans, this.holes, this.batmanBodys, this.world);
        // 侦听 通知游戏结束
        player.addEventListener(PostEvent.GAME_OVER, function () {
            // 游戏结束
            _this.gameOver();
        }, this);
        // 侦听积分增加
        player.addEventListener(PostEvent.INCREMNT_SCORE, function (e) {
            // 游戏结束
            _this.score.text = e.score;
        }, this);
        // 侦听是否吃完了batman
        player.addEventListener(PostEvent.INCREMENT_BATMANS, function (e) {
            _this.productBatman(10);
        }, this);
        this.player = player;
        this.addChild(player);
        var shape = new p2.Circle({
            radius: (player.pig.width * player.pig.scaleX) / 2,
        });
        body.addShape(shape);
        body.displays = [player];
        this.world.addBody(body);
    };
    GameView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        // 名称
        if (window && window.playerInfo) {
            this.nickname.text = window.playerInfo.nickname;
            this.avatar.source = window.playerInfo.headimgurl;
        }
        // 头像
        // 把音乐放起来
        var s = LoadBGM.getInstance();
        if (s.prePlayStatus) {
            s.playBGM();
            s.setPlayStatus(true);
        }
        this.is_trumpet.visible = s.getPlayStatus();
    };
    GameView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // 设置音乐播放状态
    };
    // 游戏结束
    GameView.prototype.gameOver = function () {
        // 关闭掉声音
        LoadBGM.getInstance().stopBGM();
        // 让 main 打开游戏结束界面
        var p = new PostEvent(PostEvent.GAME_OVER, false, false, parseInt(this.score.text));
        this.dispatchEvent(p);
    };
    return GameView;
}(eui.Component));
__reflect(GameView.prototype, "GameView", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameView.js.map
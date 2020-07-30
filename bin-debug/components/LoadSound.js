var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 播放声音
var LoadSound = (function () {
    function LoadSound() {
    }
    //加载
    LoadSound.startLoad = function (load) {
        var sound = this._sound = new egret.Sound();
        ;
        //sound 加载完成监听
        sound.addEventListener(egret.Event.COMPLETE, function (e) {
            this.init(load);
        }, this);
        sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event) {
            console.log("loaded error!");
        }, this);
        sound.load("resource/assets/sound/bgm.mp3");
    };
    LoadSound.init = function (load) {
        if (load == 'start') {
            // 播放音乐
            this._channel = this._sound.play();
        }
        else if (load == 'stop') {
            // 停止音乐
            this._channel.stop();
            this._channel = null;
        }
    };
    return LoadSound;
}());
__reflect(LoadSound.prototype, "LoadSound");
//# sourceMappingURL=LoadSound.js.map
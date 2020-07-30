// 播放声音
class LoadSound {

    private static _sound: egret.Sound;
    private static _channel: egret.SoundChannel;

    //加载
    public static startLoad(load:string): void {
        var sound: egret.Sound = this._sound = new egret.Sound();;
        //sound 加载完成监听
        sound.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
            this.init(load);
        }, this);
        sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event: egret.IOErrorEvent) {
            console.log("loaded error!");
        }, this);
        sound.load("resource/assets/sound/bgm.mp3");
    }

    private static init(load): void {
        if (load == 'start') {
            // 播放音乐
            this._channel = this._sound.play();
        } else if (load == 'stop') {
            // 停止音乐
            this._channel.stop();
            this._channel = null;
        }
    }



}
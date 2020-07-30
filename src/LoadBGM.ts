// 播放声音
class LoadBGM {
  private static LoadBGM = null;

  public static getInstance(): LoadBGM {
    if (this.LoadBGM === null) {
      LoadBGM.LoadBGM = new LoadBGM();
    }
    return LoadBGM.LoadBGM;
  }

  private _sound: egret.Sound;
  private constructor() {
    this._sound = RES.getRes("bgm_mp3");
  }

  // // 是否播放了音乐, 默认不播放
  private _isPlay: boolean = false;

  // // 获取播放状态
  public getPlayStatus(): boolean {
    return this._isPlay;
  }
  public setPlayStatus(v: boolean): void {
    this._isPlay = v;
  }

  // 获取频道
  private _channel: egret.SoundChannel;
  public getChannel() {
    return this._channel;
  }
  // 之前的播放状态
  public prePlayStatus: boolean;
  // 停止音乐
  public stopBGM() {
    if (this._isPlay) {
      this._channel && this._channel.stop();
      this._isPlay = false;
      this.prePlayStatus = true;
    }
  }
    // 播放音乐
  public playBGM() {
    if (!this._isPlay) {
      this._channel = this._sound.play();
      this._isPlay = true;
      this.prePlayStatus = false;
    }
  }

  // // 切换音乐
  public SwitchPlay(): void {
    if (!this._isPlay) {
      // 播放音乐
      this._channel = this._sound.play();
      this._isPlay = true;
    } else {
      // 停止音乐
      this._channel && this._channel.stop();
      this._isPlay = false;
    }
  }
}

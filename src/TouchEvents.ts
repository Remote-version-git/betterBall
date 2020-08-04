// TypeScript file
class TouchEvents extends egret.EventDispatcher {
    // private static _instance: any;
    public constructor() {
        super();
    }

    private static _button: eui.Button;
    public static onEvent(button: eui.Button): void {
        // 当用户第一次触摸启用触摸的设备时触发
        // button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnTouchBegin, this)
        // 当用户在触摸设备上与开始触摸的不同 DisplayObject 实例上抬起接触点时
        button.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.btnTouchEnd, this)
        // 当用户移除与启用触摸的设备的接触时
        button.addEventListener(egret.TouchEvent.TOUCH_END, this.btnTouchEnd, this)

        this._button = button;
    }

    // 触摸
    private static btnTouchBegin() {
        // console.log('TOUCH_BEGIN');
        egret.Tween.get(this._button).to({ scaleX: 0.95, scaleY: 0.95 }, 150)
    }

    // 移除触摸
    private static btnTouchEnd() {
        // console.log('TOUCH_END');
        egret.Tween.get(this._button).to({ scaleX: 1, scaleY: 1 }, 150)
    }

}

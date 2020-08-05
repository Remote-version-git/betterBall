class PostEvent extends egret.Event {
  // 事件类型

  // 进入游戏界面
  public static START_GAME: string = "Start Game";

  // 进入结束游戏界面
  public static GAME_OVER: string = "Game Over";

  // 重新开始游戏
  public static RESTART_GAME: string = "restart game";

  // 点击游戏说明按钮后触发
  public static READ_EXPLAIN: string = "read explain";

  // 排行榜
  public static Ranking_List: string = "Ranking List";

  // 积分增加
  public score: number = 0;
  public passScore: number = 0;
  public static INCREMNT_SCORE: string = "incremnt score";
  public static DECREMENT_PASSSCORE: string = "decrement pass score";

  // 增加batman
  public static INCREMENT_BATMANS: string = "incremnt batmanas";

  // 增加masks
  public static INCREMENT_MASKS: string = "incremnt masks";

  // 成绩单
  public static Report_Card: string = "Report Card";

  constructor(
    type: string,
    bubbles: boolean = false,
    cancelable: boolean = false,
    score: number = 0,
    passScore: number = 0
  ) {
    super(type, bubbles, cancelable);
    this.score = score;
    this.passScore = passScore;
  }
}

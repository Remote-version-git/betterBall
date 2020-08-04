class Main extends eui.UILayer {
  protected createChildren(): void {
    super.createChildren();

    egret.lifecycle.addLifecycleListener((context) => {
      // custom lifecycle plugin
    });

    egret.lifecycle.onPause = () => {
      egret.ticker.pause();
      // 停止音乐
      LoadBGM.getInstance().stopBGM();
    };

    egret.lifecycle.onResume = () => {
      egret.ticker.resume();
      // 播放音乐
      let s = LoadBGM.getInstance();
      if (s.prePlayStatus) {
        s.playBGM();
        s.setPlayStatus(true);
      }
    };

    //inject the custom material parser
    //注入自定义的素材解析器
    let assetAdapter = new AssetAdapter();
    egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
    egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

    this.runGame().catch((e) => {
      console.log(e);
    });
  }

  private async runGame() {
    await this.loadResource();
    this.createGameScene();
  }

  private async loadResource() {
    try {
      const loadingView = new LoadingUI();
      this.stage.addChild(loadingView);
      await RES.loadConfig("resource/default.res.json", "resource/");
      await this.loadTheme();
      await RES.loadGroup("preload_start", 0, loadingView);
      await RES.loadGroup("preload_mp3", 1, loadingView);
      this.stage.removeChild(loadingView);
    } catch (e) {
      console.error(e);
    }
  }

  private loadTheme() {
    return new Promise((resolve, reject) => {
      // load skin theme configuration file, you can manually modify the file. And replace the default skin.
      // 加载皮肤主题配置文件,可以手动修改这个文件 替换默认皮肤
      let theme = new eui.Theme("resource/default.thm.json", this.stage);
      theme.addEventListener(
        eui.UIEvent.COMPLETE,
        () => {
          resolve();
        },
        this
      );
    });
  }

  /**
   * 显示开始游戏画面
   * Create scene interface
   */
  protected createGameScene(): void {
    let startGameView = new StartGameView();
    startGameView.addEventListener(
      PostEvent.START_GAME,
      this.showGameView,
      this
    );
    startGameView.addEventListener(
      PostEvent.Ranking_List,
      this.showRankingList,
      this
    );
    // 开始场景
    this.addChild(startGameView);
  }

  // 显示游戏画面
  private showGameView() {
    const gameView = new GameView();
    gameView.addEventListener(PostEvent.GAME_OVER, this.showGameOver, this);
    this.addChild(gameView);
  }

  // 显示游戏结束画面
  private showGameOver(e: PostEvent) {
    const scoreGameView = new ScoreGameView();
    // 初始化分数
    scoreGameView.addEventListener(
      eui.UIEvent.COMPLETE,
      () => {
        if (e.score) {
          scoreGameView.score.text = String(e.score);
        } else {
          scoreGameView.score.text = "0";
        }
      },
      this
    );
    scoreGameView.addEventListener(
      PostEvent.RESTART_GAME,
      this.showGameView,
      this
    );
    this.addChild(scoreGameView);

    scoreGameView.addEventListener(
      PostEvent.Ranking_List,
      this.showRankingList,
      this
    );
    scoreGameView.addEventListener(
      PostEvent.Report_Card,
      this.reportCard,
      this
    );
  }

  // 排行榜
  private showRankingList() {
    let rankingListView = new RankingListView();
    this.addChild(rankingListView);
  }

  // 成绩单
  private reportCard(e) {
    let reportCard = new ReportCard();
    reportCard.addEventListener(
      eui.UIEvent.COMPLETE,
      () => {
        if (e.score) {
          reportCard.currentScore = String(e.score);
        } else {
          reportCard.currentScore = "0";
        }
      },
      this
    );
    this.addChild(reportCard);
    reportCard.addEventListener(
      PostEvent.GAME_OVER,
      this.showGameOver,
      this
    );
  }
}

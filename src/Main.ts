class Main extends eui.UILayer {
  protected createChildren(): void {
    super.createChildren();

    // 开启背景音乐
    LoadSound.startLoad('start')

    egret.lifecycle.addLifecycleListener((context) => {
      // custom lifecycle plugin
    });

    egret.lifecycle.onPause = () => {
      egret.ticker.pause();
    };

    egret.lifecycle.onResume = () => {
      egret.ticker.resume();
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
      await RES.loadGroup("preload", 0, loadingView);
      this.stage.removeChild(loadingView);
    } catch (e) {
      console.error(e);
    }
  }

  private loadTheme() {
    return new Promise((resolve, reject) => {
      // load skin theme configuration file, you can manually modify the file. And replace the default skin.
      //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
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
   * 创建场景界面
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

  // 当开始游戏场景发出开始游戏时被执行
  private showGameView() {
    const gameView = new GameView();
    gameView.addEventListener(PostEvent.GAME_OVER, this.showGameOver, this);
    this.addChild(gameView);
  }
  private showGameOver() {
    const scoreGameView = new ScoreGameView();
    scoreGameView.addEventListener(PostEvent.RESTART_GAME, this.showGameView, this)
    this.addChild(scoreGameView);

    scoreGameView.addEventListener(PostEvent.Ranking_List, this.showRankingList, this);
  }

  // 排行榜
  private showRankingList() {
    let rankingListView = new RankingListView();
    this.addChild(rankingListView)
  }
}

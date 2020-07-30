
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {"StartGameView":"resource/eui_skins/StartGameView.exml","ScoreGameView":"resource/eui_skins/ScoreGameView.exml","GameExplainPanel":"resource/eui_skins/GameExplainPanel.exml","GameView":"resource/eui_skins/GameView.exml","RankingListView":"resource/eui_skins/RankingListView.exml"};generateEUI.paths['resource/eui_skins/GameExplainPanel.exml'] = window.StateGameViewSkin = (function (_super) {
	__extends(StateGameViewSkin, _super);
	var StateGameViewSkin$Skin1 = 	(function (_super) {
		__extends(StateGameViewSkin$Skin1, _super);
		function StateGameViewSkin$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = StateGameViewSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "blue_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return StateGameViewSkin$Skin1;
	})(eui.Skin);

	function StateGameViewSkin() {
		_super.call(this);
		this.skinParts = ["confirm_start","explain_panel"];
		
		this.height = 368;
		this.width = 480;
		this.elementsContent = [this.explain_panel_i()];
	}
	var _proto = StateGameViewSkin.prototype;

	_proto.explain_panel_i = function () {
		var t = new eui.Group();
		this.explain_panel = t;
		t.height = 368;
		t.left = 0;
		t.top = 0;
		t.width = 480;
		t.elementsContent = [this._Image1_i(),this.confirm_start_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 311.2;
		t.horizontalCenter = -0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "state_png";
		t.top = 0;
		t.width = 427.2;
		t.x = 33;
		t.y = 0;
		return t;
	};
	_proto.confirm_start_i = function () {
		var t = new eui.Button();
		this.confirm_start = t;
		t.bottom = 0;
		t.height = 48;
		t.horizontalCenter = -5;
		t.label = "确定";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 144;
		t.x = 210;
		t.y = 400;
		t.skinName = StateGameViewSkin$Skin1;
		return t;
	};
	return StateGameViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameView.exml'] = window.GameViewSkin = (function (_super) {
	__extends(GameViewSkin, _super);
	function GameViewSkin() {
		_super.call(this);
		this.skinParts = ["bg","game_scene","explain_panel"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this.bg_i(),this.game_scene_i(),this.explain_panel_i()];
	}
	var _proto = GameViewSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.height = 1136;
		t.source = "game_bg_png";
		t.width = 640;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.game_scene_i = function () {
		var t = new eui.Group();
		this.game_scene = t;
		t.height = 1136;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 640;
		return t;
	};
	_proto.explain_panel_i = function () {
		var t = new GameExplainPanel();
		this.explain_panel = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.visible = true;
		return t;
	};
	return GameViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RankingListView.exml'] = window.RankingListViewSkin = (function (_super) {
	__extends(RankingListViewSkin, _super);
	var RankingListViewSkin$Skin2 = 	(function (_super) {
		__extends(RankingListViewSkin$Skin2, _super);
		function RankingListViewSkin$Skin2() {
			_super.call(this);
			this.skinParts = ["rank"];
			
			this.height = 80;
			this.elementsContent = [this.rank_i(),this._Group1_i(),this._Label1_i(),this._Label2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
			];
			
			eui.Binding.$bindProperties(this, ["hostComponent.data.rank"],[0],this.rank,"text");
			eui.Binding.$bindProperties(this, ["hostComponent.data.avatar"],[0],this._Image1,"source");
			eui.Binding.$bindProperties(this, ["hostComponent.data.nickname"],[0],this._Label1,"text");
			eui.Binding.$bindProperties(this, ["hostComponent.data.score"],[0],this._Label2,"text");
		}
		var _proto = RankingListViewSkin$Skin2.prototype;

		_proto.rank_i = function () {
			var t = new eui.Label();
			this.rank = t;
			t.percentHeight = 100;
			t.left = 0;
			t.size = 24;
			t.textAlign = "center";
			t.textColor = 0x000000;
			t.top = 0;
			t.verticalAlign = "middle";
			t.percentWidth = 25;
			return t;
		};
		_proto._Group1_i = function () {
			var t = new eui.Group();
			t.percentHeight = 100;
			t.percentWidth = 25;
			t.x = 125;
			t.elementsContent = [this._Image1_i()];
			return t;
		};
		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.height = 70;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			t.width = 70;
			return t;
		};
		_proto._Label1_i = function () {
			var t = new eui.Label();
			this._Label1 = t;
			t.percentHeight = 100;
			t.size = 20;
			t.textAlign = "center";
			t.textColor = 0x000000;
			t.verticalAlign = "middle";
			t.width = 125;
			t.x = 250;
			return t;
		};
		_proto._Label2_i = function () {
			var t = new eui.Label();
			this._Label2 = t;
			t.percentHeight = 100;
			t.right = 0;
			t.size = 24;
			t.textAlign = "center";
			t.textColor = 0xff0000;
			t.top = 0;
			t.verticalAlign = "middle";
			t.percentWidth = 25;
			return t;
		};
		return RankingListViewSkin$Skin2;
	})(eui.Skin);

	var RankingListViewSkin$Skin3 = 	(function (_super) {
		__extends(RankingListViewSkin$Skin3, _super);
		function RankingListViewSkin$Skin3() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RankingListViewSkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "close_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return RankingListViewSkin$Skin3;
	})(eui.Skin);

	function RankingListViewSkin() {
		_super.call(this);
		this.skinParts = ["dataList","_scroller","close_button"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Rect1_i(),this._Group3_i()];
	}
	var _proto = RankingListViewSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.5;
		t.percentHeight = 100;
		t.strokeColor = 0xffffff;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 800;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 500;
		t.elementsContent = [this._Image1_i(),this._Group1_i(),this._Group2_i(),this._scroller_i(),this.close_button_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "rectwh_png";
		t.top = 0;
		t.percentWidth = 100;
		t.x = -70;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 80;
		t.horizontalCenter = 0;
		t.width = 300;
		t.y = 0;
		t.elementsContent = [this._Image2_i(),this._Label1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 50;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "cup_png";
		t.width = 50;
		t.x = 10;
		t.y = 15;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Helvetica";
		t.height = 60;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "排行榜TOP100";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 220;
		t.x = 65;
		t.y = 10;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 60;
		t.left = 0;
		t.percentWidth = 100;
		t.y = 80;
		t.elementsContent = [this._Rect2_i(),this._Label2_i(),this._Label3_i(),this._Label4_i(),this._Label5_i()];
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xeeeeee;
		t.percentHeight = 100;
		t.strokeColor = 0xffffff;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.percentHeight = 100;
		t.left = 0;
		t.size = 24;
		t.text = "排行";
		t.textAlign = "center";
		t.textColor = 0x444444;
		t.top = 0;
		t.verticalAlign = "middle";
		t.percentWidth = 25;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.percentHeight = 100;
		t.size = 24;
		t.text = "头像";
		t.textAlign = "center";
		t.textColor = 0x444444;
		t.verticalAlign = "middle";
		t.percentWidth = 25;
		t.x = 125;
		t.y = 0;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.percentHeight = 100;
		t.size = 24;
		t.text = "昵称";
		t.textAlign = "center";
		t.textColor = 0x444444;
		t.verticalAlign = "middle";
		t.percentWidth = 25;
		t.x = 250;
		t.y = 0;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.percentHeight = 100;
		t.right = 0;
		t.size = 24;
		t.text = "成绩";
		t.textAlign = "center";
		t.textColor = 0x444444;
		t.top = 0;
		t.verticalAlign = "middle";
		t.percentWidth = 25;
		return t;
	};
	_proto._scroller_i = function () {
		var t = new eui.Scroller();
		this._scroller = t;
		t.height = 653;
		t.left = 0;
		t.percentWidth = 100;
		t.y = 145;
		t.viewport = this.dataList_i();
		return t;
	};
	_proto.dataList_i = function () {
		var t = new eui.List();
		this.dataList = t;
		t.percentHeight = 100;
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 0;
		t.percentWidth = 100;
		t.itemRendererSkinName = RankingListViewSkin$Skin2;
		return t;
	};
	_proto.close_button_i = function () {
		var t = new eui.Button();
		this.close_button = t;
		t.height = 40;
		t.label = "";
		t.width = 40;
		t.x = 480;
		t.y = -20;
		t.skinName = RankingListViewSkin$Skin3;
		return t;
	};
	return RankingListViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScoreGameView.exml'] = window.ScoreGameViewSkin = (function (_super) {
	__extends(ScoreGameViewSkin, _super);
	var ScoreGameViewSkin$Skin4 = 	(function (_super) {
		__extends(ScoreGameViewSkin$Skin4, _super);
		function ScoreGameViewSkin$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ScoreGameViewSkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "blue_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ScoreGameViewSkin$Skin4;
	})(eui.Skin);

	var ScoreGameViewSkin$Skin5 = 	(function (_super) {
		__extends(ScoreGameViewSkin$Skin5, _super);
		function ScoreGameViewSkin$Skin5() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ScoreGameViewSkin$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "blue_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ScoreGameViewSkin$Skin5;
	})(eui.Skin);

	var ScoreGameViewSkin$Skin6 = 	(function (_super) {
		__extends(ScoreGameViewSkin$Skin6, _super);
		function ScoreGameViewSkin$Skin6() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ScoreGameViewSkin$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "purple_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ScoreGameViewSkin$Skin6;
	})(eui.Skin);

	function ScoreGameViewSkin() {
		_super.call(this);
		this.skinParts = ["restart_button"];
		
		this.minHeight = 1136;
		this.minWidth = 640;
		this.elementsContent = [this._Image1_i(),this._Group1_i()];
	}
	var _proto = ScoreGameViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1136;
		t.source = "game_bg_png";
		t.width = 640;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1136;
		t.width = 640;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image2_i(),this._Label1_i(),this._Button1_i(),this._Button2_i(),this.restart_button_i(),this._Label2_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 322;
		t.source = "trophy_png";
		t.width = 336;
		t.x = 152;
		t.y = 107.07;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 54;
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "250";
		t.textAlign = "center";
		t.verticalCenter = -113;
		t.percentWidth = 100;
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.height = 60;
		t.label = "查看排行榜";
		t.width = 180;
		t.x = 230;
		t.y = 605.87;
		t.skinName = ScoreGameViewSkin$Skin4;
		return t;
	};
	_proto._Button2_i = function () {
		var t = new eui.Button();
		t.height = 60;
		t.label = "生成成绩单";
		t.width = 180;
		t.x = 230;
		t.y = 711.91;
		t.skinName = ScoreGameViewSkin$Skin5;
		return t;
	};
	_proto.restart_button_i = function () {
		var t = new eui.Button();
		this.restart_button = t;
		t.height = 60;
		t.label = "再玩一次";
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = true;
		t.width = 180;
		t.x = 230;
		t.y = 919.09;
		t.skinName = ScoreGameViewSkin$Skin6;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.height = 54;
		t.text = "本局得分";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 505;
		return t;
	};
	return ScoreGameViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/StartGameView.exml'] = window.StartGameViewSkin = (function (_super) {
	__extends(StartGameViewSkin, _super);
	var StartGameViewSkin$Skin7 = 	(function (_super) {
		__extends(StartGameViewSkin$Skin7, _super);
		function StartGameViewSkin$Skin7() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = StartGameViewSkin$Skin7.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "start_button_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return StartGameViewSkin$Skin7;
	})(eui.Skin);

	var StartGameViewSkin$Skin8 = 	(function (_super) {
		__extends(StartGameViewSkin$Skin8, _super);
		function StartGameViewSkin$Skin8() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = StartGameViewSkin$Skin8.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "rules_button_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return StartGameViewSkin$Skin8;
	})(eui.Skin);

	var StartGameViewSkin$Skin9 = 	(function (_super) {
		__extends(StartGameViewSkin$Skin9, _super);
		function StartGameViewSkin$Skin9() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = StartGameViewSkin$Skin9.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "yellow_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return StartGameViewSkin$Skin9;
	})(eui.Skin);

	var StartGameViewSkin$Skin10 = 	(function (_super) {
		__extends(StartGameViewSkin$Skin10, _super);
		function StartGameViewSkin$Skin10() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = StartGameViewSkin$Skin10.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "trumpet_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return StartGameViewSkin$Skin10;
	})(eui.Skin);

	function StartGameViewSkin() {
		_super.call(this);
		this.skinParts = ["start_bg","start_button","rules_button","xw_logo","ranking_button","is_trumpet","trumpet_check","start_group"];
		
		this.height = 1136;
		this.minHeight = 1136;
		this.minWidth = 640;
		this.width = 640;
		this.elementsContent = [this.start_bg_i(),this.start_group_i()];
	}
	var _proto = StartGameViewSkin.prototype;

	_proto.start_bg_i = function () {
		var t = new eui.Image();
		this.start_bg = t;
		t.percentHeight = 100;
		t.source = "game_bg_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.start_group_i = function () {
		var t = new eui.Group();
		this.start_group = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.start_button_i(),this.rules_button_i(),this.xw_logo_i(),this._Group1_i(),this._Button1_i(),this.ranking_button_i(),this.trumpet_check_i()];
		return t;
	};
	_proto.start_button_i = function () {
		var t = new eui.Button();
		this.start_button = t;
		t.height = 76.5;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 196.2;
		t.x = 367.15;
		t.y = 933.5;
		t.skinName = StartGameViewSkin$Skin7;
		return t;
	};
	_proto.rules_button_i = function () {
		var t = new eui.Button();
		this.rules_button = t;
		t.height = 76.5;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 196.2;
		t.x = 51.05;
		t.y = 933.5;
		t.skinName = StartGameViewSkin$Skin8;
		return t;
	};
	_proto.xw_logo_i = function () {
		var t = new eui.Image();
		this.xw_logo = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 34;
		t.rotation = 0.13;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "logo_png";
		t.width = 237;
		t.x = 201.54;
		t.y = 1057.58;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 648.48;
		t.width = 600;
		t.x = 20;
		t.y = 225.41;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 298.8;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "pig_bg_png";
		t.width = 256.8;
		t.x = 42.87;
		t.y = -88.13;
		t.zIndex = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 201.6;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "batman_bg_png";
		t.width = 270;
		t.x = 337;
		t.y = 381;
		t.zIndex = 1;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.alpha = 1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 151.2;
		t.source = "txt_friend_png";
		t.width = 388.8;
		t.x = 103.7;
		t.y = 155.18;
		t.zIndex = 2;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 1.52;
		t.height = 224.1;
		t.source = "txt_batman_png";
		t.width = 346.5;
		t.x = 124.85;
		t.y = 280.54;
		t.zIndex = 3;
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.anchorOffsetY = 0;
		t.height = 50;
		t.label = "";
		t.width = 120;
		t.x = 44.85;
		t.y = 87.28;
		t.skinName = StartGameViewSkin$Skin9;
		return t;
	};
	_proto.ranking_button_i = function () {
		var t = new eui.Label();
		this.ranking_button = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 50;
		t.size = 24;
		t.text = "排行榜";
		t.textAlign = "center";
		t.textColor = 0xac6400;
		t.verticalAlign = "middle";
		t.width = 120;
		t.x = 44.85;
		t.y = 87.28;
		return t;
	};
	_proto.trumpet_check_i = function () {
		var t = new eui.Group();
		this.trumpet_check = t;
		t.height = 59;
		t.width = 56;
		t.x = 529;
		t.y = 82.78;
		t.elementsContent = [this._Button2_i(),this.is_trumpet_i()];
		return t;
	};
	_proto._Button2_i = function () {
		var t = new eui.Button();
		t.height = 59;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 56;
		t.x = 0;
		t.y = 0;
		t.skinName = StartGameViewSkin$Skin10;
		return t;
	};
	_proto.is_trumpet_i = function () {
		var t = new eui.Image();
		this.is_trumpet = t;
		t.height = 59;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "trumpet_check_png";
		t.width = 56;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return StartGameViewSkin;
})(eui.Skin);
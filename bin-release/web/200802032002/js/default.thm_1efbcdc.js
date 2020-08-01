
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
                generateEUI.skins = {"StartGameView":"resource/eui_skins/StartGameView.exml","ScoreGameView":"resource/eui_skins/ScoreGameView.exml","GameExplainPanel":"resource/eui_skins/GameExplainPanel.exml","GameView":"resource/eui_skins/GameView.exml","RankingListView":"resource/eui_skins/RankingListView.exml","ReportCard":"resource/eui_skins/ReportCard.exml"};generateEUI.paths['resource/eui_skins/GameExplainPanel.exml'] = window.StateGameViewSkin = (function (_super) {
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
						new eui.SetProperty("_Image1","percentWidth",95),
						new eui.SetProperty("_Image1","percentHeight",95),
						new eui.SetProperty("labelDisplay","size",28)
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
			this._Image1 = t;
			t.percentHeight = 100;
			t.horizontalCenter = 0;
			t.source = "blue_png";
			t.verticalCenter = 0;
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
		t.anchorOffsetX = 72;
		t.anchorOffsetY = 24;
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
	var GameViewSkin$Skin2 = 	(function (_super) {
		__extends(GameViewSkin$Skin2, _super);
		function GameViewSkin$Skin2() {
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
		var _proto = GameViewSkin$Skin2.prototype;

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
		return GameViewSkin$Skin2;
	})(eui.Skin);

	function GameViewSkin() {
		_super.call(this);
		this.skinParts = ["status_bar","is_trumpet","trumpet_check","score","avatar","nickname","bg","player_area","game_scene","explain_panel"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Group3_i(),this.bg_i(),this.game_scene_i(),this.explain_panel_i()];
	}
	var _proto = GameViewSkin.prototype;

	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 63;
		t.width = 640;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.status_bar_i(),this.trumpet_check_i(),this._Group1_i(),this._Group2_i(),this.avatar_i(),this.nickname_i()];
		return t;
	};
	_proto.status_bar_i = function () {
		var t = new eui.Rect();
		this.status_bar = t;
		t.alpha = 1;
		t.fillColor = 0x16003D;
		t.height = 63;
		t.verticalCenter = 0;
		t.width = 640;
		t.x = -1.376;
		return t;
	};
	_proto.trumpet_check_i = function () {
		var t = new eui.Group();
		this.trumpet_check = t;
		t.anchorOffsetX = 20;
		t.anchorOffsetY = 20;
		t.height = 40;
		t.verticalCenter = 0;
		t.width = 40;
		t.x = 580;
		t.elementsContent = [this._Button1_i(),this.is_trumpet_i()];
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		t.x = 0;
		t.skinName = GameViewSkin$Skin2;
		return t;
	};
	_proto.is_trumpet_i = function () {
		var t = new eui.Image();
		this.is_trumpet = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "trumpet_check_png";
		t.verticalCenter = 0;
		t.visible = true;
		t.percentWidth = 100;
		t.x = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.verticalCenter = 0.5;
		t.width = 63.035;
		t.x = 209.632;
		t.elementsContent = [this._Label1_i(),this.score_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 18;
		t.text = "得分";
		t.textAlign = "center";
		t.textColor = 0xC7FFED;
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto.score_i = function () {
		var t = new eui.Label();
		this.score = t;
		t.size = 24;
		t.text = "0";
		t.textColor = 0xC7FFED;
		t.verticalCenter = 0;
		t.x = 47.615;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.verticalCenter = 0;
		t.x = 304.382;
		t.elementsContent = [this._Label2_i(),this._Image1_i()];
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.size = 20;
		t.text = "将敌人消灭到黑洞";
		t.textAlign = "center";
		t.textColor = 0xC7FFED;
		t.verticalCenter = 0.5;
		t.x = 66.685;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 38.544;
		t.source = "boom_png";
		t.verticalCenter = -2;
		t.width = 51.278;
		t.x = 13.122;
		return t;
	};
	_proto.avatar_i = function () {
		var t = new eui.Image();
		this.avatar = t;
		t.height = 39;
		t.verticalCenter = 0;
		t.width = 39;
		t.x = 46.746;
		return t;
	};
	_proto.nickname_i = function () {
		var t = new eui.Label();
		this.nickname = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 16;
		t.textColor = 0xC7FFED;
		t.verticalCenter = 0;
		t.width = 100;
		t.x = 97.122;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.source = "game_bg_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 63.621;
		return t;
	};
	_proto.game_scene_i = function () {
		var t = new eui.Group();
		this.game_scene = t;
		t.anchorOffsetY = 0;
		t.height = 1060;
		t.horizontalCenter = 0;
		t.verticalCenter = 37.5;
		t.percentWidth = 100;
		t.elementsContent = [this.player_area_i()];
		return t;
	};
	_proto.player_area_i = function () {
		var t = new eui.Group();
		this.player_area = t;
		t.anchorOffsetY = 0;
		t.height = 34;
		t.horizontalCenter = 0;
		t.width = 56.33333333333333;
		t.y = 837.978;
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
	var RankingListViewSkin$Skin3 = 	(function (_super) {
		__extends(RankingListViewSkin$Skin3, _super);
		function RankingListViewSkin$Skin3() {
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
		var _proto = RankingListViewSkin$Skin3.prototype;

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
		return RankingListViewSkin$Skin3;
	})(eui.Skin);

	var RankingListViewSkin$Skin4 = 	(function (_super) {
		__extends(RankingListViewSkin$Skin4, _super);
		function RankingListViewSkin$Skin4() {
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
		var _proto = RankingListViewSkin$Skin4.prototype;

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
		return RankingListViewSkin$Skin4;
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
		t.elementsContent = [this._Rect2_i(),this._Group1_i(),this._Group2_i(),this._scroller_i(),this.close_button_i()];
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.ellipseHeight = 20;
		t.ellipseWidth = 20;
		t.fillColor = 0xffffff;
		t.horizontalCenter = 0;
		t.top = 0;
		t.width = 500;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 80;
		t.horizontalCenter = 0;
		t.width = 300;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Label1_i()];
		return t;
	};
	_proto._Image1_i = function () {
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
		t.elementsContent = [this._Rect3_i(),this._Label2_i(),this._Label3_i(),this._Label4_i(),this._Label5_i()];
		return t;
	};
	_proto._Rect3_i = function () {
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
		t.itemRendererSkinName = RankingListViewSkin$Skin3;
		return t;
	};
	_proto.close_button_i = function () {
		var t = new eui.Button();
		this.close_button = t;
		t.anchorOffsetX = 20;
		t.anchorOffsetY = 20;
		t.height = 40;
		t.label = "";
		t.width = 40;
		t.x = 500;
		t.y = 0;
		t.skinName = RankingListViewSkin$Skin4;
		return t;
	};
	return RankingListViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ReportCard.exml'] = window.ReportCardSkin = (function (_super) {
	__extends(ReportCardSkin, _super);
	function ReportCardSkin() {
		_super.call(this);
		this.skinParts = ["bg","go_back","nickname","score"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this.bg_i(),this._Group5_i()];
	}
	var _proto = ReportCardSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.bottom = 0;
		t.percentHeight = 100;
		t.left = 0;
		t.right = 0;
		t.source = "game_bg_png";
		t.top = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this.go_back_i(),this._Group4_i(),this._Label4_i()];
		return t;
	};
	_proto.go_back_i = function () {
		var t = new eui.Group();
		this.go_back = t;
		t.anchorOffsetX = 90;
		t.anchorOffsetY = 30;
		t.height = 60;
		t.horizontalCenter = 0;
		t.width = 180;
		t.y = 800;
		t.elementsContent = [this._Rect1_i(),this._Label1_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseHeight = 40;
		t.ellipseWidth = 40;
		t.fillColor = 0x4f7cf9;
		t.percentHeight = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.strokeColor = 0xffffff;
		t.strokeWeight = 2;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Arial";
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "返回";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.height = 230;
		t.horizontalCenter = 0;
		t.verticalCenter = -125;
		t.width = 500;
		t.elementsContent = [this._Image1_i(),this._Group3_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = -2;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "rect_png";
		t.top = 2;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 65;
		t.elementsContent = [this._Group1_i(),this._Group2_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 100;
		t.width = 80;
		t.x = 8.784;
		t.y = 13.176;
		t.elementsContent = [this._Label2_i(),this._Label3_i()];
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.left = 0;
		t.size = 24;
		t.text = "姓名:";
		t.textAlign = "center";
		t.textColor = 0xc8aef7;
		t.top = 0;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.left = 0;
		t.size = 24;
		t.text = "成绩:";
		t.textAlign = "center";
		t.textColor = 0xc8aef7;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.y = 60;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 100;
		t.width = 280;
		t.x = 98.784;
		t.y = 13.176;
		t.elementsContent = [this.nickname_i(),this.score_i(),this._Image2_i()];
		return t;
	};
	_proto.nickname_i = function () {
		var t = new eui.Label();
		this.nickname = t;
		t.left = 0;
		t.size = 24;
		t.text = "小麦";
		t.textAlign = "left";
		t.textColor = 0xc8aef7;
		t.top = 0;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		return t;
	};
	_proto.score_i = function () {
		var t = new eui.Label();
		this.score = t;
		t.left = 0;
		t.size = 24;
		t.text = "0";
		t.textAlign = "left";
		t.textColor = 0xc8aef7;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.y = 60;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 10;
		t.horizontalCenter = 66.5;
		t.source = "player_png";
		t.top = -10;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 50;
		t.text = "朱望仔大战大反派";
		t.textColor = 0xC8AEF7;
		t.verticalCenter = -338;
		return t;
	};
	return ReportCardSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScoreGameView.exml'] = window.ScoreGameViewSkin = (function (_super) {
	__extends(ScoreGameViewSkin, _super);
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
						new eui.SetProperty("_Image1","percentWidth",95),
						new eui.SetProperty("_Image1","percentHeight",95),
						new eui.SetProperty("labelDisplay","size",28)
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
			this._Image1 = t;
			t.percentHeight = 100;
			t.horizontalCenter = 0;
			t.source = "blue_png";
			t.verticalCenter = 0;
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.fontFamily = "Microsoft YaHei";
			t.horizontalCenter = 0;
			t.size = 30;
			t.textColor = 0xffffff;
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
						new eui.SetProperty("_Image1","percentWidth",95),
						new eui.SetProperty("_Image1","percentHeight",95),
						new eui.SetProperty("labelDisplay","size",28)
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
			this._Image1 = t;
			t.percentHeight = 100;
			t.horizontalCenter = 0;
			t.source = "blue_png";
			t.verticalCenter = 0;
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.fontFamily = "Microsoft YaHei";
			t.horizontalCenter = 0;
			t.size = 30;
			t.textColor = 0xffffff;
			t.verticalCenter = 0;
			return t;
		};
		return ScoreGameViewSkin$Skin6;
	})(eui.Skin);

	var ScoreGameViewSkin$Skin7 = 	(function (_super) {
		__extends(ScoreGameViewSkin$Skin7, _super);
		function ScoreGameViewSkin$Skin7() {
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
						new eui.SetProperty("_Image1","percentWidth",95),
						new eui.SetProperty("_Image1","percentHeight",95),
						new eui.SetProperty("labelDisplay","size",28)
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ScoreGameViewSkin$Skin7.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.horizontalCenter = 0;
			t.source = "purple_png";
			t.verticalCenter = 0;
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.fontFamily = "Microsoft YaHei";
			t.horizontalCenter = 0;
			t.size = 30;
			t.textColor = 0xffffff;
			t.verticalCenter = 0;
			return t;
		};
		return ScoreGameViewSkin$Skin7;
	})(eui.Skin);

	function ScoreGameViewSkin() {
		_super.call(this);
		this.skinParts = ["bg","trophy_img","score","showRankingList","report_card_btn","restart_button"];
		
		this.height = 1136;
		this.minHeight = 1136;
		this.minWidth = 640;
		this.width = 640;
		this.elementsContent = [this.bg_i(),this._Group2_i()];
	}
	var _proto = ScoreGameViewSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.percentHeight = 100;
		t.source = "game_bg_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 1136;
		t.width = 640;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.trophy_img_i(),this.score_i(),this._Label1_i(),this._Group1_i()];
		return t;
	};
	_proto.trophy_img_i = function () {
		var t = new eui.Image();
		this.trophy_img = t;
		t.anchorOffsetX = 168;
		t.anchorOffsetY = 161;
		t.height = 322;
		t.horizontalCenter = 16;
		t.source = "trophy_png";
		t.width = 336;
		t.y = 260;
		return t;
	};
	_proto.score_i = function () {
		var t = new eui.Label();
		this.score = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.height = 54;
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "250";
		t.textAlign = "center";
		t.textColor = 0x794af6;
		t.verticalCenter = -113;
		t.percentWidth = 100;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.height = 54;
		t.text = "本局得分";
		t.textAlign = "center";
		t.textColor = 0x794af6;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 505;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 400;
		t.horizontalCenter = 1;
		t.width = 200;
		t.y = 600;
		t.elementsContent = [this.showRankingList_i(),this.report_card_btn_i(),this.restart_button_i()];
		return t;
	};
	_proto.showRankingList_i = function () {
		var t = new eui.Button();
		this.showRankingList = t;
		t.anchorOffsetX = 90;
		t.anchorOffsetY = 30;
		t.height = 60;
		t.horizontalCenter = 0;
		t.label = "查看排行榜";
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 0;
		t.width = 180;
		t.skinName = ScoreGameViewSkin$Skin5;
		return t;
	};
	_proto.report_card_btn_i = function () {
		var t = new eui.Button();
		this.report_card_btn = t;
		t.anchorOffsetX = 90;
		t.anchorOffsetY = 30;
		t.height = 60;
		t.horizontalCenter = 0;
		t.label = "生成成绩单";
		t.width = 180;
		t.y = 140;
		t.skinName = ScoreGameViewSkin$Skin6;
		return t;
	};
	_proto.restart_button_i = function () {
		var t = new eui.Button();
		this.restart_button = t;
		t.anchorOffsetX = 90;
		t.anchorOffsetY = 30;
		t.bottom = 0;
		t.height = 60;
		t.horizontalCenter = 0;
		t.label = "再玩一次";
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = true;
		t.width = 180;
		t.skinName = ScoreGameViewSkin$Skin7;
		return t;
	};
	return ScoreGameViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/StartGameView.exml'] = window.StartGameViewSkin = (function (_super) {
	__extends(StartGameViewSkin, _super);
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
			t.source = "yellow_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.fontFamily = "Microsoft YaHei";
			t.horizontalCenter = 0;
			t.size = 24;
			t.textColor = 0xac6400;
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
		return StartGameViewSkin$Skin10;
	})(eui.Skin);

	function StartGameViewSkin() {
		_super.call(this);
		this.skinParts = ["start_bg","pig_bg_img","batman_bg_img","ranking_button","is_trumpet","trumpet_check","start_button","start_group"];
		
		this.height = 1136;
		this.minHeight = 1136;
		this.minWidth = 640;
		this.width = 640;
		this._TweenGroup1_i();
		this.elementsContent = [this.start_bg_i(),this.start_group_i()];
	}
	var _proto = StartGameViewSkin.prototype;

	_proto._TweenGroup1_i = function () {
		var t = new egret.tween.TweenGroup();
		return t;
	};
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
		t.elementsContent = [this._Group1_i(),this.ranking_button_i(),this.trumpet_check_i(),this._Group2_i()];
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
		t.elementsContent = [this.pig_bg_img_i(),this.batman_bg_img_i(),this._Image1_i(),this._Image2_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.pig_bg_img_i = function () {
		var t = new eui.Image();
		this.pig_bg_img = t;
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
	_proto.batman_bg_img_i = function () {
		var t = new eui.Image();
		this.batman_bg_img = t;
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
	_proto._Image1_i = function () {
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
	_proto._Image2_i = function () {
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
	_proto.ranking_button_i = function () {
		var t = new eui.Button();
		this.ranking_button = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 25;
		t.height = 50;
		t.label = "排行榜";
		t.width = 120;
		t.x = 99;
		t.y = 110;
		t.skinName = StartGameViewSkin$Skin8;
		return t;
	};
	_proto.trumpet_check_i = function () {
		var t = new eui.Group();
		this.trumpet_check = t;
		t.anchorOffsetX = 28;
		t.anchorOffsetY = 29.5;
		t.height = 59;
		t.width = 56;
		t.x = 570;
		t.y = 110;
		t.elementsContent = [this._Button1_i(),this.is_trumpet_i()];
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.percentHeight = 100;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.skinName = StartGameViewSkin$Skin9;
		return t;
	};
	_proto.is_trumpet_i = function () {
		var t = new eui.Image();
		this.is_trumpet = t;
		t.percentHeight = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "trumpet_check_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 80;
		t.horizontalCenter = 0;
		t.width = 500;
		t.y = 920;
		t.elementsContent = [this.start_button_i()];
		return t;
	};
	_proto.start_button_i = function () {
		var t = new eui.Button();
		this.start_button = t;
		t.anchorOffsetX = 98.1;
		t.anchorOffsetY = 38.25;
		t.height = 76.5;
		t.horizontalCenter = 0;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.width = 196.2;
		t.skinName = StartGameViewSkin$Skin10;
		return t;
	};
	return StartGameViewSkin;
})(eui.Skin);
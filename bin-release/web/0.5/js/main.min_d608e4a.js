var __reflect=this&&this.__reflect||function(t,e,n){t.__class__=e,n?n.push(e):n=[e],t.__types__=t.__types__?n.concat(t.__types__):n},__extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);n.prototype=e.prototype,t.prototype=new n},__awaiter=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))(function(o,r){function a(t){try{h(i.next(t))}catch(e){r(e)}}function s(t){try{h(i["throw"](t))}catch(e){r(e)}}function h(t){t.done?o(t.value):new n(function(e){e(t.value)}).then(a,s)}h((i=i.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function n(t){return function(e){return i([t,e])}}function i(n){if(o)throw new TypeError("Generator is already executing.");for(;h;)try{if(o=1,r&&(a=r[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(r,n[1])).done)return a;switch(r=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return h.label++,{value:n[1],done:!1};case 5:h.label++,r=n[1],n=[0];continue;case 7:n=h.ops.pop(),h.trys.pop();continue;default:if(a=h.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){h=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){h.label=n[1];break}if(6===n[0]&&h.label<a[1]){h.label=a[1],a=n;break}if(a&&h.label<a[2]){h.label=a[2],h.ops.push(n);break}a[2]&&h.ops.pop(),h.trys.pop();continue}n=e.call(t,h)}catch(i){n=[6,i],r=0}finally{o=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,r,a,s,h={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:n(0),"throw":n(1),"return":n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},TouchEvents=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.onEvent=function(t){t.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.btnTouchEnd,this),t.addEventListener(egret.TouchEvent.TOUCH_END,this.btnTouchEnd,this),this._button=t},e.btnTouchBegin=function(){egret.Tween.get(this._button).to({scaleX:.95,scaleY:.95},150)},e.btnTouchEnd=function(){egret.Tween.get(this._button).to({scaleX:1,scaleY:1},150)},e}(egret.EventDispatcher);__reflect(TouchEvents.prototype,"TouchEvents");var AssetAdapter=function(){function t(){}return t.prototype.getAsset=function(t,e,n){function i(i){e.call(n,i,t)}if(RES.hasRes(t)){var o=RES.getRes(t);o?i(o):RES.getResAsync(t,i,this)}else RES.getResByUrl(t,i,this,RES.ResourceItem.TYPE_IMAGE)},t}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.onProgress=function(t,e){this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.createChildren=function(){t.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(t){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var e=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",e),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(t){console.log(t)})},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.loadResource()];case 1:return t.sent(),this.createGameScene(),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,4,,5]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return n.sent(),[4,this.loadTheme()];case 2:return n.sent(),[4,RES.loadGroup("preload",0,t)];case 3:return n.sent(),this.stage.removeChild(t),[3,5];case 4:return e=n.sent(),console.error(e),[3,5];case 5:return[2]}})})},e.prototype.loadTheme=function(){var t=this;return new Promise(function(e,n){var i=new eui.Theme("resource/default.thm.json",t.stage);i.addEventListener(eui.UIEvent.COMPLETE,function(){e()},t)})},e.prototype.createGameScene=function(){var t=new StartGameView;t.addEventListener(PostEvent.START_GAME,this.showGameView,this),t.addEventListener(PostEvent.Ranking_List,this.showRankingList,this),this.addChild(t)},e.prototype.showGameView=function(){var t=new GameView;t.addEventListener(PostEvent.GAME_OVER,this.showGameOver,this),this.addChild(t)},e.prototype.showGameOver=function(t){var e=new ScoreGameView;e.addEventListener(eui.UIEvent.COMPLETE,function(){t.score?e.score.text=String(t.score):e.score.text="0"},this),e.addEventListener(PostEvent.RESTART_GAME,this.showGameView,this),this.addChild(e),e.addEventListener(PostEvent.Ranking_List,this.showRankingList,this),e.addEventListener(PostEvent.Report_Card,this.reportCard,this)},e.prototype.showRankingList=function(){var t=new RankingListView;this.addChild(t)},e.prototype.reportCard=function(t){var e=new ReportCard;e.addEventListener(eui.UIEvent.COMPLETE,function(){t.score?e.score.text=String(t.score):e.score.text="0"},this),this.addChild(e),e.addEventListener(PostEvent.GAME_OVER,this.showGameOver,this)},e}(eui.UILayer);__reflect(Main.prototype,"Main");var p2DebugDraw=function(){function t(t){this.COLOR_D_SLEEP=10066329,this.COLOR_D_WAKE=15053490,this.COLOR_K=8355813,this.COLOR_S=8381823,this.world=t}return t.prototype.setSprite=function(t){this.sprite=t},t.prototype.drawDebug=function(){this.sprite.graphics.clear();for(var t=this.world.bodies.length,e=0;t>e;e++)for(var n=this.world.bodies[e],i=0;i<n.shapes.length;i++){var o=n.shapes[i];o instanceof p2.Convex?this.drawConvex(o,n):o instanceof p2.Plane?this.drawPlane(o,n):o instanceof p2.Circle&&this.drawCircle(o,n)}},t.prototype.drawConvex=function(t,e){var n=this.getColor(e),i=t.vertices.length,o=this.sprite.graphics;o.lineStyle(1,n),o.beginFill(n,.5);var r=new Array;e.toWorldFrame(r,t.vertices[0]),o.moveTo(e.position[0],e.position[1]),o.lineTo(r[0],r[1]);for(var a=1;i>=a;a++)e.toWorldFrame(r,t.vertices[a%i]),o.lineTo(r[0],r[1]);o.endFill()},t.prototype.drawCircle=function(t,e){var n=this.getColor(e),i=this.sprite.graphics;i.lineStyle(1,n),i.beginFill(n,.5),i.drawCircle(e.position[0],e.position[1],t.radius);var o=new Array;e.toWorldFrame(o,[t.radius,0]),i.moveTo(e.position[0],e.position[1]),i.lineTo(o[0],o[1]),i.endFill()},t.prototype.drawPlane=function(t,e){var n=this.COLOR_D_SLEEP,i=this.sprite.graphics;i.lineStyle(1,n),i.beginFill(n,1);var o=new Array,r=new Array;e.toWorldFrame(o,[-1e3,0]),i.moveTo(o[0],o[1]),e.toWorldFrame(r,[1e3,0]),i.lineTo(r[0],r[1]),e.toWorldFrame(r,[1e3,-1e3]),i.lineTo(r[0],r[1]),e.toWorldFrame(r,[-1e3,-1e3]),i.lineTo(r[0],r[1]),e.toWorldFrame(r,[-1e3,-0]),i.lineTo(r[0],r[1]),i.endFill()},t.prototype.getColor=function(t){var e=this.COLOR_D_SLEEP;return t.type==p2.Body.KINEMATIC?e=this.COLOR_K:t.type==p2.Body.STATIC?e=this.COLOR_S:t.sleepState==p2.Body.AWAKE&&(e=this.COLOR_D_WAKE),e},t}();__reflect(p2DebugDraw.prototype,"p2DebugDraw"),function(t){"use strict";function e(t,e){var n=(65535&t)+(65535&e),i=(t>>16)+(e>>16)+(n>>16);return i<<16|65535&n}function n(t,e){return t<<e|t>>>32-e}function i(t,i,o,r,a,s){return e(n(e(e(i,t),e(r,s)),a),o)}function o(t,e,n,o,r,a,s){return i(e&n|~e&o,t,e,r,a,s)}function r(t,e,n,o,r,a,s){return i(e&o|n&~o,t,e,r,a,s)}function a(t,e,n,o,r,a,s){return i(e^n^o,t,e,r,a,s)}function s(t,e,n,o,r,a,s){return i(n^(e|~o),t,e,r,a,s)}function h(t,n){t[n>>5]|=128<<n%32,t[(n+64>>>9<<4)+14]=n;var i,h,c,d,p,l=1732584193,u=-271733879,g=-1732584194,v=271733878;for(i=0;i<t.length;i+=16)h=l,c=u,d=g,p=v,l=o(l,u,g,v,t[i],7,-680876936),v=o(v,l,u,g,t[i+1],12,-389564586),g=o(g,v,l,u,t[i+2],17,606105819),u=o(u,g,v,l,t[i+3],22,-1044525330),l=o(l,u,g,v,t[i+4],7,-176418897),v=o(v,l,u,g,t[i+5],12,1200080426),g=o(g,v,l,u,t[i+6],17,-1473231341),u=o(u,g,v,l,t[i+7],22,-45705983),l=o(l,u,g,v,t[i+8],7,1770035416),v=o(v,l,u,g,t[i+9],12,-1958414417),g=o(g,v,l,u,t[i+10],17,-42063),u=o(u,g,v,l,t[i+11],22,-1990404162),l=o(l,u,g,v,t[i+12],7,1804603682),v=o(v,l,u,g,t[i+13],12,-40341101),g=o(g,v,l,u,t[i+14],17,-1502002290),u=o(u,g,v,l,t[i+15],22,1236535329),l=r(l,u,g,v,t[i+1],5,-165796510),v=r(v,l,u,g,t[i+6],9,-1069501632),g=r(g,v,l,u,t[i+11],14,643717713),u=r(u,g,v,l,t[i],20,-373897302),l=r(l,u,g,v,t[i+5],5,-701558691),v=r(v,l,u,g,t[i+10],9,38016083),g=r(g,v,l,u,t[i+15],14,-660478335),u=r(u,g,v,l,t[i+4],20,-405537848),l=r(l,u,g,v,t[i+9],5,568446438),v=r(v,l,u,g,t[i+14],9,-1019803690),g=r(g,v,l,u,t[i+3],14,-187363961),u=r(u,g,v,l,t[i+8],20,1163531501),l=r(l,u,g,v,t[i+13],5,-1444681467),v=r(v,l,u,g,t[i+2],9,-51403784),g=r(g,v,l,u,t[i+7],14,1735328473),u=r(u,g,v,l,t[i+12],20,-1926607734),l=a(l,u,g,v,t[i+5],4,-378558),v=a(v,l,u,g,t[i+8],11,-2022574463),g=a(g,v,l,u,t[i+11],16,1839030562),u=a(u,g,v,l,t[i+14],23,-35309556),l=a(l,u,g,v,t[i+1],4,-1530992060),v=a(v,l,u,g,t[i+4],11,1272893353),g=a(g,v,l,u,t[i+7],16,-155497632),u=a(u,g,v,l,t[i+10],23,-1094730640),l=a(l,u,g,v,t[i+13],4,681279174),v=a(v,l,u,g,t[i],11,-358537222),g=a(g,v,l,u,t[i+3],16,-722521979),u=a(u,g,v,l,t[i+6],23,76029189),l=a(l,u,g,v,t[i+9],4,-640364487),v=a(v,l,u,g,t[i+12],11,-421815835),g=a(g,v,l,u,t[i+15],16,530742520),u=a(u,g,v,l,t[i+2],23,-995338651),l=s(l,u,g,v,t[i],6,-198630844),v=s(v,l,u,g,t[i+7],10,1126891415),g=s(g,v,l,u,t[i+14],15,-1416354905),u=s(u,g,v,l,t[i+5],21,-57434055),l=s(l,u,g,v,t[i+12],6,1700485571),v=s(v,l,u,g,t[i+3],10,-1894986606),g=s(g,v,l,u,t[i+10],15,-1051523),u=s(u,g,v,l,t[i+1],21,-2054922799),l=s(l,u,g,v,t[i+8],6,1873313359),v=s(v,l,u,g,t[i+15],10,-30611744),g=s(g,v,l,u,t[i+6],15,-1560198380),u=s(u,g,v,l,t[i+13],21,1309151649),l=s(l,u,g,v,t[i+4],6,-145523070),v=s(v,l,u,g,t[i+11],10,-1120210379),g=s(g,v,l,u,t[i+2],15,718787259),u=s(u,g,v,l,t[i+9],21,-343485551),l=e(l,h),u=e(u,c),g=e(g,d),v=e(v,p);return[l,u,g,v]}function c(t){var e,n="",i=32*t.length;for(e=0;i>e;e+=8)n+=String.fromCharCode(t[e>>5]>>>e%32&255);return n}function d(t){var e,n=[];for(n[(t.length>>2)-1]=void 0,e=0;e<n.length;e+=1)n[e]=0;var i=8*t.length;for(e=0;i>e;e+=8)n[e>>5]|=(255&t.charCodeAt(e/8))<<e%32;return n}function p(t){return c(h(d(t),8*t.length))}function l(t,e){var n,i,o=d(t),r=[],a=[];for(r[15]=a[15]=void 0,o.length>16&&(o=h(o,8*t.length)),n=0;16>n;n+=1)r[n]=909522486^o[n],a[n]=1549556828^o[n];return i=h(r.concat(d(e)),512+8*e.length),c(h(a.concat(i),640))}function u(t){var e,n,i="0123456789abcdef",o="";for(n=0;n<t.length;n+=1)e=t.charCodeAt(n),o+=i.charAt(e>>>4&15)+i.charAt(15&e);return o}function g(t){return window.unescape(encodeURIComponent(t))}function v(t){return p(g(t))}function f(t){return u(v(t))}function E(t,e){return l(g(t),g(e))}function y(t,e){return u(E(t,e))}function _(t,e,n){return e?n?E(e,t):y(e,t):n?v(t):f(t)}t.md5=_}(window);var DebugPlatform=function(){function t(){}return t.prototype.addJifen=function(t){return __awaiter(this,void 0,void 0,function(){var e,n,i;return __generator(this,function(o){return e="zxdqw",n=Date.now(),i=window.md5(e+"openid"+window.playerInfo.openid+"score"+t+n),[2,this._request("https://xwfintech.qingke.io/5f195b8dc01e13002c2d7341/openapi/pinball/add/measy?key="+e+"&sign="+i+"&openid="+window.playerInfo.openid+"&score="+t+"&timestamp="+n)]})})},t.prototype.getRank=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,this._request("https://xwfintech.qingke.io/_api/5f195b8dc01e13002c2d7341/openapi/pinball/list?pageSize=100")]})})},t.prototype._request=function(t){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(n){return[2,new Promise(function(n,i){var o=new egret.HttpRequest;o.responseType=egret.HttpResponseType.TEXT,o.open(t,egret.HttpMethod.GET),o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.send(),o.addEventListener(egret.Event.COMPLETE,function(t){var e=t.currentTarget;n(e.response)},e),o.addEventListener(egret.IOErrorEvent.IO_ERROR,i,e),o.addEventListener(egret.ProgressEvent.PROGRESS,function(t){},e)})]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var Player=function(t){function e(e,n,i,o,r,a){var s=t.call(this)||this;return s.arrow=null,s.disk=null,s.pig=null,s.diskShow=!1,s.bg=null,s.moving=!1,s.body=null,s.score=0,s.passCount=1,s.batmans=i,s.batmanBodys=r,s.holes=o,s.world=a,s.body=n,s.bg=e,s.createObject(),s.bindTouchEvent(),s}return __extends(e,t),e.prototype.createObject=function(){var t=new egret.Bitmap;t.texture=RES.getRes("arrow_png"),t.anchorOffsetY=t.height/2,t.visible=!1,this.addChild(t),this.arrow=t;var e=new egret.Bitmap;e.texture=RES.getRes("disk_png"),e.anchorOffsetX=e.width/2,e.anchorOffsetY=e.height/2,e.visible=!1,this.addChild(e),this.disk=e;var n=new egret.Bitmap;n.texture=RES.getRes("player_png"),n.width=n.width/2,n.height=n.height/2,n.anchorOffsetX=n.width/2,n.anchorOffsetY=n.height/2,this.addChild(n),n.touchEnabled=!0,this.pig=n},e.prototype.bindTouchEvent=function(){var t=this;this.pig.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(e){t.disk.visible=!0,t.arrow.visible=!0,t.moving=!0,t.checkHit()},this),this.pig.addEventListener(egret.TouchEvent.TOUCH_END,function(e){t.disk.visible=!1,t.arrow.visible=!1,t.moving=!1},this),this.bg.addEventListener(egret.TouchEvent.TOUCH_MOVE,function(e){if(t.moving){var n=new egret.Point(e.stageX,e.stageY),i=t.localToGlobal(t.pig.x,t.pig.y),o=Math.atan2(n.y-i.y,n.x-i.x);t.arrow.rotation=o*(180/Math.PI);var r=egret.Point.distance(n,i);r>75&&(r=75),10>r&&(r=10),t.arrow.scaleX=r/100,t.arrow.scaleY=r/100}},this),this.bg.addEventListener(egret.TouchEvent.TOUCH_END,function(e){if(t.moving){var n=new egret.Point(e.stageX,e.stageY),i=t.localToGlobal(t.pig.x,t.pig.y),o=n.x-i.x,r=n.y-i.y;t.body.applyForce([o/5,r/5],[0,0]),t.disk.visible=!1,t.arrow.visible=!1,t.moving=!1}},this)},e.prototype.checkHit=function(){var t=this;this.holes.forEach(function(e){var n=new egret.Rectangle(e.x,e.y,e.width,e.height);t.batmans.forEach(function(e,i){var o=new egret.Rectangle(e.x,e.y,e.width,e.height);n.intersects(o)&&(egret.Tween.get(e).to({alpha:0},200),t.batmans.splice(i,1),t.world.removeBody(t.batmanBodys[i]),t.batmanBodys.splice(i,1),t.incrementScore(10),t.feedbackScore(10,e.x,e.y,t.bg),t.playHitSound())}),t.checkPig(n)}),0===this.batmans.length&&(this.dispatchEvent(new PostEvent(PostEvent.INCREMENT_BATMANS)),this.feedbackPassCount(this.bg))},e.prototype.checkPig=function(t){var e=new egret.Rectangle(this.body.position[0],this.body.position[1],this.pig.width,this.pig.height);t.intersects(e)&&(egret.Tween.get(this.pig).to({alpha:0},200),this.loseSound(),this.dispatchEvent(new PostEvent(PostEvent.GAME_OVER)))},e.prototype.incrementScore=function(t){this.score+=t,this.dispatchEvent(new PostEvent(PostEvent.INCREMNT_SCORE,!1,!1,this.score))},e.prototype.feedbackScore=function(t,e,n,i){var o=new eui.Label("+"+t);o.x=e,o.y=n,o.textColor=16444726,o.fontFamily="Consolas",o.size=18,egret.Tween.get(o).to({alpha:0,y:n-10},1e3).call(function(){i.removeChild(o),o=null}),i.addChild(o)},e.prototype.feedbackPassCount=function(t,e,n,i){void 0===e&&(e="第 "+this.passCount+" 关"),void 0===n&&(n=this.bg.width/2),void 0===i&&(i=this.bg.height/2);var o=new eui.Label(e);o.x=n-o.textWidth/4-10,o.y=i,o.anchorOffsetX=o.textWidth/2,o.anchorOffsetY=o.textHeight/2,o.textColor=16777215,o.fontFamily="Mircrosoft YaHei",o.size=50,o.bold=!0,egret.Tween.get(o).to({alpha:1,y:i-30},2e3).call(function(){t.removeChild(o),o=null}),t.addChild(o),this.passCount++},e.prototype.playHitSound=function(){if(LoadBGM.getInstance().getPlayStatus()){var t=RES.getRes("add_mp3");t.play(0,1)}},e.prototype.loseSound=function(){if(LoadBGM.getInstance().getPlayStatus()){var t=RES.getRes("lose_mp3");t.play(0,1)}},e}(egret.Sprite);__reflect(Player.prototype,"Player");var ThemeAdapter=function(){function t(){}return t.prototype.getTheme=function(t,e,n,i){function o(t){e.call(i,t)}function r(e){e.resItem.url==t&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,r,null),n.call(i))}var a=this;if("undefined"!=typeof generateEUI)egret.callLater(function(){e.call(i,generateEUI)},this);else if("undefined"!=typeof generateEUI2)RES.getResByUrl("resource/gameEui.json",function(t,n){window.JSONParseClass.setData(t),egret.callLater(function(){e.call(i,generateEUI2)},a)},this,RES.ResourceItem.TYPE_JSON);else if("undefined"!=typeof generateJSON)if(t.indexOf(".exml")>-1){var s=t.split("/");s.pop();var h=s.join("/")+"_EUI.json";generateJSON.paths[t]?egret.callLater(function(){e.call(i,generateJSON.paths[t])},this):RES.getResByUrl(h,function(n){window.JSONParseClass.setData(n),egret.callLater(function(){e.call(i,generateJSON.paths[t])},a)},this,RES.ResourceItem.TYPE_JSON)}else egret.callLater(function(){e.call(i,generateJSON)},this);else RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,r,null),RES.getResByUrl(t,o,this,RES.ResourceItem.TYPE_TEXT)},t}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var LoadBGM=function(){function t(){this._isPlay=!1,this._sound=RES.getRes("bgm_mp3")}return t.getInstance=function(){return null===this.LoadBGM&&(t.LoadBGM=new t),t.LoadBGM},t.prototype.getPlayStatus=function(){return this._isPlay},t.prototype.setPlayStatus=function(t){this._isPlay=t},t.prototype.getChannel=function(){return this._channel},t.prototype.stopBGM=function(){this._isPlay&&(this._channel&&this._channel.stop(),this._isPlay=!1,this.prePlayStatus=!0)},t.prototype.playBGM=function(){this._isPlay||(this._channel=this._sound.play(),this._isPlay=!0,this.prePlayStatus=!1)},t.prototype.SwitchPlay=function(){this._isPlay?(this._channel&&this._channel.stop(),this._isPlay=!1):(this._channel=this._sound.play(),this._isPlay=!0)},t.LoadBGM=null,t}();__reflect(LoadBGM.prototype,"LoadBGM");var PostEvent=function(t){function e(e,n,i,o){void 0===n&&(n=!1),void 0===i&&(i=!1),void 0===o&&(o=0);var r=t.call(this,e,n,i)||this;return 0!==o&&(r.score=o),r}return __extends(e,t),e.START_GAME="Start Game",e.GAME_OVER="Game Over",e.RESTART_GAME="restart game",e.READ_EXPLAIN="read explain",e.Ranking_List="Ranking List",e.INCREMNT_SCORE="incremnt score",e.INCREMENT_BATMANS="incremnt batmanas",e.Report_Card="Report Card",e}(egret.Event);__reflect(PostEvent.prototype,"PostEvent");var GameExplainPanel=function(t){function e(){var e=t.call(this)||this;return e.addEventListener(eui.UIEvent.COMPLETE,e.onComplete,e),e}return __extends(e,t),e.prototype.onComplete=function(){var t=this;this.confirm_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.confirmBtn,this),this.confirm_start.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.confirm_start),egret.Tween.get(t.confirm_start).to({scaleX:.95,scaleY:.95},150)},this)},e.prototype.confirmBtn=function(){this.explain_panel.visible=!1,this.dispatchEvent(new PostEvent(PostEvent.READ_EXPLAIN))},e.prototype.partAdded=function(e,n){t.prototype.partAdded.call(this,e,n)},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this)},e}(eui.Component);__reflect(GameExplainPanel.prototype,"GameExplainPanel",["eui.UIComponent","egret.DisplayObject"]);var GameView=function(t){function e(){var e=t.call(this)||this;return e.batmanCount=1,e.isEnableP2Debug=!1,e.holes=new Array(4),e.world=null,e.p2debug=null,e.batmans=[],e.batmanBodys=[],e.addEventListener(eui.UIEvent.COMPLETE,e.onComplete,e),e}return __extends(e,t),e.prototype.onComplete=function(){var t=this;this.explain_panel.addEventListener(PostEvent.READ_EXPLAIN,this.createGameScene,this),this.trumpet_check.addEventListener(egret.TouchEvent.TOUCH_TAP,this.trumpetCheck,this),this.trumpet_check.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.trumpet_check),egret.Tween.get(t.trumpet_check).to({scaleX:.9,scaleY:.9},150)},this)},e.prototype.trumpetCheck=function(){var t=LoadBGM.getInstance();t.SwitchPlay(),t.getPlayStatus()?this.is_trumpet.visible=!0:this.is_trumpet.visible=!1},e.prototype.createGameScene=function(){var t=this,e=new p2.World({gravity:[0,0]});e.defaultContactMaterial.restitution=1,e.defaultContactMaterial.friction=.1,e.on("endContact",function(e){t.player.checkHit()},this),this.world=e,this.holeAroundMap(),this.add4Wall(),this.addPlayer(this),this.productBatman(),this.addEventListener(egret.Event.ENTER_FRAME,this.onUpdate,this),this.player.feedbackPassCount(this)},e.prototype.enableP2Debug=function(t){var e=new egret.Sprite;this.addChild(e),this.p2debug=new p2DebugDraw(t),this.p2debug.setSprite(e),this.isEnableP2Debug=!0},e.prototype.hole=function(){var t=new egret.Bitmap(RES.getRes("hole_png"));return t.width=t.width/4,t.height=t.height/4,t.anchorOffsetX=t.width/2,t.anchorOffsetY=t.height/2,t},e.prototype.holeAroundMap=function(){for(var t=0;t<this.holes.length;t++){var e=this.hole(),n=e.width/2,i=e.height/2,o=this.width,r=this.height;switch(t){case 0:e.x=n,e.y=i+this.status_bar.height+13;break;case 1:e.x=-n+o,e.y=i+this.status_bar.height+13;break;case 2:e.x=n,e.y=-i+r;break;case 3:e.x=-n+o,e.y=-i+r}this.addChild(e),this.holes[t]=e}},e.prototype.onUpdate=function(){this.world.step(1),this.world.bodies.forEach(function(t){t.displays&&(t.displays[0].x=t.position[0],t.displays[0].y=t.position[1])}),this.isEnableP2Debug&&this.p2debug.drawDebug()},e.prototype.makeBatman=function(){var t=new egret.Bitmap(RES.getRes("batman_png"));return t.width=t.width/3,t.height=t.height/3,t.anchorOffsetX=t.width/2,t.anchorOffsetY=t.height/2,t},e.prototype.randomNum=function(t,e,n){var i=0,o=0;switch(t>=e?(o=e,i=t):(o=t,i=e),arguments.length){case 1:return Math.floor(Math.random()*(i+1));case 2:return Math.floor(Math.random()*(i-o+1)+o);case 3:return(Math.random()*(i-o)+o).toFixed(n);default:return Math.random()}},e.prototype.appendToBatman=function(){var t=this.makeBatman(),e=t.width/2,n=t.height/2,i=this.make_area.width,o=this.make_area.height,r=new p2.Circle({radius:e}),a=new p2.Body({mass:1,position:[this.randomNum(0,i-e,2),this.randomNum(268,o-n-270,2)]});return a.addShape(r),a.displays=[t],[a,t]},e.prototype.productBatman=function(){for(var t=this.batmanCount,e=0;t>e;e++){var n=this.appendToBatman();this.world.addBody(n[0]),this.batmanBodys.push(n[0]),this.batmans.push(n[1]),this.addChild(n[1])}this.batmanCount++},e.prototype.addWall=function(t,e){var n=new egret.Bitmap;n.texture=RES.getRes("wall2_png"),this.addChild(n);var i=new p2.Box({width:n.width,height:n.height}),o=new p2.Body({type:p2.Body.STATIC,position:[t,e]});o.addShape(i),o.displays=[n],this.world.addBody(o)},e.prototype.add4Wall=function(){var t=new p2.Plane,e=new p2.Body({type:p2.Body.STATIC,position:[0,this.stage.stageHeight]});e.angle=Math.PI,e.addShape(t),this.world.addBody(e);var n=new p2.Plane,i=new p2.Body({type:p2.Body.STATIC,position:[0,0]});i.angle=-Math.PI/2,i.addShape(n),this.world.addBody(i);var o=new p2.Plane,r=new p2.Body({type:p2.Body.STATIC,position:[this.stage.stageWidth,0]});r.angle=Math.PI/2,r.addShape(o),this.world.addBody(r);var a=new p2.Plane,s=new p2.Body({type:p2.Body.STATIC,position:[0,63]});s.addShape(a),this.world.addBody(s)},e.prototype.addPlayer=function(t){var e=this,n=new p2.Body({mass:1,position:[this.player_area.x+42.25,this.player_area.y+25.5]}),i=new Player(t,n,this.batmans,this.holes,this.batmanBodys,this.world);i.addEventListener(PostEvent.GAME_OVER,function(){e.gameOver()},this),i.addEventListener(PostEvent.INCREMNT_SCORE,function(t){e.score.text=t.score},this),i.addEventListener(PostEvent.INCREMENT_BATMANS,function(t){e.productBatman()},this),this.player=i,this.addChild(i);var o=new p2.Circle({radius:i.pig.width*i.pig.scaleX/2});n.addShape(o),n.displays=[i],this.world.addBody(n)},e.prototype.partAdded=function(e,n){t.prototype.partAdded.call(this,e,n)},e.prototype.createChildren=function(){t.prototype.createChildren.call(this),window&&window.playerInfo&&(this.nickname.text=window.playerInfo.nickname,this.avatar.source=window.playerInfo.headimgurl);var e=LoadBGM.getInstance();e.prePlayStatus&&(e.playBGM(),e.setPlayStatus(!0)),this.is_trumpet.visible=e.getPlayStatus()},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this)},e.prototype.gameOver=function(){LoadBGM.getInstance().stopBGM(),window.platform.addJifen(parseInt(this.score.text)).then(function(t){console.log(t)});var t=new PostEvent(PostEvent.GAME_OVER,!1,!1,parseInt(this.score.text));this.dispatchEvent(t)},e}(eui.Component);__reflect(GameView.prototype,"GameView",["eui.UIComponent","egret.DisplayObject"]);var RankingListView=function(t){function e(){var e=t.call(this)||this;return e.addEventListener(eui.UIEvent.COMPLETE,e.onComplete,e),e}return __extends(e,t),e.prototype.onComplete=function(){var t=this;try{platform.getRank().then(function(e){var n=JSON.parse(e);n.rows.forEach(function(e,n){e.rank=n+1,e.score=e.score+"分",null==e.nickname&&(e.nickname="无"),null==e.avatar&&(e.avatar="https://gravatar.loli.net/avatar/d41d8cd98f00b204e9800998ecf8427e?d=mp&v=1.4.14");var i=new egret.ImageLoader;egret.ImageLoader.crossOrigin="anonymous",i.load(e.avatar),i.once(egret.Event.COMPLETE,function(e,n){if(e.currentTarget.data){var i=new egret.Texture;i.bitmapData=e.currentTarget.data,t.rankingData.rows[n]&&t.rankingData.rows[n].avatar&&(t.rankingData.rows[n].avatar=i)}},t)}),t.rankingData=n;var i=new eui.ArrayCollection(n.rows);t.dataList.dataProvider=i})}catch(e){return void console.log(e)}this.close_button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.close_button),egret.Tween.get(t.close_button).to({scaleX:.9,scaleY:.9},150)},this),this.close_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeButton,this)},e.prototype.closeButton=function(){this.parent.removeChild(this)},e.prototype.partAdded=function(e,n){t.prototype.partAdded.call(this,e,n)},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this)},e}(eui.Component);__reflect(RankingListView.prototype,"RankingListView",["eui.UIComponent","egret.DisplayObject"]);var ReportCard=function(t){function e(){var e=t.call(this)||this;return e.addEventListener(eui.UIEvent.COMPLETE,e.onComplete,e),e}return __extends(e,t),e.prototype.onComplete=function(){var t=this;this.go_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goBack,this),this.go_back.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.go_back),egret.Tween.get(t.go_back).to({scaleX:.95,scaleY:.95},150)},this)},e.prototype.goBack=function(){this.parent.removeChild(this),this.dispatchEvent(new PostEvent(PostEvent.GAME_OVER,!1,!1,Number(this.score.text)))},e.prototype.partAdded=function(e,n){t.prototype.partAdded.call(this,e,n)},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),window&&window.playerInfo&&window.playerInfo.nickname?this.nickname.text=window.playerInfo.nickname:this.nickname.text="获取名称失败"},e}(eui.Component);__reflect(ReportCard.prototype,"ReportCard",["eui.UIComponent","egret.DisplayObject"]);var ScoreGameView=function(t){function e(){var e=t.call(this)||this;return e.addEventListener(eui.UIEvent.COMPLETE,e.onComplete,e),e}return __extends(e,t),e.prototype.onComplete=function(){var t=this;this.restart_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.restartGame,this),this.restart_button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.restart_button),egret.Tween.get(t.restart_button).to({scaleX:.95,scaleY:.95},150)},this),this.showRankingList.addEventListener(egret.TouchEvent.TOUCH_TAP,this.RankingButton,this),this.showRankingList.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.showRankingList),egret.Tween.get(t.showRankingList).to({scaleX:.95,scaleY:.95},150)},this),this.report_card_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.reportCardButton,this),this.report_card_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.report_card_btn),egret.Tween.get(t.report_card_btn).to({scaleX:.95,scaleY:.95},150)},this)},e.prototype.partAdded=function(e,n){t.prototype.partAdded.call(this,e,n)},e.prototype.createChildren=function(){t.prototype.createChildren.call(this)},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.startAnimate()},e.prototype.startAnimate=function(){var t=egret.Tween.get(this.trophy_img,{loop:!0});t.to({scaleX:1.1,scaleY:1.1},1e3).wait(100).to({scaleX:1,scaleY:1},1e3).wait(100)},e.prototype.reportCardButton=function(){this.parent.removeChild(this),this.dispatchEvent(new PostEvent(PostEvent.Report_Card,!1,!1,Number(this.score.text)))},e.prototype.RankingButton=function(){this.dispatchEvent(new PostEvent(PostEvent.Ranking_List))},e.prototype.restartGame=function(){this.parent.removeChild(this);var t=new PostEvent(PostEvent.RESTART_GAME);this.dispatchEvent(t)},e}(eui.Component);__reflect(ScoreGameView.prototype,"ScoreGameView",["eui.UIComponent","egret.DisplayObject"]);var StartGameView=function(t){function e(){var e=t.call(this)||this;return e.addEventListener(eui.UIEvent.COMPLETE,e.onComplete,e),e}return __extends(e,t),e.prototype.onComplete=function(){var t=this;this.is_trumpet.visible=LoadBGM.getInstance().getPlayStatus(),this.start_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startButton,this),this.start_button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.start_button),egret.Tween.get(t.start_button).to({scaleX:.95,scaleY:.95},150)},this),this.rules_button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.rules_button),egret.Tween.get(t.rules_button).to({scaleX:.95,scaleY:.95},150)},this),this.trumpet_check.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.trumpet_check),egret.Tween.get(t.trumpet_check).to({scaleX:.9,scaleY:.9},150)},this),this.ranking_button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.ranking_button),egret.Tween.get(t.ranking_button).to({scaleX:.95,scaleY:.95},150)},this),this.ranking_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rankingButton,this),this.trumpet_check.addEventListener(egret.TouchEvent.TOUCH_TAP,this.trumpetCheck,this)},e.prototype.startButton=function(){this.parent.removeChild(this);var t=new PostEvent(PostEvent.START_GAME);this.dispatchEvent(t)},e.prototype.rankingButton=function(){this.dispatchEvent(new PostEvent(PostEvent.Ranking_List))},e.prototype.trumpetCheck=function(){var t=LoadBGM.getInstance();t.SwitchPlay(),t.getPlayStatus()?this.is_trumpet.visible=!0:this.is_trumpet.visible=!1},e.prototype.partAdded=function(e,n){t.prototype.partAdded.call(this,e,n)},e.prototype.createChildren=function(){t.prototype.createChildren.call(this)},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.startAnimate()},e.prototype.startAnimate=function(){egret.Tween.get(this.pig_bg_img,{loop:!0}).to({x:45,y:-96},1e3).wait(100).to({x:42.87,y:-88.13},1e3).wait(100),egret.Tween.get(this.batman_bg_img,{loop:!0}).to({rotation:5,width:280,height:211.6},1e3).wait(100).to({rotation:0,width:270,height:201.6},1e3).wait(100)},e}(eui.Component);__reflect(StartGameView.prototype,"StartGameView",["eui.UIComponent","egret.DisplayObject"]);
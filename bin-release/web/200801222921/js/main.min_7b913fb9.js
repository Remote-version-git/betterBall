var __reflect=this&&this.__reflect||function(t,e,n){t.__class__=e,n?n.push(e):n=[e],t.__types__=t.__types__?n.concat(t.__types__):n},__extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);n.prototype=e.prototype,t.prototype=new n},__awaiter=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))(function(i,r){function a(t){try{h(o.next(t))}catch(e){r(e)}}function s(t){try{h(o["throw"](t))}catch(e){r(e)}}function h(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(a,s)}h((o=o.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function n(t){return function(e){return o([t,e])}}function o(n){if(i)throw new TypeError("Generator is already executing.");for(;h;)try{if(i=1,r&&(a=r[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(r,n[1])).done)return a;switch(r=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return h.label++,{value:n[1],done:!1};case 5:h.label++,r=n[1],n=[0];continue;case 7:n=h.ops.pop(),h.trys.pop();continue;default:if(a=h.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){h=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){h.label=n[1];break}if(6===n[0]&&h.label<a[1]){h.label=a[1],a=n;break}if(a&&h.label<a[2]){h.label=a[2],h.ops.push(n);break}a[2]&&h.ops.pop(),h.trys.pop();continue}n=e.call(t,h)}catch(o){n=[6,o],r=0}finally{i=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var i,r,a,s,h={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:n(0),"throw":n(1),"return":n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},TouchEvents=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.onEvent=function(t){t.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.btnTouchEnd,this),t.addEventListener(egret.TouchEvent.TOUCH_END,this.btnTouchEnd,this),this._button=t},e.btnTouchBegin=function(){egret.Tween.get(this._button).to({scaleX:.95,scaleY:.95},150)},e.btnTouchEnd=function(){egret.Tween.get(this._button).to({scaleX:1,scaleY:1},150)},e}(egret.EventDispatcher);__reflect(TouchEvents.prototype,"TouchEvents");var AssetAdapter=function(){function t(){}return t.prototype.getAsset=function(t,e,n){function o(o){e.call(n,o,t)}if(RES.hasRes(t)){var i=RES.getRes(t);i?o(i):RES.getResAsync(t,o,this)}else RES.getResByUrl(t,o,this,RES.ResourceItem.TYPE_IMAGE)},t}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.onProgress=function(t,e){this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.createChildren=function(){t.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(t){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var e=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",e),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(t){console.log(t)})},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.loadResource()];case 1:return t.sent(),this.createGameScene(),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,4,,5]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return n.sent(),[4,this.loadTheme()];case 2:return n.sent(),[4,RES.loadGroup("preload",0,t)];case 3:return n.sent(),this.stage.removeChild(t),[3,5];case 4:return e=n.sent(),console.error(e),[3,5];case 5:return[2]}})})},e.prototype.loadTheme=function(){var t=this;return new Promise(function(e,n){var o=new eui.Theme("resource/default.thm.json",t.stage);o.addEventListener(eui.UIEvent.COMPLETE,function(){e()},t)})},e.prototype.createGameScene=function(){var t=new StartGameView;t.addEventListener(PostEvent.START_GAME,this.showGameView,this),t.addEventListener(PostEvent.Ranking_List,this.showRankingList,this),this.addChild(t)},e.prototype.showGameView=function(){var t=new GameView;t.addEventListener(PostEvent.GAME_OVER,this.showGameOver,this),this.addChild(t)},e.prototype.showGameOver=function(t){var e=new ScoreGameView;e.addEventListener(eui.UIEvent.COMPLETE,function(){t.score?e.score.text=String(t.score):e.score.text="0"},this),e.addEventListener(PostEvent.RESTART_GAME,this.showGameView,this),this.addChild(e),e.addEventListener(PostEvent.Ranking_List,this.showRankingList,this),e.addEventListener(PostEvent.Report_Card,this.reportCard,this)},e.prototype.showRankingList=function(){var t=new RankingListView;this.addChild(t)},e.prototype.reportCard=function(t){var e=new ReportCard;e.addEventListener(eui.UIEvent.COMPLETE,function(){t.score?e.score.text=String(t.score):e.score.text="0"},this),this.addChild(e),e.addEventListener(PostEvent.GAME_OVER,this.showGameOver,this)},e}(eui.UILayer);__reflect(Main.prototype,"Main");var p2DebugDraw=function(){function t(t){this.COLOR_D_SLEEP=10066329,this.COLOR_D_WAKE=15053490,this.COLOR_K=8355813,this.COLOR_S=8381823,this.world=t}return t.prototype.setSprite=function(t){this.sprite=t},t.prototype.drawDebug=function(){this.sprite.graphics.clear();for(var t=this.world.bodies.length,e=0;t>e;e++)for(var n=this.world.bodies[e],o=0;o<n.shapes.length;o++){var i=n.shapes[o];i instanceof p2.Convex?this.drawConvex(i,n):i instanceof p2.Plane?this.drawPlane(i,n):i instanceof p2.Circle&&this.drawCircle(i,n)}},t.prototype.drawConvex=function(t,e){var n=this.getColor(e),o=t.vertices.length,i=this.sprite.graphics;i.lineStyle(1,n),i.beginFill(n,.5);var r=new Array;e.toWorldFrame(r,t.vertices[0]),i.moveTo(e.position[0],e.position[1]),i.lineTo(r[0],r[1]);for(var a=1;o>=a;a++)e.toWorldFrame(r,t.vertices[a%o]),i.lineTo(r[0],r[1]);i.endFill()},t.prototype.drawCircle=function(t,e){var n=this.getColor(e),o=this.sprite.graphics;o.lineStyle(1,n),o.beginFill(n,.5),o.drawCircle(e.position[0],e.position[1],t.radius);var i=new Array;e.toWorldFrame(i,[t.radius,0]),o.moveTo(e.position[0],e.position[1]),o.lineTo(i[0],i[1]),o.endFill()},t.prototype.drawPlane=function(t,e){var n=this.COLOR_D_SLEEP,o=this.sprite.graphics;o.lineStyle(1,n),o.beginFill(n,1);var i=new Array,r=new Array;e.toWorldFrame(i,[-1e3,0]),o.moveTo(i[0],i[1]),e.toWorldFrame(r,[1e3,0]),o.lineTo(r[0],r[1]),e.toWorldFrame(r,[1e3,-1e3]),o.lineTo(r[0],r[1]),e.toWorldFrame(r,[-1e3,-1e3]),o.lineTo(r[0],r[1]),e.toWorldFrame(r,[-1e3,-0]),o.lineTo(r[0],r[1]),o.endFill()},t.prototype.getColor=function(t){var e=this.COLOR_D_SLEEP;return t.type==p2.Body.KINEMATIC?e=this.COLOR_K:t.type==p2.Body.STATIC?e=this.COLOR_S:t.sleepState==p2.Body.AWAKE&&(e=this.COLOR_D_WAKE),e},t}();__reflect(p2DebugDraw.prototype,"p2DebugDraw"),function(t){"use strict";function e(t,e){var n=(65535&t)+(65535&e),o=(t>>16)+(e>>16)+(n>>16);return o<<16|65535&n}function n(t,e){return t<<e|t>>>32-e}function o(t,o,i,r,a,s){return e(n(e(e(o,t),e(r,s)),a),i)}function i(t,e,n,i,r,a,s){return o(e&n|~e&i,t,e,r,a,s)}function r(t,e,n,i,r,a,s){return o(e&i|n&~i,t,e,r,a,s)}function a(t,e,n,i,r,a,s){return o(e^n^i,t,e,r,a,s)}function s(t,e,n,i,r,a,s){return o(n^(e|~i),t,e,r,a,s)}function h(t,n){t[n>>5]|=128<<n%32,t[(n+64>>>9<<4)+14]=n;var o,h,c,d,p,u=1732584193,l=-271733879,v=-1732584194,g=271733878;for(o=0;o<t.length;o+=16)h=u,c=l,d=v,p=g,u=i(u,l,v,g,t[o],7,-680876936),g=i(g,u,l,v,t[o+1],12,-389564586),v=i(v,g,u,l,t[o+2],17,606105819),l=i(l,v,g,u,t[o+3],22,-1044525330),u=i(u,l,v,g,t[o+4],7,-176418897),g=i(g,u,l,v,t[o+5],12,1200080426),v=i(v,g,u,l,t[o+6],17,-1473231341),l=i(l,v,g,u,t[o+7],22,-45705983),u=i(u,l,v,g,t[o+8],7,1770035416),g=i(g,u,l,v,t[o+9],12,-1958414417),v=i(v,g,u,l,t[o+10],17,-42063),l=i(l,v,g,u,t[o+11],22,-1990404162),u=i(u,l,v,g,t[o+12],7,1804603682),g=i(g,u,l,v,t[o+13],12,-40341101),v=i(v,g,u,l,t[o+14],17,-1502002290),l=i(l,v,g,u,t[o+15],22,1236535329),u=r(u,l,v,g,t[o+1],5,-165796510),g=r(g,u,l,v,t[o+6],9,-1069501632),v=r(v,g,u,l,t[o+11],14,643717713),l=r(l,v,g,u,t[o],20,-373897302),u=r(u,l,v,g,t[o+5],5,-701558691),g=r(g,u,l,v,t[o+10],9,38016083),v=r(v,g,u,l,t[o+15],14,-660478335),l=r(l,v,g,u,t[o+4],20,-405537848),u=r(u,l,v,g,t[o+9],5,568446438),g=r(g,u,l,v,t[o+14],9,-1019803690),v=r(v,g,u,l,t[o+3],14,-187363961),l=r(l,v,g,u,t[o+8],20,1163531501),u=r(u,l,v,g,t[o+13],5,-1444681467),g=r(g,u,l,v,t[o+2],9,-51403784),v=r(v,g,u,l,t[o+7],14,1735328473),l=r(l,v,g,u,t[o+12],20,-1926607734),u=a(u,l,v,g,t[o+5],4,-378558),g=a(g,u,l,v,t[o+8],11,-2022574463),v=a(v,g,u,l,t[o+11],16,1839030562),l=a(l,v,g,u,t[o+14],23,-35309556),u=a(u,l,v,g,t[o+1],4,-1530992060),g=a(g,u,l,v,t[o+4],11,1272893353),v=a(v,g,u,l,t[o+7],16,-155497632),l=a(l,v,g,u,t[o+10],23,-1094730640),u=a(u,l,v,g,t[o+13],4,681279174),g=a(g,u,l,v,t[o],11,-358537222),v=a(v,g,u,l,t[o+3],16,-722521979),l=a(l,v,g,u,t[o+6],23,76029189),u=a(u,l,v,g,t[o+9],4,-640364487),g=a(g,u,l,v,t[o+12],11,-421815835),v=a(v,g,u,l,t[o+15],16,530742520),l=a(l,v,g,u,t[o+2],23,-995338651),u=s(u,l,v,g,t[o],6,-198630844),g=s(g,u,l,v,t[o+7],10,1126891415),v=s(v,g,u,l,t[o+14],15,-1416354905),l=s(l,v,g,u,t[o+5],21,-57434055),u=s(u,l,v,g,t[o+12],6,1700485571),g=s(g,u,l,v,t[o+3],10,-1894986606),v=s(v,g,u,l,t[o+10],15,-1051523),l=s(l,v,g,u,t[o+1],21,-2054922799),u=s(u,l,v,g,t[o+8],6,1873313359),g=s(g,u,l,v,t[o+15],10,-30611744),v=s(v,g,u,l,t[o+6],15,-1560198380),l=s(l,v,g,u,t[o+13],21,1309151649),u=s(u,l,v,g,t[o+4],6,-145523070),g=s(g,u,l,v,t[o+11],10,-1120210379),v=s(v,g,u,l,t[o+2],15,718787259),l=s(l,v,g,u,t[o+9],21,-343485551),u=e(u,h),l=e(l,c),v=e(v,d),g=e(g,p);return[u,l,v,g]}function c(t){var e,n="",o=32*t.length;for(e=0;o>e;e+=8)n+=String.fromCharCode(t[e>>5]>>>e%32&255);return n}function d(t){var e,n=[];for(n[(t.length>>2)-1]=void 0,e=0;e<n.length;e+=1)n[e]=0;var o=8*t.length;for(e=0;o>e;e+=8)n[e>>5]|=(255&t.charCodeAt(e/8))<<e%32;return n}function p(t){return c(h(d(t),8*t.length))}function u(t,e){var n,o,i=d(t),r=[],a=[];for(r[15]=a[15]=void 0,i.length>16&&(i=h(i,8*t.length)),n=0;16>n;n+=1)r[n]=909522486^i[n],a[n]=1549556828^i[n];return o=h(r.concat(d(e)),512+8*e.length),c(h(a.concat(o),640))}function l(t){var e,n,o="0123456789abcdef",i="";for(n=0;n<t.length;n+=1)e=t.charCodeAt(n),i+=o.charAt(e>>>4&15)+o.charAt(15&e);return i}function v(t){return window.unescape(encodeURIComponent(t))}function g(t){return p(v(t))}function f(t){return l(g(t))}function E(t,e){return u(v(t),v(e))}function y(t,e){return l(E(t,e))}function _(t,e,n){return e?n?E(e,t):y(e,t):n?g(t):f(t)}t.md5=_}(window);var DebugPlatform=function(){function t(){}return t.prototype.addJifen=function(t){return __awaiter(this,void 0,void 0,function(){var e,n,o;return __generator(this,function(i){return window.playerInfo&&window.playerInfo.openid?(e="zxdqw",n=Date.now(),o=window.md5(e+"openid"+window.playerInfo.openid+"score"+t+n),[2,this._request("https://xwfintech.qingke.io/5f195b8dc01e13002c2d7341/openapi/pinball/add/measy?key="+e+"&sign="+o+"&openid="+window.playerInfo.openid+"&score="+t+"&timestamp="+n)]):[2]})})},t.prototype.getRank=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,this._request("https://xwfintech.qingke.io/_api/5f195b8dc01e13002c2d7341/openapi/pinball/list?pageSize=100")]})})},t.prototype._request=function(t){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(n){return[2,new Promise(function(n,o){var i=new egret.HttpRequest;i.responseType=egret.HttpResponseType.TEXT,i.open(t,egret.HttpMethod.GET),i.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),i.send(),i.addEventListener(egret.Event.COMPLETE,function(t){var e=t.currentTarget;n(e.response)},e),i.addEventListener(egret.IOErrorEvent.IO_ERROR,o,e),i.addEventListener(egret.ProgressEvent.PROGRESS,function(t){},e)})]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var Player=function(t){function e(e,n,o,i,r,a,s){var h=t.call(this)||this;return h.arrow=null,h.disk=null,h.pig=null,h.diskShow=!1,h.bg=null,h.moving=!1,h.body=null,h.score=0,h.passCount=1,h.watchX=eui.Watcher.watch(h,["x"],h.throttle(function(){h.checkHit()},20),h),h.batmans=o,h.batmanBodys=r,h.masks=s,h.holes=i,h.world=a,h.body=n,h.bg=e,h.createObject(),h.bindTouchEvent(),h}return __extends(e,t),e.prototype.throttle=function(t,e){var n=null;return function(){var o=this,i=arguments;n||(n=setTimeout(function(){t.apply(o,i),n=null},e))}},e.prototype.createObject=function(){var t=new egret.Bitmap;t.texture=RES.getRes("arrow_png"),t.anchorOffsetY=t.height/2,t.visible=!1,this.addChild(t),this.arrow=t;var e=new egret.Bitmap;e.texture=RES.getRes("disk_png"),e.anchorOffsetX=e.width/2,e.anchorOffsetY=e.height/2,e.visible=!1,this.addChild(e),this.disk=e;var n=new egret.Bitmap;n.texture=RES.getRes("player_png"),n.width=n.width/2.5,n.height=n.height/2.5,n.anchorOffsetX=n.width/2,n.anchorOffsetY=n.height/2,this.addChild(n),n.touchEnabled=!0,this.pig=n},e.prototype.bindTouchEvent=function(){var t=this;this.pig.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(e){t.disk.visible=!0,t.arrow.visible=!0,t.moving=!0},this),this.pig.addEventListener(egret.TouchEvent.TOUCH_END,function(e){t.disk.visible=!1,t.arrow.visible=!1,t.moving=!1},this),this.bg.addEventListener(egret.TouchEvent.TOUCH_MOVE,function(e){if(t.moving){var n=new egret.Point(e.stageX,e.stageY),o=t.localToGlobal(t.pig.x,t.pig.y),i=Math.atan2(n.y-o.y,n.x-o.x);t.arrow.rotation=i*(180/Math.PI);var r=egret.Point.distance(n,o);r>75&&(r=75),10>r&&(r=10),t.arrow.scaleX=r/100,t.arrow.scaleY=r/100}},this),this.bg.addEventListener(egret.TouchEvent.TOUCH_END,function(e){if(t.moving){var n=new egret.Point(e.stageX,e.stageY),o=t.localToGlobal(t.pig.x,t.pig.y),i=n.x-o.x,r=n.y-o.y;t.body.applyForce([i/5,r/5],[0,0]),t.disk.visible=!1,t.arrow.visible=!1,t.moving=!1}},this)},e.prototype.checkHit=function(){var t=this;this.holes.forEach(function(e){var n=new egret.Rectangle(e.x,e.y,e.width,e.height);t.batmans.forEach(function(e,o){var i=new egret.Rectangle(e.x,e.y,e.width,e.height);n.intersects(i)&&(egret.Tween.get(e).to({alpha:0},200),t.batmans.splice(o,1),t.world.removeBody(t.batmanBodys[o]),t.batmanBodys.splice(o,1),t.incrementScore(10),t.feedbackScore(10,e.x,e.y,t.bg),t.playHitSound())}),t.checkPig(n)}),this.masks.forEach(function(e,n){var o=new egret.Rectangle(e.x,e.y,e.width,e.height);t.checkMask(o)&&(egret.Tween.get(e).to({alpha:0},200),t.masks.splice(n,1),t.incrementScore(20),t.feedbackScore(20,e.x,e.y,t.bg),t.playHitSound())}),0===this.batmans.length&&(this.dispatchEvent(new PostEvent(PostEvent.INCREMENT_MASKS)),this.dispatchEvent(new PostEvent(PostEvent.INCREMENT_BATMANS)),this.feedbackPassCount(this.bg))},e.prototype.checkPig=function(t){var e=new egret.Rectangle(this.body.position[0],this.body.position[1],this.pig.width,this.pig.height);t.intersects(e)&&(egret.Tween.get(this.pig).to({alpha:0},200),this.loseSound(),this.dispatchEvent(new PostEvent(PostEvent.GAME_OVER)))},e.prototype.checkMask=function(t){var e=new egret.Rectangle(this.body.position[0],this.body.position[1],this.pig.width,this.pig.height);return e.intersects(t)?!0:!1},e.prototype.incrementScore=function(t){this.score+=t,this.dispatchEvent(new PostEvent(PostEvent.INCREMNT_SCORE,!1,!1,this.score))},e.prototype.feedbackScore=function(t,e,n,o){var i=new eui.Label("+"+t);i.x=e,i.y=n,i.textColor=16444726,i.fontFamily="Consolas",i.size=18,egret.Tween.get(i).to({alpha:0,y:n-10},1e3).call(function(){o.removeChild(i),i=null}),o.addChild(i)},e.prototype.feedbackPassCount=function(t,e,n,o){void 0===e&&(e="第 "+this.passCount+" 关"),void 0===n&&(n=this.bg.width/2),void 0===o&&(o=this.bg.height/2);var i=new eui.Label(e);i.x=n-i.textWidth/4-10,i.y=o,i.anchorOffsetX=i.textWidth/2,i.anchorOffsetY=i.textHeight/2,i.textColor=16777215,i.fontFamily="Mircrosoft YaHei",i.size=50,i.bold=!0,egret.Tween.get(i).to({alpha:1,y:o-30},2e3).call(function(){t.removeChild(i),i=null}),t.addChild(i),this.passCount++},e.prototype.playHitSound=function(){if(LoadBGM.getInstance().getPlayStatus()){var t=RES.getRes("add_mp3");t.play(0,1)}},e.prototype.loseSound=function(){if(LoadBGM.getInstance().getPlayStatus()){var t=RES.getRes("lose_mp3");t.play(0,1)}},e}(egret.Sprite);__reflect(Player.prototype,"Player");var ThemeAdapter=function(){function t(){}return t.prototype.getTheme=function(t,e,n,o){function i(t){e.call(o,t)}function r(e){e.resItem.url==t&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,r,null),n.call(o))}var a=this;if("undefined"!=typeof generateEUI)egret.callLater(function(){e.call(o,generateEUI)},this);else if("undefined"!=typeof generateEUI2)RES.getResByUrl("resource/gameEui.json",function(t,n){window.JSONParseClass.setData(t),egret.callLater(function(){e.call(o,generateEUI2)},a)},this,RES.ResourceItem.TYPE_JSON);else if("undefined"!=typeof generateJSON)if(t.indexOf(".exml")>-1){var s=t.split("/");s.pop();var h=s.join("/")+"_EUI.json";generateJSON.paths[t]?egret.callLater(function(){e.call(o,generateJSON.paths[t])},this):RES.getResByUrl(h,function(n){window.JSONParseClass.setData(n),egret.callLater(function(){e.call(o,generateJSON.paths[t])},a)},this,RES.ResourceItem.TYPE_JSON)}else egret.callLater(function(){e.call(o,generateJSON)},this);else RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,r,null),RES.getResByUrl(t,i,this,RES.ResourceItem.TYPE_TEXT)},t}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var LoadBGM=function(){function t(){this._isPlay=!1,this._sound=RES.getRes("bgm_mp3")}return t.getInstance=function(){return null===this.LoadBGM&&(t.LoadBGM=new t),t.LoadBGM},t.prototype.getPlayStatus=function(){return this._isPlay},t.prototype.setPlayStatus=function(t){this._isPlay=t},t.prototype.getChannel=function(){return this._channel},t.prototype.stopBGM=function(){this._isPlay&&(this._channel&&this._channel.stop(),this._isPlay=!1,this.prePlayStatus=!0)},t.prototype.playBGM=function(){this._isPlay||(this._channel=this._sound.play(),this._isPlay=!0,this.prePlayStatus=!1)},t.prototype.SwitchPlay=function(){this._isPlay?(this._channel&&this._channel.stop(),this._isPlay=!1):(this._channel=this._sound.play(),this._isPlay=!0)},t.LoadBGM=null,t}();__reflect(LoadBGM.prototype,"LoadBGM");var PostEvent=function(t){function e(e,n,o,i){void 0===n&&(n=!1),void 0===o&&(o=!1),void 0===i&&(i=0);var r=t.call(this,e,n,o)||this;return 0!==i&&(r.score=i),r}return __extends(e,t),e.START_GAME="Start Game",e.GAME_OVER="Game Over",e.RESTART_GAME="restart game",e.READ_EXPLAIN="read explain",e.Ranking_List="Ranking List",e.INCREMNT_SCORE="incremnt score",e.INCREMENT_BATMANS="incremnt batmanas",e.INCREMENT_MASKS="incremnt masks",e.Report_Card="Report Card",e}(egret.Event);__reflect(PostEvent.prototype,"PostEvent");var GameExplainPanel=function(t){function e(){var e=t.call(this)||this;return e.addEventListener(eui.UIEvent.COMPLETE,e.onComplete,e),e}return __extends(e,t),e.prototype.onComplete=function(){var t=this;this.confirm_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.confirmBtn,this),this.confirm_start.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.confirm_start),egret.Tween.get(t.confirm_start).to({scaleX:.95,scaleY:.95},150)},this)},e.prototype.confirmBtn=function(){this.explain_panel.visible=!1,this.dispatchEvent(new PostEvent(PostEvent.READ_EXPLAIN))},e.prototype.partAdded=function(e,n){t.prototype.partAdded.call(this,e,n)},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this)},e}(eui.Component);__reflect(GameExplainPanel.prototype,"GameExplainPanel",["eui.UIComponent","egret.DisplayObject"]);var GameView=function(t){function e(){var e=t.call(this)||this;return e.holes=new Array(4),e.world=null,e.batmanCount=3,e.batmans=[],e.batmanBodys=[],e.maskCount=1,e.masks=[],e.addEventListener(eui.UIEvent.COMPLETE,e.onComplete,e),e}return __extends(e,t),e.prototype.onComplete=function(){var t=this;this.explain_panel.addEventListener(PostEvent.READ_EXPLAIN,this.createGameScene,this),this.trumpet_check.addEventListener(egret.TouchEvent.TOUCH_TAP,this.trumpetCheck,this),this.trumpet_check.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.trumpet_check),egret.Tween.get(t.trumpet_check).to({scaleX:.9,scaleY:.9},150)},this)},e.prototype.trumpetCheck=function(){var t=LoadBGM.getInstance();t.SwitchPlay(),t.getPlayStatus()?this.is_trumpet.visible=!0:this.is_trumpet.visible=!1},e.prototype.createGameScene=function(){var t=this,e=new p2.World({gravity:[0,0]});e.overlapKeeper.recordPool.resize(16),e.narrowphase.contactEquationPool.resize(1024),e.narrowphase.frictionEquationPool.resize(1024),e.setGlobalStiffness(1e8),e.sleepMode=p2.World.BODY_SLEEPING,e.defaultContactMaterial.restitution=.9375,e.defaultContactMaterial.friction=.4,e.on("endContact",function(e){t.player.checkHit()},this),this.world=e,this.holeAroundMap(),this.add4Wall(),this.addPlayer(this),this.productBatman(),this.productMask(),this.addEventListener(egret.Event.ENTER_FRAME,this.onUpdate,this),this.player.feedbackPassCount(this)},e.prototype.hole=function(){var t=new egret.Bitmap(RES.getRes("hole_png"));return t.width=t.width/1.8,t.height=t.height/1.8,t.anchorOffsetX=t.width/2,t.anchorOffsetY=t.height/2,t},e.prototype.holeAroundMap=function(){for(var t=0;t<this.holes.length;t++){var e=this.hole(),n=e.width/2,o=e.height/2,i=this.width,r=this.height;switch(t){case 0:e.x=n,e.y=o+this.status_bar.height+13;break;case 1:e.x=-n+i,e.y=o+this.status_bar.height+13;break;case 2:e.x=n,e.y=-o+r;break;case 3:e.x=-n+i,e.y=-o+r}this.addChild(e),this.holes[t]=e}},e.prototype.onUpdate=function(){this.world.step(1),this.world.bodies.forEach(function(t){t.displays&&(t.displays[0].x=t.position[0],t.displays[0].y=t.position[1])})},e.prototype.makeBatman=function(){var t=new egret.Bitmap(RES.getRes("batman_png"));return t.width=t.width/2,t.height=t.height/2,t.anchorOffsetX=t.width/2,t.anchorOffsetY=t.height/2,t},e.prototype.makeMask=function(){var t=new egret.Bitmap(RES.getRes("mask_png"));return t.width=t.width/3,t.height=t.height/3,t.anchorOffsetX=t.width/2,t.anchorOffsetY=t.height/2,t},e.prototype.randomNum=function(t,e,n){void 0===n&&(n=2);var o=0,i=0;switch(e>=t?(i=t,o=e):(i=e,o=t),arguments.length){case 1:return Math.floor(Math.random()*(o+1));case 2:return Math.floor(Math.random()*(o-i+1)+i);case 3:return(Math.random()*(o-i)+i).toFixed(n);default:return Math.random()}},e.prototype.randomInteger=function(t,e){var n=0,o=0;switch(e>=t?(o=t,n=e):(o=e,n=t),arguments.length){case 1:return Math.floor(Math.random()*(n+1));case 2:return Math.floor(Math.random()*(n-o+1)+o);default:return Math.random()}},e.prototype.appendToBatman=function(){var t=this.makeBatman(),e=t.width/2,n=t.height/2,o=this.game_scene.width-e,i=this.game_scene.height-76,r=new p2.Circle({radius:e}),a=new p2.Body({mass:1,position:[this.randomInteger(e,o-e),this.randomInteger(76+this.holes[0].height,i-n)]});return a.addShape(r),a.displays=[t],[a,t]},e.prototype.appendToMask=function(){var t=this.makeMask(),e=t.width/2,n=t.height/2,o=this.game_scene.width-20,i=this.game_scene.height-76-this.holes[0].height;return t.x=this.randomInteger(e,o-e),t.y=this.randomInteger(n+76+this.holes[0].height,i-n),t},e.prototype.productBatman=function(){for(var t=this.batmanCount,e=0;t>e;e++){var n=this.appendToBatman();this.world.addBody(n[0]),this.batmanBodys.push(n[0]),this.batmans.push(n[1]),this.addChild(n[1])}this.batmanCount<=20?this.batmanCount++:this.batmanCount=this.randomInteger(10,20)},e.prototype.productMask=function(){for(var t=this.maskCount,e=0;t>e;e++){var n=this.appendToMask();this.masks.push(n),this.addChild(n)}this.maskCount<=5?this.maskCount++:this.batmanCount=this.randomInteger(2,5)},e.prototype.add4Wall=function(){var t=new p2.Plane,e=new p2.Body({type:p2.Body.STATIC,position:[0,this.stage.stageHeight]});e.angle=Math.PI,e.addShape(t),this.world.addBody(e);var n=new p2.Plane,o=new p2.Body({type:p2.Body.STATIC,position:[0,0]});o.angle=-Math.PI/2,o.addShape(n),this.world.addBody(o);var i=new p2.Plane,r=new p2.Body({type:p2.Body.STATIC,position:[this.stage.stageWidth,0]});r.angle=Math.PI/2,r.addShape(i),this.world.addBody(r);var a=new p2.Plane,s=new p2.Body({type:p2.Body.STATIC,position:[0,63]});s.addShape(a),this.world.addBody(s)},e.prototype.addPlayer=function(t){var e=this,n=new p2.Body({mass:1,position:[this.player_area.x+42.25,this.player_area.y+25.5]}),o=new Player(t,n,this.batmans,this.holes,this.batmanBodys,this.world,this.masks);o.addEventListener(PostEvent.GAME_OVER,function(){e.player.watchX.unwatch(),e.bg.removeEventListener(egret.TouchEvent.TOUCH_END,function(){},e),e.bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE,function(){},e),o.pig.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){},e),o.pig.removeEventListener(egret.TouchEvent.TOUCH_END,function(){},e),e.removeEventListener(egret.Event.ENTER_FRAME,e.onUpdate,e),e.world.off("endContact",function(){}),e.gameOver(),o.removeEventListener(PostEvent.GAME_OVER,function(){},e)},this),o.addEventListener(PostEvent.INCREMNT_SCORE,function(t){e.score.text=t.score,o.removeEventListener(PostEvent.INCREMNT_SCORE,function(){},e)},this),o.addEventListener(PostEvent.INCREMENT_BATMANS,function(t){e.productBatman(),o.removeEventListener(PostEvent.INCREMENT_BATMANS,function(){},e)},this),o.addEventListener(PostEvent.INCREMENT_MASKS,function(t){e.masks.length>0&&e.masks.forEach(function(t){e.removeChild(t)}),e.masks.splice(0),e.productMask(),o.removeEventListener(PostEvent.INCREMENT_MASKS,function(){},e)},this),this.player=o,this.addChild(o);var i=new p2.Circle({radius:o.pig.width*o.pig.scaleX/2});n.addShape(i),n.displays=[o],this.world.addBody(n)},e.prototype.partAdded=function(e,n){t.prototype.partAdded.call(this,e,n)},e.prototype.createChildren=function(){t.prototype.createChildren.call(this),window&&window.playerInfo&&(this.nickname.text=window.playerInfo.nickname,this.avatar.source=window.playerInfo.headimgurl);var e=LoadBGM.getInstance();e.prePlayStatus&&(e.playBGM(),e.setPlayStatus(!0)),this.is_trumpet.visible=e.getPlayStatus()},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this)},e.prototype.gameOver=function(){LoadBGM.getInstance().stopBGM();try{window.playerInfo&&window.playerInfo.openid&&window.platform.addJifen(parseInt(this.score.text)).then(function(t){console.log(t)})}catch(t){console.log("添加积分失败!")}var e=new PostEvent(PostEvent.GAME_OVER,!1,!1,parseInt(this.score.text));this.dispatchEvent(e)},e}(eui.Component);__reflect(GameView.prototype,"GameView",["eui.UIComponent","egret.DisplayObject"]);var RankingListView=function(t){function e(){var e=t.call(this)||this;return e.addEventListener(eui.UIEvent.COMPLETE,e.onComplete,e),e}return __extends(e,t),e.prototype.onComplete=function(){var t=this;try{platform.getRank().then(function(e){var n=JSON.parse(e).rows.filter(function(t){return null!==t.nickname&&null!==t.avatar});n.forEach(function(e,n){e.rank=n+1,e.score=e.score+"分";var o=new egret.ImageLoader;egret.ImageLoader.crossOrigin="anonymous",o.load(e.avatar),o.once(egret.Event.COMPLETE,function(e,n){if(e.currentTarget.data){var o=new egret.Texture;o.bitmapData=e.currentTarget.data,t.rankingData[n]&&t.rankingData[n].avatar&&(t.rankingData[n].avatar=o)}},t)}),t.rankingData=n;var o=new eui.ArrayCollection(n);t.dataList.dataProvider=o})}catch(e){return}this.close_button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.close_button),egret.Tween.get(t.close_button).to({scaleX:.9,scaleY:.9},150)},this),this.close_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeButton,this)},e.prototype.closeButton=function(){this.parent.removeChild(this)},e.prototype.partAdded=function(e,n){t.prototype.partAdded.call(this,e,n)},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this)},e}(eui.Component);__reflect(RankingListView.prototype,"RankingListView",["eui.UIComponent","egret.DisplayObject"]);var ReportCard=function(t){function e(){var e=t.call(this)||this;return e.addEventListener(eui.UIEvent.COMPLETE,e.onComplete,e),e}return __extends(e,t),e.prototype.onComplete=function(){var t=this;this.go_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goBack,this),this.go_back.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.go_back),egret.Tween.get(t.go_back).to({scaleX:.95,scaleY:.95},150)},this)},e.prototype.goBack=function(){this.parent.removeChild(this),this.dispatchEvent(new PostEvent(PostEvent.GAME_OVER,!1,!1,Number(this.score.text)))},e.prototype.partAdded=function(e,n){t.prototype.partAdded.call(this,e,n)},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),window&&window.playerInfo&&window.playerInfo.nickname?this.nickname.text=window.playerInfo.nickname:this.nickname.text="获取名称失败"},e}(eui.Component);__reflect(ReportCard.prototype,"ReportCard",["eui.UIComponent","egret.DisplayObject"]);var ScoreGameView=function(t){function e(){var e=t.call(this)||this;return e.addEventListener(eui.UIEvent.COMPLETE,e.onComplete,e),e}return __extends(e,t),e.prototype.onComplete=function(){var t=this;this.restart_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.restartGame,this),this.restart_button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.restart_button),egret.Tween.get(t.restart_button).to({scaleX:.95,scaleY:.95},150)},this),this.showRankingList.addEventListener(egret.TouchEvent.TOUCH_TAP,this.RankingButton,this),this.showRankingList.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.showRankingList),egret.Tween.get(t.showRankingList).to({scaleX:.95,scaleY:.95},150)},this),this.report_card_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.reportCardButton,this),this.report_card_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.report_card_btn),egret.Tween.get(t.report_card_btn).to({scaleX:.95,scaleY:.95},150)},this)},e.prototype.partAdded=function(e,n){t.prototype.partAdded.call(this,e,n)},e.prototype.createChildren=function(){t.prototype.createChildren.call(this)},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.startAnimate()},e.prototype.startAnimate=function(){var t=egret.Tween.get(this.trophy_img,{loop:!0});t.to({scaleX:1.1,scaleY:1.1},1e3).wait(100).to({scaleX:1,scaleY:1},1e3).wait(100)},e.prototype.reportCardButton=function(){this.parent.removeChild(this),this.dispatchEvent(new PostEvent(PostEvent.Report_Card,!1,!1,Number(this.score.text)))},e.prototype.RankingButton=function(){this.dispatchEvent(new PostEvent(PostEvent.Ranking_List))},e.prototype.restartGame=function(){this.parent.removeChild(this);var t=new PostEvent(PostEvent.RESTART_GAME);this.dispatchEvent(t)},e}(eui.Component);__reflect(ScoreGameView.prototype,"ScoreGameView",["eui.UIComponent","egret.DisplayObject"]);var StartGameView=function(t){function e(){var e=t.call(this)||this;return e.addEventListener(eui.UIEvent.COMPLETE,e.onComplete,e),e}return __extends(e,t),e.prototype.onComplete=function(){var t=this;this.is_trumpet.visible=LoadBGM.getInstance().getPlayStatus(),this.start_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startButton,this),this.start_button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.start_button),egret.Tween.get(t.start_button).to({scaleX:.95,scaleY:.95},150)
},this),this.trumpet_check.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.trumpet_check),egret.Tween.get(t.trumpet_check).to({scaleX:.9,scaleY:.9},150)},this),this.ranking_button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){TouchEvents.onEvent(t.ranking_button),egret.Tween.get(t.ranking_button).to({scaleX:.95,scaleY:.95},150)},this),this.ranking_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rankingButton,this),this.trumpet_check.addEventListener(egret.TouchEvent.TOUCH_TAP,this.trumpetCheck,this)},e.prototype.startButton=function(){this.parent.removeChild(this);var t=new PostEvent(PostEvent.START_GAME);this.dispatchEvent(t)},e.prototype.rankingButton=function(){this.dispatchEvent(new PostEvent(PostEvent.Ranking_List))},e.prototype.trumpetCheck=function(){var t=LoadBGM.getInstance();t.SwitchPlay(),t.getPlayStatus()?this.is_trumpet.visible=!0:this.is_trumpet.visible=!1},e.prototype.partAdded=function(e,n){t.prototype.partAdded.call(this,e,n)},e.prototype.createChildren=function(){t.prototype.createChildren.call(this)},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.startAnimate()},e.prototype.startAnimate=function(){egret.Tween.get(this.pig_bg_img,{loop:!0}).to({x:45,y:-96},1e3).wait(100).to({x:42.87,y:-88.13},1e3).wait(100),egret.Tween.get(this.batman_bg_img,{loop:!0}).to({rotation:5,width:280,height:211.6},1e3).wait(100).to({rotation:0,width:270,height:201.6},1e3).wait(100)},e}(eui.Component);__reflect(StartGameView.prototype,"StartGameView",["eui.UIComponent","egret.DisplayObject"]);
!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.constantTree=function e(t,n=""){for(let o in t){const i=`${n}${""!==n?".":""}${o}`;"string"==typeof t[o]&&0===t[o].length?t[o]=i:"object"==typeof t[o]&&e(t[o],i)}return t}},function(e,t,n){"use strict";var o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const i=n(4);t.BaseComponent=i.BaseComponent;const s=o(n(6));t.UtilEnv=s;const r=o(n(0));t.UtilConstant=r,t.connect=function(e){_nucleus(e)}},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))(function(i,s){function r(e){try{u(o.next(e))}catch(e){s(e)}}function c(e){try{u(o.throw(e))}catch(e){s(e)}}function u(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(r,c)}u((o=o.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=n(3),s=n(1);class r{entryPoint(e){return o(this,void 0,void 0,function*(){const t=e.Service.activateService(i.Logger);yield e.Service.registerService(t.cmpName,t.cmpId,{serviceInstance:t})})}}t.default=r,s.connect(r)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(1),i=n(7);class s extends o.BaseComponent{constructor(){super(),this.cmpName="logging.front.logger",this.cmpId="com.shadow-nuclues.core"}initialize(){s.hasBeenInitialized||(s.hasBeenInitialized=!0,this._Receive(i.Acts.LOGGING.LOGGER.LOG,e=>{console.log(...e.payload),this._send(i.Evts.LOGING.LOGGER.LOGGED,e)}),this._Receive(i.Acts.LOGGING.LOGGER.WARN,e=>{console.warn(...e.payload),this._send(i.Evts.LOGING.LOGGER.WARNED,e)}),this._Receive(i.Acts.LOGGING.LOGGER.INFO,e=>{console.info(...e.payload),this._send(i.Evts.LOGING.LOGGER.INFORMED,e)}))}log(...e){this._send(i.Acts.LOGGING.LOGGER.LOG,{sender:this.identity,payload:e})}warn(...e){this._send(i.Acts.LOGGING.LOGGER.WARN,{sender:this.identity,payload:e})}info(...e){this._send(i.Acts.LOGGING.LOGGER.INFO,{sender:this.identity,payload:e})}}s.hasBeenInitialized=!1,t.Logger=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(5);t.BaseComponent=class{constructor(){this.cmpId="",this.cmpName=""}_send(e,t){this._evtBus&&this._evtBus.emitAsync(e,t)}_sendWithReturn(e,t,n){return new Promise((i,s)=>{this._evtBus?(this._evtBus.once(t,e=>{i(e)}),this._evtBus.emitAsync(e,n)):s(Error(o.Errors.TECHNICAL.EVENTBUS_IS_NOT_DEFINED))})}_Receive(e,t){return this._evtBus?this._evtBus.on(e,t):{off:()=>void 0}}_ReceiveOnce(e,t){return this._evtBus?this._evtBus.once(e,t):{off:()=>void 0}}get identity(){return{cmpId:this.cmpId,cmpName:this.cmpName}}initialize(){}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});let o=n(0).constantTree({TYPE:{TECHNICAL:"",BUSINESS:""},TECHNICAL:{EVENTBUS_IS_NOT_DEFINED:""}});t.Errors=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isNode=function(){return"[object process]"===Object.prototype.toString.call("undefined"!=typeof process?process:0)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),i=o.constantTree({LOGGING:{LOGGER:{LOG:"",WARN:"",INFO:""}}});t.Acts=i;const s=o.constantTree({LOGING:{LOGGER:{LOGGED:"",WARNED:"",INFORMED:""}}});t.Evts=s}]);
(()=>{"use strict";var e={208:(e,n,t)=>{t.d(n,{A:()=>a});var r=t(601),o=t.n(r),i=t(314),c=t.n(i)()(o());c.push([e.id,'* {\n  box-sizing: border-box;\n}\n\nhtml,\nbody {\n  margin: 0;\n  padding: 0;\n}\n\n/* CURRENT WEATHER */\n.location-container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n  border: 1px solid red;\n}\n\n.temp-container {\n  grid-area: temp;\n  border: 1px solid green;\n}\n\n.condition-container {\n  grid-area: condition;\n  border: 1px solid green;\n}\n\n.wind-container {\n  grid-area: wind;\n  border: 1px solid green;\n}\n\n.precip-container {\n  grid-area: precip;\n  border: 1px solid green;\n}\n\n.current-container {\n  border: 1px solid blue;\n  display: grid;\n  grid-template-areas:\n    "temp condition"\n    "wind precip";\n}\n\n/* FORECAST */\n/*header*/\n.date-header {\n  grid-area: date-header;\n}\n\n.time-header {\n  grid-area: time-header;\n}\n\n.condition-header {\n  grid-area: condition-header;\n}\n\n.temp-header {\n  grid-area: temp-header;\n}\n\n.precip-header {\n  grid-area: precip-header;\n}\n\n.wind-header {\n  grid-area: wind-header;\n}\n\n.day-header {\n  display: grid;\n  grid-template-columns: repeat(6, minmax(0, 1fr));\n  border: 1px solid red;\n  grid-template-areas:\n    "date-header ... ... ... ... ..."\n    "time-header condition-header temp-header precip-header wind-header wind-header";\n}\n\n.hour {\n  border: 1px solid blue;\n  display: grid;\n  grid-template-columns: repeat(6, minmax(0, 1fr));\n  grid-template-areas: "time condition-img temp precip wind-speed wind-dir";\n}\n\n.condition-img,\n.wind-dir {\n  height: 30px;\n  width: auto;\n}\n\n.invisible {\n  display: none;\n}\n',""]);const a=c},314:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,o,i){"string"==typeof e&&(e=[[null,e,void 0]]);var c={};if(r)for(var a=0;a<this.length;a++){var d=this[a][0];null!=d&&(c[d]=!0)}for(var s=0;s<e.length;s++){var u=[].concat(e[s]);r&&c[u[0]]||(void 0!==i&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=i),t&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=t):u[2]=t),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),n.push(u))}},n}},601:e=>{e.exports=function(e){return e[1]}},72:e=>{var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var i={},c=[],a=0;a<e.length;a++){var d=e[a],s=r.base?d[0]+r.base:d[0],u=i[s]||0,p="".concat(s," ").concat(u);i[s]=u+1;var l=t(p),m={css:d[1],media:d[2],sourceMap:d[3],supports:d[4],layer:d[5]};if(-1!==l)n[l].references++,n[l].updater(m);else{var f=o(m,r);r.byIndex=a,n.splice(a,0,{identifier:p,updater:f,references:1})}c.push(p)}return c}function o(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,o){var i=r(e=e||[],o=o||{});return function(e){e=e||[];for(var c=0;c<i.length;c++){var a=t(i[c]);n[a].references--}for(var d=r(e,o),s=0;s<i.length;s++){var u=t(i[s]);0===n[u].references&&(n[u].updater(),n.splice(u,1))}i=d}}},659:e=>{var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},540:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},56:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var i=t.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},113:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var i=n[r]={id:r,exports:{}};return e[r](i,i.exports,t),i.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var r=n.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&(!e||!/^http(s?):/.test(e));)e=r[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.nc=void 0,(()=>{var e=t(72),n=t.n(e),r=t(825),o=t.n(r),i=t(659),c=t.n(i),a=t(56),d=t.n(a),s=t(540),u=t.n(s),p=t(113),l=t.n(p),m=t(208),f={};f.styleTagTransform=l(),f.setAttributes=d(),f.insert=c().bind(null,"head"),f.domAPI=o(),f.insertStyleElement=u(),n()(m.A,f),m.A&&m.A.locals&&m.A.locals;const h=t.p+"1ec83f8cb3a2ed76c22a.png",g=function(){let e="tartu estonia";return{get:function(){return e},set:function(n){"string"==typeof n?e=n:console.error("Input must be a string")}}}(),y=function(){let e="metric";return{toggle:function(){return e="metric"===e?"imperial":"metric",e},getType:function(){return e}}}();!async function(){const e=await async function(){const e=await fetch("https://api-bdc.net/data/client-ip",{mode:"cors"}),n=await e.json(),t=await n.ipString;return console.log(`${typeof t} ${t}`),t}();q(e,y.getType()),A(e).then((e=>k())).then((e=>$(e,y.getType())))}();const v=document.querySelector(".search-field"),w=document.querySelector(".search-btn"),x=document.querySelector(".btn-toggle-unit"),b=document.querySelector(".btn-current-forecast");async function A(e="Tartu estonia"){const n=`http://api.weatherapi.com/v1/forecast.json?key=f80d0c3108cc4ceea9f122718243005&q=${e}&days=3&aqi=no&alerts=no`,t=await fetch(n,{mode:"cors"}),r=await t.json();return console.log(r),r}function S(){return{name:document.querySelector(".name"),region:document.querySelector(".region"),country:document.querySelector(".country"),conditionImg:document.querySelector(".current-condition-img"),conditionText:document.querySelector(".current-condition-text"),temp:document.querySelector(".current-temp"),feelsLike:document.querySelector(".feels-like"),precip:document.querySelector(".current-precip"),windDirection:document.querySelector(".current-wind-direction"),windSpeed:document.querySelector(".current-wind-speed")}}function C(){return{dateHeaders:document.querySelectorAll(".date-header"),times:document.querySelectorAll(".time"),conditionImgs:document.querySelectorAll(".condition-img"),temps:document.querySelectorAll(".temp"),precips:document.querySelectorAll(".precip"),windSpeeds:document.querySelectorAll(".wind-speed"),windDirs:document.querySelectorAll(".wind-dir")}}async function q(e,n){g.set(e);const t=await async function(e="Tartu estonia"){const n=`https://api.weatherapi.com/v1/current.json?key=f80d0c3108cc4ceea9f122718243005&q=${e}&aqi=no`,t=await fetch(n,{mode:"cors"}),r=await t.json();return console.log(r),r}(e),r=t.current,o=t.location,i=t.current.condition;S().name.textContent=o.name,S().region.textContent=o.region,S().country.textContent=o.country,S().conditionImg.src=i.icon,S().conditionText.textContent=i.text,S().windDirection.textContent=r.wind_dir,"metric"===n?(S().temp.textContent=`${r.temp_c}°C`,S().feelsLike.textContent=`Feels like ${r.feelslike_c}°C`,S().precip.textContent=`0-${r.precip_mm} mm`,S().windSpeed.textContent=`${_(r.wind)} m/s`):(S().temp.textContent=`${r.temp_f}°F`,S().feelsLike.textContent=`Feels like ${r.feelslike_f}°F`,S().precip.textContent=`0-${r.precip_in} in`,S().windSpeed.textContent=`${Math.round(Number(r.wind_mph))} mph`)}function T(e,n){e.forEach(((e,t)=>{e.textContent=n[t]}))}function E(e,n){e.forEach(((e,t)=>{e.textContent=_(n[t])}))}function _(e){return Math.round(Number(e)/3.6)}function $(e,n){var t,r,o;T(C().dateHeaders,e.datesArr),T(C().times,e.timeArr),t=C().conditionImgs,r=e.conditionIconArr,o=e.conditionTextArr,t.forEach(((e,n)=>{e.src=r[n],e.alt=o[n]})),function(e,n,t){e.forEach(((e,r)=>{e.src=h,e.style.transform=`rotate(${n[r]}deg)`,e.alt=t[r]}))}(C().windDirs,e.windDegreeArr,e.windDirArr),"metric"===n?(T(C().temps,e.tempCarr),T(C().precips,e.precipMmArr),E(C().windSpeeds,e.windKphArr)):(T(C().temps,e.tempFarr),T(C().precips,e.precipInArr),E(C().windSpeeds,e.windMphArr))}async function k(){const e=await A(),n={datesArr:I(e),timeArr:L(e,"time"),conditionTextArr:L(e,"condition","text"),conditionIconArr:L(e,"condition","icon"),tempCarr:L(e,"temp_c"),tempFarr:L(e,"temp_f"),precipInArr:L(e,"precip_in"),precipMmArr:L(e,"precip_mm"),windKphArr:L(e,"wind_kph"),windMphArr:L(e,"wind_mph"),windDirArr:L(e,"wind_dir"),windDegreeArr:L(e,"wind_degree")};return console.log("here is filtered data:"),console.log(n),n}function I(e){const n=[];return n.push(e.forecast.forecastday[0].date),n.push(e.forecast.forecastday[1].date),n.push(e.forecast.forecastday[2].date),console.log(n),n}function L(e,n,t=null){const r=[];return e.forecast.forecastday.forEach((e=>{e.hour.forEach((e=>{null===t?r.push(e[n]):r.push(e[n][t])}))})),console.log(r),r}v.oninput=function(){""===v.value?w.setAttribute("disabled","disabled"):w.removeAttribute("disabled")},w.addEventListener("click",(e=>{const n=v.value;q(n,y.getType()),A(n).then((e=>k())).then((e=>$(e,y.getType())))})),x.addEventListener("click",(()=>{y.toggle(),function(){const e=document.querySelectorAll(".temp-header"),n=document.querySelectorAll(".precip-header"),t=document.querySelectorAll(".wind-header");"metric"===y.getType()?(e.forEach((e=>{e.textContent="Temp. °C"})),n.forEach((e=>{e.textContent="Precip. mm"})),t.forEach((e=>{e.textContent="Wind (m/s)"}))):(e.forEach((e=>{e.textContent="Temp. °F"})),n.forEach((e=>{e.textContent="Precip. in"})),t.forEach((e=>{e.textContent="Wind (mph)"})))}();const e=g.get();q(e,y.getType()),A(e).then((e=>k())).then((e=>$(e,y.getType())))})),b.addEventListener("click",(function(){const e=document.querySelector(".current-container"),n=document.querySelector(".forecast-container"),t=e.classList;n.classList,t.contains("invisible")?(e.classList.remove("invisible"),n.classList.add("invisible")):(e.classList.add("invisible"),n.classList.remove("invisible"))})),A()})()})();
(()=>{"use strict";var e={208:(e,n,t)=>{t.d(n,{A:()=>c});var r=t(601),o=t.n(r),i=t(314),a=t.n(i)()(o());a.push([e.id,'* {\n  box-sizing: border-box;\n}\n\nhtml,\nbody {\n  margin: 0;\n  padding: 0;\n}\n\n.invisible {\n  display: none;\n}\n\n/* CURRENT WEATHER */\n.location-container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n  border: 1px solid red;\n}\n\n.temp-container {\n  grid-area: temp;\n  border: 1px solid green;\n}\n\n.condition-container {\n  grid-area: condition;\n  border: 1px solid green;\n}\n\n.wind-container {\n  grid-area: wind;\n  border: 1px solid green;\n}\n\n.precip-container {\n  grid-area: precip;\n  border: 1px solid green;\n}\n\n.current-container {\n  border: 1px solid blue;\n  display: grid;\n  grid-template-areas:\n    "temp condition"\n    "wind precip";\n}\n\n/* FORECAST */\n/*header*/\n.date-header {\n  grid-area: date-header;\n}\n\n.time-header {\n  grid-area: time-header;\n}\n\n.condition-header {\n  grid-area: condition-header;\n}\n\n.temp-header {\n  grid-area: temp-header;\n}\n\n.precip-header {\n  grid-area: precip-header;\n}\n\n.wind-header {\n  grid-area: wind-header;\n}\n\n.day-header {\n  display: grid;\n  grid-template-columns: repeat(6, minmax(0, 1fr));\n  border: 1px solid red;\n  grid-template-areas:\n    "date-header ... ... ... ... ..."\n    "time-header condition-header temp-header precip-header wind-header wind-header";\n}\n\n.hour {\n  border: 1px solid blue;\n  display: grid;\n  grid-template-columns: repeat(6, minmax(0, 1fr));\n  grid-template-areas: "time condition-img temp precip wind-speed wind-dir";\n}\n',""]);const c=a},314:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,o,i){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(r)for(var c=0;c<this.length;c++){var d=this[c][0];null!=d&&(a[d]=!0)}for(var s=0;s<e.length;s++){var p=[].concat(e[s]);r&&a[p[0]]||(void 0!==i&&(void 0===p[5]||(p[1]="@layer".concat(p[5].length>0?" ".concat(p[5]):""," {").concat(p[1],"}")),p[5]=i),t&&(p[2]?(p[1]="@media ".concat(p[2]," {").concat(p[1],"}"),p[2]=t):p[2]=t),o&&(p[4]?(p[1]="@supports (".concat(p[4],") {").concat(p[1],"}"),p[4]=o):p[4]="".concat(o)),n.push(p))}},n}},601:e=>{e.exports=function(e){return e[1]}},72:e=>{var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var i={},a=[],c=0;c<e.length;c++){var d=e[c],s=r.base?d[0]+r.base:d[0],p=i[s]||0,u="".concat(s," ").concat(p);i[s]=p+1;var l=t(u),m={css:d[1],media:d[2],sourceMap:d[3],supports:d[4],layer:d[5]};if(-1!==l)n[l].references++,n[l].updater(m);else{var f=o(m,r);r.byIndex=c,n.splice(c,0,{identifier:u,updater:f,references:1})}a.push(u)}return a}function o(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,o){var i=r(e=e||[],o=o||{});return function(e){e=e||[];for(var a=0;a<i.length;a++){var c=t(i[a]);n[c].references--}for(var d=r(e,o),s=0;s<i.length;s++){var p=t(i[s]);0===n[p].references&&(n[p].updater(),n.splice(p,1))}i=d}}},659:e=>{var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},540:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},56:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var i=t.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},113:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var i=n[r]={id:r,exports:{}};return e[r](i,i.exports,t),i.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var r=n.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&(!e||!/^http(s?):/.test(e));)e=r[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.nc=void 0,(()=>{var e=t(72),n=t.n(e),r=t(825),o=t.n(r),i=t(659),a=t.n(i),c=t(56),d=t.n(c),s=t(540),p=t.n(s),u=t(113),l=t.n(u),m=t(208),f={};f.styleTagTransform=l(),f.setAttributes=d(),f.insert=a().bind(null,"head"),f.domAPI=o(),f.insertStyleElement=p(),n()(m.A,f),m.A&&m.A.locals&&m.A.locals,t.p,async function(){w(await async function(){const e=await fetch("https://api-bdc.net/data/client-ip",{mode:"cors"}),n=await e.json(),t=await n.ipString;return console.log(`${typeof t} ${t}`),t}())}();const h=document.querySelector(".search-field"),g=document.querySelector(".search-btn");async function y(e="tartu estonia"){const n=`http://api.weatherapi.com/v1/forecast.json?key=f80d0c3108cc4ceea9f122718243005&q=${e}&days=3&aqi=no&alerts=no`,t=await fetch(n,{mode:"cors"}),r=await t.json();return console.log(r),r}function v(){return{name:document.querySelector(".name"),region:document.querySelector(".region"),country:document.querySelector(".country"),conditionImg:document.querySelector(".current-condition-img"),conditionText:document.querySelector(".current-condition-text"),temp:document.querySelector(".current-temp"),feelsLike:document.querySelector(".feels-like"),precip:document.querySelector(".current-precip"),windDirection:document.querySelector(".current-wind-direction"),windSpeed:document.querySelector(".current-wind-speed")}}async function w(e){const n=await async function(e="Tartu estonia"){const n=`https://api.weatherapi.com/v1/current.json?key=f80d0c3108cc4ceea9f122718243005&q=${e}&aqi=no`,t=await fetch(n,{mode:"cors"}),r=await t.json();return console.log(r),r}(e),t=n.current,r=n.location,o=n.current.condition;v().name.textContent=r.name,v().region.textContent=r.region,v().country.textContent=r.country,v().conditionImg.src=o.icon,v().conditionText.textContent=o.text,v().temp.textContent=`${t.temp_c}°`,v().feelsLike.textContent=`Feels like ${t.feelslike_c}°`,v().precip.textContent=`${t.precip_mm} mm`,v().windDirection.textContent=t.wind_dir,v().windSpeed.textContent=`${Math.round(Number(t.wind_kph)/3.6)} m/s`}function b(e,n,t=null){const r=[];return e.forecast.forecastday.forEach((e=>{e.hour.forEach((e=>{null===t?r.push(e[n]):r.push(e[n][t])}))})),console.log(r),r}h.oninput=function(){""===h.value?g.setAttribute("disabled","disabled"):g.removeAttribute("disabled")},g.addEventListener("click",(e=>{w(h.value)})),y(),async function(){const e=await y(),n={timeArr:b(e,"time"),conditionTextArr:b(e,"condition","text"),conditionIconArr:b(e,"condition","icon"),tempCarr:b(e,"temp_c"),tempFarr:b(e,"temp_f"),precipInArr:b(e,"precip_in"),precipMmArr:b(e,"precip_mm"),windKphArr:b(e,"wind_kph"),windMphArr:b(e,"wind_mph"),windDirArr:b(e,"wind_dir"),windDegreeArr:b(e,"wind_degree")};console.log("here is filtered data:"),console.log(n)}()})()})();
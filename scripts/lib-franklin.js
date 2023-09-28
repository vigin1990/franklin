/* eslint-disable */
export function sampleRUM(e,t={}){sampleRUM.defer=sampleRUM.defer||[];let a=e=>{sampleRUM[e]=sampleRUM[e]||((...t)=>sampleRUM.defer.push({fnname:e,args:t}))};sampleRUM.drain=sampleRUM.drain||((e,t)=>{sampleRUM[e]=t,sampleRUM.defer.filter(({fnname:t})=>e===t).forEach(({fnname:e,args:t})=>sampleRUM[e](...t))}),sampleRUM.on=(e,t)=>{sampleRUM.cases[e]=t},a("observe"),a("cwv");try{if(window.hlx=window.hlx||{},!window.hlx.rum){var l;let r=new URLSearchParams(window.location.search),o="on"===r.get("rum")?1:100,s=`${(0,window.location.href).split("").reduce((e,t)=>(e<<5)-e+t.charCodeAt(0)|0,0)}-${new Date().getTime()}-${Math.random().toString(16).substr(2,14)}`,i=Math.random();window.hlx.rum={weight:o,id:s,random:i,isSelected:i*o<1,sampleRUM}}let{weight:n,id:c}=window.hlx.rum;window.hlx&&window.hlx.rum&&window.hlx.rum.isSelected&&(sampleRUM.cases=sampleRUM.cases||{cwv:()=>sampleRUM.cwv(t)||!0,lazy(){let e=document.createElement("script");return e.src="https://rum.hlx.page/.rum/@adobe/helix-rum-enhancer@^1/src/index.js",document.head.appendChild(e),!0}},((a=t)=>{let l=JSON.stringify({weight:n,id:c,referer:window.location.href,generation:window.hlx.RUM_GENERATION,checkpoint:e,...t}),r=`https://rum.hlx.page/.rum/${n}`;navigator.sendBeacon(r,l),console.debug(`ping:${e}`,a)})(t),sampleRUM.cases[e]&&sampleRUM.cases[e]())}catch(d){}}export function loadCSS(e,t){if(document.querySelector(`head > link[href="${e}"]`))"function"==typeof t&&t("noop");else{let a=document.createElement("link");a.setAttribute("rel","stylesheet"),a.setAttribute("href",e),"function"==typeof t&&(a.onload=e=>t(e.type),a.onerror=e=>t(e.type)),document.head.appendChild(a)}}export function getMetadata(e){let t=e&&e.includes(":")?"property":"name",a=[...document.head.querySelectorAll(`meta[${t}="${e}"]`)].map(e=>e.content).join(", ");return a||""}export function toClassName(e){return"string"==typeof e?e.toLowerCase().replace(/[^0-9a-z]/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,""):""}export function toCamelCase(e){return toClassName(e).replace(/-([a-z])/g,e=>e[1].toUpperCase())}export function decorateIcons(e=document){e.querySelectorAll("span.icon").forEach(async e=>{if(e.classList.length<2||!e.classList[1].startsWith("icon-"))return;let t=e.classList[1].substring(5),a=await fetch(`${window.hlx.codeBasePath}/icons/${t}.svg`);if(a.ok){let l=await a.text();if(l.match(/<style/i)){let r=document.createElement("img");r.src=`data:image/svg+xml,${encodeURIComponent(l)}`,e.appendChild(r)}else e.innerHTML=l}})}export async function fetchPlaceholders(e="default"){window.placeholders=window.placeholders||{};let t=window.placeholders[`${e}-loaded`];return t||(window.placeholders[`${e}-loaded`]=new Promise((t,a)=>{try{fetch(`${"default"===e?"":e}/placeholders.json`).then(e=>e.json()).then(a=>{let l={};a.data.forEach(e=>{l[toCamelCase(e.Key)]=e.Text}),window.placeholders[e]=l,t()})}catch(l){window.placeholders[e]={},a()}})),await window.placeholders[`${e}-loaded`],window.placeholders[e]}export function decorateBlock(e){let t=e.classList[0];if(t){e.classList.add("block"),e.setAttribute("data-block-name",t),e.setAttribute("data-block-status","initialized");let a=e.parentElement;a.classList.add(`${t}-wrapper`);let l=e.closest(".section");l&&l.classList.add(`${t}-container`)}}export function readBlockConfig(e){let t={};return e.querySelectorAll(":scope>div").forEach(e=>{if(e.children){let a=[...e.children];if(a[1]){let l=a[1],r=toClassName(a[0].textContent),o="";if(l.querySelector("a")){let s=[...l.querySelectorAll("a")];o=1===s.length?s[0].href:s.map(e=>e.href)}else if(l.querySelector("img")){let i=[...l.querySelectorAll("img")];o=1===i.length?i[0].src:i.map(e=>e.src)}else if(l.querySelector("p")){let n=[...l.querySelectorAll("p")];o=1===n.length?n[0].textContent:n.map(e=>e.textContent)}else o=e.children[1].textContent;t[r]=o}}}),t}export function decorateSections(e){e.querySelectorAll(":scope > div").forEach(e=>{let t=[],a=!1;[...e.children].forEach(e=>{if("DIV"===e.tagName||!a){let l=document.createElement("div");t.push(l),(a="DIV"!==e.tagName)&&l.classList.add("default-content-wrapper")}t[t.length-1].append(e)}),t.forEach(t=>e.append(t)),e.classList.add("section"),e.setAttribute("data-section-status","initialized");let l=e.querySelector("div.section-metadata");if(l){let r=readBlockConfig(l);Object.keys(r).forEach(t=>{if("style"===t){let a=r.style.split(",").map(e=>toClassName(e.trim()));a.forEach(t=>e.classList.add(t))}else e.dataset[toCamelCase(t)]=r[t]}),l.parentNode.remove()}})}export function updateSectionsStatus(e){let t=[...e.querySelectorAll(":scope > div.section")];for(let a=0;a<t.length;a+=1){let l=t[a],r=l.getAttribute("data-section-status");if("loaded"!==r){let o=l.querySelector('.block[data-block-status="initialized"], .block[data-block-status="loading"]');if(o){l.setAttribute("data-section-status","loading");break}l.setAttribute("data-section-status","loaded")}}}export function decorateBlocks(e){e.querySelectorAll("div.section > div > div").forEach(decorateBlock)}export function buildBlock(e,t){let a=Array.isArray(t)?t:[[t]],l=document.createElement("div");return l.classList.add(e),a.forEach(e=>{let t=document.createElement("div");e.forEach(e=>{let a=document.createElement("div"),l=e.elems?e.elems:[e];l.forEach(e=>{e&&("string"==typeof e?a.innerHTML+=e:a.appendChild(e))}),t.appendChild(a)}),l.appendChild(t)}),l}export async function loadBlock(e){let t=e.getAttribute("data-block-status");if("loading"!==t&&"loaded"!==t){e.setAttribute("data-block-status","loading");let a=e.getAttribute("data-block-name");try{let l=new Promise(e=>{loadCSS(`${window.hlx.codeBasePath}/blocks/${a}/${a}.css`,e)}),r=new Promise(t=>{(async()=>{try{let l=await import(`../blocks/${a}/${a}.js`);l.default&&await l.default(e)}catch(r){console.log(`failed to load module for ${a}`,r)}t()})()});await Promise.all([l,r])}catch(o){console.log(`failed to load block ${a}`,o)}e.setAttribute("data-block-status","loaded")}}export async function loadBlocks(e){updateSectionsStatus(e);let t=[...e.querySelectorAll("div.block")];for(let a=0;a<t.length;a+=1)await loadBlock(t[a]),updateSectionsStatus(e)}export function createOptimizedPicture(e,t="",a=!1,l=[{media:"(min-width: 400px)",width:"2000"},{width:"750"}]){let r=new URL(e,window.location.href),o=document.createElement("picture"),{pathname:s}=r,i=s.substring(s.lastIndexOf(".")+1);return l.forEach(e=>{let t=document.createElement("source");e.media&&t.setAttribute("media",e.media),t.setAttribute("type","image/webp"),t.setAttribute("srcset",`${s}?width=${e.width}&format=webply&optimize=medium`),o.appendChild(t)}),l.forEach((e,r)=>{if(r<l.length-1){let n=document.createElement("source");e.media&&n.setAttribute("media",e.media),n.setAttribute("srcset",`${s}?width=${e.width}&format=${i}&optimize=medium`),o.appendChild(n)}else{let c=document.createElement("img");c.setAttribute("loading",a?"eager":"lazy"),c.setAttribute("alt",t),o.appendChild(c),c.setAttribute("src",`${s}?width=${e.width}&format=${i}&optimize=medium`)}}),o}export function normalizeHeadings(e,t){let a=t.map(e=>e.toLowerCase());e.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(e=>{let t=e.tagName.toLowerCase();if(-1===a.indexOf(t)){let l=parseInt(t.charAt(1),10)-1;for(;-1===a.indexOf(`h${l}`)&&l>0;)l-=1;if(0===l)for(;-1===a.indexOf(`h${l}`)&&l<7;)l+=1;7!==l&&(e.outerHTML=`<h${l} id="${e.id}">${e.textContent}</h${l}>`)}})}export function decorateTemplateAndTheme(){let e=(e,t)=>{t.split(",").forEach(t=>{e.classList.add(toClassName(t.trim()))})},t=getMetadata("template");t&&e(document.body,t);let a=getMetadata("theme");a&&e(document.body,a)}export function decorateButtons(e){e.querySelectorAll("a").forEach(e=>{if(e.title=e.title||e.textContent,e.href!==e.textContent){let t=e.parentElement,a=e.parentElement.parentElement;e.querySelector("img")||(1===t.childNodes.length&&("P"===t.tagName||"DIV"===t.tagName)&&(e.className="button primary",t.classList.add("button-container")),1===t.childNodes.length&&"STRONG"===t.tagName&&1===a.childNodes.length&&"P"===a.tagName&&(e.className="button primary",a.classList.add("button-container")),1===t.childNodes.length&&"EM"===t.tagName&&1===a.childNodes.length&&"P"===a.tagName&&(e.className="button secondary",a.classList.add("button-container")))}})}export async function waitForLCP(e){let t=document.querySelector(".block"),a=t&&e.includes(t.getAttribute("data-block-name"));a&&await loadBlock(t),document.querySelector("body").classList.add("appear");let l=document.querySelector("main img");await new Promise(e=>{l&&!l.complete?(l.setAttribute("loading","eager"),l.addEventListener("load",e),l.addEventListener("error",e)):e()})}export function loadHeader(e){let t=buildBlock("header","");return e.append(t),decorateBlock(t),loadBlock(t)}export function loadFooter(e){let t=buildBlock("footer","");return e.append(t),decorateBlock(t),loadBlock(t)}function init(){window.hlx=window.hlx||{},window.hlx.codeBasePath="";let e=document.querySelector('script[src$="/scripts/scripts.js"]');if(e)try{[window.hlx.codeBasePath]=new URL(e.src).pathname.split("/scripts/scripts.js")}catch(t){console.log(t)}sampleRUM("top"),window.addEventListener("load",()=>sampleRUM("load")),window.addEventListener("unhandledrejection",e=>{sampleRUM("error",{source:e.reason.sourceURL,target:e.reason.line})}),window.addEventListener("error",e=>{sampleRUM("error",{source:e.filename,target:e.lineno})})}init();
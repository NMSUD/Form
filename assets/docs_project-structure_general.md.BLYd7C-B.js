import{_ as a,c as s,o as n,a5 as e}from"./chunks/framework.O9dk9HAy.js";const b=JSON.parse('{"title":"Project Structure","description":"","frontmatter":{},"headers":[],"relativePath":"docs/project-structure/general.md","filePath":"docs/project-structure/general.md"}'),p={name:"docs/project-structure/general.md"},t=e(`<h1 id="project-structure" tabindex="-1">Project Structure <a class="header-anchor" href="#project-structure" aria-label="Permalink to &quot;Project Structure&quot;">​</a></h1><p>The project was set up by <a href="https://github.com/Khaoz-Topsy" target="_blank" rel="noreferrer">Khaoz-Topsy (AssistantNMS)</a> and could probably do with a few more refactors 😅</p><h2 id="important-folders" tabindex="-1">Important folders <a class="header-anchor" href="#important-folders" aria-label="Permalink to &quot;Important folders&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>.</span></span>
<span class="line"><span>├─ src</span></span>
<span class="line"><span>│  ├─ api</span></span>
<span class="line"><span>│  ├─ data</span></span>
<span class="line"><span>│  ├─ services</span></span>
<span class="line"><span>│  ├─ validation</span></span>
<span class="line"><span>│  ├─ web</span></span>
<span class="line"><span>│  └─ ...</span></span>
<span class="line"><span>└─ package.json</span></span></code></pre></div><details class="details custom-block"><summary>Click here to show more folders</summary><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>├─ src</span></span>
<span class="line"><span>│  ├─ api</span></span>
<span class="line"><span>│  │  ├─ module</span></span>
<span class="line"><span>│  │  ├─ routes</span></span>
<span class="line"><span>│  │  └─ api.ts</span></span>
<span class="line"><span>│  ├─ data</span></span>
<span class="line"><span>│  │  ├─ downloader.ts</span></span>
<span class="line"><span>│  │  └─ interactive.ts</span></span>
<span class="line"><span>│  ├─ services</span></span>
<span class="line"><span>│  │  ├─ api</span></span>
<span class="line"><span>│  │  ├─ external</span></span>
<span class="line"><span>│  │  ├─ internal</span></span>
<span class="line"><span>│  │  └─ json</span></span>
<span class="line"><span>│  ├─ validation</span></span>
<span class="line"><span>│  └─ web</span></span>
<span class="line"><span>│     ├─ components</span></span>
<span class="line"><span>│     │  └─ form</span></span>
<span class="line"><span>│     ├─ pages</span></span>
<span class="line"><span>│     └─ index.tsx</span></span>
<span class="line"><span>└─ package.json</span></span></code></pre></div></details><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><p>This is the back-end code of the project. This contains a KoaJS API, any backend specific code code should be in this folder. The web project is set up to not be able to import code from this folder. This is mostly because JS in the web is a bit different than JS running in a server environment... 😅</p><h2 id="data" tabindex="-1">Data <a class="header-anchor" href="#data" aria-label="Permalink to &quot;Data&quot;">​</a></h2><p><em>TODO</em></p><h2 id="services" tabindex="-1">Services <a class="header-anchor" href="#services" aria-label="Permalink to &quot;Services&quot;">​</a></h2><p><em>TODO</em></p><h2 id="validation" tabindex="-1">Validation <a class="header-anchor" href="#validation" aria-label="Permalink to &quot;Validation&quot;">​</a></h2><p><em>TODO</em></p><h2 id="web" tabindex="-1">Web <a class="header-anchor" href="#web" aria-label="Permalink to &quot;Web&quot;">​</a></h2><p><em>TODO</em></p>`,15),i=[t];function l(o,r,c,d,h,u){return n(),s("div",null,i)}const f=a(p,[["render",l]]);export{b as __pageData,f as default};

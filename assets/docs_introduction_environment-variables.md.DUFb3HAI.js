import{_ as a,c as n,o as s,a4 as e}from"./chunks/framework.B4aQXXvf.js";const m=JSON.parse('{"title":"Environment Variables","description":"","frontmatter":{},"headers":[],"relativePath":"docs/introduction/environment-variables.md","filePath":"docs/introduction/environment-variables.md"}'),t={name:"docs/introduction/environment-variables.md"},i=e(`<h1 id="environment-variables" tabindex="-1">Environment Variables <a class="header-anchor" href="#environment-variables" aria-label="Permalink to &quot;Environment Variables&quot;">​</a></h1><h2 id="setup" tabindex="-1">Setup <a class="header-anchor" href="#setup" aria-label="Permalink to &quot;Setup&quot;">​</a></h2><p>This solution makes use of <a href="https://www.npmjs.com/package/dotenv-cli" target="_blank" rel="noreferrer">dotenv</a> to easily setup environment variables on your machine that are <s>used</s> required for the application to run properly.</p><p>To setup your environment variables, copy and rename the <code>env.dart.template</code> file to <code>env.dart</code>. Then fill in the values for all the keys that you need, more on that below.</p><h2 id="format-of-the-env-files" tabindex="-1">Format of the .env files <a class="header-anchor" href="#format-of-the-env-files" aria-label="Permalink to &quot;Format of the .env files&quot;">​</a></h2><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>KEY1=value</span></span>
<span class="line"><span>KEY2=&quot;value with spaces&quot;</span></span></code></pre></div><h2 id="env-template" tabindex="-1">.env.template <a class="header-anchor" href="#env-template" aria-label="Permalink to &quot;.env.template&quot;">​</a></h2><p>Contains the keys of expected environment variables. It should not contain any sensitive information.</p><details class="details custom-block"><summary>View contents</summary><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>VITE_NMSUD_FORM_WEB_URL=http://localhost:3001</span></span>
<span class="line"><span>VITE_NMSUD_API_URL=http://localhost:3001</span></span>
<span class="line"><span>VITE_NMSUD_FORM_DATA_URL=https://data.nmsud.com</span></span>
<span class="line"><span>VITE_NMSUD_FORM_DOCS_URL=https://docs.nmsud.com</span></span>
<span class="line"><span></span></span>
<span class="line"><span>API_PORT=3001</span></span>
<span class="line"><span>API_SECRET=</span></span>
<span class="line"><span></span></span>
<span class="line"><span>DOCKER_REGISTRY=</span></span>
<span class="line"><span>DOCKER_TAG_NAME=</span></span>
<span class="line"><span>DOCKER_USERNAME=</span></span>
<span class="line"><span>DOCKER_PASSWORD=</span></span>
<span class="line"><span></span></span>
<span class="line"><span>XATA_API_KEY=</span></span>
<span class="line"><span>XATA_DB_URL=</span></span>
<span class="line"><span>XATA_FALLBACK_BRANCH=</span></span>
<span class="line"><span></span></span>
<span class="line"><span>DISCORD_WEBHOOK_URL=</span></span>
<span class="line"><span></span></span>
<span class="line"><span>GITHUB_ACTION_TRIGGER_ON_DECISION=false</span></span>
<span class="line"><span>GITHUB_ACTION_OWNER=</span></span>
<span class="line"><span>GITHUB_ACTION_REPO=</span></span>
<span class="line"><span>GITHUB_ACTION_WORKFLOW_ID=</span></span>
<span class="line"><span>GITHUB_ACTION_MINUTES_BETWEEN_RUN=</span></span>
<span class="line"><span>GITHUB_AUTH_TOKEN=</span></span>
<span class="line"><span></span></span>
<span class="line"><span>VITE_ENABLE_CAPTCHA=</span></span>
<span class="line"><span>HCAPTCHA_SECRET=</span></span>
<span class="line"><span>VITE_HCAPTCHA_SITE_KEY=</span></span></code></pre></div></details><h2 id="deeper-look" tabindex="-1">Deeper look <a class="header-anchor" href="#deeper-look" aria-label="Permalink to &quot;Deeper look&quot;">​</a></h2><p>Keys that start with <code>VITE_</code> are available on the frontend as well as the backend. If the key does not start with <code>VITE_</code> it will only be available in the backend.</p><p><em>We may change the name of this key in the future.</em></p><h2 id="adding-a-new-key-value" tabindex="-1">Adding a new Key &amp; Value <a class="header-anchor" href="#adding-a-new-key-value" aria-label="Permalink to &quot;Adding a new Key &amp; Value&quot;">​</a></h2><ol><li>Make sure that you add the new key to both the <code>.env</code> and <code>.env.template</code> files.</li><li>Add a function to the <a href="/src/services/internal/configService.ts">configService.ts</a>.</li><li>Use your new environment variable with</li></ol><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> myNewValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getMyNewVariable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div>`,15),p=[i];function l(o,r,c,h,d,_){return s(),n("div",null,p)}const v=a(t,[["render",l]]);export{m as __pageData,v as default};

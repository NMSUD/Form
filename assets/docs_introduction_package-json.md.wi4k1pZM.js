import{_ as e,c as t,o as a,a5 as o}from"./chunks/framework.DxNJUIEk.js";const _=JSON.parse('{"title":"Package.json","description":"","frontmatter":{},"headers":[],"relativePath":"docs/introduction/package-json.md","filePath":"docs/introduction/package-json.md"}'),n={name:"docs/introduction/package-json.md"},r=o('<h1 id="package-json" tabindex="-1">Package.json <a class="header-anchor" href="#package-json" aria-label="Permalink to &quot;Package.json&quot;">​</a></h1><p>We make use of the <a href="https://www.npmjs.com/package/npm-run-all" target="_blank" rel="noreferrer">npm-run-all</a> package to help split up the scripts, so that we can reuse them. For example, if we have scripts <code>test:one</code>, <code>test:two</code>, <code>test:three</code> and then run <code>npm-run-all --sequential test:*</code>, then each of the scripts that start with &quot;test:&quot; would run one at a time.</p><h2 id="what-do-they-do" tabindex="-1">What do they do? <a class="header-anchor" href="#what-do-they-do" aria-label="Permalink to &quot;What do they do?&quot;">​</a></h2><p>I will admit, there are a lot of scripts and dependencies. It would take far too much maintenance to keep documentation about each script up to date. So lets keep it simple, with the knowledge of the <a href="https://www.npmjs.com/package/npm-run-all" target="_blank" rel="noreferrer">npm-run-all</a> package we use, here are some important scripts</p><ul><li><code>npm run setup</code> - <em>All scripts that are important for getting the the developer environment ready</em></li><li><code>npm run build</code> - <em>Generate the output of one or more projects within this solution</em></li><li><code>npm run data:&lt;id&gt;</code> - _Various data projects, <ul><li><code>npm run data:downloader</code> is used by <a href="https://github.com/NMSUD/FormData" target="_blank" rel="noreferrer">FormData</a>, to download all the data from the database and write them to disk in the correct format.</li><li><code>npm run data:interactive</code> is used to quickly run functions from an interactive console</li></ul></li><li><code>npm run storybook</code> - <em>Storybook tasks</em></li><li><code>npm run docs</code> - Documentation generation</li><li><code>npm run test</code> - Unit tests and coverage reports</li><li><code>npm run db:generate</code> - Generate contracts from the database provider (Xata.io)</li></ul>',5),c=[r];function s(i,d,l,p,h,m){return a(),t("div",null,c)}const k=e(n,[["render",s]]);export{_ as __pageData,k as default};

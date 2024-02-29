import{_ as e,c as t,o,a5 as a,a7 as r,a8 as i}from"./chunks/framework.BNlk7fK5.js";const _=JSON.parse('{"title":"Coverage Report","description":"","frontmatter":{},"headers":[],"relativePath":"docs/testing/coverage-report.md","filePath":"docs/testing/coverage-report.md"}'),s={name:"docs/testing/coverage-report.md"},c=a('<h1 id="coverage-report" tabindex="-1">Coverage Report <a class="header-anchor" href="#coverage-report" aria-label="Permalink to &quot;Coverage Report&quot;">​</a></h1><p>When running unit tests via the <code>npm run test:dev</code> command, <a href="https://vitest.dev" target="_blank" rel="noreferrer">vitest</a> will also generate a coverage report (thanks to our project&#39;s config). This coverage report is great for helping you find pieces of code that do not have unit tests.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Just because a piece of code is covered in the coverage report, does not mean it has good tests written 😝</p></div><h2 id="local-coverage-report" tabindex="-1">Local coverage report <a class="header-anchor" href="#local-coverage-report" aria-label="Permalink to &quot;Local coverage report&quot;">​</a></h2><p>To navigate to the code coverage report, click on this button in the Vitest UI.</p><p><img src="'+r+'" alt="vitest UI" loading="lazy"></p><br><p>You should see a page that looks like the image below. This page will give you a quick indication of which files need more unit tests.</p><p><img src="'+i+'" alt="vitest UI" loading="lazy"></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>It is totally expected that when making changes to tests, the report will only show a small amount of files. This can be fixed by clicking the &#39;Rerun all&#39; button or typing <code>a</code> into the terminal while the process is running.</p></div><h2 id="production-coverage-report" tabindex="-1">Production coverage report <a class="header-anchor" href="#production-coverage-report" aria-label="Permalink to &quot;Production coverage report&quot;">​</a></h2><p>On merge into <code>main</code>, a coverage report is generated and hosted in Github Pages along side this documentation site. You can view the coverage reports <a href="/coverage/index.html">here</a>.</p>',12),n=[c];function l(p,d,h,g,v,u){return o(),t("div",null,n)}const f=e(s,[["render",l]]);export{_ as __pageData,f as default};

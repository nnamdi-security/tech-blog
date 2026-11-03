"use strict";

/**
 * One entry per thumbnail. The key is the output file name: "my-post" becomes
 * assets/images/posts/my-post.webp (used on the site) and my-post.jpg (used
 * for social previews).
 *
 * For a new post, copy the `simpleThumbnail` example at the bottom of this
 * file. The other entries use custom layouts built from the same helpers.
 */

const { page, windowBar, playButton, simpleThumbnail } = require("./template.js");

module.exports = {
    'javascript-array-methods': page('#f7df1e', `
  <div class="badge"><span style="background:#0a0e13;color:#f7df1e;padding:2px 10px;border-radius:6px">JS</span>Video tutorial</div>
  ${playButton}
  <h1 class="t" style="font-size:190px;margin-top:40px">Array</h1>
  <h1 class="t" style="font-size:150px;margin-top:4px"><span class="hl">Methods</span></h1>
  <ul class="list" style="margin-top:56px">
    <li><b>✓</b>map &amp; filter</li><li><b>✓</b>find &amp; reduce</li><li><b>✓</b>real app data</li>
  </ul>
  <div class="win abs" style="right:80px;top:300px;width:760px;transform:rotate(2deg)">${windowBar}<pre><span class="k">const</span> names = users
  .<span class="f">filter</span>(u =&gt; u.active)
  .<span class="f">map</span>(u =&gt; u.name);

<span class="c">// ["Ada", "Tunde"]</span></pre></div>
  <div class="meta">▶ 18:42</div>`),

    'technology-podcast': page('#ff7a3d', `
  <div class="badge">🎙 Podcast · Ep 01</div>
  <h1 class="t" style="font-size:132px;margin-top:44px;max-width:900px">The skills<br>junior devs</h1>
  <h1 class="t" style="font-size:132px;margin-top:10px"><span class="hl">actually need</span></h1>
  <p style="font:700 40px Inter;margin-top:48px;color:rgba(255,255,255,.85);max-width:820px">Beyond syntax: what makes a new developer <span class="acc">hireable</span>?</p>
  <div class="abs" style="right:150px;top:150px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#2b3a48,#121a22);border:6px solid var(--a);display:grid;place-items:center;box-shadow:0 0 0 24px rgba(255,122,61,.12),0 0 0 48px rgba(255,122,61,.06)">
    <svg width="210" height="260" viewBox="0 0 210 260"><rect x="55" y="0" width="100" height="160" rx="50" fill="#ff7a3d"/><g stroke="#0a0e13" stroke-width="6" opacity=".35"><line x1="70" y1="45" x2="140" y2="45"/><line x1="65" y1="75" x2="145" y2="75"/><line x1="65" y1="105" x2="145" y2="105"/></g><path d="M20 120v10c0 50 38 85 85 85s85-35 85-85v-10" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/><line x1="105" y1="215" x2="105" y2="255" stroke="#fff" stroke-width="14" stroke-linecap="round"/></svg>
  </div>
  <svg class="abs" style="right:80px;top:640px" width="560" height="120" viewBox="0 0 560 120">${Array.from({length:28},(_,i)=>{const h=[30,60,90,50,110,70,40,95,60,30,80,105,55,35,75,100,45,85,60,25,70,95,50,80,40,65,30,20][i];return `<rect x="${i*20}" y="${60-h/2}" width="11" height="${h}" rx="5.5" fill="${i<17?'#ff7a3d':'#3a4855'}"/>`}).join('')}</svg>
  <div class="meta">▶ 42:15</div>`),

    'accessible-navigation': page('#2dd4bf', `
  <div class="badge">Article · Accessibility</div>
  <h1 class="t" style="font-size:150px;margin-top:44px">Navigation</h1>
  <h1 class="t" style="font-size:118px;margin-top:6px">that works for</h1>
  <h1 class="t" style="font-size:150px;margin-top:10px"><span class="hl">everyone</span></h1>
  <ul class="list" style="margin-top:50px"><li><b>✓</b>Keyboard friendly</li><li><b>✓</b>Screen reader ready</li><li><b>✓</b>Mobile menus done right</li></ul>
  <div class="win abs" style="right:80px;top:170px;width:640px">${windowBar}
    <div style="display:flex;gap:18px;padding:34px 30px;font:700 30px Inter">
      <span style="padding:14px 18px;color:#9fb0bf">Home</span>
      <span style="padding:14px 18px;outline:6px solid #ff9f43;outline-offset:4px;border-radius:10px;background:#1f2b36">Posts</span>
      <span style="padding:14px 18px;color:#9fb0bf">About</span>
    </div>
    <div style="padding:0 30px 34px"><div style="height:22px;width:80%;background:#24313d;border-radius:8px;margin-bottom:16px"></div><div style="height:22px;width:62%;background:#24313d;border-radius:8px"></div></div>
  </div>
  <div class="abs" style="right:80px;top:600px;display:flex;gap:22px">
    ${['Tab','Enter','Esc'].map(k=>`<div style="min-width:150px;padding:28px 26px;text-align:center;background:linear-gradient(#f4f7f8,#cfd8dc);color:#0a0e13;font:800 40px Inter;border-radius:18px;box-shadow:0 10px 0 #7d8b93,0 20px 40px rgba(0,0,0,.5)">${k}</div>`).join('')}
  </div>
  <div class="meta">8 MIN READ</div>`),

    'building-blog-without-framework': page('#a3e635', `
  <div class="badge">Article · Case study</div>
  <h1 class="t" style="font-size:136px;margin-top:40px">No framework.</h1>
  <h1 class="t" style="font-size:136px;margin-top:6px">No build step.</h1>
  <h1 class="t" style="font-size:96px;margin-top:26px"><span class="hl">Just HTML, CSS &amp; JS</span></h1>
  <ul class="list" style="margin-top:50px"><li><b>✓</b>The architecture</li><li><b>✓</b>The trade-offs</li><li><b>✓</b>The bugs</li></ul>
  <div class="win abs" style="right:80px;top:200px;width:490px;transform:rotate(2deg)">${windowBar}<pre style="font-size:26px;padding:28px 28px"><span class="c">$</span> ls node_modules
<span class="r">No such file or directory</span>

<span class="c">$</span> cat package.json
<span class="r">No such file or directory</span></pre></div>
  <div class="abs" style="right:150px;top:540px;width:280px;height:280px;border-radius:50%;background:var(--a);color:#0a0e13;display:grid;place-items:center;text-align:center;transform:rotate(-10deg);box-shadow:0 20px 50px rgba(0,0,0,.5)">
    <div><div class="t" style="font-size:150px;line-height:.9">0</div><div style="font:900 24px Inter;letter-spacing:.02em">DEPENDENCIES</div></div>
  </div>
  <div class="meta">9 MIN READ</div>`),

    'web-security-basics': page('#ff4d5e', `
  <div class="badge">Article · Security</div>
  <h1 class="t" style="font-size:138px;margin-top:44px">Is your code</h1>
  <h1 class="t" style="font-size:138px;margin-top:6px">open to</h1>
  <h1 class="t" style="font-size:170px;margin-top:10px"><span class="hl">XSS?</span></h1>
  <p style="font:700 38px Inter;margin-top:40px;color:rgba(255,255,255,.85)">innerHTML · security headers · CSP</p>
  <div class="win abs" style="right:80px;top:150px;width:720px">${windowBar}<pre style="font-size:32px"><span class="c">// ❌ runs attacker code</span>
el.<span class="r">innerHTML</span> = userInput;

<span class="c">// ✅ always safe text</span>
el.<span class="g">textContent</span> = userInput;</pre></div>
  <svg class="abs" style="right:330px;top:560px;filter:drop-shadow(0 20px 30px rgba(0,0,0,.5))" width="220" height="260" viewBox="0 0 220 260"><path d="M110 8 L205 45 L205 125 C205 190 160 232 110 252 C60 232 15 190 15 125 L15 45 Z" fill="#ff4d5e"/><path d="M110 8 L205 45 L205 125 C205 190 160 232 110 252 Z" fill="#000" opacity=".15"/><rect x="72" y="118" width="76" height="62" rx="10" fill="#fff"/><path d="M85 118v-20a25 25 0 0 1 50 0v20" fill="none" stroke="#fff" stroke-width="14"/><circle cx="110" cy="145" r="9" fill="#ff4d5e"/></svg>
  <div class="meta">10 MIN READ</div>`),

    'git-github-beginner-mistakes': page('#ff8a3d', `
  <div class="badge">Article · Git &amp; GitHub</div>
  <h1 class="t" style="font-size:290px;margin-top:20px;line-height:.9"><span class="acc">5</span> Git</h1>
  <h1 class="t" style="font-size:150px;margin-top:6px"><span class="hl">mistakes</span></h1>
  <p class="t" style="font-size:66px;margin-top:30px;color:rgba(255,255,255,.9)">I made so you don't have to</p>
  <div class="win abs" style="right:80px;top:150px;width:700px;transform:rotate(-1.5deg)">${windowBar}<pre style="font-size:29px"><span class="c">$</span> git pull origin main
<span class="r">fatal: refusing to merge
unrelated histories</span>

<span class="c">$</span> <span class="g">git pull --rebase</span> <span class="c">✓</span></pre></div>
  <svg class="abs" style="right:110px;top:600px" width="620" height="150" viewBox="0 0 620 150"><line x1="20" y1="110" x2="600" y2="110" stroke="#5b6b7a" stroke-width="10" stroke-linecap="round"/><path d="M150 110 C190 110 190 35 250 35 L370 35 C430 35 430 110 470 110" fill="none" stroke="#ff8a3d" stroke-width="10" stroke-linecap="round"/>${[20,150,310,470,600].map(x=>`<circle cx="${x}" cy="110" r="20" fill="#0a0e13" stroke="#fff" stroke-width="8"/>`).join('')}${[260,360].map(x=>`<circle cx="${x}" cy="35" r="20" fill="#ff8a3d"/>`).join('')}</svg>
  <div class="meta">9 MIN READ</div>`),

    // Example for a new post. Uncomment, rename, and run:
    //   node tools/thumbnails/generate.js my-new-post
    //
    // "my-new-post": simpleThumbnail({
    //     accent: "#38bdf8",
    //     badge: "Video tutorial",
    //     title: "CSS Grid",
    //     highlight: "in 10 minutes",
    //     points: ["Rows & columns", "Grid areas", "Responsive layouts"],
    //     code: ".layout {\n  display: grid;\n  gap: 2rem;\n}",
    //     meta: "▶ 10:24",
    //     video: true
    // }),
};

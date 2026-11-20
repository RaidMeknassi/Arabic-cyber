/* الأمن السيبراني في 10 دقائق — منطق الموقع */
(function () {
  "use strict";
  var PAGE = document.body.dataset.page || "";          // b | i | a | level | certs
  var STAGE_KEY = document.body.dataset.stage || "";

  /* ---------- الشعار ---------- */
  var LOGO = '<span class="logo-anim"><img class="base" src="assets/logo-base.webp" alt="10 دقائق — خارطة طريق الأمن السيبراني، من الصفر إلى الاحتراف" width="900" height="684"><img class="needle" src="assets/logo-needle.webp" alt="" aria-hidden="true" width="900" height="684"></span>';
  var LOGO_SMALL = '<span class="logo-anim"><img class="base" src="assets/logo-small-base.webp" alt="10 دقائق — خارطة طريق الأمن السيبراني" width="300" height="228"><img class="needle" src="assets/logo-small-needle.webp" alt="" aria-hidden="true" width="300" height="228"></span>';

  /* ---------- أيقونات المستويات ---------- */
  var S = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
  var ICONS = {
    start:   S + '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    pc:      S + '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
    os:      S + '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8h18"/><path d="m7 12 3 2-3 2M12 16h4"/></svg>',
    net:     S + '<path d="M2 9a15 15 0 0 1 20 0"/><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1" fill="#fff"/></svg>',
    bug:     S + '<rect x="7" y="7" width="10" height="13" rx="5"/><path d="M9 4l1.5 3M15 4l-1.5 3M3 12h4M17 12h4M4 18l3-2M20 18l-3-2M4 7l3 2M20 7l-3 2M12 11v8"/></svg>',
    shield:  S + '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
    job:     S + '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></svg>',
    pulse:   S + '<path d="M3 12h4l2-6 4 12 2-6h6"/></svg>',
    terminal:S + '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M12 15h5"/></svg>',
    key:     S + '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M15 8l2 2"/></svg>',
    lock:    S + '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1.3" fill="#fff"/></svg>',
    layers:  S + '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/></svg>',
    wall:    S + '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 10h18M3 15h18M9 5v5M15 10v5M9 15v4"/></svg>',
    logs:    S + '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    eye:     S + '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    scan:    S + '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4M8 11h6M11 8v6"/></svg>',
    siren:   S + '<path d="M6 18v-6a6 6 0 0 1 12 0v6"/><path d="M4 18h16v3H4zM12 2v2M4.2 5.2l1.4 1.4M19.8 5.2l-1.4 1.4"/></svg>',
    target:  S + '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="#fff"/></svg>',
    cloud:   S + '<path d="M7 18a5 5 0 0 1-.5-10A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z"/></svg>',
    code:    S + '<path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 4l-4 16"/></svg>',
    brackets:S + '<path d="M8 4H5v16h3M16 4h3v16h-3M10 12h4"/></svg>',
    dfir:    S + '<circle cx="10" cy="10" r="6"/><path d="m20 20-5.5-5.5"/><path d="M10 7v3l2 2"/></svg>',
    sword:   S + '<path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/></svg>',
    gavel:   S + '<path d="m14 13-7.5 7.5a2.1 2.1 0 0 1-3-3L11 10M16 16l6-6M8 8l6-6M9 7l8 8"/></svg>',
    ai:      S + '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4M10 10h4v4h-4z"/></svg>',
    trophy:  S + '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg>',
    play:    S + '<circle cx="12" cy="12" r="9"/><path d="m10 8.5 5 3.5-5 3.5z" fill="#fff"/></svg>'
  };
  function icon(lv) { return '<div class="app-ic">' + (ICONS[lv.icon] || ICONS.play) + "</div>"; }
  function esc(s) { var d = document.createElement("div"); d.textContent = s == null ? "" : s; return d.innerHTML; }
  function byId(id) { for (var i = 0; i < ALL_LEVELS.length; i++) if (ALL_LEVELS[i].id === id) return ALL_LEVELS[i]; return null; }
  function certHtml(c, cls) {
    return '<a class="certnode' + (cls ? " " + cls : "") + '" href="certs.html"><span class="c-ic">🎓</span><span class="c-tx"><small>شهادة مقترحة</small><b dir="auto">' + esc(c.name) + "</b><em>" + esc(c.why) + "</em></span></a>";
  }

  /* ---------- الشريط العلوي ---------- */
  var NI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var navKey = PAGE === "level" ? (byId(new URLSearchParams(location.search).get("l")) || { stage: "b" }).stage : (PAGE === "certs" ? "c" : STAGE_KEY);
  function nv(k, href, svg, label) { return '<a href="' + href + '"' + (navKey === k ? ' class="on" aria-current="page"' : "") + ">" + NI + svg + "</svg><span>" + label + "</span></a>"; }
  var top = document.getElementById("top");
  if (top) top.innerHTML =
    '<a class="logo" href="index.html" aria-label="الصفحة الرئيسية">' + LOGO_SMALL + "</a>" +
    '<nav class="top-nav" aria-label="القائمة الرئيسية">' +
      nv("b", "index.html#map", '<path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20z"/><path d="M9 4v13.5M15 6.5V20"/>', "المبتدئ") +
      nv("i", "intermediate.html", '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>', "المتوسط") +
      nv("a", "advanced.html", '<circle cx="6" cy="5" r="2.2"/><circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="9" r="2.2"/><path d="M6 7.2v9.6M18 11.2c0 4-6 3-12 6"/>', "المتقدم") +
      nv("c", "certs.html", '<circle cx="12" cy="9" r="5.5"/><path d="m8.8 13.6-1.3 7 4.5-2.4 4.5 2.4-1.3-7"/>', "الشهادات") +
    "</nav>" +
    '<a class="btn btn-small start-btn" href="level.html?l=b0">ابدأ الآن</a>';
  var hl = document.getElementById("hero-logo"); if (hl) hl.innerHTML = LOGO;
  var yr = document.getElementById("year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- حفظ التقدّم (في هذا المتصفح فقط) ---------- */
  var KEY = "arcyber-done", done = {};
  function load() { try { done = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { done = {}; } }
  load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {} }
  function countDone(lv) { return lv.lessons.filter(function (r) { return done[r[0]]; }).length; }

  /* ---------- نافذة الدرس ---------- */
  var overlay = document.getElementById("overlay"), cur = null, onChange = function () {};
  function openLesson(lv, r) {
    cur = r[0];
    overlay.querySelector(".panel").style.setProperty("--c", lv.color);
    document.getElementById("p-track").textContent = lv.name + " · " + lv.title + " · الدرس " + r[0];
    document.getElementById("p-title").textContent = r[1];
    var vid = VIDEOS[r[0]], box = document.getElementById("p-video");
    box.innerHTML = vid
      ? '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(vid) + '" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen title="' + esc(r[1]) + '"></iframe>'
      : '<div class="ph"><div>🎬</div>سيُضاف فيديو هذا الدرس قريبًا</div>';
    var tp = document.getElementById("p-topics"), subs = r[3] || [];
    tp.hidden = !subs.length;
    tp.innerHTML = subs.length ? "<h4>محتوى الدرس</h4><ol>" + subs.map(function (s, i) { return '<li><code>' + esc(r[0]) + "." + (i + 1) + "</code>" + esc(s) + "</li>"; }).join("") + "</ol>" : "";
    var lab = document.getElementById("p-lab"); lab.hidden = !r[2];
    lab.textContent = "🔒 لهذا الدرس مختبر تطبيقي — سيتوفر قريبًا.";
    paintBtn(); overlay.hidden = false; document.body.style.overflow = "hidden";
  }
  function paintBtn() {
    var b = document.getElementById("p-done");
    b.textContent = done[cur] ? "✔ تمّ — إلغاء" : "وضع علامة: تمّ";
    b.classList.toggle("is-done", !!done[cur]);
  }
  function closePanel() { overlay.hidden = true; document.body.style.overflow = ""; }
  if (overlay) {
    document.getElementById("p-close").onclick = closePanel;
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closePanel(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !overlay.hidden) closePanel(); });
    document.getElementById("p-done").onclick = function () {
      if (done[cur]) delete done[cur]; else done[cur] = 1;
      save(); paintBtn(); onChange();
    };
  }

  /* ---------- صفحة مرحلة: خريطة الطريق ---------- */
  var map = document.getElementById("map");
  if (map && STAGES[STAGE_KEY]) {
    var ST = STAGES[STAGE_KEY];
    var setText = function (id, t) { var e = document.getElementById(id); if (e) e.textContent = t; };
    setText("st-title", ST.title); setText("st-desc", ST.desc);

    var chips = document.getElementById("chips");
    if (chips) ST.levels.forEach(function (lv) {
      var a = document.createElement("a"); a.href = "#" + lv.id; a.style.setProperty("--c", lv.color);
      a.innerHTML = "<i></i>" + esc(lv.name); chips.appendChild(a);
    });

    var nodes = {};
    function card(lv) {
      var el = document.createElement("div"); el.className = "lv"; el.id = lv.id;
      el.style.setProperty("--c", lv.color);
      var items = lv.lessons.map(function (r) {
        return '<a class="fl-item" data-n="' + esc(r[0]) + '" href="level.html?l=' + lv.id + "&n=" + encodeURIComponent(r[0]) + '"><span class="fl-dot"></span><span>' + esc(r[0]) + " · " + esc(r[1]) + (r[2] ? " 🔒" : "") + "</span></a>";
      }).join("");
      el.innerHTML =
        '<a class="lv-card" href="level.html?l=' + lv.id + '"><span class="badge">' + esc(lv.name) + "</span>" + icon(lv) +
        "<h2>" + esc(lv.title) + '</h2><div class="lv-meta"></div><div class="lv-bar"><i></i></div>' +
        (lv.jobReady ? '<div class="job">' + esc(lv.jobReady) + "</div>" : "") + "</a>" +
        '<div class="flyout"><div class="flyout-card"><div class="fl-head">' + esc(lv.name) + " · " + esc(lv.title) + "</div>" + items + "</div></div>";
      nodes[lv.id] = el; return el;
    }

    // الصفوف: كل صف فيه أعمدة، وكل عمود: مستوى ثم شهاداته
    var INNER = [];
    var rowCols = [];   // [[ [firstNodeEl,lastNodeEl,color], ... ], ...]
    ST.rows.forEach(function (row) {
      var rowEl = document.createElement("div"); rowEl.className = "row" + (row.length > 2 ? " wide" : row.length > 1 ? " pair" : "");
      var cols = [];
      row.forEach(function (col) {
        var colEl = document.createElement("div"); colEl.className = "col";
        var first = null, last = null, color = "#f87171", chain = [];
        col.forEach(function (id) {
          if (id === "fork") {
            var f = document.createElement("div"); f.className = "fork"; f.textContent = ST.fork; colEl.appendChild(f);
            first = first || f; last = f; chain.push([f, false]); return;
          }
          var lv = byId(id); color = lv.color;
          var c = card(lv); colEl.appendChild(c); first = first || c; last = c; chain.push([c, false]);
          (lv.certs || []).forEach(function (ct) {
            var w = document.createElement("div"); w.innerHTML = certHtml(ct, row.length > 2 ? "sm" : ""); var ce = w.firstChild;
            colEl.appendChild(ce); last = ce; chain.push([ce, true]);
          });
        });
        rowEl.appendChild(colEl);
        cols.push({ first: first, last: last, color: color, chain: chain });
      });
      map.appendChild(rowEl);
      // صف المسارات: إطار واحد يدخله خط واحد ويخرج منه خط واحد
      if (row.length > 2) {
        cols.forEach(function (c) { for (var k = 1; k < c.chain.length; k++) INNER.push([c.chain[k - 1][0], c.chain[k][0], c.color, c.chain[k][1]]); });
        cols = [{ first: rowEl, last: rowEl, color: "#fb7185", chain: [[rowEl, false]] }];
      }
      rowCols.push(cols);
    });
    var goal = document.createElement("a"); goal.className = "goal"; goal.id = "goal"; goal.href = ST.next.href;
    goal.innerHTML = "<span>🎯</span>" + esc(ST.next.text); map.appendChild(goal);
    rowCols.push([{ first: goal, last: goal, color: "#f87171", chain: [[goal, false]] }]);

    // الروابط بين العناصر
    var LINKS = INNER.slice();
    rowCols.forEach(function (cols, r) {
      cols.forEach(function (c) {
        for (var k = 1; k < c.chain.length; k++) LINKS.push([c.chain[k - 1][0], c.chain[k][0], c.color, c.chain[k][1]]);
        if (r + 1 < rowCols.length) rowCols[r + 1].forEach(function (n) { LINKS.push([c.last, n.first, n.color, n.first.classList.contains("goal")]); });
      });
    });

    function paint() {
      var n = 0, t = 0;
      ST.levels.forEach(function (lv) {
        var d = countDone(lv), tt = lv.lessons.length, el = nodes[lv.id]; n += d; t += tt;
        el.querySelector(".lv-meta").textContent = tt + " دروس · " + d + " / " + tt + " مكتمل";
        el.querySelector(".lv-bar i").style.width = (100 * d / tt) + "%";
        el.querySelector(".lv-card").classList.toggle("done", d === tt);
        el.querySelectorAll(".fl-item").forEach(function (a) { a.classList.toggle("done", !!done[a.dataset.n]); });
      });
      setText("progress-text", n + " / " + t + " درسًا");
      var bf = document.getElementById("bar-fill"); if (bf) bf.style.width = (100 * n / t) + "%";
    }
    paint();

    var road = document.getElementById("road"), svg = document.getElementById("road-lines");
    function draw() {
      var R = road.getBoundingClientRect(), out = "";
      LINKS.forEach(function (k) {
        var a = k[0].getBoundingClientRect(), b = k[1].getBoundingClientRect();
        var x1 = a.left + a.width / 2 - R.left, y1 = a.bottom - R.top, x2 = b.left + b.width / 2 - R.left, y2 = b.top - R.top, m = (y1 + y2) / 2;
        out += '<path d="M' + x1 + " " + y1 + " C" + x1 + " " + m + " " + x2 + " " + m + " " + x2 + " " + y2 + '" fill="none" stroke="' + (k[3] ? "#4ade80" : k[2]) + '" stroke-width="2.5" stroke-opacity=".7"' + (k[3] ? ' stroke-dasharray="6 6"' : "") + "/>";
      });
      svg.innerHTML = out;
    }
    draw(); window.addEventListener("resize", draw);
    if (document.fonts) document.fonts.ready.then(draw);
    window.addEventListener("load", draw);
    window.addEventListener("pageshow", function () { load(); paint(); });
  }

  /* ---------- صفحة الشهادات ---------- */
  var certList = document.getElementById("cert-list");
  if (certList) {
    var h = "";
    ["b", "i", "a"].forEach(function (k) {
      var st = STAGES[k], items = "";
      st.levels.forEach(function (lv) {
        (lv.certs || []).forEach(function (c) {
          items += '<div class="cert-row" style="--c:' + lv.color + '">' + certHtml(c) +
            '<a class="after" href="level.html?l=' + lv.id + '">بعد ' + esc(lv.name) + " · " + esc(lv.title) + " ←</a></div>";
        });
      });
      h += '<section class="cert-stage"><h2><a href="' + st.page + '">المرحلة: ' + esc(st.name) + "</a></h2>" + items + "</section>";
    });
    certList.innerHTML = h;
  }

  /* ---------- صفحة المستوى ---------- */
  var list = document.getElementById("level-list");
  if (list) {
    var q = new URLSearchParams(location.search);
    var lv = byId(q.get("l")) || ALL_LEVELS[0], ST2 = STAGES[lv.stage];
    var idx = ST2.levels.indexOf(lv);
    document.body.style.setProperty("--c", lv.color);
    document.title = lv.title + " · الأمن السيبراني في 10 دقائق";
    var back = document.getElementById("lv-back"); back.href = ST2.page + "#" + lv.id; back.textContent = "→ العودة إلى خريطة " + ST2.name;
    document.getElementById("lv-badge").textContent = lv.name;
    document.getElementById("lv-title").textContent = lv.title;
    document.getElementById("lv-desc").textContent = lv.desc;

    lv.lessons.forEach(function (r) {
      var b = document.createElement("button"); b.type = "button"; b.className = "ls"; b.dataset.n = r[0];
      b.style.setProperty("--c", lv.color);
      b.innerHTML = '<div class="app-ic" style="--c:' + lv.color + '">' + ICONS.play + "</div>" +
        '<div class="ls-txt"><b>' + esc(r[1]) + "</b><span>الدرس " + esc(r[0]) + " · 10 دقائق · " + (r[3] || []).length + " أجزاء</span></div>" +
        '<div class="tags"><span class="tag' + (VIDEOS[r[0]] ? "" : " soon") + '">' + (VIDEOS[r[0]] ? "درس" : "قريبًا") + "</span>" +
        (r[2] ? '<span class="tag lab">🔒 مختبر</span>' : "") + "</div>";
      b.onclick = function () { openLesson(lv, r); };
      list.appendChild(b);
    });
    var extra = document.getElementById("lv-extra"), ex = "";
    if (lv.practice) ex += '<div class="prac">🧪 <b>تطبيق عملي:</b> ' + esc(lv.practice) + "</div>";
    (lv.certs || []).forEach(function (c) { ex += certHtml(c); });
    extra.innerHTML = ex;

    function paintLv() {
      var d = countDone(lv), t = lv.lessons.length;
      document.getElementById("lv-meta").textContent = t + " دروس · " + d + " / " + t + " مكتمل";
      document.querySelector("#lv-bar i").style.width = (100 * d / t) + "%";
      list.querySelectorAll(".ls").forEach(function (b) { b.classList.toggle("done", !!done[b.dataset.n]); });
    }
    paintLv(); onChange = paintLv;

    var nav = document.getElementById("lv-nav"), prev = ST2.levels[idx - 1], next = ST2.levels[idx + 1], hh = "";
    hh += prev ? '<a href="level.html?l=' + prev.id + '" style="--c:' + prev.color + '">→ ' + esc(prev.name + " · " + prev.title) + "</a>" : "<span></span>";
    hh += next ? '<a href="level.html?l=' + next.id + '" style="--c:' + next.color + '">' + esc(next.name + " · " + next.title) + " ←</a>"
               : (ST2.next ? '<a href="' + ST2.next.href + '" style="--c:#4ade80">' + esc(ST2.next.text) + "</a>" : "");
    nav.innerHTML = hh;

    var n = q.get("n");
    lv.lessons.forEach(function (r) { if (r[0] === n) openLesson(lv, r); });
  }

  /* ---------- تثبيت التطبيق على الهاتف ---------- */
  (function () {
    if ("serviceWorker" in navigator) window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
    var standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
    if (standalone) return;                                   // مثبّت بالفعل
    var ua = navigator.userAgent, isIOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    var isMobile = isIOS || /android|mobile/i.test(ua);
    var deferred = null, DKEY = "arcyber-install-later";

    var box = document.createElement("div"); box.className = "install"; box.hidden = true;
    box.setAttribute("role", "dialog"); box.setAttribute("aria-labelledby", "in-title");
    box.innerHTML =
      '<div class="install-card">' +
        '<button class="close" type="button" aria-label="إغلاق">&times;</button>' +
        '<img src="icons/red-192.png" alt="" width="64" height="64">' +
        '<h3 id="in-title">ثبّت التطبيق على هاتفك</h3>' +
        '<p>افتح الدروس بلمسة واحدة من الشاشة الرئيسية، بملء الشاشة، ودون البحث عن الرابط.</p>' +
        '<div class="in-ios" hidden><ol>' +
          '<li>اضغط زر <b>المشاركة</b> <span class="in-ic">⬆︎</span> في أسفل Safari</li>' +
          '<li>اختر <b>«إضافة إلى الشاشة الرئيسية»</b> ➕</li>' +
          '<li>اضغط <b>«إضافة»</b></li></ol></div>' +
        '<div class="in-other" hidden><ol>' +
          '<li>افتح قائمة المتصفح <b>⋮</b></li>' +
          '<li>اختر <b>«تثبيت التطبيق»</b> أو <b>«إضافة إلى الشاشة الرئيسية»</b></li></ol></div>' +
        '<button class="btn btn-full in-go" type="button">تثبيت الآن</button>' +
        '<button class="in-later" type="button">لاحقًا</button>' +
      '</div>';
    document.body.appendChild(box);
    var go = box.querySelector(".in-go");

    function show() {
      box.querySelector(".in-ios").hidden = !(isIOS && !deferred);
      box.querySelector(".in-other").hidden = !(!isIOS && !deferred);
      go.hidden = !deferred;
      box.hidden = false;
    }
    function hide(later) {
      box.hidden = true;
      if (later) try { localStorage.setItem(DKEY, Date.now()); } catch (e) {}
    }
    box.querySelector(".close").onclick = function () { hide(true); };
    box.querySelector(".in-later").onclick = function () { hide(true); };
    box.addEventListener("click", function (e) { if (e.target === box) hide(true); });
    go.onclick = function () {
      if (!deferred) return;
      deferred.prompt();
      deferred.userChoice.finally(function () { deferred = null; hide(false); });
    };

    // زر دائم في الشريط العلوي
    var btn = document.createElement("button"); btn.type = "button"; btn.className = "btn btn-small install-btn";
    btn.textContent = "📲 تثبيت"; btn.onclick = show;
    var topBar = document.getElementById("top"); if (topBar && isMobile) topBar.appendChild(btn);

    window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; if (topBar && !btn.parentNode) topBar.appendChild(btn); });
    window.addEventListener("appinstalled", function () { hide(false); if (btn.parentNode) btn.remove(); });

    // تظهر النافذة تلقائيًا على الهاتف بعد ثانيتين (ولا تعود قبل 3 أيام إذا اخترت «لاحقًا»)
    var last = 0; try { last = +localStorage.getItem(DKEY) || 0; } catch (e) {}
    if (isMobile && Date.now() - last > 3 * 864e5) setTimeout(function () { if (overlay && !overlay.hidden) return; show(); }, 2000);
  })();
})();

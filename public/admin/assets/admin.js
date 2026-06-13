/* Forex Drilling CMS — éditeur d'article (vanilla, zéro dépendance).
   Édition WYSIWYG : on écrit directement dans le rendu final (gras affiché en
   gras, titres en grand) — aucune syntaxe visible. En coulisses, le contenu est
   sérialisé en Markdown dans un champ caché ; le rendu public reste Markdown
   assaini (react-markdown + rehype-sanitize). */
(function () {
  "use strict";

  var form = document.getElementById("editor-form");
  if (!form) return;

  var hidden = document.getElementById("md-input");     // textarea Markdown (name=body)
  var editor = document.getElementById("wysiwyg");      // zone éditable
  var toolbar = document.getElementById("md-toolbar");
  var csrf = (form.querySelector('input[name="csrf"]') || {}).value || "";

  /* ---------- Markdown -> HTML (pour amorcer l'éditeur, sous-ensemble sûr) ---------- */
  function esc(s) { return s.replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function safeUrl(u) { return /^https?:\/\//i.test(u) || u.charAt(0) === "/" ? u : null; }
  function inlineMd(s) {
    s = esc(s);
    s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, function (m, a, u) { var x = safeUrl(u); return x ? '<img src="' + x + '" alt="' + a + '">' : m; });
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, t, u) { var x = safeUrl(u); return x ? '<a href="' + x + '">' + t + "</a>" : m; });
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g, "$1<em>$2</em>$3");
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    return s;
  }
  function mdToHtml(md) {
    var lines = (md || "").replace(/\r\n/g, "\n").split("\n");
    var html = "", inUl = false, para = [];
    function flush() { if (para.length) { html += "<p>" + inlineMd(para.join(" ")) + "</p>"; para = []; } }
    function closeUl() { if (inUl) { html += "</ul>"; inUl = false; } }
    for (var i = 0; i < lines.length; i++) {
      var t = lines[i].trim(), m;
      if (!t) { flush(); closeUl(); continue; }
      if ((m = t.match(/^###\s+(.*)$/))) { flush(); closeUl(); html += "<h3>" + inlineMd(m[1]) + "</h3>"; }
      else if ((m = t.match(/^##\s+(.*)$/))) { flush(); closeUl(); html += "<h2>" + inlineMd(m[1]) + "</h2>"; }
      else if ((m = t.match(/^>\s?(.*)$/))) { flush(); closeUl(); html += "<blockquote>" + inlineMd(m[1]) + "</blockquote>"; }
      else if ((m = t.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/))) { flush(); closeUl(); var u = safeUrl(m[2]); if (u) html += '<p><img src="' + u + '" alt="' + esc(m[1]) + '"></p>'; }
      else if ((m = t.match(/^[-*]\s+(.*)$/))) { flush(); if (!inUl) { html += "<ul>"; inUl = true; } html += "<li>" + inlineMd(m[1]) + "</li>"; }
      else { para.push(t); }
    }
    flush(); closeUl();
    return html;
  }

  /* ---------- HTML (éditeur) -> Markdown (stockage) ---------- */
  function inlineToMd(node) {
    var s = "";
    node.childNodes.forEach(function (c) {
      if (c.nodeType === 3) { s += c.textContent; return; }
      if (c.nodeType !== 1) return;
      var tag = c.tagName, inner = inlineToMd(c);
      if (tag === "STRONG" || tag === "B") s += inner.trim() ? "**" + inner + "**" : "";
      else if (tag === "EM" || tag === "I") s += inner.trim() ? "*" + inner + "*" : "";
      else if (tag === "CODE") s += "`" + inner + "`";
      else if (tag === "A") s += "[" + inner + "](" + (c.getAttribute("href") || "") + ")";
      else if (tag === "IMG") s += "![" + (c.getAttribute("alt") || "") + "](" + (c.getAttribute("src") || "") + ")";
      else if (tag === "BR") s += "\n";
      else s += inner;
    });
    return s;
  }
  function blockToMd(node) {
    if (node.nodeType === 3) { var t = node.textContent.trim(); return t; }
    if (node.nodeType !== 1) return "";
    switch (node.tagName) {
      case "H1": case "H2": return "## " + inlineToMd(node).trim();
      case "H3": case "H4": return "### " + inlineToMd(node).trim();
      case "BLOCKQUOTE": return "> " + inlineToMd(node).trim();
      case "UL": return Array.prototype.map.call(node.children, function (li) { return "- " + inlineToMd(li).trim(); }).join("\n");
      case "OL": return Array.prototype.map.call(node.children, function (li, i) { return (i + 1) + ". " + inlineToMd(li).trim(); }).join("\n");
      case "IMG": return "![" + (node.getAttribute("alt") || "") + "](" + (node.getAttribute("src") || "") + ")";
      case "BR": return "";
      default: return inlineToMd(node).trim();
    }
  }
  function htmlToMarkdown(root) {
    var out = [];
    root.childNodes.forEach(function (n) { var md = blockToMd(n); if (md !== "") out.push(md); });
    return out.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  function sync() { hidden.value = htmlToMarkdown(editor); }

  /* ---------- Amorçage ---------- */
  try { document.execCommand("defaultParagraphSeparator", false, "p"); } catch (e) {}
  editor.innerHTML = mdToHtml(hidden.value);

  /* ---------- Barre d'outils ---------- */
  function exec(cmd, val) { editor.focus(); document.execCommand(cmd, false, val || null); sync(); updateActive(); }
  function toggleBlock(tag) {
    var cur = "";
    try { cur = (document.queryCommandValue("formatBlock") || "").toLowerCase(); } catch (e) {}
    exec("formatBlock", cur === tag.toLowerCase() ? "P" : tag);
  }
  function insertLink() {
    var url = window.prompt("Link address (https://…)", "https://");
    if (!url) return;
    if (!/^https?:\/\//i.test(url) && url.charAt(0) !== "/") { alert("Invalid link."); return; }
    var sel = window.getSelection();
    if (sel && sel.toString()) exec("createLink", url);
    else exec("insertHTML", '<a href="' + url.replace(/"/g, "&quot;") + '">' + url.replace(/</g, "&lt;") + "</a>");
  }
  function insertImageUrl(url) {
    exec("insertHTML", '<p><img src="' + url.replace(/"/g, "&quot;") + '" alt=""></p>');
  }

  if (toolbar) toolbar.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-md]"); if (!btn) return;
    e.preventDefault();
    switch (btn.getAttribute("data-md")) {
      case "bold": exec("bold"); break;
      case "italic": exec("italic"); break;
      case "h2": toggleBlock("H2"); break;
      case "h3": toggleBlock("H3"); break;
      case "quote": toggleBlock("BLOCKQUOTE"); break;
      case "ul": exec("insertUnorderedList"); break;
      case "link": insertLink(); break;
      case "image": pickImage(insertImageUrl); break;
    }
  });

  function updateActive() {
    var map = { bold: "bold", italic: "italic", ul: "insertUnorderedList" };
    var blk = "";
    try { blk = (document.queryCommandValue("formatBlock") || "").toLowerCase(); } catch (e) {}
    toolbar && toolbar.querySelectorAll("[data-md]").forEach(function (b) {
      var k = b.getAttribute("data-md"), on = false;
      if (map[k]) { try { on = document.queryCommandState(map[k]); } catch (e) {} }
      else if (k === "h2") on = blk === "h2";
      else if (k === "h3") on = blk === "h3";
      else if (k === "quote") on = blk === "blockquote";
      b.classList.toggle("is-active", on);
    });
  }
  document.addEventListener("selectionchange", function () {
    if (document.activeElement === editor) updateActive();
  });

  /* ---------- Saisie & collage propre ---------- */
  editor.addEventListener("input", sync);
  editor.addEventListener("paste", function (e) {
    e.preventDefault();
    var text = (e.clipboardData || window.clipboardData).getData("text/plain");
    document.execCommand("insertText", false, text);
  });
  // Raccourcis clavier natifs (Ctrl/Cmd+B/I) → resynchroniser après.
  editor.addEventListener("keyup", function (e) { if ((e.ctrlKey || e.metaKey)) { sync(); updateActive(); } });
  form.addEventListener("submit", sync);

  /* ---------- Upload d'images (couverture + insertion) ---------- */
  function uploadFile(file) {
    var fd = new FormData(); fd.append("image", file); fd.append("csrf", csrf);
    return fetch("/admin/?action=upload", { method: "POST", headers: { "X-CSRF-Token": csrf }, body: fd, credentials: "same-origin" })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); });
  }
  function pickImage(cb) {
    var fi = document.createElement("input");
    fi.type = "file"; fi.accept = "image/png,image/jpeg,image/webp,image/avif";
    fi.addEventListener("change", function () {
      var f = fi.files && fi.files[0]; if (!f) return;
      uploadFile(f).then(function (res) {
        if (!res.ok || !res.j.url) { alert("Upload failed: " + (res.j.error || "unknown")); return; }
        cb(res.j.url);
      });
    });
    fi.click();
  }

  var coverFile = document.getElementById("cover-file");
  if (coverFile) coverFile.addEventListener("change", function () {
    var f = coverFile.files && coverFile.files[0]; if (!f) return;
    uploadFile(f).then(function (res) {
      if (!res.ok || !res.j.url) { alert("Upload failed: " + (res.j.error || "unknown")); return; }
      document.getElementById("cover_url").value = res.j.url;
      var img = document.getElementById("cover-img"); img.src = res.j.url; img.hidden = false;
      var empty = document.getElementById("cover-empty"); if (empty) empty.hidden = true;
      dirty = true;
    });
  });

  /* ---------- Garde anti-perte ---------- */
  var dirty = false;
  form.addEventListener("input", function () { dirty = true; });
  editor.addEventListener("input", function () { dirty = true; });
  form.addEventListener("submit", function () { dirty = false; });
  window.addEventListener("beforeunload", function (e) { if (dirty) { e.preventDefault(); e.returnValue = ""; } });

  sync();
})();

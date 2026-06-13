/* Forex Drilling CMS — interactions de l'éditeur (vanilla, zéro dépendance).
   Aperçu Markdown maison (pas de lib tierce, même vendorisée). L'aperçu échappe
   tout puis réautorise un sous-ensemble sûr — le rendu faisant foi reste celui
   du site (react-markdown + rehype-sanitize). */
(function () {
  "use strict";

  var input = document.getElementById("md-input");
  var preview = document.getElementById("md-preview");
  var form = document.getElementById("editor-form");
  if (!form) return;

  var csrf = (form.querySelector('input[name="csrf"]') || {}).value || "";

  // ---- Aperçu Markdown sûr -------------------------------------------------
  function esc(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function safeUrl(u) {
    return /^https?:\/\//i.test(u) || u.charAt(0) === "/" ? u : null;
  }
  function inline(s) {
    s = esc(s);
    s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, function (m, alt, url) {
      var u = safeUrl(url);
      return u ? '<img src="' + u + '" alt="' + alt + '">' : m;
    });
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, txt, url) {
      var u = safeUrl(url);
      return u ? '<a href="' + u + '" rel="noopener noreferrer">' + txt + "</a>" : m;
    });
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g, "$1<em>$2</em>$3");
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    return s;
  }
  function render(md) {
    var lines = md.replace(/\r\n/g, "\n").split("\n");
    var html = "", inUl = false, para = [];
    function flush() { if (para.length) { html += "<p>" + inline(para.join(" ")) + "</p>"; para = []; } }
    function closeUl() { if (inUl) { html += "</ul>"; inUl = false; } }
    for (var i = 0; i < lines.length; i++) {
      var t = lines[i].trim();
      if (!t) { flush(); closeUl(); continue; }
      var m;
      if ((m = t.match(/^###\s+(.*)$/))) { flush(); closeUl(); html += "<h3>" + inline(m[1]) + "</h3>"; }
      else if ((m = t.match(/^##\s+(.*)$/))) { flush(); closeUl(); html += "<h2>" + inline(m[1]) + "</h2>"; }
      else if ((m = t.match(/^>\s?(.*)$/))) { flush(); closeUl(); html += "<blockquote>" + inline(m[1]) + "</blockquote>"; }
      else if ((m = t.match(/^[-*]\s+(.*)$/))) { flush(); if (!inUl) { html += "<ul>"; inUl = true; } html += "<li>" + inline(m[1]) + "</li>"; }
      else { para.push(t); }
    }
    flush(); closeUl();
    return html;
  }
  function updatePreview() { if (preview && input) preview.innerHTML = render(input.value); }
  if (input) { input.addEventListener("input", updatePreview); updatePreview(); }

  // ---- Barre d'outils ------------------------------------------------------
  function surround(before, after) {
    if (!input) return;
    var s = input.selectionStart, e = input.selectionEnd;
    var sel = input.value.slice(s, e) || "texte";
    input.value = input.value.slice(0, s) + before + sel + after + input.value.slice(e);
    input.focus();
    input.selectionStart = s + before.length;
    input.selectionEnd = s + before.length + sel.length;
    updatePreview();
  }
  function prefixLine(prefix) {
    if (!input) return;
    var s = input.selectionStart;
    var lineStart = input.value.lastIndexOf("\n", s - 1) + 1;
    input.value = input.value.slice(0, lineStart) + prefix + input.value.slice(lineStart);
    input.focus();
    updatePreview();
  }
  document.querySelectorAll(".md-toolbar [data-md]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      switch (btn.getAttribute("data-md")) {
        case "bold": surround("**", "**"); break;
        case "italic": surround("*", "*"); break;
        case "h2": prefixLine("## "); break;
        case "h3": prefixLine("### "); break;
        case "quote": prefixLine("> "); break;
        case "ul": prefixLine("- "); break;
        case "link": surround("[", "](https://)"); break;
        case "image": document.getElementById("cover-file") && pickImageInto("body"); break;
      }
    });
  });

  // ---- Upload d'image (couverture + insertion dans le corps) ---------------
  function uploadFile(file) {
    var fd = new FormData();
    fd.append("image", file);
    fd.append("csrf", csrf);
    return fetch("/admin/?action=upload", {
      method: "POST",
      headers: { "X-CSRF-Token": csrf },
      body: fd,
      credentials: "same-origin",
    }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); });
  }

  var coverFile = document.getElementById("cover-file");
  if (coverFile) {
    coverFile.addEventListener("change", function () {
      var f = coverFile.files && coverFile.files[0];
      if (!f) return;
      uploadFile(f).then(function (res) {
        if (!res.ok || !res.j.url) { alert("Échec de l’upload : " + (res.j.error || "inconnu")); return; }
        document.getElementById("cover_url").value = res.j.url;
        var img = document.getElementById("cover-img");
        img.src = res.j.url; img.hidden = false;
        var empty = document.getElementById("cover-empty"); if (empty) empty.hidden = true;
        dirty = true;
      });
    });
  }

  // Insertion d'une image dans le corps : réutilise un input fichier éphémère.
  function pickImageInto(target) {
    var fi = document.createElement("input");
    fi.type = "file";
    fi.accept = "image/png,image/jpeg,image/webp,image/avif";
    fi.addEventListener("change", function () {
      var f = fi.files && fi.files[0]; if (!f) return;
      uploadFile(f).then(function (res) {
        if (!res.ok || !res.j.url) { alert("Échec de l’upload : " + (res.j.error || "inconnu")); return; }
        if (target === "body") surround("![", "](" + res.j.url + ")");
      });
    });
    fi.click();
  }

  // ---- Garde anti-perte de saisie -----------------------------------------
  var dirty = false;
  form.addEventListener("input", function () { dirty = true; });
  form.addEventListener("submit", function () { dirty = false; });
  window.addEventListener("beforeunload", function (e) {
    if (dirty) { e.preventDefault(); e.returnValue = ""; }
  });
})();

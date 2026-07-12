/* ============================================================
   Powers of Forensic Minds — shared script
   Injects the header + footer on every page and handles
   small interactions (active nav, scroll reveal).
   ============================================================ */

(function () {
  "use strict";

  /* ---- Site config (edit here, applies to all pages) ---- */
  var SITE = {
    brand: "Powers of Forensic Minds",
    brandSub: "Forensic Psychology",
    // Live logo from your current site's CDN — works immediately.
    // To fully cut ties with WordPress, download it to images/logo.jpg
    // and change this line to "images/logo.jpg" (see README).
    logo: "https://i0.wp.com/forensicpsychfl.com/wp-content/uploads/2023/12/cropped-fm-192-small-logo-head-only.jpg?fit=141%2C152&ssl=1",
    phone: "850-807-9801",
    phoneHref: "tel:850-807-9801",
    email: "info@drpowerstherapy.com",
    emailHref: "mailto:info@drpowerstherapy.com",
    booking: "https://airtable.com/apppBdiTXVLLWeCZc/pagVUHvDAhUMsCcmf/form"
  };

  /* Figure out which page we're on so we can mark the active nav link. */
  var path = window.location.pathname.split("/").pop() || "index.html";
  var section = document.body ? document.body.getAttribute("data-section") : null;
  function current(file) { return path === file ? ' aria-current="page"' : ""; }
  function currentSection(name) { return section === name ? ' aria-current="page"' : ""; }

  /* ---------- Header ---------- */
  var header =
    '<div class="wrap"><div class="bar">' +
      '<a class="brand" href="index.html" aria-label="' + SITE.brand + ' — home">' +
        '<img src="' + SITE.logo + '" alt="" width="34" height="37">' +
        '<span class="brand-name">' + SITE.brand +
          '<small>' + SITE.brandSub + '</small>' +
        '</span>' +
      '</a>' +
      '<nav class="nav" aria-label="Primary">' +
        '<a href="index.html"' + current("index.html") + '>Home</a>' +
        '<a href="fees.html"' + current("fees.html") + '>Fees</a>' +
        '<a href="blog.html"' + currentSection("blog") + '>Blog</a>' +
        '<a class="btn btn-brass btn-sm" href="' + SITE.emailHref + '">' +
          '<span class="nav-link-text">Email&nbsp;</span>Dr.&nbsp;Powers</a>' +
      '</nav>' +
    '</div></div>';

  /* ---------- Footer ---------- */
  var year = new Date().getFullYear();
  var footer =
    '<div class="wrap">' +
      '<div class="cols">' +
        '<div>' +
          '<a class="brand" href="index.html">' +
            '<img src="' + SITE.logo + '" alt="" width="34" height="37">' +
            '<span class="brand-name">' + SITE.brand + '</span>' +
          '</a>' +
          '<p>Experienced forensic licensed psychologist providing services across Florida and most other states covered by PsyPACT.</p>' +
        '</div>' +
        '<div>' +
          '<h4>Office</h4>' +
          '<ul>' +
            '<li>Tallahassee, Florida</li>' +
            '<li><a href="' + SITE.phoneHref + '">(850) 807-9801</a></li>' +
            '<li><a href="' + SITE.emailHref + '">' + SITE.email + '</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' +
          '<h4>Practice</h4>' +
          '<ul>' +
            '<li><a href="index.html">Forensic Evaluations</a></li>' +
            '<li><a href="fees.html">Fee Schedule</a></li>' +
            '<li><a href="blog.html">Forensic Mindz Blog</a></li>' +
            '<li><a href="' + SITE.booking + '" target="_blank" rel="noopener">Book an Appointment</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="legal">' +
        '<span>&copy; ' + year + ' ' + SITE.brand + '. Dr. Raychel Powers, Psy.D.</span>' +
        '<span>Evaluations only &middot; not a treatment or therapy service.</span>' +
      '</div>' +
    '</div>';

  /* ---------- Mount ---------- */
  function mount() {
    var h = document.getElementById("site-header");
    var f = document.getElementById("site-footer");
    if (h) h.innerHTML = header;
    if (f) f.innerHTML = footer;

    /* Scroll reveal */
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();

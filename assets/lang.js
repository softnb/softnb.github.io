/* Language auto-select: Turkish devices open the Turkish page, everyone else stays on English.
   A manual choice made with the language pill is remembered and wins over the device language.
   Only English index pages redirect; Turkish pages just record the choice. */
(function () {
  var store = null;
  try { store = window.localStorage; } catch (e) {}
  function get() { try { return store && store.getItem('softnb-lang'); } catch (e) { return null; } }
  function set(v) { try { store && store.setItem('softnb-lang', v); } catch (e) {} }

  if (document.documentElement.lang === 'en') {
    var pref = get();
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    var deviceTr = /^tr(-|$)/i.test(langs[0] || '');
    if (pref === 'tr' || (!pref && deviceTr)) {
      var p = location.pathname.replace(/index\.html$/, '');
      if (/\/$/.test(p)) location.replace(p + 'indexTr.html' + location.search + location.hash);
    }
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.lang-pill');
    if (a) set(/indexTr\.html/.test(a.getAttribute('href')) ? 'tr' : 'en');
  });
})();

/* Position dots and a swipe hint for landscape screenshot galleries (.gallery-wide). */
(function () {
  var tr = document.documentElement.lang === 'tr';
  document.querySelectorAll('.gallery-wide').forEach(function (g) {
    var imgs = g.querySelectorAll('img');
    if (imgs.length < 2) return;

    var hint = document.createElement('p');
    hint.className = 'gallery-hint';
    hint.textContent = tr ? '← Diğer ekran görüntüleri için kaydırın →' : '← Swipe for more screenshots →';

    var dots = document.createElement('div');
    dots.className = 'gallery-dots';
    var btns = [];
    imgs.forEach(function (img, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', (tr ? 'Ekran görüntüsü ' : 'Screenshot ') + (i + 1));
      b.addEventListener('click', function () {
        g.scrollTo({ left: img.offsetLeft - imgs[0].offsetLeft, behavior: 'smooth' });
      });
      dots.appendChild(b);
      btns.push(b);
    });
    g.insertAdjacentElement('afterend', dots);
    dots.insertAdjacentElement('afterend', hint);

    function update() {
      var step = imgs[1].offsetLeft - imgs[0].offsetLeft;
      var i = Math.round(g.scrollLeft / step);
      if (g.scrollLeft + g.clientWidth >= g.scrollWidth - 4) i = imgs.length - 1;
      btns.forEach(function (b, k) { k === i ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current'); });
      if (g.scrollLeft > 10) hint.classList.add('is-hidden');
    }
    var t;
    g.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(update, 30); }, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();

(function () {
  // ---- transport: queue events until the (deferred) analytics script is ready ----
  var queue = [], ready = false, tries = 0;
  function flush() {
    if (!window.umami || !window.umami.track) return false;
    ready = true;
    while (queue.length) {
      var q = queue.shift();
      try { window.umami.track(q[0], q[1]); } catch (e) {}
    }
    return true;
  }
  function track(name, data) {
    if (ready || flush()) {
      try { window.umami.track(name, data || {}); } catch (e) {}
      return;
    }
    if (queue.length < 40) queue.push([name, data || {}]);
  }
  var poll = setInterval(function () {
    if (flush() || ++tries > 40) clearInterval(poll);
  }, 250);

  // ---- clicks: what was clicked, and where on the page it was clicked from ----
  function locationOf(a) {
    if (a.closest('footer')) return 'footer';
    if (a.closest('header')) return 'hero';
    if (a.closest('.site-nav')) return 'nav';
    if (a.closest('.page-head')) return 'page-head';
    if (a.closest('article.case')) return 'page-body';
    if (a.closest('.more')) return 'more';
    if (a.closest('.project')) return 'project';
    if (a.closest('.card')) return 'card';
    if (a.closest('#about')) return 'about';
    return 'body';
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var from = locationOf(a);
    if (href.indexOf('/resume.pdf') === 0) {
      track('resume', { from: from });
    } else if (href.indexOf('mailto:') === 0) {
      track('email', { from: from });
    } else if (href.indexOf('linkedin.com') > -1) {
      track('linkedin', { from: from });
    } else if (href.indexOf('github.com/joaquinramirezg/') > -1) {
      track('github-repo', { repo: href.split('/joaquinramirezg/')[1].replace(/\/$/, ''), from: from });
    } else if (href.indexOf('github.com') > -1) {
      track('github-profile', { from: from });
    } else if (/^\/(work|projects)\/[^/]+\/?$/.test(href)) {
      track('page-open', { page: href.replace(/\/$/, ''), from: from });
    } else if (/^https?:/.test(href) && href.indexOf('joaquinramirez.dev') === -1) {
      track('outbound', { host: a.hostname, from: from });
    }
  }, true);


  // ---- section-read: on screen long enough to have been read, not just scrolled past ----
  var seen = {}, timers = {};
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      var vh = window.innerHeight || document.documentElement.clientHeight || 0;
      entries.forEach(function (en) {
        var id = en.target.id;
        if (seen[id]) return;
        // a section taller than the viewport can never hit a high ratio, so also
        // accept "it fills at least half the screen"
        var fillsScreen = en.intersectionRect && en.intersectionRect.height >= vh * 0.5;
        var visible = en.isIntersecting && (en.intersectionRatio >= 0.35 || fillsScreen);
        if (visible && !timers[id]) {
          timers[id] = setTimeout(function () {
            timers[id] = null;
            seen[id] = true;
            track('section-read', { section: id });
          }, 3000);
        } else if (!visible && timers[id]) {
          clearTimeout(timers[id]);
          timers[id] = null;
        }
      });
    }, { threshold: [0, 0.15, 0.25, 0.35, 0.5, 0.75] });
    document.querySelectorAll('section[id]').forEach(function (t) {
      io.observe(t);
    });
  }

  // ---- scroll depth ----
  var hit = {}, hitCount = 0;
  function onScroll() {
    if (hitCount >= 4) { window.removeEventListener('scroll', onScroll); return; }
    var h = document.documentElement;
    var total = h.scrollHeight - window.innerHeight;
    var pct = total > 0 ? ((h.scrollTop || window.pageYOffset || 0) / total) * 100 : 100;
    [25, 50, 75, 100].forEach(function (m) {
      if (pct >= (m === 100 ? 98 : m) && !hit[m]) {
        hit[m] = true;
        hitCount++;
        track('scroll', { depth: m + '%' });
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- engaged time: counts only while the tab is actually visible ----
  var visibleSince = document.visibilityState === 'visible' ? Date.now() : 0;
  var accrued = 0, timeSent = false;
  function stopClock() {
    if (visibleSince) { accrued += Date.now() - visibleSince; visibleSince = 0; }
  }
  function sendTime() {
    if (timeSent) return;
    timeSent = true;
    stopClock();
    var s = Math.round(accrued / 1000);
    var bucket = s < 10 ? '0-10s' : s < 30 ? '10-30s' : s < 60 ? '30-60s' : s < 180 ? '1-3min' : '3min+';
    track('time-on-page', { bucket: bucket });
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') { stopClock(); sendTime(); }
    else if (!visibleSince) { visibleSince = Date.now(); }
  });
  window.addEventListener('pagehide', sendTime);
})();

// ---- demo player: a still frame until the reader asks for the animation ----
(function () {
  document.querySelectorAll('.demo-frame[data-anim]').forEach(function (b) {
    b.addEventListener('click', function () {
      var img = b.querySelector('img');
      if (b.classList.contains('playing')) { img.src = b.getAttribute('data-still'); b.classList.remove('playing'); b.setAttribute('aria-label', b.getAttribute('data-label')); return; }
      b.setAttribute('data-label', b.getAttribute('aria-label'));
      img.src = b.getAttribute('data-anim');
      b.classList.add('playing');
      b.setAttribute('aria-label', 'Demo playing. Click to stop.');
      try { if (window.umami) window.umami.track('demo-play', { page: location.pathname }); } catch (e) {}
    });
  });
})();

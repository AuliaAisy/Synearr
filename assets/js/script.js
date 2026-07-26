/* =========================================================
   SYNEAR — shared utilities (loaded on every page)
   1) mobile navbar toggle
   2) logout confirmation (Ya / Tidak)
   3) toast notification helper
   4) scroll fade-in observer + time-of-day greeting
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ---- 1) Mobile navbar toggle ----
  var navToggleBtn = document.getElementById('navToggleBtn');
  var navbarLinks = document.getElementById('navbarLinks');
  if (navToggleBtn && navbarLinks) {
    navToggleBtn.addEventListener('click', function () {
      navbarLinks.classList.toggle('open');
    });
    navbarLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { navbarLinks.classList.remove('open'); });
    });
  }

  // ---- 2) Logout confirmation modal (Ya / Tidak) ----
  var logoutTriggers = document.querySelectorAll('.js-logout-trigger');
  var logoutModalEl = document.getElementById('logoutModal');
  if (logoutTriggers.length && logoutModalEl && window.bootstrap) {
    var logoutModal = new bootstrap.Modal(logoutModalEl);
    logoutTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        logoutModal.show();
      });
    });
    var confirmLogoutBtn = document.getElementById('confirmLogoutBtn');
    if (confirmLogoutBtn) {
      confirmLogoutBtn.addEventListener('click', function () {
        window.location.href = 'index.html';
      });
    }
  }

  // ---- 4a) Fade-in on scroll for elements marked .fade-up ----
  var faders = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && faders.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    faders.forEach(function (el) { observer.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- 4b) Personalized greeting based on time of day, used on beranda.html ----
  var greetEl = document.querySelector('[data-greeting]');
  if (greetEl) {
    var hour = new Date().getHours();
    var greeting = hour < 11 ? 'Selamat pagi' : hour < 15 ? 'Selamat siang' : hour < 18 ? 'Selamat sore' : 'Selamat malam';
    greetEl.textContent = greeting;
  }
});

// ---- 3) Toast helper: window.synToast('Pesan', 'success'|'danger'|'info') ----
window.synToast = function (message, type) {
  var existing = document.querySelector('.syn-toast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.className = 'syn-toast' + (type ? ' ' + type : '');
  toast.innerHTML = '<span>' + message + '</span>';
  document.body.appendChild(toast);

  requestAnimationFrame(function () {
    toast.classList.add('show');
  });

  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () { toast.remove(); }, 300);
  }, 3200);
};

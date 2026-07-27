document.addEventListener('DOMContentLoaded', function () {

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

  var greetEl = document.querySelector('[data-greeting]');
  if (greetEl) {
    var hour = new Date().getHours();
    var greeting = hour < 11 ? 'Selamat pagi' : hour < 15 ? 'Selamat siang' : hour < 18 ? 'Selamat sore' : 'Selamat malam';
    greetEl.textContent = greeting;
  }
});

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

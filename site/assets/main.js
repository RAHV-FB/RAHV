(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');
  var icon = document.querySelector('[data-theme-icon]');
  if (!toggle) return;

  var stored = null;
  try { stored = localStorage.getItem('yourhome-theme'); } catch (e) {}
  if (stored === 'light' || stored === 'dark') root.setAttribute('data-theme', stored);

  function current() {
    var explicit = root.getAttribute('data-theme');
    if (explicit) return explicit;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function render() {
    icon.textContent = current() === 'dark' ? '☾' : '☀';
  }

  toggle.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('yourhome-theme', next); } catch (e) {}
    render();
  });

  render();
})();

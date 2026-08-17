// Your Home Barcelona

// Mobile navigation
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
if (toggle && header) {
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Lead form
document.querySelectorAll('.lead-form-wrap').forEach((wrap) => {
  const form = wrap.querySelector('form');
  if (!form) return;

  const setError = (name, message) => {
    const field = form.querySelector(`[data-field="${name}"]`);
    if (!field) return;
    field.classList.toggle('invalid', !!message);
    const msg = field.querySelector('.error-msg');
    if (msg && message) msg.textContent = message;
  };

  const clearErrors = () => {
    form.querySelectorAll('.field.invalid').forEach((f) => f.classList.remove('invalid'));
    const consentError = form.querySelector('.consent-error');
    if (consentError) consentError.style.display = 'none';
    const alert = form.querySelector('.form-alert');
    if (alert) alert.style.display = 'none';
  };

  form.addEventListener('input', (ev) => {
    const field = ev.target.closest('.field');
    if (field) field.classList.remove('invalid');
    if (ev.target.name === 'consent') {
      const consentError = form.querySelector('.consent-error');
      if (consentError) consentError.style.display = 'none';
    }
  });

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    clearErrors();

    const data = Object.fromEntries(new FormData(form).entries());
    let valid = true;

    if (!data.name || !data.name.trim()) { setError('name', 'Please add your name.'); valid = false; }

    const email = (data.email || '').trim();
    if (!email) { setError('email', 'Please add an email address.'); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email', 'Please check this email address.'); valid = false; }

    if (!data.phone || !data.phone.trim()) { setError('phone', 'Please add a phone or WhatsApp number.'); valid = false; }
    if (!data.budget) { setError('budget', 'Please choose a budget range.'); valid = false; }

    if (!form.querySelector('[name="consent"]').checked) {
      const consentError = form.querySelector('.consent-error');
      if (consentError) consentError.style.display = 'block';
      valid = false;
    }

    if (!valid) {
      const alert = form.querySelector('.form-alert');
      if (alert) alert.style.display = 'block';
      const firstInvalid = form.querySelector('.field.invalid input, .field.invalid select');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    wrap.classList.add('success');
    wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  const again = wrap.querySelector('.send-another');
  if (again) {
    again.addEventListener('click', () => {
      form.reset();
      clearErrors();
      wrap.classList.remove('success');
    });
  }
});

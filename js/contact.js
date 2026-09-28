/**
 * contact.js — Carmela Sherwood Photography
 * Handles: contact form validation, simulated submission,
 *          success state, error handling, reset.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('[type="submit"]');
  const spinnerEl = submitBtn?.querySelector('.spinner');
  const btnText   = submitBtn?.querySelector('.btn-text');
  const successEl = document.querySelector('.contact-success');
  const resetBtn  = document.getElementById('contact-reset');

  function getField(id) { return document.getElementById(id); }

  function showError(id, message) {
    const field = getField(id);
    const error = getField(`${id}-error`);
    if (field) field.classList.add('error');
    if (error) {
      error.textContent = message;
      error.classList.add('visible');
    }
  }

  function clearError(id) {
    const field = getField(id);
    const error = getField(`${id}-error`);
    if (field) field.classList.remove('error');
    if (error) {
      error.textContent = '';
      error.classList.remove('visible');
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  // Clear errors on input
  ['contact-name', 'contact-email', 'contact-subject', 'contact-message'].forEach(id => {
    getField(id)?.addEventListener('input', () => clearError(id));
  });

  function validate() {
    let valid = true;

    const name    = getField('contact-name')?.value.trim();
    const email   = getField('contact-email')?.value.trim();
    const subject = getField('contact-subject')?.value.trim();
    const message = getField('contact-message')?.value.trim();

    if (!name) {
      showError('contact-name', 'Please provide your full name.');
      valid = false;
    }
    if (!email) {
      showError('contact-email', 'Please provide your email address.');
      valid = false;
    } else if (!validateEmail(email)) {
      showError('contact-email', 'Please enter a valid email address.');
      valid = false;
    }
    if (!subject) {
      showError('contact-subject', 'Please enter a subject.');
      valid = false;
    }
    if (!message) {
      showError('contact-message', 'Please share your thoughts or questions.');
      valid = false;
    } else if (message.length < 10) {
      showError('contact-message', 'Message must be at least 10 characters long.');
      valid = false;
    }

    return valid;
  }

  // Realistic front-end simulation structured for future backend/API integration
  async function submitContactForm(data) {
    // Replace with: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
    await new Promise(resolve => setTimeout(resolve, 1100));
    return { success: true };
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validate()) {
      const firstError = form.querySelector('.form-input.error, .form-textarea.error');
      firstError?.focus();
      return;
    }

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    if (spinnerEl) spinnerEl.style.display = 'inline-block';
    if (btnText)   btnText.style.opacity   = '0';

    const payload = {
      name:    getField('contact-name')?.value.trim(),
      email:   getField('contact-email')?.value.trim(),
      subject: getField('contact-subject')?.value.trim(),
      message: getField('contact-message')?.value.trim(),
    };

    try {
      const res = await submitContactForm(payload);
      if (res.success) {
        form.style.display = 'none';
        if (successEl) {
          successEl.classList.add('visible');
          const nameEl = successEl.querySelector('.contact-success-name');
          if (nameEl) nameEl.textContent = payload.name;
          successEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } catch {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      if (spinnerEl) spinnerEl.style.display = '';
      if (btnText)   btnText.style.opacity   = '1';
    }
  });

  resetBtn?.addEventListener('click', () => {
    form.reset();
    form.style.display = '';
    if (successEl) successEl.classList.remove('visible');
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    if (spinnerEl) spinnerEl.style.display = '';
    if (btnText)   btnText.style.opacity   = '1';
    ['contact-name', 'contact-email', 'contact-subject', 'contact-message'].forEach(clearError);
    getField('contact-name')?.focus();
  });
});

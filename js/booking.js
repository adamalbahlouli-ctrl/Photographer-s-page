/**
 * booking.js — Carmela Sherwood Photography
 * Handles: booking form validation, simulated submission,
 *          availability calendar, URL param pre-selection
 *
 * NOTE: No real backend required.
 * The submit handler is clearly structured so an API call
 * can replace the setTimeout() in submitForm() later.
 */

// ============================================================
// AVAILABILITY DATA (fictional demo calendar)
// ============================================================
const AVAILABILITY = {
  '2026-10': {
    1: 'available', 2: 'available', 3: 'limited',
    5: 'available', 6: 'available', 7: 'limited', 8: 'unavailable', 9: 'available', 10: 'available',
    12: 'limited', 13: 'available', 14: 'available', 15: 'available', 16: 'unavailable', 17: 'available',
    19: 'available', 20: 'limited', 21: 'available', 22: 'available', 23: 'available', 24: 'limited',
    26: 'available', 27: 'available', 28: 'limited', 29: 'available', 30: 'unavailable', 31: 'available',
  },
  '2026-11': {
    2: 'available', 3: 'available', 4: 'limited', 5: 'available', 6: 'available', 7: 'available',
    9: 'unavailable', 10: 'limited', 11: 'available', 12: 'available', 13: 'available', 14: 'limited',
    16: 'available', 17: 'available', 18: 'limited', 19: 'available', 20: 'available', 21: 'available',
    23: 'available', 24: 'limited', 25: 'available', 26: 'available', 27: 'unavailable', 28: 'available',
    30: 'available',
  },
  '2026-12': {
    1: 'available', 2: 'available', 3: 'limited', 4: 'available', 5: 'available',
    7: 'limited', 8: 'available', 9: 'available', 10: 'unavailable', 11: 'available', 12: 'limited',
    14: 'available', 15: 'available', 16: 'limited', 17: 'available', 18: 'available', 19: 'available',
    21: 'limited', 22: 'available', 23: 'available', 24: 'unavailable', 25: 'unavailable', 26: 'unavailable',
    28: 'available', 29: 'available', 30: 'available', 31: 'available',
  },
};

const MONTHS = {
  '2026-10': 'October 2026',
  '2026-11': 'November 2026',
  '2026-12': 'December 2026',
};

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

// ============================================================
// AVAILABILITY CALENDAR
// ============================================================
function initAvailabilityCalendar() {
  const widget = document.querySelector('.availability-widget');
  if (!widget) return;

  const monthSelect     = widget.querySelector('#avail-month');
  const calGrid         = widget.querySelector('.availability-calendar');
  const resultEl        = widget.querySelector('.availability-result');
  const resultStatus    = widget.querySelector('.availability-status');
  const resultText      = widget.querySelector('.availability-result-text');

  if (!monthSelect || !calGrid) return;

  function renderCalendar(monthKey) {
    // Clear old days (keep weekday headers)
    calGrid.querySelectorAll('.cal-day').forEach(d => d.remove());

    const [year, month] = monthKey.split('-').map(Number);
    const firstDay = new Date(year, month - 1, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month, 0).getDate();
    const avail = AVAILABILITY[monthKey] || {};

    // Convert Sunday-first to Monday-first
    const startOffset = (firstDay === 0 ? 6 : firstDay - 1);

    // Empty cells before first day
    for (let i = 0; i < startOffset; i++) {
      const empty = document.createElement('div');
      empty.className = 'cal-day empty';
      calGrid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const status = avail[day] || 'none';
      const btn = document.createElement('button');
      btn.className = `cal-day ${status}`;
      btn.textContent = day;
      btn.setAttribute('aria-label', `${day} ${MONTHS[monthKey]} — ${status}`);

      if (status === 'available' || status === 'limited') {
        btn.addEventListener('click', () => {
          calGrid.querySelectorAll('.cal-day.selected').forEach(d => d.classList.remove('selected'));
          btn.classList.add('selected');

          const dateStr = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
          const dateInput = document.getElementById('preferred-date');
          if (dateInput) dateInput.value = dateStr;

          // Show result
          if (resultEl && resultStatus && resultText) {
            resultEl.classList.remove('available', 'limited', 'unavailable');
            resultEl.classList.add('visible', status);

            if (status === 'available') {
              resultStatus.textContent = 'AVAILABLE';
              resultText.textContent = `${day} ${MONTHS[monthKey]} appears to be available. Complete the inquiry form to reserve this date.`;
            } else {
              resultStatus.textContent = 'LIMITED AVAILABILITY';
              resultText.textContent = `${day} ${MONTHS[monthKey]} has limited availability. Inquire promptly to confirm.`;
            }
          }
        });
      } else if (status === 'unavailable') {
        btn.disabled = true;
      } else {
        btn.disabled = true;
      }

      calGrid.appendChild(btn);
    }
  }

  // Initial render
  renderCalendar(monthSelect.value);

  monthSelect.addEventListener('change', () => {
    if (resultEl) resultEl.classList.remove('visible');
    renderCalendar(monthSelect.value);
  });
}

// ============================================================
// FORM VALIDATION HELPERS
// ============================================================
function getField(id) { return document.getElementById(id); }
function showError(id, message) {
  const field = getField(id);
  const error = getField(`${id}-error`);
  if (field)  field.classList.add('error');
  if (error)  { error.textContent = message; error.classList.add('visible'); }
}
function clearError(id) {
  const field = getField(id);
  const error = getField(`${id}-error`);
  if (field)  field.classList.remove('error');
  if (error)  { error.textContent = ''; error.classList.remove('visible'); }
}
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ============================================================
// BOOKING FORM
// ============================================================
function initBookingForm() {
  const form      = document.getElementById('booking-form');
  if (!form) return;

  const submitBtn = form.querySelector('[type="submit"]');
  const spinnerEl = submitBtn?.querySelector('.spinner');
  const btnText   = submitBtn?.querySelector('.btn-text');
  const successEl = document.querySelector('.booking-success');
  const resetBtn  = document.getElementById('booking-reset');
  const nameField = getField('full-name');

  // Clear errors on input
  ['full-name','email','session-type','message'].forEach(id => {
    getField(id)?.addEventListener('input', () => clearError(id));
    getField(id)?.addEventListener('change', () => clearError(id));
  });

  // URL param pre-select service
  const params = new URLSearchParams(window.location.search);
  const serviceParam = params.get('service');
  if (serviceParam) {
    const sel = getField('session-type');
    if (sel) {
      const option = [...sel.options].find(o => o.value.toLowerCase() === serviceParam.toLowerCase());
      if (option) sel.value = option.value;
    }
  }

  function validate() {
    let valid = true;

    const name    = getField('full-name')?.value.trim();
    const email   = getField('email')?.value.trim();
    const session = getField('session-type')?.value;
    const message = getField('message')?.value.trim();

    if (!name) {
      showError('full-name', 'Please enter your full name.');
      valid = false;
    }
    if (!email) {
      showError('email', 'Please enter your email address.');
      valid = false;
    } else if (!validateEmail(email)) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    }
    if (!session) {
      showError('session-type', 'Please select a session type.');
      valid = false;
    }
    if (!message) {
      showError('message', 'Please tell us a little about your idea.');
      valid = false;
    } else if (message.length < 10) {
      showError('message', 'Please tell us a bit more (at least 10 characters).');
      valid = false;
    }

    return valid;
  }

  // ---- Replace this function to connect a real API later ----
  async function submitForm(data) {
    // TODO: Replace with actual API call, e.g.:
    // const res = await fetch('/api/booking', { method: 'POST', body: JSON.stringify(data) });
    await new Promise(resolve => setTimeout(resolve, 1200));
    return { success: true };
  }
  // -----------------------------------------------------------

  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!validate()) {
      const firstError = form.querySelector('.form-input.error, .form-select.error, .form-textarea.error');
      firstError?.focus();
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    if (spinnerEl) spinnerEl.style.display = 'inline-block';
    if (btnText)   btnText.style.opacity   = '0';

    const formData = {
      fullName:      getField('full-name')?.value.trim(),
      email:         getField('email')?.value.trim(),
      phone:         getField('phone')?.value.trim(),
      sessionType:   getField('session-type')?.value,
      preferredDate: getField('preferred-date')?.value,
      preferredTime: getField('preferred-time')?.value,
      location:      getField('location')?.value.trim(),
      peopleCount:   getField('people-count')?.value,
      budgetRange:   getField('budget-range')?.value,
      message:       getField('message')?.value.trim(),
    };

    try {
      const result = await submitForm(formData);
      if (result.success) {
        // Success state
        form.style.display = 'none';
        if (successEl) {
          successEl.classList.add('visible');
          const nameEl = successEl.querySelector('.success-name');
          if (nameEl) nameEl.textContent = formData.fullName;
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
    ['full-name','email','session-type','message'].forEach(clearError);
    form.querySelector('[type="submit"]')?.focus();
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initAvailabilityCalendar();
  initBookingForm();
});

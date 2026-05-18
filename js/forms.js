/* ============================================================
   JP Careers — forms.js
   Web3Forms Integration | Validation | Success/Error States
   ============================================================ */

(function () {
  'use strict';

  const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_KEY';

  /* ─── Utility: show field error ─── */
  function showFieldError(field, msg) {
    clearFieldError(field);
    field.classList.add('border-red-500');
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
    const err = document.createElement('p');
    err.className = 'field-error';
    err.style.cssText = 'color:#ef4444;font-size:0.8rem;margin-top:0.25rem;';
    err.textContent = msg;
    field.parentNode.appendChild(err);
  }

  function clearFieldError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
    const existing = field.parentNode.querySelector('.field-error');
    if (existing) existing.remove();
  }

  /* ─── Validation Rules ─── */
  function validateField(field) {
    const val = field.value.trim();
    const type = field.type;
    const name = field.name;

    if (field.hasAttribute('required') && !val) {
      showFieldError(field, 'This field is required.');
      return false;
    }

    if (type === 'email' && val) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        showFieldError(field, 'Please enter a valid email address.');
        return false;
      }
    }

    if (type === 'tel' && val) {
      const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,15}$/;
      if (!phoneRegex.test(val)) {
        showFieldError(field, 'Please enter a valid phone number.');
        return false;
      }
    }

    if (name === 'name' && val && val.length < 2) {
      showFieldError(field, 'Name must be at least 2 characters.');
      return false;
    }

    if (name === 'message' && val && val.length < 10) {
      showFieldError(field, 'Message must be at least 10 characters.');
      return false;
    }

    clearFieldError(field);
    field.style.borderColor = 'rgba(0,255,163,0.5)';
    field.style.boxShadow = '0 0 0 3px rgba(0,255,163,0.1)';
    return true;
  }

  /* ─── Live validation ─── */
  function attachLiveValidation(form) {
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(function (field) {
      field.addEventListener('blur', function () {
        if (field.type !== 'hidden' && field.name !== 'access_key') {
          validateField(field);
        }
      });
      field.addEventListener('input', function () {
        if (field.style.borderColor === 'rgb(239, 68, 68)') {
          validateField(field);
        }
      });
    });
  }

  /* ─── Set Loading State ─── */
  function setLoading(btn, isLoading) {
    if (isLoading) {
      btn.disabled = true;
      btn.dataset.originalText = btn.innerHTML;
      btn.innerHTML = `
        <svg class="animate-spin" style="width:18px;height:18px;animation:spin 1s linear infinite" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="62.83" stroke-dashoffset="47.12"></circle>
        </svg>
        Sending...
      `;
      btn.style.opacity = '0.75';
    } else {
      btn.disabled = false;
      btn.innerHTML = btn.dataset.originalText || 'Submit';
      btn.style.opacity = '1';
    }
  }

  /* ─── Show Form Message ─── */
  function showFormMessage(form, type, msg) {
    let msgEl = form.querySelector('.form-message');
    if (!msgEl) {
      msgEl = document.createElement('div');
      msgEl.className = 'form-message';
      form.appendChild(msgEl);
    }

    const colors = {
      success: { bg: 'rgba(0,255,163,0.08)', border: 'rgba(0,255,163,0.25)', text: '#00FFA3' },
      error:   { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', text: '#ef4444' }
    };

    const c = colors[type] || colors.error;
    msgEl.style.cssText = `
      background:${c.bg};
      border:1px solid ${c.border};
      border-radius:0.75rem;
      padding:1rem 1.25rem;
      margin-top:1rem;
      color:${c.text};
      font-size:0.9rem;
      font-weight:500;
    `;

    const icon = type === 'success' ? '✓' : '✗';
    msgEl.innerHTML = `<span style="font-size:1.1rem;margin-right:0.5rem">${icon}</span>${msg}`;

    // Auto-hide after 6s on success
    if (type === 'success') {
      setTimeout(() => {
        msgEl.style.transition = 'opacity 0.5s ease';
        msgEl.style.opacity = '0';
        setTimeout(() => msgEl.remove(), 500);
      }, 6000);
    }
  }

  /* ─── Handle Web3Forms Submit ─── */
  async function submitToWeb3Forms(form, data) {
    const formData = new FormData();

    // Set access key
    formData.append('access_key', WEB3FORMS_KEY);

    // Add subject
    const subject = form.dataset.subject || 'New Enquiry from JP Careers Website';
    formData.append('subject', subject);

    // Add redirect prevention
    formData.append('redirect', 'false');

    // Add all form fields
    data.forEach(function (item) {
      if (item.name !== 'access_key') {
        formData.append(item.name, item.value);
      }
    });

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    return result;
  }

  /* ─── Main Form Handler ─── */
  function initForm(form) {
    attachLiveValidation(form);

    // Set hidden access key
    let keyInput = form.querySelector('input[name="access_key"]');
    if (!keyInput) {
      keyInput = document.createElement('input');
      keyInput.type = 'hidden';
      keyInput.name = 'access_key';
      form.appendChild(keyInput);
    }
    keyInput.value = WEB3FORMS_KEY;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Validate all fields
      const fields = form.querySelectorAll('input:not([type="hidden"]), select, textarea');
      let isValid = true;

      fields.forEach(function (field) {
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) {
        showFormMessage(form, 'error', 'Please fix the errors above before submitting.');
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      setLoading(submitBtn, true);

      try {
        const data = Array.from(new FormData(form)).map(([name, value]) => ({ name, value: String(value) }));
        const result = await submitToWeb3Forms(form, data);

        if (result.success) {
          showFormMessage(form, 'success', 'Thank you! We\'ve received your message and will contact you within 24 hours.');
          form.reset();
          // Clear validation styles
          fields.forEach(function (field) {
            field.style.borderColor = '';
            field.style.boxShadow = '';
          });

          // Track conversion (placeholder for analytics)
          if (typeof gtag === 'function') {
            gtag('event', 'form_submit', { event_category: 'Lead', event_label: form.dataset.formName || 'contact' });
          }
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (err) {
        console.error('Form error:', err);
        showFormMessage(form, 'error', 'Something went wrong. Please try WhatsApp or email us directly.');
      } finally {
        setLoading(submitBtn, false);
      }
    });
  }

  /* ─── Newsletter Form ─── */
  function initNewsletterForm(form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]');
      if (!email || !email.value.trim()) return;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        showFieldError(email, 'Please enter a valid email.');
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      setLoading(btn, true);

      try {
        const formData = new FormData();
        formData.append('access_key', WEB3FORMS_KEY);
        formData.append('subject', 'New Newsletter Signup — JP Careers');
        formData.append('email', email.value.trim());
        formData.append('redirect', 'false');

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();

        if (result.success) {
          form.innerHTML = `
            <p style="color:#00FFA3;font-weight:600;text-align:center;padding:0.5rem 0;">
              ✓ You're subscribed! Welcome to JP Careers updates.
            </p>
          `;
        } else {
          throw new Error('Failed');
        }
      } catch (err) {
        showFormMessage(form, 'error', 'Could not subscribe. Please try again.');
      } finally {
        if (btn) setLoading(btn, false);
      }
    });
  }

  /* ─── Init ─── */
  function init() {
    // Main forms
    document.querySelectorAll('form[data-web3form]').forEach(initForm);

    // Newsletter forms
    document.querySelectorAll('form[data-newsletter]').forEach(initNewsletterForm);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Add CSS for spin animation
  const style = document.createElement('style');
  style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
  document.head.appendChild(style);

})();

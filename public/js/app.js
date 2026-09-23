/**
 * PickleBall4All - Main Client Interaction Logic
 * Handles Mobile Drawer, WhatsApp Prefill, Smooth Anchors, Form Validation & Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initProgramSelectors();
  initBookingForm();
  initWhatsAppQuickButton();
});

/**
 * 1. Sticky Header elevation on scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-md', 'bg-white/95');
      header.classList.remove('bg-white/85');
    } else {
      header.classList.remove('shadow-md', 'bg-white/95');
      header.classList.add('bg-white/85');
    }
  }, { passive: true });
}

/**
 * 2. Mobile Navigation Drawer (Accessible, Light-Dismiss, Focus-Safe)
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-menu-drawer');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  const navLinks = drawer ? drawer.querySelectorAll('a') : [];

  if (!toggleBtn || !drawer || !backdrop) return;

  function openMenu() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeMenu() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/**
 * 3. Program Card CTA buttons automatically pre-select dropdown in Booking Form
 */
function initProgramSelectors() {
  const programButtons = document.querySelectorAll('[data-select-program]');
  const programSelect = document.getElementById('program-type');

  programButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetVal = btn.getAttribute('data-select-program');
      if (programSelect && targetVal) {
        programSelect.value = targetVal;
      }
    });
  });
}

/**
 * 4. Booking Form Handling & WhatsApp Integration
 */
function initBookingForm() {
  const form = document.getElementById('coaching-booking-form');
  const whatsappSubmitBtn = document.getElementById('whatsapp-submit-btn');
  if (!form) return;

  // Regular Form Submit (AJAX emulation with toast feedback)
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = document.getElementById('full-name')?.value.trim();
    const phone = document.getElementById('phone-number')?.value.trim();
    const program = document.getElementById('program-type')?.selectedOptions[0]?.text;

    showToast(`Thank you ${name}! Hari Mohan will contact you at ${phone} to confirm your ${program} session.`, 'success');
    form.reset();
  });

  // Direct WhatsApp Deep-Link Builder
  if (whatsappSubmitBtn) {
    whatsappSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const name = document.getElementById('full-name')?.value.trim();
      const phone = document.getElementById('phone-number')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const level = document.getElementById('playing-level')?.selectedOptions[0]?.text;
      const program = document.getElementById('program-type')?.selectedOptions[0]?.text;
      const timing = document.getElementById('timing-pref')?.selectedOptions[0]?.text;
      const notes = document.getElementById('notes')?.value.trim();

      if (!name || !phone) {
        showToast('Please enter your Name and Phone/WhatsApp number first.', 'warning');
        document.getElementById('full-name')?.focus();
        return;
      }

      let message = `Hi Coach Hari! I would like to book a pickleball coaching session with PickleBall4All.\n\n`;
      message += `• Name: ${name}\n`;
      message += `• WhatsApp: ${phone}\n`;
      if (email) message += `• Email: ${email}\n`;
      message += `• Playing Level: ${level}\n`;
      message += `• Program: ${program}\n`;
      message += `• Preferred Slot: ${timing}\n`;
      if (notes) message += `• Goals/Notes: ${notes}\n`;
      message += `\nLooking forward to training on court!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/6589000521?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      showToast('Opening WhatsApp with your booking details...', 'success');
    });
  }
}

/**
 * 5. Floating WhatsApp Button
 */
function initWhatsAppQuickButton() {
  const quickBtn = document.getElementById('quick-whatsapp-btn');
  if (!quickBtn) return;

  quickBtn.addEventListener('click', (e) => {
    const defaultMsg = encodeURIComponent("Hi Coach Hari! I'm interested in booking a pickleball coaching session at Jurong with PickleBall4All.");
    window.open(`https://wa.me/6589000521?text=${defaultMsg}`, '_blank', 'noopener,noreferrer');
  });
}

/**
 * Accessible Toast Notification
 */
function showToast(message, type = 'success') {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  const bgColor = type === 'warning' ? 'bg-amber-600' : 'bg-[#111315]';
  const borderColor = type === 'warning' ? 'border-amber-400' : 'border-[#0284C7]';
  const icon = type === 'warning' ? '⚠️' : '✅';

  toast.className = `fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-4 rounded-2xl ${bgColor} text-white text-sm font-semibold border-2 ${borderColor} shadow-2xl flex items-center gap-3 z-50 transition-all duration-300 show max-w-[90vw] md:max-w-md text-center`;
  toast.innerHTML = `<span class="text-lg">${icon}</span><span>${message}</span>`;

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

const PHONE = '+13024498103';

const services = {
  Brakes: 'Brake pad, rotor, and stopping-noise service inquiries. Call to confirm exact vehicle needs and availability.',
  Batteries: 'Battery testing, replacement support, no-start checks, and charging issue triage.',
  Diagnostics: 'Check-engine light, no-start, warning lights, and issue tracing before repair.',
  Starters: 'Starter-related no-start symptoms, clicking, and ignition response checks.',
  Alternators: 'Charging system issues, battery light, weak electrical power, and alternator concerns.',
  'Tune-ups': 'Routine service support to help the vehicle run cleaner, smoother, and more reliably.'
};

const stateNotes = {
  DE: ['Delaware', 'Mobile mechanic service available. Call or build a request to confirm timing and travel fee.'],
  PA: ['Pennsylvania', 'Mobile service available in Pennsylvania. Distance-based travel fee may apply.'],
  MD: ['Maryland', 'Mobile service available in Maryland. Call first to confirm distance, availability, and job type.'],
  NJ: ['New Jersey', 'Mobile service available in New Jersey. Travel fee depends on distance and repair type.']
};

// Cross-platform SMS link
function smsLink(body) {
  return 'sms:' + PHONE + '?&body=' + encodeURIComponent(body);
}

// ---- Mobile menu (shared header) ----
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.site-nav a').forEach(a =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// ---- Service detail modal ----
const dialog = document.getElementById('serviceDialog');
document.querySelectorAll('.service-card').forEach(card =>
  card.addEventListener('click', () => {
    const name = card.dataset.service;
    const title = document.getElementById('dialogTitle');
    const text = document.getElementById('dialogText');
    if (title) title.textContent = name;
    if (text) text.textContent = services[name] || '';
    if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
    else alert(name + ': ' + (services[name] || ''));
  })
);
const dialogClose = document.querySelector('.dialog-close');
if (dialogClose && dialog) dialogClose.addEventListener('click', () => dialog.close());

// ---- State coverage selector ----
document.querySelectorAll('.state-btn').forEach(btn =>
  btn.addEventListener('click', () => {
    document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const note = stateNotes[btn.dataset.state];
    const box = document.querySelector('.state-note');
    if (note && box) box.innerHTML = '<strong>' + note[0] + '</strong><p>' + note[1] + '</p>';
  })
);

// ---- FAQ accordions ----
document.querySelectorAll('.faq-q').forEach(q =>
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    if (answer) answer.classList.toggle('open');
  })
);

// ---- Booking / request builder ----
const requestForm = document.getElementById('requestForm');
if (requestForm) {
  requestForm.addEventListener('submit', e => {
    e.preventDefault();
    const val = id => (document.getElementById(id) ? document.getElementById(id).value.trim() : '');
    const name = val('name') || '[your name]';
    const issue = val('issue');
    const state = val('state');
    const day = val('day') || '[preferred day]';
    const time = val('time');
    const vehicle = val('vehicle') || '[vehicle details]';
    const problem = val('problem') || '[describe issue]';
    const msg =
      'Hi Ishaq FixIt, I would like to book mobile mechanic service.\n\n' +
      'Name: ' + name + '\n' +
      'Issue: ' + issue + '\n' +
      'State: ' + state + '\n' +
      'Preferred day: ' + day + '\n' +
      'Preferred time: ' + time + '\n' +
      'Vehicle: ' + vehicle + '\n' +
      'Problem: ' + problem + '\n\n' +
      'Can you confirm availability and any travel fee?';
    const preview = document.getElementById('messagePreview');
    if (preview) preview.textContent = msg;
    const sms = document.getElementById('smsLink');
    if (sms) {
      sms.href = smsLink(msg);
      sms.classList.remove('disabled');
      sms.setAttribute('aria-disabled', 'false');
    }
  });
}

// ---- Parts order builder (parts.html) ----
const partsForm = document.getElementById('partsForm');
if (partsForm) {
  partsForm.addEventListener('submit', e => {
    e.preventDefault();
    const val = id => (document.getElementById(id) ? document.getElementById(id).value.trim() : '');
    const name = val('pName') || '[your name]';
    const vehicle = val('pVehicle') || '[year, make, model]';
    const vin = val('pVin');
    const part = val('pPart') || '[part needed]';
    const condition = val('pCondition');
    const install = val('pInstall');
    const notes = val('pNotes');
    let msg =
      'Hi Ishaq FixIt, I would like to place a parts order.\n\n' +
      'Name: ' + name + '\n' +
      'Vehicle: ' + vehicle + '\n' +
      (vin ? 'VIN: ' + vin + '\n' : '') +
      'Part needed: ' + part + '\n' +
      'Preference: ' + condition + '\n' +
      'Install? ' + install + '\n' +
      (notes ? 'Notes: ' + notes + '\n' : '') +
      '\nCan you confirm the price and availability so I can order?';
    const preview = document.getElementById('partsPreview');
    if (preview) preview.textContent = msg;
    const sms = document.getElementById('partsSmsLink');
    if (sms) {
      sms.href = smsLink(msg);
      sms.classList.remove('disabled');
      sms.setAttribute('aria-disabled', 'false');
    }
  });
}

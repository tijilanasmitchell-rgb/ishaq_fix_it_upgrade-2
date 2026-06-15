const services={
  Brakes:'Brake pad, rotor, and stopping-noise service inquiries. Call to confirm exact vehicle needs and availability.',
  Batteries:'Battery testing, replacement support, no-start checks, and charging issue triage.',
  Diagnostics:'Check-engine light, no-start, warning lights, and issue tracing before repair.',
  Starters:'Starter-related no-start symptoms, clicking, and ignition response checks.',
  Alternators:'Charging system issues, battery light, weak electrical power, and alternator concerns.',
  'Tune-ups':'Routine service support to help the vehicle run cleaner, smoother, and more reliably.'
};
const stateNotes={
  DE:['Delaware','Mobile mechanic service available. Call or build a request to confirm timing and travel fee.'],
  PA:['Pennsylvania','Mobile service available in Pennsylvania. Distance-based travel fee may apply.'],
  MD:['Maryland','Mobile service available in Maryland. Call first to confirm distance, availability, and job type.'],
  NJ:['New Jersey','Mobile service available in New Jersey. Travel fee depends on distance and repair type.']
};
const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.site-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));
const dialog=document.getElementById('serviceDialog');
document.querySelectorAll('.service-card').forEach(card=>card.addEventListener('click',()=>{const name=card.dataset.service;document.getElementById('dialogTitle').textContent=name;document.getElementById('dialogText').textContent=services[name];if(typeof dialog.showModal==='function')dialog.showModal();else alert(`${name}: ${services[name]}`);}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
document.querySelectorAll('.state-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.state-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const [title,text]=stateNotes[btn.dataset.state];document.querySelector('.state-note').innerHTML=`<strong>${title}</strong><p>${text}</p>`;}));
document.querySelectorAll('.faq-q').forEach(q=>q.addEventListener('click',()=>{const answer=q.nextElementSibling;answer.classList.toggle('open');}));
const requestForm=document.getElementById('requestForm');
requestForm.addEventListener('submit',e=>{e.preventDefault();const issue=document.getElementById('issue').value;const state=document.getElementById('state').value;const vehicle=document.getElementById('vehicle').value.trim()||'[vehicle details]';const problem=document.getElementById('problem').value.trim()||'[describe issue]';const msg=`Hi Ishaq FixIt, I need mobile mechanic service.\n\nIssue: ${issue}\nState: ${state}\nVehicle: ${vehicle}\nProblem: ${problem}\n\nCan you let me know availability and any travel fee?`;document.getElementById('messagePreview').textContent=msg;const sms=document.getElementById('smsLink');sms.href=`sms:+13024498103?&body=${encodeURIComponent(msg)}`;sms.classList.remove('disabled');sms.setAttribute('aria-disabled','false');});

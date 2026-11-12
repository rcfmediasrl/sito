(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
document.documentElement.classList.add('js');
const toggle=$('.menu-toggle'),nav=$('.nav'),header=$('.header');
const setMenu=o=>{nav.classList.toggle('open',o);toggle.setAttribute('aria-expanded',String(o));toggle.setAttribute('aria-label',o?'Chiudi il menu':'Apri il menu');document.body.classList.toggle('menu-open',o)};
toggle.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));
$$('a',nav).forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
addEventListener('resize',()=>{if(innerWidth>900)setMenu(false)});
$('#year').textContent=new Date().getFullYear();

// header + barra di avanzamento + parallax
const bar=$('.progress'),hero=$('.hero-image'),photo=$('.feature-photo');let tick=false;
const onScroll=()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
 header.classList.toggle('scrolled',y>30);bar.style.transform=`scaleX(${h>0?y/h:0})`;
 if(!matchMedia('(prefers-reduced-motion:reduce)').matches){if(y<innerHeight*1.2)hero.style.transform=`translate3d(0,${y*.18}px,0) scale(1.08)`;
  const r=photo.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)photo.style.backgroundPositionY=`calc(47% + ${(r.top/innerHeight)*-40}px)`}
 tick=false};
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();

// reveal allo scroll
const targets=$$('.section-label,.intro h2,.intro-copy>*,.services-head>*,.service-card,.feature-copy>*,.value,.statement .container>*,.contact-grid>div>*,.contact-details>div');
targets.forEach((el,i)=>{el.classList.add('rv');el.style.setProperty('--d',(i%4)*90+'ms')});
if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});targets.forEach(t=>io.observe(t))}else targets.forEach(t=>t.classList.add('in'));

// modulo contatti: invio reale a contact.php, con fallback mailto
const form=$('#contact-form'),status=$('#form-status'),btn=$('button[type=submit]',form),label=btn.firstChild;
$('#ts').value=Date.now();
const say=(ok,html)=>{status.className='form-status '+(ok?'ok':'err');status.innerHTML=html;status.hidden=false;status.scrollIntoView({block:'nearest',behavior:'smooth'})};
form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;
 const f=form.elements,fallback=`mailto:direzione@infogeneralsolutions.it?subject=${encodeURIComponent('Richiesta dal sito - '+f.service.value)}&body=${encodeURIComponent(`Nome: ${f.name.value}\nEmail: ${f.email.value}\n\n${f.message.value}`)}`;
 btn.disabled=true;btn.classList.add('loading');label.textContent='Invio in corso… ';status.hidden=true;
 try{const r=await fetch('contact.php',{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});const j=await r.json();
  if(j.ok){say(true,'<strong>✓ '+j.message+'</strong>');form.reset();$('#ts').value=Date.now()}else say(false,j.message)}
 catch(_){say(false,`Non siamo riusciti a inviare il modulo. <a href="${fallback}">Scrivici dal tuo programma di posta</a> oppure chiamaci.`)}
 btn.disabled=false;btn.classList.remove('loading');label.textContent='Invia richiesta '});
})();

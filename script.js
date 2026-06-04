/* Birthday Celebration — script.js */

/* ===== THEME ===== */
let isDark = true;
function toggleTheme() {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.querySelector('.theme-btn').textContent = isDark ? '🌙' : '☀️';
}

/* ===== STARS ===== */
function createStars() {
  const container = document.getElementById('starsContainer');
  for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      --d:${2+Math.random()*4}s;
      --delay:${Math.random()*5}s;
      width:${1+Math.random()*2}px;
      height:${1+Math.random()*2}px;
    `;
    container.appendChild(star);
  }
}

/* ===== BALLOONS ===== */
const balloonColors = [
  'linear-gradient(135deg,#ff6eb4,#ff2d87)',
  'linear-gradient(135deg,#c084fc,#9333ea)',
  'linear-gradient(135deg,#fbbf24,#f59e0b)',
  'linear-gradient(135deg,#fb7185,#e11d48)',
  'linear-gradient(135deg,#a78bfa,#7c3aed)',
];
function createBalloons() {
  const container = document.getElementById('balloonsContainer');
  for (let i = 0; i < 14; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    const dur = 8 + Math.random() * 10;
    const drift = (Math.random() - 0.5) * 100;
    const tilt = (Math.random() - 0.5) * 20;
    balloon.style.cssText = `
      left:${Math.random()*100}%;
      --drift:${drift}px;
      --tilt:${tilt}deg;
      animation-duration:${dur}s;
      animation-delay:${Math.random()*8}s;
    `;
    balloon.innerHTML = `
      <div class="balloon-body" style="background:${balloonColors[i%balloonColors.length]}"></div>
      <div class="balloon-string"></div>
    `;
    container.appendChild(balloon);
  }
}

/* ===== PARTICLES ===== */
const pCanvas = document.getElementById('particles-canvas');
const pCtx = pCanvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  pCanvas.width = window.innerWidth;
  pCanvas.height = window.innerHeight;
}
function createParticle() {
  return {
    x: Math.random() * pCanvas.width,
    y: Math.random() * pCanvas.height,
    vx: (Math.random()-0.5)*0.3,
    vy: (Math.random()-0.5)*0.3,
    r: 1+Math.random()*2,
    alpha: Math.random()*0.4+0.1,
    color: ['#ff6eb4','#c084fc','#fbbf24','#ff8fab'][Math.floor(Math.random()*4)]
  };
}
function initParticles() {
  particles = Array.from({length:80},createParticle);
}
function animateParticles() {
  pCtx.clearRect(0,0,pCanvas.width,pCanvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>pCanvas.width) p.vx *= -1;
    if(p.y<0||p.y>pCanvas.height) p.vy *= -1;
    pCtx.beginPath();
    pCtx.arc(p.x,p.y,p.r,0,Math.PI*2);
    pCtx.fillStyle = p.color + Math.round(p.alpha*255).toString(16).padStart(2,'0');
    pCtx.fill();
  });
  requestAnimationFrame(animateParticles);
}

/* ===== CONFETTI ===== */
const cCanvas = document.getElementById('confetti-canvas');
const cCtx = cCanvas.getContext('2d');
let confetti = [];
let confettiActive = false;
function resizeConfetti() {
  cCanvas.width = window.innerWidth;
  cCanvas.height = window.innerHeight;
}
function burstConfetti(x,y,count=80) {
  confettiActive = true;
  const colors = ['#ff6eb4','#c084fc','#fbbf24','#ff8fab','#f0f','#0ff','#fff'];
  for(let i=0;i<count;i++) {
    const angle = Math.random()*Math.PI*2;
    const speed = 3+Math.random()*8;
    confetti.push({
      x: x||Math.random()*cCanvas.width,
      y: y||Math.random()*cCanvas.height/3,
      vx: Math.cos(angle)*speed,
      vy: Math.sin(angle)*speed - 4,
      alpha:1, color:colors[Math.floor(Math.random()*colors.length)],
      w:6+Math.random()*6, h:3+Math.random()*3,
      rot:Math.random()*Math.PI*2, rotV:(Math.random()-0.5)*0.3
    });
  }
}
function animateConfetti() {
  cCtx.clearRect(0,0,cCanvas.width,cCanvas.height);
  confetti = confetti.filter(c => c.alpha>0.01);
  confetti.forEach(c => {
    c.vy += 0.18; c.vx *= 0.99;
    c.x += c.vx; c.y += c.vy;
    c.rot += c.rotV; c.alpha -= 0.008;
    cCtx.save();
    cCtx.translate(c.x,c.y);
    cCtx.rotate(c.rot);
    cCtx.globalAlpha = c.alpha;
    cCtx.fillStyle = c.color;
    cCtx.fillRect(-c.w/2,-c.h/2,c.w,c.h);
    cCtx.restore();
  });
  requestAnimationFrame(animateConfetti);
}

/* ===== FIREWORKS ===== */
const fCanvas = document.getElementById('fireworks-canvas');
const fCtx = fCanvas.getContext('2d');
let fireworks = [], fActive = false;
function resizeFireworks() {
  fCanvas.width = window.innerWidth;
  fCanvas.height = window.innerHeight;
}
function launchFirework() {
  if(!fActive) return;
  const x = Math.random()*fCanvas.width;
  const y = Math.random()*fCanvas.height*0.5+50;
  const colors = ['#ff6eb4','#c084fc','#fbbf24','#ff2d87','#fff','#f0f','#0ef'];
  const color = colors[Math.floor(Math.random()*colors.length)];
  const particles = [];
  for(let i=0;i<60;i++){
    const angle=Math.random()*Math.PI*2, speed=2+Math.random()*6;
    particles.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,alpha:1,color,r:2+Math.random()*2});
  }
  fireworks.push(particles);
}
function animateFireworks() {
  fCtx.clearRect(0,0,fCanvas.width,fCanvas.height);
  fireworks.forEach((fw,fi) => {
    fw.forEach(p => {
      p.vx *= 0.97; p.vy *= 0.97; p.vy += 0.05;
      p.x += p.vx; p.y += p.vy; p.alpha -= 0.015;
      fCtx.beginPath();
      fCtx.arc(p.x,p.y,p.r,0,Math.PI*2);
      fCtx.fillStyle = p.color + Math.round(p.alpha*255).toString(16).padStart(2,'0');
      fCtx.fill();
    });
    fw = fw.filter(p=>p.alpha>0.01);
    fireworks[fi] = fw;
  });
  fireworks = fireworks.filter(fw=>fw.length>0);
  requestAnimationFrame(animateFireworks);
}
function startFireworks(duration=4000) {
  fActive = true;
  fCanvas.classList.add('active');
  const iv = setInterval(launchFirework, 180);
  setTimeout(()=>{
    fActive=false;
    clearInterval(iv);
    setTimeout(()=>fCanvas.classList.remove('active'),2000);
  },duration);
}

/* ===== CAKE & CANDLES ===== */
let candlesBlown = false;
function buildCandles() {
  const row = document.getElementById('candlesRow');
  row.innerHTML = '';
  const count = 7;
  for(let i=0;i<count;i++){
    row.innerHTML += `<div class="candle" id="candle${i}">
      <div class="flame" id="flame${i}"></div>
      <div class="candle-body"></div>
    </div>`;
  }
}
function blowCandles() {
  if(candlesBlown) return;
  candlesBlown = true;
  const btn = document.getElementById('blowBtn');
  btn.disabled = true;
  btn.style.opacity = '0.5';

  // Extinguish candles one by one
  for(let i=0;i<7;i++){
    setTimeout(()=>{
      const flame = document.getElementById('flame'+i);
      if(flame){
        flame.style.opacity='0';
        flame.style.transition='opacity 0.3s';
        // Add smoke
        const candle = document.getElementById('candle'+i);
        const smoke = document.createElement('div');
        smoke.className='smoke-puff';
        candle.appendChild(smoke);
        setTimeout(()=>smoke.remove(),2000);
      }
    },i*200);
  }

  setTimeout(()=>{
    document.getElementById('wishMsg').classList.add('visible');
    // Burst confetti
    for(let i=0;i<6;i++){
      setTimeout(()=>{
        burstConfetti(Math.random()*cCanvas.width, Math.random()*300, 50);
      },i*200);
    }
    startFireworks(5000);
    playBirthdaySong();
    // Reveal Cut Cake button
    setTimeout(()=>{
      document.getElementById('cutBtn').classList.add('visible');
    }, 1400);
  },1600);
}

/* ===== CAKE CUTTING ===== */
/* ===== CAKE CUTTING WITH GIRL ANIMATION ===== */
function openCutScene() {
  document.getElementById('cakeCutScene').classList.add('active');
  resetCutScene();
  setTimeout(runCutAnimation, 400);
}
function closeCutScene() {
  document.getElementById('cakeCutScene').classList.remove('active');
  resetCutScene();
}

function resetCutScene() {
  const stage  = document.getElementById('cutStage');
  const line   = document.getElementById('cutLine');
  const slice  = document.getElementById('cakeSlice');
  const face   = document.getElementById('cakeFace');
  const msg    = document.getElementById('cutRevealMsg');
  const knife  = document.getElementById('cutKnife');
  const bubble = document.getElementById('girlBubble');
  const body   = document.getElementById('girlBody');
  const armL   = document.getElementById('armLeft');
  const armR   = document.getElementById('armRight');
  const girl   = document.getElementById('girlWrap');

  stage.querySelectorAll('.crumb').forEach(c => c.remove());

  // reset line & slice
  line.style.cssText  = 'transition:none;height:0px;';
  slice.style.cssText = 'animation:none;opacity:0;';
  face.style.opacity  = '0';
  msg.classList.remove('show');
  bubble.classList.remove('show');
  bubble.textContent = 'Let me cut this! 🔪';

  // reset girl
  body.className = 'girl-body-group';
  armL.className = 'girl-arm-wrap left-arm';
  armR.className = 'girl-arm-wrap right-arm';
  girl.style.transition = 'none';
  girl.style.transform  = 'translateX(0)';

  // park knife off-screen
  knife.style.transition = 'none';
  positionKnifeAtHand(knife, girl, 'hidden');
}

/* Place knife relative to girl's right hand */
function positionKnifeAtHand(knife, girl, state) {
  const stageRect = document.getElementById('cutStage').getBoundingClientRect();
  const girlRect  = girl.getBoundingClientRect();

  if (state === 'hidden') {
    knife.style.left    = (girlRect.right - stageRect.left - 18) + 'px';
    knife.style.top     = (girlRect.top - stageRect.top - 160) + 'px';
    knife.style.transform = 'rotate(-35deg)';
    return;
  }
  if (state === 'raised') {
    knife.style.left      = (girlRect.right - stageRect.left - 22) + 'px';
    knife.style.top       = (girlRect.top - stageRect.top + 60) + 'px';
    knife.style.transform = 'rotate(-30deg)';
    return;
  }
  if (state === 'plunged') {
    const cakeWrap  = document.getElementById('cutCakeWrap');
    const cakeRect  = cakeWrap.getBoundingClientRect();
    knife.style.left      = (cakeRect.left - stageRect.left + cakeRect.width/2 - 18) + 'px';
    knife.style.top       = (cakeRect.top  - stageRect.top - 10) + 'px';
    knife.style.transform = 'rotate(-5deg)';
    return;
  }
  if (state === 'up') {
    const cakeWrap = document.getElementById('cutCakeWrap');
    const cakeRect = cakeWrap.getBoundingClientRect();
    knife.style.left      = (cakeRect.left - stageRect.left + cakeRect.width/2 - 18) + 'px';
    knife.style.top       = (cakeRect.top  - stageRect.top - 130) + 'px';
    knife.style.transform = 'rotate(-5deg)';
    return;
  }
}

function runCutAnimation() {
  const stage  = document.getElementById('cutStage');
  const knife  = document.getElementById('cutKnife');
  const line   = document.getElementById('cutLine');
  const slice  = document.getElementById('cakeSlice');
  const face   = document.getElementById('cakeFace');
  const msg    = document.getElementById('cutRevealMsg');
  const bubble = document.getElementById('girlBubble');
  const body   = document.getElementById('girlBody');
  const armL   = document.getElementById('armLeft');
  const armR   = document.getElementById('armRight');
  const girl   = document.getElementById('girlWrap');

  // ── 0ms: Show speech bubble ──
  bubble.textContent = 'Let me cut this! 🔪';
  bubble.classList.add('show');

  // ── 700ms: Girl steps toward cake ──
  setTimeout(() => {
    girl.style.transition = 'transform 0.55s cubic-bezier(0.34,1.1,0.64,1)';
    girl.style.transform  = 'translateX(30px)';
  }, 700);

  // ── 1100ms: Arms raise up (both) ──
  setTimeout(() => {
    bubble.textContent = 'Here we go! ✨';
    armL.className = 'girl-arm-wrap left-arm raising';
    armR.className = 'girl-arm-wrap right-arm raising';
    // Knife appears in raised position
    knife.style.position  = 'absolute';
    knife.style.transition= 'none';
    positionKnifeAtHand(knife, girl, 'raised');
  }, 1100);

  // ── 1500ms: Plunge! Arms + knife slam down ──
  setTimeout(() => {
    bubble.classList.remove('show');
    armL.className = 'girl-arm-wrap left-arm plunging';
    armR.className = 'girl-arm-wrap right-arm plunging';
    knife.style.transition = 'top 0.22s ease-in, left 0.22s ease-in, transform 0.22s ease-in';
    positionKnifeAtHand(knife, girl, 'plunged');
  }, 1500);

  // ── 1720ms: Cut line grows ──
  setTimeout(() => {
    line.style.transition = 'height 0.22s ease-in';
    line.style.height = '170px';
  }, 1720);

  // ── 1940ms: Crumbs + slice falls ──
  setTimeout(() => {
    spawnCrumbs(stage);
    slice.style.opacity   = '1';
    slice.style.animation = 'sliceFall 0.9s cubic-bezier(0.4,0,1,1) forwards';
  }, 1940);

  // ── 1970ms: Inner layers revealed ──
  setTimeout(() => {
    face.style.transition = 'opacity 0.35s';
    face.style.opacity    = '1';
  }, 1970);

  // ── 2100ms: Knife lifts back up ──
  setTimeout(() => {
    knife.style.transition = 'top 0.4s cubic-bezier(0.16,1,0.3,1), left 0.4s, transform 0.4s';
    positionKnifeAtHand(knife, girl, 'up');
  }, 2100);

  // ── 2400ms: Girl celebrates — arms up, bounce ──
  setTimeout(() => {
    knife.style.opacity = '0';
    knife.style.transition = 'opacity 0.3s';
    armL.className = 'girl-arm-wrap left-arm celebrating';
    armR.className = 'girl-arm-wrap right-arm celebrating';
    body.className = 'girl-body-group done';
    bubble.textContent = '🎉 Yay! Enjoy!';
    bubble.classList.add('show');
    girl.style.transition = 'transform 0.3s ease-in-out';
    girl.style.transform  = 'translateX(20px)';
  }, 2400);

  // ── 2600ms: Reveal message + celebration ──
  setTimeout(() => {
    msg.classList.add('show');
    burstConfetti(null, null, 80);
    startFireworks(3500);
  }, 2600);
}

function spawnCrumbs(stage) {
  const colors = ['#ff8fab','#c084fc','#fbbf24','#fff','#e91e8c','#9333ea','#f59e0b'];
  const cakeWrap  = document.getElementById('cutCakeWrap');
  const stageRect = stage.getBoundingClientRect();
  const cakeRect  = cakeWrap.getBoundingClientRect();
  const cx = cakeRect.left - stageRect.left + cakeRect.width / 2;
  const cy = cakeRect.top  - stageRect.top  + 20;
  for (let i = 0; i < 36; i++) {
    const crumb = document.createElement('div');
    crumb.className = 'crumb';
    const size = 4 + Math.random() * 7;
    const side = Math.random() > 0.45 ? 1 : -1;
    const dx   = side * (15 + Math.random() * 90);
    const dy   = -(8  + Math.random() * 75);
    crumb.style.cssText = `
      left:${cx - size/2}px;top:${cy}px;
      width:${size}px;height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      --cx:${dx}px;--cy:${dy}px;
      --cr:${Math.random()*360}deg;
      --cd:${0.45+Math.random()*0.55}s;
      animation-delay:${Math.random()*0.07}s;
    `;
    stage.appendChild(crumb);
    setTimeout(() => crumb.remove && crumb.remove(), 1500);
  }
}

/* ===== GALLERY ===== */
const galleryItems = [
  {emoji:'🌸',caption:'A day full of blossoms'},
  {emoji:'🎀',caption:'The most beautiful bow'},
  {emoji:'👑',caption:'Born to be a queen'},
  {emoji:'🌟',caption:'Shining like a star'},
  {emoji:'🦋',caption:'Spreading your wings'},
  {emoji:'🌈',caption:'Colorful as a rainbow'},
  {emoji:'💎',caption:'Rare and precious'},
  {emoji:'🌺',caption:'Blooming beautifully'},
  {emoji:'✨',caption:'Pure magic and sparkle'},
];
function buildGallery() {
  const grid = document.getElementById('galleryGrid');
  galleryItems.forEach((item,i)=>{
    const el = document.createElement('div');
    el.className='gallery-item reveal';
    el.style.transitionDelay=`${i*0.07}s`;
    el.innerHTML=`
      <div class="gallery-img-wrap">${item.emoji}</div>
      <div class="gallery-overlay">
        <span class="gallery-caption">${item.caption}</span>
      </div>
    `;
    el.onclick=()=>openLightbox(item.emoji,item.caption);
    grid.appendChild(el);
  });
}
function openLightbox(emoji,caption){
  document.getElementById('lbEmoji').textContent=emoji;
  document.getElementById('lbCaption').textContent=caption;
  document.getElementById('lightbox').classList.add('active');
}
function closeLightbox(){ document.getElementById('lightbox').classList.remove('active'); }

/* ===== TIMELINE ===== */
const timelineData = [
  {year:'Year 1',emoji:'👶',title:'The Beginning',desc:'The most precious gift arrived — a beautiful baby girl who changed everything.',right:false},
  {year:'Year 3',emoji:'🎠',title:'First Steps & Wonder',desc:'Every day was a new adventure, every laugh a melody.',right:true},
  {year:'Year 7',emoji:'🎨',title:'Little Artist',desc:'Painting rainbows, singing songs, dreaming big dreams.',right:false},
  {year:'Year 13',emoji:'📚',title:'The Scholar',desc:'Knowledge blossomed, friendships flourished, a star was rising.',right:true},
  {year:'Year 16',emoji:'🦋',title:'Finding Wings',desc:'Growing into the most wonderful version of yourself.',right:false},
  {year:'Today 🎂',emoji:'🌟',title:'The Magnificent You',desc:'Brilliant, radiant, unstoppable — the world is yours, Princess!',right:true},
];
function buildTimeline(){
  const el=document.getElementById('timelineEl');
  timelineData.forEach((item,i)=>{
    const div=document.createElement('div');
    div.className=`timeline-item${item.right?' right':''} reveal`;
    div.style.transitionDelay=`${i*0.1}s`;
    div.innerHTML=`
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-emoji">${item.emoji}</div>
        <div class="timeline-year">${item.year}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-desc">${item.desc}</div>
      </div>
    `;
    el.appendChild(div);
  });
}

/* ===== WISHES ===== */
let wishes = JSON.parse(localStorage.getItem('bdWishes')||'[]');
const defaultWishes = [
{name:'koko 💕',text:'Wishing you a day as magical as you are! You deserve all the happiness in the world!',reactions:{'💖':8,'😍':3,'🎉':5},time:'Just now'},
  {name:'koko 🌸',text:'Happy Birthday gorgeous! You are one in a million. May your dreams always come true!',reactions:{'💖':12,'✨':6,'🎂':4},time:'2 mins ago'},
  {name:'koko 🌸',text:'Happy Birthday gorgeous! You are one in a million. May your dreams always come true!',reactions:{'💖':12,'✨':6,'🎂':4},time:'2 mins ago'},
  {name:'koko 🌸',text:'Happy Birthday gorgeous! You are one in a million. May your dreams always come true!',reactions:{'💖':12,'✨':6,'🎂':4},time:'2 mins ago'},
  {name:'koko  🌸',text:'Happy Birthday gorgeous! You are one in a million. May your dreams always come true!',reactions:{'💖':12,'✨':6,'🎂':4},time:'2 mins ago'},
  {name:'koko 🌸',text:'Happy Birthday gorgeous! You are one in a million. May your dreams always come true!',reactions:{'💖':12,'✨':6,'🎂':4},time:'2 mins ago'},
  {name:'koko 🌸',text:'Happy Birthday gorgeous! You are one in a million. May your dreams always come true!',reactions:{'💖':12,'✨':6,'🎂':4},time:'2 mins ago'},
  {name:'koko 🌸',text:'Happy Birthday gorgeous! You are one in a million. May your dreams always come true!',reactions:{'💖':12,'✨':6,'🎂':4},time:'2 mins ago'},
];
function buildWishes(){
  const grid=document.getElementById('wishesGrid');
  grid.innerHTML='';
  const all=[...defaultWishes,...wishes].reverse();
  all.forEach(w=>{
    const card=document.createElement('div');
    card.className='wish-card';
    card.innerHTML=`
      <div class="wish-name">${escHtml(w.name)}</div>
      <div class="wish-text">${escHtml(w.text)}</div>
      <div class="wish-reactions">
        ${Object.entries(w.reactions||{}).map(([e,c])=>`<button class="reaction-btn" onclick="react(this,event)">${e} ${c}</button>`).join('')}
      </div>
      <div class="wish-time">${w.time}</div>
    `;
    grid.appendChild(card);
  });
}
function addWish(){
  const name=document.getElementById('wishName').value.trim();
  const text=document.getElementById('wishText').value.trim();
  if(!name||!text){alert('Please fill in your name and wish! 💕');return;}
  wishes.push({name,text,reactions:{'💖':0,'🎉':0,'✨':0},time:'Just now'});
  localStorage.setItem('bdWishes',JSON.stringify(wishes));
  document.getElementById('wishName').value='';
  document.getElementById('wishText').value='';
  buildWishes();
  burstConfetti(null,null,30);
}
function react(btn){
  const parts=btn.textContent.split(' ');
  const emoji=parts[0], count=parseInt(parts[1]||0);
  btn.textContent=`${emoji} ${count+1}`;
  btn.style.transform='scale(1.3)';
  setTimeout(()=>btn.style.transform='',200);
}
function clearWishes() {
  const password = prompt("Enter Admin Password:");

  if (password === "krishna") {
    wishes = [];
    localStorage.removeItem('bdWishes');
    buildWishes();
    alert("All wishes cleared successfully! 💕");
  } else if (password !== null) {
    alert("Wrong Password! ❌");
  }
}

/* ===== GUEST BOOK ===== */
let guests = JSON.parse(localStorage.getItem('bdGuests')||'[]');
function buildGuestBook(){
  const grid=document.getElementById('guestGrid');
  grid.innerHTML='';
  guests.slice().reverse().forEach(g=>{
    const card=document.createElement('div');
    card.className='wish-card';
    card.innerHTML=`
      <div class="wish-name">${escHtml(g.name)} ${g.location?'• '+escHtml(g.location):''}</div>
      <div class="wish-text">${escHtml(g.msg)}</div>
      <div class="wish-time">${g.time}</div>
    `;
    grid.appendChild(card);
  });
}
function addGuestEntry(){
  const name=document.getElementById('guestName').value.trim();
  const loc=document.getElementById('guestLocation').value.trim();
  const msg=document.getElementById('guestMsg').value.trim();
  if(!name||!msg){alert('Please enter your name and message! 💕');return;}
  guests.push({name,location:loc,msg,time:new Date().toLocaleDateString('en',{month:'short',day:'numeric',year:'numeric'})});
  localStorage.setItem('bdGuests',JSON.stringify(guests));
  document.getElementById('guestName').value='';
  document.getElementById('guestLocation').value='';
  document.getElementById('guestMsg').value='';
  buildGuestBook();
}
function escHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function resetGuestBook() {
  const password = prompt("Enter Admin Password:");
  
  if (password === "admin123") {
    guests = [];
    localStorage.removeItem('bdGuests');
    buildGuestBook();
    alert('Guest Book Reset Successfully!');
  } else {
    alert('Wrong Password!');
  }
}

/* ===== GIFT ===== */
let giftOpened=false;
function openGift(){
  if(giftOpened) return;
  giftOpened=true;
  document.getElementById('giftBoxWrap').classList.add('opened');
  setTimeout(()=>{
    document.getElementById('giftMsg').classList.add('visible');
    startFireworks(3000);
    burstConfetti(null,null,60);
  },600);
}

/* ===== MUSIC (Web Audio API Generated Melody) ===== */
let audioCtx, gainNode, isPlaying=false, currentNote=0, noteTimer=null;
let songProgress=0, songDuration=30, progressInterval=null;

// Happy Birthday melody
const notes = [
  {f:261.6,d:0.4},{f:261.6,d:0.2},{f:293.7,d:0.6},{f:261.6,d:0.6},{f:349.2,d:0.6},{f:329.6,d:1.2},
  {f:261.6,d:0.4},{f:261.6,d:0.2},{f:293.7,d:0.6},{f:261.6,d:0.6},{f:392.0,d:0.6},{f:349.2,d:1.2},
  {f:261.6,d:0.4},{f:261.6,d:0.2},{f:523.3,d:0.6},{f:440.0,d:0.6},{f:349.2,d:0.6},{f:329.6,d:0.6},{f:293.7,d:0.6},
  {f:466.2,d:0.4},{f:466.2,d:0.2},{f:440.0,d:0.6},{f:349.2,d:0.6},{f:392.0,d:0.6},{f:349.2,d:1.5},
];

function initAudio(){
  if(audioCtx) return;
  audioCtx = new(window.AudioContext||window.webkitAudioContext)();
  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.5;
  gainNode.connect(audioCtx.destination);
}
function playNote(freq,dur,when){
  const osc = audioCtx.createOscillator();
  const env = audioCtx.createGain();
  osc.connect(env); env.connect(gainNode);
  osc.type='sine';
  osc.frequency.setValueAtTime(freq,when);
  env.gain.setValueAtTime(0,when);
  env.gain.linearRampToValueAtTime(0.6,when+0.02);
  env.gain.setValueAtTime(0.6,when+dur-0.05);
  env.gain.linearRampToValueAtTime(0,when+dur);
  osc.start(when); osc.stop(when+dur+0.05);
}
function playSong(){
  initAudio();
  if(audioCtx.state==='suspended') audioCtx.resume();
  let when=audioCtx.currentTime+0.05;
  notes.forEach(n=>{
    playNote(n.f,n.d*0.9,when);
    when+=n.d;
  });
  songDuration=when-audioCtx.currentTime;
  document.getElementById('durTime').textContent=fmtTime(songDuration);
}
function playBirthdaySong(){ if(!isPlaying){ togglePlay(); } }
function togglePlay(){
  initAudio();
  isPlaying=!isPlaying;
  document.getElementById('playBtn').textContent=isPlaying?'⏸':'▶';
  document.getElementById('albumArt').classList.toggle('playing',isPlaying);
  if(isPlaying){
    playSong();
    songProgress=0;
    clearInterval(progressInterval);
    progressInterval=setInterval(()=>{
      songProgress+=0.1;
      const pct=Math.min(100,songProgress/songDuration*100);
      document.getElementById('progressFill').style.width=pct+'%';
      document.getElementById('curTime').textContent=fmtTime(songProgress);
      if(songProgress>=songDuration){ clearInterval(progressInterval); isPlaying=false; document.getElementById('playBtn').textContent='▶'; document.getElementById('albumArt').classList.remove('playing'); }
    },100);
  } else {
    clearInterval(progressInterval);
    if(audioCtx) audioCtx.suspend();
  }
}
function seekAudio(e){
  const bar=document.getElementById('progressBar');
  const rect=bar.getBoundingClientRect();
  const pct=(e.clientX-rect.left)/rect.width;
  songProgress=pct*songDuration;
  document.getElementById('progressFill').style.width=(pct*100)+'%';
}
function skipAudio(s){ songProgress=Math.max(0,Math.min(songDuration,songProgress+s)); }
function setVolume(v){ if(gainNode) gainNode.gain.value=v/100; }
function fmtTime(s){ const m=Math.floor(s/60),sec=Math.floor(s%60); return `${m}:${sec.toString().padStart(2,'0')}`; }

/* ===== BALLOON GAME ===== */
let bScore=0, bBest=parseInt(localStorage.getItem('bdBBest')||'0'), bRunning=false, bTimer=null, bBalloonTimer=null, bTimeLeft=30;
const balloonEmojis=['🎈','🎀','🌸','⭐','💖','🌟','✨','🎊'];
document.getElementById('bBest').textContent=bBest;

function startBalloonGame(){
  if(bRunning) return;
  bRunning=true; bScore=0; bTimeLeft=30;
  document.getElementById('bScore').textContent=0;
  document.getElementById('bTime').textContent=30;
  document.getElementById('gameArena').innerHTML='';
  bTimer=setInterval(()=>{
    bTimeLeft--;
    document.getElementById('bTime').textContent=bTimeLeft;
    if(bTimeLeft<=0){
      clearInterval(bTimer); clearInterval(bBalloonTimer);
      bRunning=false;
      if(bScore>bBest){ bBest=bScore; localStorage.setItem('bdBBest',bBest); }
      document.getElementById('bBest').textContent=bBest;
      document.getElementById('gameArena').innerHTML=`<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px">
        <div style="font-size:3rem">🎉</div>
        <div style="font-family:Playfair Display,serif;font-size:1.8rem;color:var(--gold)">Score: ${bScore}</div>
        <div style="color:var(--text-muted);font-style:italic">Well played, Princess!</div>
      </div>`;
    }
  },1000);
  bBalloonTimer=setInterval(spawnBalloon,700);
}
function spawnBalloon(){
  if(!bRunning) return;
  const arena=document.getElementById('gameArena');
  const b=document.createElement('div');
  b.className='game-balloon';
  const dur=3+Math.random()*3;
  b.style.cssText=`left:${5+Math.random()*85}%;animation-duration:${dur}s;`;
  b.textContent=balloonEmojis[Math.floor(Math.random()*balloonEmojis.length)];
  b.onclick=(e)=>{
    e.stopPropagation();
    if(!bRunning) return;
    bScore++; document.getElementById('bScore').textContent=bScore;
    const pop=document.createElement('div');
    pop.className='pop-effect';
    pop.style.cssText=`left:${parseInt(b.style.left)};bottom:${b.style.bottom||'20%'};`;
    pop.textContent='💥';
    arena.appendChild(pop);
    setTimeout(()=>pop.remove(),400);
    b.remove();
    burstConfetti(e.clientX,e.clientY,8);
  };
  arena.appendChild(b);
  setTimeout(()=>b.remove&&b.remove(),dur*1000+200);
}
function resetBalloonGame(){
  clearInterval(bTimer); clearInterval(bBalloonTimer);
  bRunning=false; bScore=0; bTimeLeft=30;
  document.getElementById('bScore').textContent=0;
  document.getElementById('bTime').textContent=30;
  document.getElementById('gameArena').innerHTML='';
}

/* ===== MEMORY GAME ===== */
const memEmojis=['🌸','💖','🌟','✨','🎀','👑','🦋','🌺'];
let memCards=[], memFlipped=[], memMoves=0, memMatched=0, memBest=localStorage.getItem('bdMBest');
if(memBest) document.getElementById('mBest').textContent=memBest;

function initMemoryGame(){
  memFlipped=[]; memMoves=0; memMatched=0;
  document.getElementById('mMoves').textContent=0;
  document.getElementById('mMatched').textContent=0;
  const deck=[...memEmojis,...memEmojis].sort(()=>Math.random()-0.5);
  const grid=document.getElementById('memoryGrid');
  grid.innerHTML='';
  memCards=[];
  deck.forEach((emoji,i)=>{
    const card=document.createElement('div');
    card.className='mem-card';
    card.dataset.emoji=emoji;
    card.dataset.index=i;
    card.innerHTML=`<div class="mem-card-inner">
      <div class="mem-front">✦</div>
      <div class="mem-back">${emoji}</div>
    </div>`;
    card.onclick=()=>flipCard(card);
    grid.appendChild(card);
    memCards.push(card);
  });
}
function flipCard(card){
  if(card.classList.contains('flipped')||card.classList.contains('matched')) return;
  if(memFlipped.length>=2) return;
  card.classList.add('flipped');
  memFlipped.push(card);
  if(memFlipped.length===2){
    memMoves++;
    document.getElementById('mMoves').textContent=memMoves;
    const [a,b]=memFlipped;
    if(a.dataset.emoji===b.dataset.emoji){
      a.classList.add('matched'); b.classList.add('matched');
      memMatched++;
      document.getElementById('mMatched').textContent=memMatched;
      memFlipped=[];
      burstConfetti(null,null,15);
      if(memMatched===memEmojis.length){
        if(!memBest||memMoves<parseInt(memBest)){
          memBest=memMoves;
          localStorage.setItem('bdMBest',memBest);
          document.getElementById('mBest').textContent=memBest;
        }
        setTimeout(()=>{alert(`🎉 Congratulations! You matched all pairs in ${memMoves} moves!`);},300);
      }
    } else {
      setTimeout(()=>{
        a.classList.remove('flipped');
        b.classList.remove('flipped');
        memFlipped=[];
      },900);
    }
  }
}

/* ===== GAME TABS ===== */
function switchGame(game){
  document.querySelectorAll('.game-tab').forEach((t,i)=>t.classList.toggle('active',['balloon','memory'][i]===game));
  document.getElementById('balloonGameEl').classList.toggle('active',game==='balloon');
  document.getElementById('memoryGameEl').classList.toggle('active',game==='memory');
  if(game==='memory') initMemoryGame();
}

/* ===== COUNTDOWN ===== */
let countdownTarget=null, countdownInterval=null;
function updateCountdown(){
  const val=document.getElementById('bdayDate').value;
  if(!val) return;
  countdownTarget=new Date(val).getTime();
  if(countdownInterval) clearInterval(countdownInterval);
  countdownInterval=setInterval(tickCountdown,1000);
  tickCountdown();
}
function tickCountdown(){
  if(!countdownTarget) return;
  const diff=countdownTarget-Date.now();
  if(diff<=0){
    document.getElementById('cdDays').textContent='00';
    document.getElementById('cdHours').textContent='00';
    document.getElementById('cdMins').textContent='00';
    document.getElementById('cdSecs').textContent='🎂';
    return;
  }
  document.getElementById('cdDays').textContent=String(Math.floor(diff/86400000)).padStart(2,'0');
  document.getElementById('cdHours').textContent=String(Math.floor(diff%86400000/3600000)).padStart(2,'0');
  document.getElementById('cdMins').textContent=String(Math.floor(diff%3600000/60000)).padStart(2,'0');
  document.getElementById('cdSecs').textContent=String(Math.floor(diff%60000/1000)).padStart(2,'0');
}

/* ===== FOOTER HEARTS ===== */
function createFooterHearts(){
  const container=document.getElementById('footerHearts');
  const hearts=['💖','💗','💕','💝','❤️','💓'];
  for(let i=0;i<10;i++){
    const h=document.createElement('div');
    h.className='float-heart';
    h.style.cssText=`left:${Math.random()*100}%;font-size:${1+Math.random()*1.5}rem;animation-duration:${3+Math.random()*4}s;animation-delay:${Math.random()*5}s;`;
    h.textContent=hearts[Math.floor(Math.random()*hearts.length)];
    container.appendChild(h);
  }
}

/* ===== SCROLL REVEAL ===== */
const revealObserver=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
    }
  });
},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});

function initReveal(){
  document.querySelectorAll('.reveal,.timeline-item').forEach(el=>revealObserver.observe(el));
}

/* ===== SHARE ===== */
function sharePage(){
  if(navigator.share){
    navigator.share({title:'Happy Birthday Princess!',url:window.location.href});
  } else {
    navigator.clipboard.writeText(window.location.href).then(()=>alert('Link copied! Share the celebration! 🎉'));
  }
}

/* ===== INIT ===== */
window.addEventListener('resize',()=>{
  resizeCanvas(); resizeConfetti(); resizeFireworks();
});

document.getElementById('footerYear').textContent=new Date('2027-06-05T00:00:00').getFullYear();

resizeCanvas(); resizeConfetti(); resizeFireworks();
createStars(); createBalloons();
initParticles(); animateParticles();
animateConfetti(); animateFireworks();
buildCandles(); buildGallery(); buildTimeline();
buildWishes(); buildGuestBook(); createFooterHearts();
initMemoryGame();

setTimeout(initReveal, 100);

// Set default countdown to next birthday (1 year from now)
const nextBday = new Date('2027-06-05T00:00:00');
nextBday.setFullYear(nextBday.getFullYear()+1);
nextBday.setMonth(0,1); nextBday.setHours(0,0,0,0);
document.getElementById('bdayDate').value = '2027-06-05T00:00:00';
updateCountdown();

// Initial confetti burst
setTimeout(()=>{
  for(let i=0;i<3;i++){
    setTimeout(()=>burstConfetti(null,null,40),i*300);
  }
},800);

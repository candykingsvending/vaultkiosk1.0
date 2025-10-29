// === Products ===
const products = [
  { id:1, name:'Crusader Sword', category:'Swords', price:2400, desc:'Epic sword description', image:'images/sword1.jpg' },
  { id:2, name:'Golden Picture', category:'Pictures', price:1200, desc:'Beautiful framed art', image:'images/pic1.jpg' },
  { id:3, name:'Rare Collectible', category:'Other', price:500, desc:'One of a kind collectible', image:'images/other1.jpg' }
];

// === Show Browse Page ===
function showBrowse() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('browse').style.display = 'block';
  renderProducts('All');
}

// === Render Products ===
function renderProducts(category) {
  const grid = document.getElementById('productGrid');
  if(!grid) return;
  grid.innerHTML='';
  const filtered = products.filter(p => category==='All' || p.category===category);
  if(filtered.length === 0){
    grid.innerHTML = '<p>No products available</p>';
    return;
  }
  filtered.forEach(p=>{
    const card = document.createElement('div');
    card.className='product-card';
    card.innerHTML=`<p>${p.category}</p><h3>${p.name}</h3>`;
    card.onclick = ()=> {
      localStorage.setItem('currentProduct', JSON.stringify(p));
      window.location = 'product.html'; // product page (later)
    };
    grid.appendChild(card);
  });
}

// === Category Filter ===
function filterCategory(cat){ renderProducts(cat); }

// === Go Home ===
function goHome(){
  document.getElementById('browse').style.display='none';
  document.getElementById('home').style.display='block';
}

// === Idle Reset Feature ===
let idleTime = 0;
const countdownTime = 30;
let countdownInterval;

setInterval(() => {
  idleTime++;
  if (idleTime === 60) startCountdown();
}, 1000);

function resetIdle() {
  idleTime = 0;
  if(countdownInterval){
    clearInterval(countdownInterval);
    const el=document.getElementById('countdown');
    if(el) el.style.display='none';
  }
}

document.addEventListener('click', resetIdle);
document.addEventListener('touchstart', resetIdle);
document.addEventListener('keydown', resetIdle);

function startCountdown(){
  let timeLeft = countdownTime;
  const countdownEl = document.getElementById('countdown');
  if(!countdownEl) return;
  countdownEl.style.display='block';
  countdownEl.innerText=`Resetting to Home in ${timeLeft} seconds`;
  countdownInterval = setInterval(()=>{
    timeLeft--;
    countdownEl.innerText=`Resetting to Home in ${timeLeft} seconds`;
    if(timeLeft<=0){
      clearInterval(countdownInterval);
      window.location.href='index.html';
    }
  },1000);
}

// === Hook Enter Button ===
document.getElementById('enterBtn').addEventListener('click', showBrowse);

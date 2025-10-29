// === Product Data ===
const products = [
  { id:1, name:'Crusader Sword', category:'Swords', price:2400, desc:'Epic sword description', image:'images/sword1.jpg' },
  { id:2, name:'Golden Picture', category:'Pictures', price:1200, desc:'Beautiful framed art', image:'images/pic1.jpg' },
  { id:3, name:'Rare Collectible', category:'Other', price:500, desc:'One of a kind collectible', image:'images/other1.jpg' }
];

// === Browse Page ===
function showBrowse() {
  document.getElementById('home').style.display='none';
  document.getElementById('browse').style.display='block';
  renderProducts('All');
}

function renderProducts(category) {
  const grid = document.getElementById('productGrid');
  if(!grid) return;
  grid.innerHTML='';
  products.filter(p=>category==='All'||p.category===category).forEach(p=>{
    const card = document.createElement('div');
    card.className='product-card';
    card.innerHTML=`<p>${p.category}</p><h3>${p.name}</h3>`;
    card.onclick=()=>{ localStorage.setItem('currentProduct', JSON.stringify(p)); window.location='product.html'; };
    grid.appendChild(card);
  });
}

function filterCategory(cat){ renderProducts(cat); }
function goHome(){ window.location='index.html'; }
function goCheckout(){ window.location='checkout.html'; }

// === Product Page ===
function loadProduct(){
  const p = JSON.parse(localStorage.getItem('currentProduct'));
  if(!p) return;
  document.getElementById('productImage').src=p.image;
  document.getElementById('productTitle').innerText=p.name;
  document.getElementById('productCategory').innerText=p.category;
  document.getElementById('productDesc').innerText=p.desc;
  document.getElementById('productPrice').innerText='$'+p.price;
}

function addToCart(){
  const p = JSON.parse(localStorage.getItem('currentProduct'));
  if(!p) return;
  let cart = JSON.parse(localStorage.getItem('cart'))||[];
  cart.push(p);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart');
}

// === Cart Page ===
function loadCart(){
  let cart = JSON.parse(localStorage.getItem('cart'))||[];
  const container=document.getElementById('cartItems');
  if(!container) return;
  container.innerHTML='';
  let total=0;
  cart.forEach((item,i)=>{
    total+=item.price;
    container.innerHTML+=`<p>${item.name} - $${item.price}</p>`;
  });
  document.getElementById('cartTotal').innerText=total;
}

// === Checkout Page ===
function loadCheckout(){
  let cart = JSON.parse(localStorage.getItem('cart'))||[];
  let total = cart.reduce((sum,item)=>sum+item.price,0);
  document.getElementById('checkoutTotal').innerText=total;

  document.getElementById('checkoutForm').addEventListener('submit',function(e){
    e.preventDefault();
    alert('Order placed! You can now connect Stripe here.');
    document.getElementById('successMessage').style.display='block';
    localStorage.removeItem('cart');
  });
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
  idleTime=0;
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
  const

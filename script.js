// PARTICLE BACKGROUND
const canvas=document.getElementById('particleCanvas');
const ctx=canvas.getContext('2d');
let particles=[];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;}
resize();window.onresize=resize;
for(let i=0;i<60;i++){particles.push({
  x:Math.random()*canvas.width,y:Math.random()*canvas.height,
  r:Math.random()*2,speed:0.3+Math.random()*0.5,dir:Math.random()*360
});}
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='rgba(0,255,179,0.7)';
  particles.forEach(p=>{
    p.x+=Math.cos(p.dir)*p.speed;
    p.y+=Math.sin(p.dir)*p.speed;
    if(p.x<0)p.x=canvas.width;if(p.x>canvas.width)p.x=0;
    if(p.y<0)p.y=canvas.height;if(p.y>canvas.height)p.y=0;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();

// LOADING
const aiSound=document.getElementById('aiSound');
setTimeout(()=>{
  document.getElementById('scan-screen').classList.remove('active');
  document.getElementById('dashboard').classList.remove('hidden');
  aiSound.play();
},3000);

// POPUP & LOGIC
const popup=document.getElementById('tokenPopup');
const popupTitle=document.getElementById('popupTitle');
const popupAmount=document.getElementById('popupAmount');
const popupInner=document.getElementById('popupInner');
const successPopup=document.getElementById('successPopup');
const successMsg=document.getElementById('successMessage');
const ping=document.getElementById('pingSound');
const successSound=document.getElementById('successSound');

document.querySelectorAll('.token').forEach(t=>{
  t.onclick=()=>{
    popup.classList.add('active');
    popupTitle.textContent=t.dataset.token;
    popupAmount.textContent=`Balance: ${t.querySelector('p').innerText}`;
    ping.play();
  };
});
document.querySelector('.closePopup').onclick=()=>popup.classList.remove('active');

document.getElementById('receiveAction').onclick=()=>{
  popupInner.innerHTML=`
    <div class='qr'></div>
    <p>Address: So1aNa12345Dummy</p>
    <p>Network: SOLANA</p>`;
};
document.getElementById('sendAction').onclick=()=>{
  popupInner.innerHTML=`
    <input type='number' placeholder='Amount' />
    <input type='text' placeholder='Recipient Address' />
    <button id='confirmSend' class='glow'>Send</button>`;
  document.getElementById('confirmSend').onclick=()=>simulateFlow('Sending transaction…','Funds delivered securely.');
};
document.getElementById('swapAction').onclick=()=>{
  popupInner.innerHTML=`
    <input type='number' placeholder='Amount to swap' />
    <input type='text' placeholder='Target Token' />
    <button id='confirmSwap' class='glow'>Swap</button>`;
  document.getElementById('confirmSwap').onclick=()=>simulateFlow('Swapping assets…','Swap complete, balance updated.');
};

function simulateFlow(progress,done){
  aiSound.play();
  popup.classList.remove('active');
  let step=0;
  const text=["Initializing T-GEN","Analyzing Behavior","Routing RPC","Executing","Finalizing"];
  const interval=setInterval(()=>{
    if(step<text.length){console.log(text[step]);step++;}
    else{clearInterval(interval);showSuccess(done);}
  },700);
}
function showSuccess(msg){
  successMsg.textContent=msg;
  successPopup.classList.add('active');
  successSound.play();
  setTimeout(()=>successPopup.classList.remove('active'),3000);
}

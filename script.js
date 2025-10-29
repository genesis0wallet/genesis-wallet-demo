function createBubbles(containerId, count=25){
  const container=document.getElementById(containerId);
  for(let i=0;i<count;i++){
    const b=document.createElement('div');
    b.classList.add('bubble');
    b.style.left=Math.random()*100+'%';
    b.style.animationDuration=3+Math.random()*4+'s';
    b.style.animationDelay=Math.random()*2+'s';
    b.style.width=b.style.height=4+Math.random()*6+'px';
    container.appendChild(b);
  }
}
createBubbles('bubbleLoad');

const aiSound=document.getElementById('aiSound');
setTimeout(()=>{
  document.getElementById('scan-screen').classList.remove('active');
  aiSound.play();
},3000);

const tokens=document.querySelectorAll('.token');
const popup=document.getElementById('tokenPopup');
const popupTitle=document.getElementById('popupTitle');
const popupAmount=document.getElementById('popupAmount');
const popupInner=document.getElementById('popupInner');
const ping=document.getElementById('pingSound');
const successSound=document.getElementById('successSound');
const successPopup=document.getElementById('successPopup');
const successMessage=document.getElementById('successMessage');

tokens.forEach(t=>{
  t.addEventListener('click',()=>{
    const token=t.dataset.token;
    popupTitle.textContent=token;
    popupAmount.textContent=`Balance: ${t.querySelector('p').innerText}`;
    popup.classList.add('active');
    ping.play();
  });
});
document.querySelector('.closePopup').onclick=()=>popup.classList.remove('active');

document.getElementById('receiveAction').onclick=()=>{
  popupInner.innerHTML=`
    <div class="qr"></div>
    <p>Address: So1aNa12345DummYAddre55xX</p>
    <p>Network: <b>SOLANA</b></p>`;
};
document.getElementById('sendAction').onclick=()=>{
  popupInner.innerHTML=`
    <input type="number" placeholder="Amount" />
    <input type="text" placeholder="Recipient Address" />
    <button id="confirmSend" class="glow">Send</button>`;
  document.getElementById('confirmSend').onclick=()=>simulateFlow('Sending Transaction via','Send Complete: Funds delivered securely.');
};
document.getElementById('swapAction').onclick=()=>{
  popupInner.innerHTML=`
    <input type="number" placeholder="Amount to Swap" />
    <input type="text" placeholder="Target Token (e.g., USDC)" />
    <button id="confirmSwap" class="glow">Swap</button>`;
  document.getElementById('confirmSwap').onclick=()=>simulateFlow('Swapping Assets via','Swap Complete: New balance updated.');
};

const aiFlow=document.getElementById('aiFlow');
const nodes=document.querySelectorAll('.node');
const flowText=document.getElementById('flowText');

function simulateFlow(action,successMsg){
  aiSound.play();
  aiFlow.classList.add('active');
  flowText.textContent='Initializing Secure Path...';
  let i=0;
  const steps=['User Node','Wallet Interface','Genesis Engine','T-Gen AI Layer','Solana Network'];
  const interval=setInterval(()=>{
    if(i<nodes.length){
      nodes[i].classList.add('active');
      flowText.textContent=`${action} ${steps[i]}...`;
      i++;
    }else{
      clearInterval(interval);
      setTimeout(()=>{
        aiFlow.classList.remove('active');
        nodes.forEach(n=>n.classList.remove('active'));
        showSuccess(successMsg);
      },1500);
    }
  },600);
}

function showSuccess(msg){
  successMessage.textContent=msg;
  successPopup.classList.add('active');
  successSound.play();
  setTimeout(()=>successPopup.classList.remove('active'),3000);
}

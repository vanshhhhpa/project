async function fetchGigs() {
  const res = await fetch('/api/gigs');
  const gigs = await res.json();
  const container = document.getElementById('gigs');
  // render with fade-in stagger
  container.innerHTML = gigs.map((g,i) => `
    <div class="card gig fade-in-up stagger" style="animation-delay:${i*60}ms">
      <img src="${g.image || 'https://picsum.photos/400/300?random=' + Math.floor(Math.random()*1000)}" alt="${g.title}">
      <div class="meta">
        <h4>${g.title}</h4>
        <p style="color:var(--muted)">${g.description.substring(0,100)}${g.description.length>100?'...':''}</p>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
          <strong>$${g.price}</strong>
          <button class="btn hire" data-id="${g._id}">Hire Now</button>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.hire').forEach(b => b.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = '/login.html';
    // small click animation
    e.target.classList.add('hire-animate');
    setTimeout(()=>e.target.classList.remove('hire-animate'),150);
    const res = await fetch('/api/stripe/create-checkout-session', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ gigId: id }) });
    const data = await res.json();
    if (data.url) window.location.href = data.url; else alert(data.message||'Could not start checkout');
  }));
}

document.addEventListener('DOMContentLoaded', ()=>{
  // show skeleton placeholders while loading
  const container = document.getElementById('gigs');
  if (container) {
    container.innerHTML = Array.from({length:8}).map(()=>`<div class="card skeleton"><img/><div style="padding:12px"><div class="s-line" style="width:70%"></div><div class="s-line" style="width:100%"></div><div class="s-line" style="width:45%"></div></div></div>`).join('');
  }
  fetchGigs();
  const search = document.getElementById('search');
  if (search) search.addEventListener('input', (e)=>{
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.card.gig').forEach(card=>{
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  });
});

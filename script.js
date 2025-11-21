document.addEventListener('DOMContentLoaded', function(){
  (function themeInit(){
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('sch_theme');
    if(saved === 'light') root.classList.add('light');
    function flip(){ root.classList.toggle('light'); const mode = root.classList.contains('light') ? 'light' : 'dark'; localStorage.setItem('sch_theme', mode); toggle.animate([{transform:'scale(.92)'},{transform:'scale(1)'}],{duration:140}); }
    toggle.addEventListener('click', flip);
    toggle.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }});
  })();
  (function timelineInit(){
    const cards = Array.from(document.querySelectorAll('.card'));
    const io = new IntersectionObserver((entries)=>{ entries.forEach(entry=>{ if(entry.isIntersecting){ const card = entry.target; card.classList.add('in-view'); const beh = card.dataset.behavior; if(beh === 'parallax' && !card.__parallax){ attachParallax(card); card.__parallax = true; } if(beh === 'type' && !card.__typed){ startTypeEffect(card.querySelector('.type-text')); card.__typed = true; } } }); },{threshold:0.18});
    cards.forEach(c=>io.observe(c));
  })();
  function attachParallax(el){ el.addEventListener('mousemove', (e)=>{ const rect = el.getBoundingClientRect(); const cx = rect.left + rect.width/2; const cy = rect.top + rect.height/2; const dx = (e.clientX - cx) / rect.width; const dy = (e.clientY - cy) / rect.height; const tiltX = dy * 8; const tiltY = dx * -12; el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`; el.style.boxShadow = '0 30px 60px rgba(0,0,0,0.45)'; }); el.addEventListener('mouseleave', () => { el.style.transform = ''; el.style.boxShadow = ''; }); }
  function startTypeEffect(node){ if(!node) return; const full = node.dataset.full || node.textContent; node.textContent = ''; let i = 0; (function loop(){ if(i <= full.length){ node.textContent = full.slice(0, i); i++; setTimeout(loop, 18 + Math.random()*30); } })(); }
  (function shareButtons(){ const shareBtns = document.querySelectorAll('.share-btn'); shareBtns.forEach(b=>{ b.addEventListener('click', function(){ const platform = this.dataset.platform; const url = encodeURIComponent(location.href); const text = encodeURIComponent('Check Scholarstica — premium portfolio & featured piece'); if(platform === 'whatsapp'){ const shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`; window.open(shareUrl,'_blank'); } else if(platform === 'facebook'){ const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`; window.open(shareUrl,'_blank','noopener'); } else if(platform === 'x'){ const shareUrl = `https://x.com/intent/tweet?text=${text}&url=${url}`; window.open(shareUrl,'_blank','noopener'); } else if(platform === 'copy'){ navigator.clipboard && navigator.clipboard.writeText(location.href).then(()=>{ alert('Link copied to clipboard'); }).catch(()=>{ prompt('Copy this link', location.href); }); } }); }); })();
  Array.from(document.querySelectorAll('.card')).forEach(c => { c.setAttribute('tabindex','0'); });
});

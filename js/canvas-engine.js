/* ============================================
   GLADE — Narrative Canvas Engine
   Constellation lines, mouse force field,
   depth-layered particles
   ============================================ */
(function() {
  const CFG = {
    count: 300, minR: 1, maxR: 3.5, drift: 0.15, twinkle: 0.002,
    connDist: 110, mouseR: 160, mouseF: 0.06,
    colors: ['rgba(111,191,74,0.4)', 'rgba(184,207,201,0.15)', 'rgba(61,107,94,0.25)']
  };

  const canvas = document.getElementById('atmosCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [], mouseX = -999, mouseY = -999;

  if (window.GladeStore) window.GladeStore.subscribe(s => { mouseX = s.mouseX; mouseY = s.mouseY; });

  function resize() {
    const d = devicePixelRatio || 1;
    canvas.width = innerWidth * d; canvas.height = innerHeight * d;
    canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px';
    ctx.scale(d, d);
  }

  function create() {
    particles = [];
    for (let i = 0; i < CFG.count; i++) {
      const depth = Math.random();
      particles.push({
        x: Math.random() * innerWidth, y: Math.random() * innerHeight,
        r: CFG.minR + depth * (CFG.maxR - CFG.minR),
        color: CFG.colors[Math.floor(Math.random() * CFG.colors.length)],
        baseOp: 0.15 + depth * 0.45, depth,
        dx: (Math.random() - 0.5) * CFG.drift * (0.3 + depth * 0.7),
        dy: (Math.random() - 0.5) * CFG.drift * (0.3 + depth * 0.7),
        ts: CFG.twinkle * (0.5 + Math.random()), tp: Math.random() * Math.PI * 2,
        wa: 0.15 + Math.random() * 0.4, wf: 0.001 + Math.random() * 0.002,
        vx: 0, vy: 0, sd: Math.random() * 600, tt: 0, sp: Math.random() * Math.PI * 2, st: false
      });
    }
  }

  const TARGETS = {
    tornado: '.tangled-visual', diamond: '#clarity-target',
    anatomy: ['#col-rag .anatomy-icon', '#col-langgraph .anatomy-icon', '#col-genai .anatomy-icon'],
    ecosystems: ['.eco-card[data-card="0"] .eco-watermark', '.eco-card[data-card="1"] .eco-watermark', '.eco-card[data-card="2"] .eco-watermark'],
    river: '#process', contact: '#contact-target'
  };

  let mode = 'ambient';
  if (window.GladeStore) window.GladeStore.subscribe(s => { mode = s.activeMode; });

  function shapeCoord(gi, cx, cy, type) {
    if (type === 'rag') {
      const li = Math.floor(gi / 28), di = gi % 28, w = 40, h = 15, yo = li * 12 - 30, t = di / 28;
      if (t < 0.25) return { x: cx-w/2+(t*4)*w, y: cy+yo-h/2+(t*4)*h };
      if (t < 0.5) return { x: cx+w/2-((t-0.25)*4)*w, y: cy+yo+h/2+((t-0.25)*4)*h };
      if (t < 0.75) return { x: cx-w/2-((t-0.5)*4)*w, y: cy+yo+3*h/2-((t-0.5)*4)*h };
      return { x: cx-3*w/2+((t-0.75)*4)*w, y: cy+yo+h/2-((t-0.75)*4)*h };
    }
    if (type === 'langgraph') {
      const ni = Math.floor(gi/20), a = (ni/7)*Math.PI*2, r = ni===0?0:35+(ni%2)*15;
      const nx = cx+Math.cos(a)*r, ny = cy+Math.sin(a)*r;
      const na = (gi%20)/20*Math.PI*2, nr = (gi%20)/20*8;
      return { x: nx+Math.cos(na)*nr, y: ny+Math.sin(na)*nr };
    }
    if (type === 'genai') {
      const a = (gi/140)*Math.PI*2*3, r = (gi/140)*35, s = gi%2===0?1:-1;
      return { x: cx+s*(Math.abs(Math.cos(a)*r)+10), y: cy-10+Math.sin(a)*r };
    }
    if (type === 'law') {
      if (gi<40) return{x:cx,y:cy-50+(gi/40)*100};
      if (gi<80) return{x:cx-40+((gi-40)/40)*80,y:cy-20};
      if (gi<110){const t=(gi-80)/30*Math.PI;return{x:cx-40+Math.cos(t)*15,y:cy+10+Math.sin(t)*15};}
      const t=(gi-110)/30*Math.PI;return{x:cx+40+Math.cos(t)*15,y:cy+10+Math.sin(t)*15};
    }
    if (type === 'realestate') {
      const b=Math.floor(gi/35),p=gi%35,bx=cx-50+b*33;
      if(p<15)return{x:bx,y:cy+40-(p/15)*(b*10+20)};
      if(p<25)return{x:bx+((p-15)/10)*20,y:cy+40-(b*10+20)};
      return{x:bx+20,y:cy+40-(b*10+20)+((p-25)/10)*(b*10+20)};
    }
    if (type === 'enterprise') {
      const row=Math.floor(Math.sqrt(gi)),tr=Math.floor(Math.sqrt(140)),col=gi-row*row;
      return{x:cx-(row/tr)*40+(col/(2*row+1||1))*(row/tr)*80,y:cy-30+(row/tr)*70};
    }
    return { x: cx, y: cy };
  }

  function getTarget(i, m, rects) {
    const n = CFG.count;
    if (m === 'tornado' && rects) {
      const cx=rects.left+rects.width/2,cy=rects.top+rects.height/2;
      const a=(i/n)*Math.PI*2*10,r=(i/n)*200;
      return{x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r+(i%50)*2-50};
    }
    if (m === 'diamond' && rects) {
      const cx=rects.left+rects.width/2,cy=rects.top+rects.height/2,pe=n/4,e=Math.floor(i/pe),t=(i%pe)/pe,sz=150;
      const c=[{x:cx,y:cy-sz},{x:cx+sz*0.8,y:cy},{x:cx,y:cy+sz},{x:cx-sz*0.8,y:cy}];
      const s=c[e],en=c[(e+1)%4];
      return{x:s.x+(en.x-s.x)*t,y:s.y+(en.y-s.y)*t};
    }
    if ((m==='anatomy'||m==='ecosystems') && rects) {
      const gs=Math.floor(n/3),ci=Math.floor(i/gs),gi=i%gs,r=rects[ci];
      if(!r)return null;
      const shapes=m==='anatomy'?['rag','langgraph','genai']:['law','realestate','enterprise'];
      return shapeCoord(gi,r.left+r.width/2,r.top+r.height/2,shapes[ci]);
    }
    if (m==='river'&&rects) return{x:(i/n)*innerWidth,y:rects.top+rects.height/2+Math.sin((i/n)*innerWidth*0.01)*80+(Math.random()-0.5)*40};
    if (m==='contact'&&rects) {
      const pm=2*(rects.width+rects.height),d=(i/n)*pm;
      if(d<rects.width)return{x:rects.left+d,y:rects.top};
      if(d<rects.width+rects.height)return{x:rects.right,y:rects.top+(d-rects.width)};
      if(d<2*rects.width+rects.height)return{x:rects.right-(d-rects.width-rects.height),y:rects.bottom};
      return{x:rects.left,y:rects.bottom-(d-2*rects.width-rects.height)};
    }
    return null;
  }

  function getRects(m) {
    if (m==='anatomy') return TARGETS.anatomy.map(s=>document.querySelector(s)?.getBoundingClientRect());
    if (m==='ecosystems') return TARGETS.ecosystems.map(s=>document.querySelector(s)?.getBoundingClientRect());
    const el=document.querySelector(TARGETS[m]); return el?el.getBoundingClientRect():null;
  }

  function drawConnections() {
    const md2 = CFG.connDist * CFG.connDist;
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i+1; j < Math.min(i+30, particles.length); j++) {
        const b = particles[j];
        const dx=a.x-b.x, dy=a.y-b.y, d2=dx*dx+dy*dy;
        if (d2 < md2) {
          const alpha = (1-Math.sqrt(d2)/CFG.connDist) * 0.07 * Math.min(a.depth,b.depth);
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle = `rgba(61,107,94,${alpha})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    }
  }

  function animate() {
    const w=innerWidth, h=innerHeight; ctx.clearRect(0,0,w,h);
    const now = Date.now(), rects = mode!=='ambient'?getRects(mode):null;
    if (mode==='ambient') drawConnections();

    particles.forEach((p,i) => {
      let tgt = mode!=='ambient'?getTarget(i,mode,rects):null;
      if (tgt) {
        if(!p.st){p.st=true;p.tt=now+p.sd;}
        if(now>p.tt){
          const dx=tgt.x-p.x,dy=tgt.y-p.y,dist=Math.sqrt(dx*dx+dy*dy);
          let sx=0,sy=0;
          if(dist>5&&(mode==='anatomy'||mode==='ecosystems'||mode==='tornado')){
            const a=Math.atan2(dy,dx)+Math.sin(now*0.002+p.sp)*1.5,f=Math.min(dist*0.02,3);
            sx=Math.cos(a)*f;sy=Math.sin(a)*f;
          }
          p.vx=(p.vx+dx*0.035+sx)*0.75;p.vy=(p.vy+dy*0.035+sy)*0.75;p.x+=p.vx;p.y+=p.vy;
        } else { p.x+=p.dx+Math.sin(now*p.wf)*p.wa*0.1;p.y+=p.dy; }
      } else {
        if(p.st){p.st=false;p.vx=(Math.random()-0.5)*5;p.vy=(Math.random()-0.5)*5;}
        const mdx=mouseX-p.x,mdy=mouseY-p.y,md=Math.sqrt(mdx*mdx+mdy*mdy);
        if(md<CFG.mouseR&&md>1){
          const f=CFG.mouseF*(1-md/CFG.mouseR),dir=md<50?-1:0.3;
          p.vx+=(mdx/md)*f*dir;p.vy+=(mdy/md)*f*dir;
        }
        p.vx*=0.96;p.vy*=0.96;p.x+=p.vx;p.y+=p.vy;
        p.x+=p.dx+Math.sin(now*p.wf)*p.wa*0.1;p.y+=p.dy;
        if(p.x<-10)p.x=w+10;if(p.x>w+10)p.x=-10;if(p.y<-10)p.y=h+10;if(p.y>h+10)p.y=-10;
      }
      const tw=Math.sin(now*p.ts+p.tp);
      const op=p.st&&now>p.tt?0.55+tw*0.1:p.baseOp+tw*0.2;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r*(p.st?1.1:1),0,Math.PI*2);
      ctx.shadowBlur=(p.st?10:6)+p.r*p.depth;ctx.shadowColor='#6FBF4A';
      ctx.fillStyle=p.color.replace(/[\d.]+\)$/,Math.max(0,op).toFixed(2)+')');ctx.fill();
    });
    ctx.shadowBlur=0;requestAnimationFrame(animate);
  }

  resize();create();animate();
  window.addEventListener('resize',()=>{resize();create();});
})();

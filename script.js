let mm = gsap.matchMedia();

mm.add("(min-width:700px)",()=>{
  (function smoothScroll(){
    gsap.registerPlugin(ScrollTrigger);
  
  const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true
  });
  
  locoScroll.on("scroll", ScrollTrigger.update);
  
  ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, 
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
  });
  
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
  })(); 
  
  
  // // Initialize Lenis
  // const lenis = new Lenis();
  
  // // Use requestAnimationFrame to continuously update the scroll
  // function raf(time) {
  //   lenis.raf(time);
  //   requestAnimationFrame(raf);
  // }
  
  // requestAnimationFrame(raf);
  
  var timeout;
  
  const circle = document.querySelector(".circle");
  
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let xscale = 1;
  let yscale = 1;
  let xprev = 0;
  let yprev = 0;
  
  function circleChaptaKaro() {
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
  
      const deltaX = Math.abs(mouseX - xprev);
      const deltaY = Math.abs(mouseY - yprev);
  
      // Squeeze based on speed
      xscale = gsap.utils.clamp(0.9, 1.5, deltaX );
      yscale = gsap.utils.clamp(0.9, 1.5, deltaY);
  
      xprev = mouseX;
      yprev = mouseY;
    });
  
    animateCircle();
  }
  
  function animateCircle() {
    // Lerp for smoothness
    currentX += (mouseX - currentX) * 0.2;
    currentY += (mouseY - currentY) * 0.2;
  
    // Smooth scale back to normal
    const scaleX = 1 + (xscale - 1) * 0.2;
    const scaleY = 1 + (yscale - 1) * 0.2;
  
    // Calculate dynamic offset based on current scale
    const offsetX = (11 * scaleX) / 2;
    const offsetY = (11 * scaleY) / 2;
  
    circle.style.transform = `translate(${currentX - offsetX}px, ${currentY - offsetY}px) scale(${scaleX}, ${scaleY})`;
  
    requestAnimationFrame(animateCircle);
  }
  
  circleChaptaKaro();
  
  
  function anim1(){
      
      const target = document.querySelectorAll('.heading h1, .heading h5, .chhotiheadings h5')
      
      target.forEach(element => {
          const wrapper = document.createElement('div');
          wrapper.className = 'wrapper';
          element.parentNode.insertBefore(wrapper,element);
          wrapper.appendChild(element);
      });
  
      var tl = gsap.timeline();
      tl.from('nav',{
          y:-30,
          opacity: 0,
          ease: Expo.easeOut,
          duration: 1
      })
      .to(".heading h1",{
          y:0,
          ease: Expo.easeInOut,
          stagger: .2,
          opacity: .63,
          duration: 2,
          delay: -1.5
      })
      .to(".heading h5",{
          y:0,
          ease: Expo.easeOut,
          opacity: .9,
          delay: -.5
      })
      .to(".chhotiheadings h5",{
          y:0,
          ease: Expo.easeOut,
          stagger: .2,
          opacity: 0.9,
          delay:-.3
      })
      .from('.chhotiheadings1',{
          y:30,
          opacity: 0,
          ease: Expo.easeOut,
          duration: 1,
          delay: -.4
      })
  }
  gsap.from("#works",{
    y:60,
    opacity: 0,
    duration: .7,
    scrollTrigger:{
      scroller:"main",
      trigger:"#works",
      start: "top 50%",
      // markers: true
    }
  })
  gsap.from(".about-me",{
    y:60,
    opacity: 0,
    duration: .7,
    scrollTrigger:{
      scroller:"main",
      trigger:".about-me",
      start: "top 80%",
      // markers: true
    }
  })
  gsap.from("footer",{
    opacity: 0,
    duration: .7,
    scrollTrigger:{
      scroller:"main",
      trigger:"footer",
      start: "top 95%",
      // markers: true
    }
  })
  anim1(); 
  
  function imageHover(){
    var box = document.querySelectorAll('.box');
    
    let diff;
    let xprev = 0;
    let timeout;
  
    box.forEach(function(boxa){
      boxa.addEventListener('mousemove',function(dets){
        clearTimeout(timeout);
  
        diff = dets.clientX-xprev;
  
        gsap.to(boxa.querySelector('.image'),{
          opacity: 1,
          top : dets.clientY-boxa.getBoundingClientRect().top,
          left: dets.clientX-boxa.getBoundingClientRect().left,
          rotate: gsap.utils.clamp(-20,20,diff),
          duration:0.15,
          ease: Power3
        })
  
        xprev = dets.clientX
        timeout = setTimeout(function(){
          gsap.to(boxa.querySelector('.image'),{
            rotate:0,
            duration:0.1
          })
        },100)
      })
  
      boxa.addEventListener('mouseleave',function(dets){
        gsap.to(boxa.querySelector('.image'),{
          opacity: 0,
          duration:0.15,
          ease: Power3
        })
      })
    })
  }
  imageHover();
  
  gsap.to("nav",{
    
  })
})


function clock(){
  const el = document.getElementById('indian-time');
  const fmt = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  function render(){
    el.textContent = fmt.format(new Date());
  }
  render();
  setInterval(render, 1000);
}
clock();


//For some mobile animations 

mm.add("(max-width: 699px",()=>{
  const target = document.querySelectorAll('.heading h1, .heading h5, .chhotiheadings h5, .chhotiheadings1')
let tl = gsap.timeline()

target.forEach((elem)=>{
  gsap.from(elem,{
    opacity:0,
    duration: 2,
    scrub:3
  })
})

gsap.from("#works",{
  y:20,
  opacity: 0,
  scrollTrigger:{
    scroller:"body",
    trigger: "#works",
    start: "top 70%"
  }
})
gsap.from(".about-me .image",{
  y:20,
  opacity: 0,
  scrollTrigger:{
    scroller:"body",
    trigger: ".about-me .image",
    start: "top 70%"
  }
})
gsap.from(".about-me .content",{
  y:20,
  opacity: 0,
  scrollTrigger:{
    scroller:"body",
    trigger: ".about-me .content",
    start: "top 70%"
  }
})


})
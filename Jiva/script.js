window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    // Adjust scroll distance as needed
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

var crcircle = document.getElementById("cursorelement");

var mousep = { x: 0, y: 0 };
var mousepearly = { x: 0, y: 0 };
var circlep = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
  mousep.x = e.x;
  mousep.y = e.y;
});

function tick() {
  circlep.x = mousep.x;
  circlep.y = mousep.y;
  var dx = mousep.x - mousepearly.x;
  var dy = mousep.y - mousepearly.y;

  slope = dy / dx;

  var angle = Math.atan(slope);
  console.log(dx, dy, angle * (180 / Math.PI));

  mousepearly.y = mousep.y;
  mousepearly.x = mousep.x;

  var translate3d = `translate3d(${circlep.x}px, ${circlep.y}px, 0px)`;
  crcircle.style = `transform: ${translate3d}   ;
     `;

  window.requestAnimationFrame(tick);
}
tick();

gsap.to(".main h1", {
  y: 0,
  opacity: 1,
  delay: 0.33,
  duration: 1,
  ease: "power2.out",
});

gsap.from(".main p", {
  y: -50,
  delay: 0.33,
  opacity: 0,
});
gsap.from("#sphere", {
  y: 100,
  delay: 0.4,
});
gsap.to("#sphere", {
  y: -500,
  scale: 1.1,
  scrollTrigger: {
    scrub: true,

    pin: true,
  },
});
gsap.from(".scroll", {
  scale: 0.1,
  opacity: 0.2,
  delay: 0.4,
});
gsap.to(".scroll", {
  opacity: 0.2,
  duration: 3,
  delay: 0.4,
  scrollTrigger: {
    scrub: true,
    trigger: ".scroll",
    scroller: "body",

    start: "top 70%",
    end: "top 30%",
  },
});
gsap.from(".ss1", {
  y: 300,
  scale: 1.3,
  scrollTrigger: {
    scrub: true,
    trigger: ".ss1",
    scroller: "body",

    start: "top 90%",
    end: "top 50%",
  },
});

gsap.from(".ss2", {
  y: 300,
  scale: 1.3,
  scrollTrigger: {
    scrub: true,
    trigger: ".ss2",
    scroller: "body",

    start: "top 90%",
    end: "top 50%",
  },
});
gsap.from(".ss3", {
  y: 300,
  scale: 1.3,
  scrollTrigger: {
    scrub: true,
    trigger: ".ss3",
    scroller: "body",

    start: "top 90%",
    end: "top 50%",
  },
});
gsap.from(".ss4", {
  y: 300,
  scale: 1.3,
  scrollTrigger: {
    scrub: true,
    trigger: ".ss4",
    scroller: "body",

    start: "top 95%",
    end: "top 55%",
  },
});

gsap.from(".ss5", {
  y: 300,
  scale: 1.3,
  scrollTrigger: {
    scrub: true,
    trigger: ".ss5",
    scroller: "body",

    start: "top 95%",
    end: "top 55%",
  },
});

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#sphere",
    scroller: "body",
    scrub: true,

    start: "top 70%",
    end: "top 10%",
  },
});

tl.to("#sphere img", {
  scale: 4,
  duration: 2,
})
  .to("#sphere img", {
    scale: 2,
    duration: 1,
  })
  .from("#sphere span", {
    opacity: 0,
  });

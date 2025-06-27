var crcircle = document.getElementById("cursorelement");

var mousep = { x: 0, y: 0 };
var mousepearly = { x: 0, y: 0 };
var circlep = { x: 0, y: 0 };

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
    start: "top 50%",
    end: "top 10%",
  },
});

tl.to("#sphere img", {
  scale: 6,

  duration: 2,
})
  .to("#sphere img", {
    scale: 3,
    duration: 1,
  })
  .from("#sphere span", {
    opacity: 0,
  });

// gsap.to("backimages", {
//   y: 1000,
//   duration: 4,
//   scrollTrigger: {
//     start: "top 0%",
//     scrub: true,
//     markers: true,
//   },
// });

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const image1 = document.getElementById("scream1");
const image2 = document.getElementById("scream2");
const image3 = document.getElementById("scream3");
let siteheight, sitewidth;

window.addEventListener("load", () => {
  siteheight = document.documentElement.scrollHeight;
  sitewidth = document.documentElement.scrollWidth;

  canvas.height = siteheight;
  canvas.width = sitewidth;
  loadimagesinbackground();
});
function loadimagesinbackground() {
  console.log(image1, image2, image3);
  var image1height = image1.height * (sitewidth / image1.width);
  var image2height = image2.height * (sitewidth / image2.width);
  var image3height = image3.height * (sitewidth / image3.width);
  console.log(image1height, image2height, image3height);
  ctx.drawImage(image1, 0, 0, sitewidth, image1height);

  ctx.drawImage(image2, 0, image1height - 270, sitewidth, image3height);
  ctx.drawImage(image3, 0, siteheight - image2height, sitewidth, image2height);
}

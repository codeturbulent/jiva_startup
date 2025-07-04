function loadscreen() {
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
    onComplete: () => {
      document.get;
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
}

gsap.to("#sphere", {
  y: -400,
  scale: 1.1,
  scrollTrigger: {
    scrub: true,

    pin: true,
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
const viewportWidth = window.innerWidth;
window.addEventListener("load", () => {
  siteheight = document.body.scrollHeight;
  sitewidth = document.body.scrollWidth;

  canvas.height = siteheight;
  canvas.width = viewportWidth;
  loadimagesinbackground();
  document.getElementById("loadercont").style.display = "none";
  document.querySelector("body").style.overflowY = "scroll";
  loadscreen();
});
function loadimagesinbackground() {
  var image1height = image1.height * (viewportWidth / image1.width);
  var image2height = image2.height * (viewportWidth / image2.width);
  var image3height = image3.height * (viewportWidth / image3.width);
  // console.log(
  //   image1height,
  //   image2height,
  //   image3height,
  //   siteheight,
  //   canvas.height
  // );
  ctx.drawImage(image1, 0, 0, sitewidth, image1height);
  // 1885.241245136187 1830.9895833333333 1964.0277777777776 7188
  // 3
  // 3716.23082846952
  // 5547.220411802853
  // 7378.209995136186
  // 1885.241245136187 1830.9895833333333 1964.0277777777776 7188
  // 3
  // 3716.23082846952
  // 5547.220411802853
  // 7378.209995136186
  var ntime2img =
    Math.floor(
      (siteheight - (image1height + image3height)) / (image2height - 270)
    ) + 1;
  // console.log(ntime2img);
  var change = image1height;
  for (let index = 0; index < ntime2img; index++) {
    ctx.drawImage(image2, 0, change - 270, sitewidth, image2height);
    change += image2height - 270;
    // console.log(change);
  }
  ctx.drawImage(image3, 0, siteheight - image3height, sitewidth, image3height);
}

count = 0;
window.addEventListener("scroll", () => {
  if (window.scrollY > 50 && count == 0) {
    document.getElementById("playButton").dataset.playing = "true";
    document.getElementById(
      "playButton"
    ).innerHTML = `<img src="https://img.icons8.com/?size=100&id=61012&format=png&color=000000" alt="" />`;
    document
      .getElementById("myaudio")
      .play()
      .catch((error) => {
        console.warn("Audio blocked. ");
        console.error(error);
      });
    count = 1;
  }
});

function playAudio() {
  var button = document.getElementById("playButton");
  if (button.dataset.playing == "true") {
    button.dataset.playing = "false";
    button.innerHTML = `<img   style="margin-left: 0.2rem" src="https://img.icons8.com/?size=100&id=fjx0LfGCNuZb&format=png&color=000000" alt="" />`;
    document.getElementById("myaudio").pause();
  } else {
    button.dataset.playing = "true";
    button.innerHTML = `<img src="https://img.icons8.com/?size=100&id=61012&format=png&color=000000" alt="" />`;
    document
      .getElementById("myaudio")
      .play()
      .catch((error) => {
        console.warn("Audio blocked. ");
        console.error(error);
      });
  }
}

function setvol(params) {
  var audio = document.getElementById("myaudio");
  audio.volume = params / 100;
  console.log(audio.volume);
}

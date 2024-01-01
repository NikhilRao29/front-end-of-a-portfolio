const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: '-10',
    opacity: 0,
    duration: 1.4,
    ease: Expo.easeInOut
  })

    .to(".boundingelem", {
      y: 0,
      duration: 1.7,
      ease: Expo.easeInOut,
      delay: -1,
      stagger: .3
    })

    .from("#herofooter", {
      y: '-10',
      opacity: 0,
      duration: 1.4,
      delay: -1,
      ease: Expo.easeInOut
    })

}

// jab mouse move ho to hum log skew kar paaye aur maximum skew aur minimum skew set kar paaye, jab mouse ho to tab skew ki value badhe aur jab mouse move hona band ho jaye to vo vapis original value pe aa jaaye.
var timeout;


function circleChaptaKaro() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (details) {

    this.clearTimeout(timeout);


    xscale = gsap.utils.clamp(.8, 1.2, details.clientX - xprev)
    yscale = gsap.utils.clamp(.8, 1.2, details.clientX - yprev)

    xprev = details.clienX
    yprev = details.clienY

    circleMouseFollower(xscale, yscale);
    timeout = setTimeout(function () {
      document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`
    }, 100)
  });
}

circleChaptaKaro();

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (details) {
    document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`
  })
}

circleMouseFollower();
firstPageAnim();

// teeno elements ko selecet karo, uske baad teeno par mouse move lagao, jab mouse move ho to ye pata karo k mouse kaha par hai
// jiska matlab hai ki mouse ki x and y position pata karo,
// ab mouse ki x y position ko k badle us image ko show karo an uss image ko move karo,
// move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotaton bhi tez ho jaaye

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (details) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    })
  })

  elem.addEventListener("mousemove", function (details) {
    var diff = details.clientY - elem.getBoundingClientRect().top;
    diffrot = details.clientX - rotate;
    rotate = details.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot)
    })
  })
})
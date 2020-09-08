$(function(){
  
  barba.init({
    sync: true,

    transitions: [
      {
        async leave(data) {
          const done = this.async();

          pageTransition();
          await delay(1000);
          done();
        },

        async enter(data) {
          contentAnimation();
        },

        async once(data) {
          contentAnimation();
        },
      },
    ],
  });

});

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
      setTimeout(() => {
          done();
      }, n);
  });
}

function pageTransition() {
  var anim = gsap.timeline();
  anim.to('.loading-screen', {
    duration: 1.2,
    width: '100%',
    left: '0%',
    ease: 'Expo.easeInOut'
  });

  anim.to('.loading-screen', {
    duration: 1,
    width: '100%',
    left: '100%',
    ease: 'Expo.easeInOut',
    delay: 0.3
  });
  anim.set(".loading-screen", { left: '-100%'});

}

function contentAnimation() {
  var anim = gsap.timeline();
}
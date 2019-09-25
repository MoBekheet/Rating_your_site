import { Circle } from "progressbar.js";
import { Draggable } from "gsap/Draggable";
import imagesloaded from "imagesloaded";
{
  let isMobile = false;
  // device detection
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
  }
  let body = document.body;
  // calculate the viewport size
  let winSize,
    isVisible = false;
  const calcWinSize = () => winSize = { width: window.innerWidth, height: window.innerHeight };
  // and recalculate on resize
  calcWinSize();
  let noteSite = body.querySelectorAll('.box_noteSite > ul > li');

  class Slide {
    constructor() {
      this.DOM = {
        site_of_the_day: body.querySelector("section#site_of_the_day"),
        close: site_of_the_day.querySelector("#close"),
        items: site_of_the_day.querySelector("#items"),
        followers: site_of_the_day.querySelector(".followers"),
        boxLeft: site_of_the_day.querySelector("#box_left"),
        image: items.querySelectorAll(".item__img"),
        overlay: site_of_the_day.querySelector("a.overlay"),
        caption: site_of_the_day.querySelector("#caption"),
        heading: caption.querySelector("#heading-large"),
        data: caption.querySelector("#data"),
        btnSubmitYourSite: caption.querySelector("#btnSubmitYourSite"),
      };
      this.items = [];
      [...this.DOM.items.querySelectorAll('.item')].forEach(item => this.items.push(item));
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => this.isVisible = entry.intersectionRatio > 0);
      });
      this.items.forEach(item => {
        this.observer.observe(item);
      });
      this.displayItem();
      this.swiper();
      this.showCaption();
      this.noteSiteOpen();
      this.initEvents();
    }
    initEvents() {
      window.addEventListener('resize', () => this.resize());
      if (winSize.width > 992) {
        this.DOM.close.addEventListener("click", _ => {
          this.closeShow()
          isVisible = false
          TweenMax.to(this.DOM.items, 1, {
            x: 0,
            ease: Power1.easeOut
          });
          TweenMax.to(this.DOM.image, 1, {
            left: 0,
            ease: Power1.easeOut
          });
        });
        if (!isMobile) this.DOM.overlay.addEventListener("click", _ => {
          this.openShow();
          TweenMax.to(this.DOM.overlay, 1.4, {
            pointerEvents: "none",
            opacity: 0,
            ease: Power1.easeOut
          });
        });
      }
    }
    resize() {
      calcWinSize()
      if (isVisible == false) this.displayItem();
    }
    displayItem() {
      this.items.forEach(item => {
        TweenMax.to(item, 0, {
          delay: 0,
          y: 0,
          x: winSize.width,
          ease: Expo.easeInOut
        })
      });
      TweenMax.to(this.items[0], 0, {
        delay: 0,
        scale: 1.4,
        y: this.items[0].clientHeight / 5.5,
        x: winSize.width / 1.8,
        ease: Expo.easeInOut
      });
      TweenMax.to(this.items[1], 0, {
        scale: 1.1,
        y: this.items[1].clientHeight / 2.2,
        x: - winSize.width / 3.8,
        ease: Expo.easeInOut
      });
      TweenMax.to(this.items[1].querySelector(".mask_img"), 0, {
        boxShadow: "20px 5px 30px 0px rgba(0, 0, 0, 0.4)",
      });
      TweenMax.to(this.items[0].querySelector(".mask_img"), 0, {
        width: winSize.width / 2,
      });
      TweenMax.to(this.DOM.close, 0, {
        pointerEvents: "none",
        startAt: { y: '0%', opacity: 1 },
        opacity: 0,
      });
    }
    closeShow() {
      this.items.forEach(item => {
        TweenMax.to(item, 2.2, {
          delay: 0,
          y: 0,
          x: winSize.width,
          ease: Expo.easeInOut
        })
      });
      TweenMax.to(this.items[0], 2, {
        delay: 0,
        scale: 1.4,
        y: this.items[0].clientHeight / 5.5,
        x: winSize.width / 1.8,
        ease: Expo.easeInOut
      });
      TweenMax.to(this.items[0].querySelector(".mask_img"), 1, {
        boxShadow: "20px 12px 30px rgba(0, 0, 0, 0)",
        width: winSize.width / 2,
      });
      TweenMax.to(this.items[1], 2, {
        scale: 1.1,
        y: this.items[1].clientHeight / 2.2,
        x: - winSize.width / 3.8,
        ease: Expo.easeInOut
      });
      TweenMax.to(this.items[1].querySelector(".mask_img"), 1, {
        boxShadow: "20px 5px 30px 0px rgba(0, 0, 0, 0.4)",
        delay: .5,
      });
      TweenMax.to(this.DOM.close, 1, {
        ease: Back.easeIn,
        pointerEvents: "none",
        startAt: { y: '0%', opacity: 1 },
        y: '100%',
        opacity: 0
      });
      TweenMax.to(this.DOM.overlay, 0, {
        delay: 1.4,
        pointerEvents: "visible",
      });
      TweenMax.to(this.DOM.overlay, 1.4, {
        opacity: 1,
        ease: Power1.easeOut
      });
      if (!isMobile) {
        this.showCaption();
        this.noteSiteOpen();
      }
      TweenMax.to(this.DOM.site_of_the_day.querySelector("#split"), 1.4, {
        delay: .33,
        x: "0%",
        y: 0,
        ease: Power2.easeInOut
      });
    }
    openShow() {
      this.items.forEach(item => {
        TweenMax.to(item, 1.6, {
          delay: 0,
          y: 0,
          scale: 1,
          x: 0,
          ease: Expo.easeInOut
        })
        TweenMax.to(item.querySelector(".mask_img"), 1.4, {
          boxShadow: "12px 15px 50px 0px rgba(0, 0, 0, 0.18)",
          delay: 0.55
        });
      });
      TweenMax.to(this.items[0], 1.4, {
        delay: 0,
        scale: 1,
        y: 0,
        x: 0,
        ease: Expo.easeInOut
      });
      TweenMax.to(this.items[0].querySelector(".mask_img"), 1.4, {
        width: _ => winSize.width > 992 ? "400px" : "300px",
        ease: Expo.easeInOut
      });
      TweenMax.to(this.DOM.site_of_the_day.querySelector("#split"), 1.2, {
        x: "-100%",
        y: 0,
        ease: Power2.easeInOut
      });
      setTimeout(_ => {
        this.swiper();
        isVisible = true
      }, 1200);
      this.noteSiteClose();
      this.closeCaption();
      TweenMax.to(this.DOM.close, 0, {
        delay: 1.4,
        pointerEvents: "visible"
      });
      TweenMax.to(this.DOM.close, 1, {
        delay: .5,
        ease: Back.easeOut,
        startAt: { y: '100%', opacity: 0 },
        y: '0%',
        opacity: 1
      });
    }
    showCaption() {
      [...this.DOM.followers.querySelectorAll("li")].forEach((user, index) => {
        TweenMax.to(user, .8, {
          ease: Expo.easeOut,
          delay: index * .05,
          startAt: { y: '50%', opacity: 0 },
          y: '0%',
          opacity: 1,
          pointerEvents: "visible"
        });
      });

      TweenMax.to([this.DOM.heading, this.DOM.data, this.DOM.btnSubmitYourSite, this.DOM.boxLeft], .8, {
        ease: Back.easeOut,
        pointerEvents: "visible",
        startAt: { y: '100%', opacity: 0 },
        y: '0%',
        opacity: 1
      });
    }
    closeCaption() {
      [...this.DOM.followers.querySelectorAll("li")].forEach((user, index) => {
        TweenMax.to(user, .8, {
          ease: Expo.easeIn,
          delay: index * .05,
          startAt: { y: '0%', opacity: 1 },
          y: '50%',
          pointerEvents: "none",
          opacity: 0
        });
      });
      TweenMax.to([this.DOM.heading, this.DOM.data, this.DOM.btnSubmitYourSite, this.DOM.boxLeft], .8, {
        ease: Back.easeIn,
        pointerEvents: "none",
        startAt: { y: '0%', opacity: 1 },
        y: '100%',
        opacity: 0
      });
    }
    swiper() {
      this.DOM.site_of_the_day.addEventListener("mousemove", e => {
        if (isVisible) {
          let offset = e.clientX / body.clientWidth * this.DOM.items.clientWidth - (this.DOM.items.clientWidth / 3);
          let imgOffset = e.clientX / body.clientWidth * 45 - 65;
          // [offset] = [-offset]

          TweenMax.to(this.DOM.image, 1, {
            left: imgOffset,
            ease: Power1.easeOut
          })
          TweenMax.to(this.DOM.items, 1, {
            x: -1 * offset,
            ease: Power1.easeOut
          })
        }
      })
    }
    noteSiteOpen() {
      noteSite.forEach((i, x) => {
        TweenMax.to(`.${i.className.slice(8)}`, 1, {
          ease: Back.easeOut,
          delay: x * .05,
          startAt: { y: '100%', opacity: 0 },
          y: '0%',
          opacity: 1,
          pointerEvents: "visible"
        });
      });
    }
    noteSiteClose() {
      noteSite.forEach((i, x) => {
        TweenMax.to(`.${i.className.slice(8)}`, .8, {
          ease: Back.easeIn,
          delay: x * .05,
          startAt: { y: '0%', opacity: 1 },
          y: '100%',
          opacity: 0,
          pointerEvents: "none"
        });
      });
    }
  }

  class progressBar {
    constructor(el, from, to, { animate: animate }) {
      let name = new Circle(el, {
        color: '#aaa',
        strokeWidth: 20,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 2400,
        text: {
          autoStyleContainer: false,
          alignToBottom: true
        },
        from: { color: from, width: 1 },
        to: { color: to, width: 7 },
        step: function (state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          let value = Math.round(circle.value() * 10);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value);
          }
        }
      });
      name.animate(animate);
      name.text.style.fontFamily = '"Cairo",  sans-serif';
      name.text.style.color = '#333';

    }
  }
  if (typeof (noteSite[0]) != 'undefined' && noteSite[0] != null) {


  let design = new progressBar(noteSite[0], '#555', '#dc3545', {
    animate: 0.9
  });
  let usability = new progressBar(noteSite[1], '#555', '#fd7e14', {
    animate: 0.6
  });
  let creativity = new progressBar(noteSite[2], '#555', '#17a2b8', {
    animate: 0.7
  });
  let content = new progressBar(noteSite[3], '#555', '#20c997', {
    animate: 0.90
  });
  let responsive = new progressBar(noteSite[4], '#555', '#28a745', {
    animate: 0.80
  });
}

  class DraggableSlider {

    constructor(el) {
      this.DOM = { el: el }
      this.container = this.DOM.el;
      this.proxy = this.DOM.el.querySelector(".proxy");
      this.slider = this.DOM.el.querySelector('.swiper__inner');
      this.sliderContent = this.DOM.el.querySelector('.swiper__content');
      this.slides = [...this.DOM.el.querySelectorAll('.slide')];
      this.slidesNumb = this.slides.length;
      this.sliderWidth = 0;
      this.draggable = null;
      this.current = 0;
      this.last = 0;
      this.initEvents();
      this.init();

    }

    setBounds() {
      this.sliderWidth = this.slides[0].offsetWidth * this.slidesNumb;
      TweenMax.set([this.slider, this.proxy], {
        width: this.sliderWidth, x: "+=0", skewType: "simple"
      });
    }
    initEvents() {
      window.addEventListener('resize', () => this.resize());
    }
    resize() {
      this.init();
    }
    createDraggable() {
      let slider = this.slider,
        tracker = ThrowPropsPlugin.track(slider, "x"),
        pressedTop;
      this.draggable = Draggable.create(this.proxy, {
        type: "x",
        edgeResistance: 0.75,
        onPress: function (e) {
          let bounds = this.target.getBoundingClientRect();
          pressedTop = (e.clientY < bounds.y + bounds.height / 2);
          this.offset = this.x - slider._gsTransform.x;
          TweenLite.killTweensOf(slider);
          TweenLite.to(slider, 0.2, { skewX: 0 });
        },
        onDrag: function () {
          TweenLite.to(slider, 0.8, {
            x: this.x - this.offset,
            // skewX: "+=1",
            modifiers: {
              skewX: function (v) {
                let skew = tracker.getVelocity("x") / 200;
                if (skew > 10) {
                  skew = 10;
                } else if (skew < -10) {
                  skew = -10;
                }
                return pressedTop ? -skew : skew;
              }
            },
            ease: Power2.easeOut
          });
        },
        onRelease: function () {
          if (this.tween && Math.abs(tracker.getVelocity("x")) > 20) {
            TweenLite.to(slider, this.tween.duration(), { throwProps: { x: { end: this.endX } }, ease: Power3.easeOut });
          }
          TweenLite.to(slider, 0.5, { skewX: 0, ease: Power1.easeOut })
        },
        bounds: this.container,
        throwProps: true
      })[0];
    }

    destroy() {
      this.draggable.kill()
    }

    init() {
      this.setBounds()
      this.createDraggable()
    }
  }


  [...body.querySelectorAll('.swiper')].forEach(el => {
    if (typeof (el) != 'undefined' && el != null) {
      new DraggableSlider(el);
    }
  });
  const preloadImages = () => {
    return new Promise((resolve, reject) => {
      imagesloaded(document.querySelectorAll('.item__img'), { background: true }, resolve);
    });
  };

  preloadImages().then(() => {
    let el = body.querySelector("section#site_of_the_day");
    if (typeof (el) != 'undefined' && el != null) {
      new Slide();
    }
  });
}
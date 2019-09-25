import imagesloaded from "imagesloaded";
import { TweenMax, Expo, Back } from "gsap";
{
   let isMobile = false;
  // device detection
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
  }
  const MathUtils = {
    map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,
    lerp: (a, b, n) => (1 - n) * a + n * b
  };

  let body = document.body,
    winSize;
  const calcWinSize = () => winSize = { width: window.innerWidth, height: window.innerHeight };
  calcWinSize();

  let docScroll;
  const getPageYScroll = () => docScroll = window.pageYOffset || document.documentElement.scrollTop;
  window.addEventListener('scroll', getPageYScroll);

  window.addEventListener('scroll', e => {
    e.srcElement.documentElement.scrollTop > 500
      ? body.querySelector("#btnSubmitYourSite_absolute").classList.add("active")
      : body.querySelector("#btnSubmitYourSite_absolute").classList.remove("active");
  });
  window.addEventListener('resize', calcWinSize);

  body.querySelector("main").style.paddingTop = `${body.querySelector("#backdrop").offsetHeight}px`;
  body.querySelector("aside").style.top = `${body.querySelector("#backdrop").offsetHeight}px`;

  (_ => {
    body.querySelector("#backdrop #hamburger > button").addEventListener("click", _ => {
      body.querySelector("aside").classList.toggle('active');
      body.querySelector("#backdrop #hamburger > button").classList.toggle('tcon-transform');
    });
    body.querySelector("main *").addEventListener("click", _ => {
      body.querySelector("aside").classList.remove('active');
      body.querySelector("#backdrop #hamburger > button").classList.remove('tcon-transform');
    });
  })();

  const getMousePos = e => {
    let posx = e.clientX;
    let posy = e.clientY;
    return { x: posx, y: posy }
  };

  let mousepos = { x: winSize.width / 2, y: winSize.height / 2 };
  window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));

  class Cursor {
    constructor() {
      this.DOM = {
        cursor: body.querySelector("#cursor"),
        circle: cursor.querySelector("#circle"),
        title: cursor.querySelector("#title"),
        dot: body.querySelector("#dot"),
        move: body.querySelectorAll('.move'),
        link: body.querySelectorAll('.link'),
        dislink: body.querySelectorAll('.dislink')
      };
      this.DOM.arrows = {
        right: this.DOM.circle.querySelector('.side--right'),
        left: this.DOM.circle.querySelector('.side--left')
      };
      this.boundsCircle = this.DOM.circle.getBoundingClientRect();
      this.boundsDot = this.DOM.dot.getBoundingClientRect();

      this.renderedStyles = {
        txc: { previous: 0, current: 0, amt: 0.4 },
        tyc: { previous: 0, current: 0, amt: 0.4 },
        txd: { previous: 0, current: 0, amt: 1 },
        tyd: { previous: 0, current: 0, amt: 1 },
        txt: { previous: 0, current: 0, amt: 0.3 },
        tyt: { previous: 0, current: 0, amt: 0.3 },
        scale: { previous: 1, current: 1, amt: 0.2 },
        scaleDot: { previous: 1, current: 1, amt: 0.2 },
        color: { value: "#2a2a2a" }
      };
      this.posTitle = {
        top: 0,
        left: 20,
        right: 16
      };
      requestAnimationFrame(() => this.render());
      this.initEvents();
      [...this.DOM.move].forEach((el) => {
        el.addEventListener('mouseenter', _ => {
          this.showArrows();
          this.posTitle['right'] += 7;
          this.posTitle['left'] += 7;
        });
        el.addEventListener('mouseleave', _ => {
          this.hideArrows();
          this.posTitle['right'] -= 7;
          this.posTitle['left'] -= 7;
        });
      });
    }
    render() {

      this.renderedStyles['txc'].current = mousepos.x - this.boundsCircle.width / 2;
      this.renderedStyles['tyc'].current = mousepos.y - this.boundsCircle.height / 2;

      this.renderedStyles['txd'].current = mousepos.x - this.boundsDot.width / 2;
      this.renderedStyles['tyd'].current = mousepos.y - this.boundsDot.height / 2;

      this.renderedStyles['txt'].current = mousepos.x - this.boundsDot.width / 2;
      this.renderedStyles['tyt'].current = mousepos.y - this.boundsDot.height / 2;

      for (const key in this.renderedStyles) {
        this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
      }

      this.DOM.circle.style.transform = `translate(${(this.renderedStyles['txc'].previous)}px, ${this.renderedStyles['tyc'].previous}px) scale(${this.renderedStyles['scale'].previous})`;
      this.DOM.dot.style.transform = `translate(${(this.renderedStyles['txd'].previous)}px, ${this.renderedStyles['tyd'].previous}px) scale(${this.renderedStyles['scaleDot'].previous})`;
      this.DOM.dot.style.backgroundColor = this.renderedStyles['color'].value;
      this.DOM.title.style.transform = `translate(${(this.renderedStyles['txt'].previous)}px, ${this.renderedStyles['tyt'].previous - 10}px)`;

      requestAnimationFrame(() => this.render());
    }
    initEvents() {
      window.addEventListener("mousemove", _ => {
        let offset = Math.round(mousepos.x / body.clientWidth);
        if (offset == 1) {
          TweenMax.to(this.DOM.title, .8, {
            ease: Back.easeOut,
            left: "auto",
            right: `${this.posTitle.right}px`
          });
        } else {
          TweenMax.to(this.DOM.title, .8, {
            ease: Back.easeOut,
            left: `${this.posTitle.left}px`,
            right: "auto"
          });
        }
      });
      [...this.DOM.link].forEach((link) => {
        link.addEventListener('mouseenter', e => {
          let target = e.target.getAttribute("data-hover") /*|| "اضغط هنا"*/;
          this.DOM.title.innerHTML = target == null ? "" : target;
          this.enter();
        });
        link.addEventListener('mouseleave', _ => this.leave());
        link.addEventListener('click', _ => this.click());
      });
      [...this.DOM.dislink].forEach((i) => {
        i.addEventListener('mouseenter', e => {
          let target = e.target.getAttribute("data-hover");
          this.DOM.title.innerHTML = target == null ? "" : target;
          TweenMax.to(this.DOM.title, .2, {
            opacity: 1,
            ease: Back.easeOut
          });
        });
        i.addEventListener('mouseleave', e => {
          TweenMax.to(this.DOM.title, .4, {
            opacity: 0,
            ease: Back.easeOut
          });
        })
      });
    }
    enter() {
      this.renderedStyles['scaleDot'].current = 4;
      this.renderedStyles['scale'].current = 1.9;
      this.renderedStyles['color'].value = "#fff";
      this.posTitle['right'] += 10;
      this.posTitle['left'] += 10;
      this.DOM.dot.style.mixBlendMode = "difference";
      TweenMax.to(this.DOM.title, .2, {
        opacity: 1,
        ease: Back.easeOut
      });
    }
    leave() {
      this.renderedStyles['color'].value = "#2a2a2a";
      this.renderedStyles['scaleDot'].current = 1;
      this.renderedStyles['scale'].current = 1;
      this.DOM.dot.style.mixBlendMode = "normal";
      this.posTitle['right'] -= 10;
      this.posTitle['left'] -= 10;
      TweenMax.to(this.DOM.title, .4, {
        opacity: 0,
        ease: Back.easeOut
      });
    }
    click() {
      this.renderedStyles['scale'].previous = 0.4;
    }
    showArrows() {
      TweenMax.to(Object.values(this.DOM.arrows), 1, {
        ease: Expo.easeOut,
        startAt: { x: i => i ? -10 : 10 },
        opacity: 1,
        x: 0
      });
    }
    hideArrows() {
      TweenMax.to(Object.values(this.DOM.arrows), 1, {
        x: i => i ? 10 : -10,
        opacity: 0,
        ease: Expo.easeOut
      });
    }
  }

  class Item {
    constructor(el) {
      this.DOM = { el: el };
      this.DOM.image = this.DOM.el.querySelector('.item__img');
      this.renderedStyles = {
        innerTranslationY: {
          previous: 0,
          current: 0,
          ease: 0.1,
          // maxValue: parseInt(getComputedStyle(this.DOM.image).getPropertyValue('--overflow'), 10),
          maxValue: parseInt(40, 10),
          setValue: () => {
            const maxValue = this.renderedStyles.innerTranslationY.maxValue;
            const minValue = -1 * maxValue;
            return Math.max(Math.min(MathUtils.map(this.props.top - docScroll, winSize.height, -1 * this.props.height, minValue, maxValue), maxValue), minValue)
          }
        }
      };

      this.update();
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => this.isVisible = entry.intersectionRatio > 0);
      });
      this.observer.observe(this.DOM.el);
      this.initEvents();

    }
    update() {
      this.getSize();
      for (const key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
      }
      this.layout();

    }
    getSize() {
      const rect = this.DOM.el.getBoundingClientRect();
      this.props = {
        height: rect.height,
        top: docScroll + rect.top
      }
    }
    initEvents() {
      window.addEventListener('resize', () => this.resize());
    }
    resize() {
      this.update();
    }
    render() {
      for (const key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[key].setValue();
        this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
      }
      this.layout();


    }
    layout() {
      this.DOM.image.style.transform = `scale(1.1) translate3d(0,${this.renderedStyles.innerTranslationY.previous}px,0)`;

    }
  }

  class SmoothScroll {
    constructor() {
      this.DOM = { main: document.querySelector('main') };
      this.DOM.navBar = body.querySelector("#backdrop").offsetHeight;
      this.DOM.scrollable = this.DOM.main.querySelector('div[data-scroll]');
      this.items = [];
      [...this.DOM.main.querySelectorAll('.item_scroll')].forEach(item => this.items.push(new Item(item)));
      this.renderedStyles = {
        translationY: {
          previous: 0,
          current: 0,
          ease: 0.1,
          setValue: () => docScroll
        }
      };
      this.DOM.main.classList.add("isVisible");
      this.setSize();
      this.update();
      // this.style();
      this.initEvents();
      requestAnimationFrame(() => this.render());

    }
    update() {
      for (const key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
      }
      this.layout();
    }
    layout() {
      this.DOM.scrollable.style.transform = `translate3d(0,${-1 * this.renderedStyles.translationY.previous}px,0) `;
    }
    setSize() {
      body.style.height = `${this.DOM.scrollable.scrollHeight + this.DOM.navBar}px`;
    }

    // style() {
    //   this.DOM.main.style.position = 'fixed';
    //   this.DOM.main.style.width = this.DOM.main.style.height = '100%';
    //   this.DOM.main.style.top = this.DOM.main.style.left = 0;
    //   this.DOM.main.style.overflow = 'hidden';
    // }
    initEvents() {
      window.addEventListener('resize', () => this.setSize());
    }
    render() {
      for (const key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[key].setValue();
        this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
      }
      this.layout();
      for (const item of this.items) {
        if (item.isVisible) {
          item.render();
        }

      }
      requestAnimationFrame(() => this.render());
    }

  }

  class Login {
    constructor(el) {
      this.DOM = { el: el };
      this.DOM.selected = [...this.DOM.el.querySelectorAll(".selected")];
      this.DOM.forms = [...this.DOM.el.querySelectorAll(".form")];
      this.DOM.btnLogin = [...body.querySelectorAll(".btn_login")];
      this.DOM.closeBtn = this.DOM.el.querySelector(".closeBtn");
      this.DOM.selected.forEach(i => {
        i.addEventListener("click", e => {
          this.DOM.forms.forEach(i => {
            TweenMax.to(i, 0, {
              opacity: 0,
              display: "none"
            });
          });
          TweenMax.to(body.querySelector(`.${e.target.getAttribute("data-class")}`), .3, {
            opacity: 1,
            display: "block"
          });
        });
      });

      this.DOM.btnLogin.forEach(i => {
        i.addEventListener("click", _ => {
          this.DOM.el.classList.remove("none");
        });
      });
      this.DOM.closeBtn.addEventListener("click", _ => {
        this.DOM.el.classList.add("none");
      });
    }
  }
  [body.querySelector('#login')].forEach(el => {
    new Login(el);
  });
  const preloadImages = () => {
    return new Promise((resolve, reject) => {
      imagesloaded(document.querySelectorAll('.item__img'), { background: true }, resolve);
    });
  };

  preloadImages().then(() => {
    TweenMax.to(body.querySelector(".loading"), 1, {
      // delay: 1,
      opacity: 0,
      ease: Expo.easeInOut
    })
    setTimeout(_ => {
      body.querySelector(".loading").className = 'd-none';
    }, 1000);
    getPageYScroll();
    if (!isMobile) {
      new SmoothScroll();
      new Cursor();
    } else {
      body.querySelector("#cursor").classList = "d-none";
      body.querySelector("#dot").classList = "d-none";
    }
  });
}


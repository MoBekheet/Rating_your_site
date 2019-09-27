// import {Login, Cursor, Item, SmoothScroll, getPageYScroll} from "./assets/js/main";
// import {DraggableSlider,Slide,progressBar} from "./assets/js/slide";
import  "./assets/js/main";
import {progressBar} from "./assets/js/slide";
let body = document.body;
let noteSite = body.querySelectorAll('.box_noteSite > ul > li');
if (typeof (noteSite[0]) != 'undefined' && noteSite[0] != null) {
  new progressBar(noteSite[0], '#555', '#dc3545', {
    animate: 0.9
  });
  new progressBar(noteSite[1], '#555', '#fd7e14', {
    animate: 0.6
  });
  new progressBar(noteSite[2], '#555', '#17a2b8', {
    animate: 0.7
  });
  new progressBar(noteSite[3], '#555', '#20c997', {
    animate: 0.90
  });
  new progressBar(noteSite[4], '#555', '#28a745', {
    animate: 0.80
  });
}
"use strict"
const tabsBtn = document.querySelectorAll('.tabs__nav-btn');
const tabsItem = document.querySelectorAll('.tabs__item');

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
   item.addEventListener('click', function () {
      let currentBtn = item;
      let tabId = item.getAttribute('data-tab');
      let currentItem = document.querySelector(tabId);

      if (!currentBtn.classList.contains('_active')) {
         tabsBtn.forEach(function (item) {
            item.classList.remove('_active');
         });

         tabsItem.forEach(function (item) {
            item.classList.remove('_active');
         });

         currentBtn.classList.add('_active');
         currentItem.classList.add('_active');
      }
   });
}

(() => {
   window.onload = () => {
      let headerBurger = document.querySelector('.header__burger');
      let headerMenu = document.querySelector('.header__contact');
      let body = document.querySelector('body');
      headerBurger.addEventListener('click', (e) => {
         headerBurger.classList.toggle('active');
         headerMenu.classList.toggle('active');
         body.classList.toggle('lock');
      })
   }
})();

document.querySelector('.tabs__nav-btn').click();

let swiperTabs = new Swiper('.tabs-swiper', {
   loop: true,
   spaceBetween: 20,
   autoplay: true,
   observer: true,
   observeParents: true,
   slidesPerView: 3,
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   },
   breakpoints: {
      320: {
         slidesPerView: 1,
         spaceBetween: 15,
      },
      450: {
         slidesPerView: 1.5,
         spaceBetween: 15,
      },
      767: {
         slidesPerView: 2,
         spaceBetween: 20,
      },
      992: {
         slidesPerView: 3,
         spaceBetween: 25,
         centeredSlides: true,
      },
   }
});

let sliderFirst = new Swiper('.slider-first__container', {
   loop: true,
   spaceBetween: 20,
   autoplay: true,
   observer: true,
   observeParents: true,
   slidesPerView: 3,
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   },
   breakpoints: {
      320: {
         slidesPerView: 1,
         spaceBetween: 15,
      },
      500: {
         slidesPerView: 2,
         spaceBetween: 10,
      },
      992: {
         slidesPerView: 3,
         spaceBetween: 30,
         centeredSlides: true,
      },
   }
});

let sliderSecond = new Swiper('.slider-second__container', {
   loop: true,
   spaceBetween: 20,
   autoplay: true,
   observer: true,
   observeParents: true,
   slidesPerView: 3,
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   },
   breakpoints: {
      320: {
         slidesPerView: 1,
         spaceBetween: 15,
      },
      500: {
         slidesPerView: 2,
         spaceBetween: 10,
      },
      992: {
         slidesPerView: 3,
         spaceBetween: 30,
         centeredSlides: true,
      },
   }
});

/*let accordeons = document.querySelectorAll('.accordeon__item');
const accordeonWrapper = document.querySelector('.accordeon');

if (accordeons) {
   for (item of accordeons) {
      item.addEventListener('click', function () {
         if (this.classList.contains('active')) {
            this.classList.remove('active');
         } else {
            for (el of accordeons) {
               el.classList.remove('active');
            }
            this.classList.add('active');
         }
      })
   }
}*/

const animItems = document.querySelectorAll('._anim');

if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll);
   function animOnScroll() {
      for (let index = 0; index < animItems.length; index++) {
         const animItem = animItems[index];
         const animItemHeight = animItem.offsetHeight;
         const animItemOffset = offset(animItem).top;
         const animStart = 4;

         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }

         if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
            animItem.classList.add('_active');
         } else {
            if (!animItem.classList.contains('_anim-no-hide')) {
               animItem.classList.remove('_active');
            }
         }
      }
   }
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
   }

   setTimeout(() => {
      animOnScroll();
   }, 300);
}


document.addEventListener('DOMContentLoaded', function () {
   const form = document.getElementById('form');
   form.addEventListener('submit', formSend);

   async function formSend(e) {
      e.preventDefault();

      let error = formValidate(form);

      let formData = new FormData(form);

      if (error === 0) {
         form.parentElement.classList.add('_sending');
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
         });
         if (response.ok) {
            let result = await response.json();
            alert(result.message);
            formPreview.innerHTML = '';
            form.reset();
            form.classList.remove('_sending');
         } else {
            alert("Ошибка");
            form.classList.remove('_sending');
         }
      } else {
         alert('Заполните обязательные поля');
      }

   }


   function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      for (let index = 0; index < formReq.length; index++) {
         const input = formReq[index];
         formRemoveError(input);
         if (input.value === '') {
            formAddError(input);
            error++;
         }
      }
      return error;
   }

   function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
   }
   function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
   }

});
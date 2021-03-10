
const tabsBtn = document.querySelectorAll('.tabs__nav-btn');
const tabsItem = document.querySelectorAll('.tabs__item');

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
   item.addEventListener('click', function () {
      let currentBtn = item;
      let tabId = item.getAttribute('data-tab');
      let currentItem = document.querySelector(tabId);

      if (!currentBtn.classList.contains('active')) {
         tabsBtn.forEach(function (item) {
            item.classList.remove('active');
         });

         tabsItem.forEach(function (item) {
            item.classList.remove('active');
         });

         currentBtn.classList.add('active');
         currentItem.classList.add('active');
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

let accordeons = document.querySelectorAll('.accordeon__item');
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
}

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
//Mask

let selector = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(selector);

/*let selector2 = document.querySelector('input[type="tel"]');

selector2.addEventListener('input', function(){
   console.log(selector2.value)


   const re = /^\d*(\.\d+)?$/

   console.log(selector2.value.match(/[0-9]/g).length)


   console.log(selector2.value.replace(/[0-9]/g, "0"));
	
});

const fileInput = document.querySelector('input[type="file"]');

fileInput.addEventListener('change', (e) => {
   let files = e.currentTarget.files;
   console.log(files);

   if (files.length) {
      fileInput.closest('label').querySelector('span').textContent = files[0].name;
   } else {
      fileInput.closest('label').querySelector('span').textContent = 'Прикрепить файл';
   }

});*/

let validateForms = function (selector, rules, successModal, yaGoal) {
   new window.JustValidate(selector, {
      rules: rules,
      submitHandler: function (form) {
         let formData = new FormData(form);

         let xhr = new XMLHttpRequest();

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               if (xhr.status === 200) {
                  console.log('Отправлено');
               }
            }
         }

         xhr.open('POST', 'mail.php', true);
         xhr.send(formData);

         form.reset();
      }
   });
}

validateForms('.forms', { tel: { required: true } }, '.thanks-popup', 'send goal');
/*document.addEventListener('DOMContentLoaded', function () {
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

});*/

//

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.getAttribute('href').replace('#', '');
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}

function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('lock');

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
         }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener('keydown', function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
   }
});

(function () {
   // проверяем поддержку
   if (!Element.prototype.closest) {
      // реализуем
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      };
   }
})();
(function () {
   // проверяем поддержку
   if (!Element.prototype.matches) {
      // определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.msMatchesSelector;
   }
})();

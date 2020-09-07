$(function(){

 /* Start BARBA HOOKS */
  barba.hooks.beforeEnter(() => {

  $('.tab').on('click', function(e){
    e.preventDefault();

    $($(this).siblings()).removeClass('tab--active');
    $($(this).closest('.tabs-wrapper').siblings().find('div')).removeClass('tabs-content--active');

    $(this).addClass('tab--active');
    $($(this).attr('href')).addClass('tabs-content--active');
    $('.slider-inner, .faction-slider').slick('refresh');
  });
  
  $('.organization__item').on('click', function(e){
    e.preventDefault();

    $($(this).siblings()).removeClass('organization__item--active');
    $($(this).closest('.tabs-wrapper').siblings().find('div')).removeClass('faction__content--active');

    $(this).addClass('organization__item--active');
    $($(this).attr('href')).addClass('faction__content--active');
    $('.faction-slider').slick('refresh');
  });

  $('.slider-inner').slick({
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: '<button class="slider-arrows slider-arrows__right"><img src="images/icons/arrow-left.svg" alt=""></button>',
    nextArrow: '<button class="slider-arrows slider-arrows__left"><img src="images/icons/arrow-right.svg" alt=""></button>',
  });

  $('.list__item-btn').on('click', function(){
    $(this).toggleClass('list__item-btn--active');
  });
  
  document.querySelectorAll('.cars__info').forEach((item) =>
  item.addEventListener('click', () => {

    const parent = item.parentNode;
    
        if (parent.classList.contains('cars__box--active')) {
            parent.classList.remove('cars__box--active');
        } 
        else {
        
          document
            .querySelectorAll('.cars__box')
            .forEach((child) => child.classList.remove('cars__box--active'));
              
          parent.classList.add('cars__box--active');
          
        }
    
    })
  );

  $('.faction-slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button class="slider-arrows faction-arrows slider-arrows__right"><img src="images/icons/arrow-left.svg" alt=""></button>',
    nextArrow: '<button class="slider-arrows faction-arrows slider-arrows__left"><img src="images/icons/arrow-right.svg" alt=""></button>',
  });

  // ********************************
  // * roulette----------------------
  // ********************************

  // ********************************
  // * создаем копии: прогрессия
  // * count: 1 - 10 элементов
  // * count: 2 - 20 элементов
  // * count: 3 - 40 элементов
  // * ...
  // ********************************
  const count = 4;
  for (i = 0; i < count; i++) {
      $('#roulette .content__item').clone().appendTo('#roulette');
  }

  // ********************************
  const rouletteBtn = $('#roulette-button');
  const rouletteList = $('#roulette');
  const widthElement = $('.content__item').width();
  const transitionTime = 8000; // ms

  const sound = document.getElementById('sound-roulette');

  const modal = $('#modal');
  const modalClose = $('#modal-close');
  const modalItemImage = $('#modal-item-image');

  const items = {
    darkblue: 40,
    green: 30,
    yellow: 25,
    purple: 4,
    blue: 1,
  };

  rouletteBtn.on('click', function () {
    // * обнуляем все
    $(this).css({ pointerEvents: 'none' });
    // * ставим длительность анимации
    rouletteList.css({ transition: `all ${transitionTime}ms linear` });
    // * цвет выпавшего элемента
    const color = weightedRandom(items);
    // * ищем все элементы с таким цветос
    const pickItems = rouletteList.find(`.content__item-${color}`);
    // * узнаем индекс выпавшего элемента
    const idx = selfRandom(
        Math.floor(pickItems.length / 2),
        pickItems.length - 4
    );
    // * выпавший элемент
    const selectedItem = pickItems.eq(idx);

    // * расстояние до этого элемента элемент
    const leftOffset = selectedItem.position().left;
    
    sound.play()
    // * анимация
    rouletteList.css({
        transform: `translateX(-${
            +leftOffset.toFixed(0) - widthElement * 2.8
        }px)`,
    });

    modalItemImage.attr(
        'src',
        selectedItem.children('img').attr('src')
    );

    // * то что случится после прокрутки анимации
    setTimeout(() => {
        $(this).css({ pointerEvents: 'inherit' });
        modal.fadeIn();
    }, transitionTime);
  });
    //* закрытие окна  
  modalClose.on('click', () => {
      modal.fadeOut();
      rouletteList.css({ transition: '', transform: `` });
  });

    // *рассчитываем проценты
    function weightedRandom(prob) {
      let i,
          sum = 0,
          r = 0 + Math.random() * (83.2 - 0);
      for (i in prob) {
          sum += prob[i];
          if (r <= sum) return i;
      }
    }
    // * просто рандомное число
    function selfRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }  

  });  /* End BARBA HOOKS */

});

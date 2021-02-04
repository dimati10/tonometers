$(function () {

  $('.carousel__inner').slick({
    prevArrow: '<button type="button" class="slick-prev"><img src="images/icons/left.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="images/icons/right.svg"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false
        }
      }
    ]
  });

  $('ul.catalog__tabs').on('click', 'li:not(.active)', function () {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.catalog__inner').find('div.catalog__content').removeClass('active').eq($(this).index()).addClass('active');
  });

  // $('.catalog-item__link').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('active');
  //     $('.catalog-item__list').eq(i).toggleClass('active');
  //   })
  // });

  // $('.catalog-item__back').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('active');
  //     $('.catalog-item__list').eq(i).toggleClass('active');
  //   })
  // });

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function () {
        $('.catalog-item__content').eq(i).toggleClass('active');
        $('.catalog-item__list').eq(i).toggleClass('active');
      })
    });
  }

  toggleSlide('.catalog-item__more');
  toggleSlide('.catalog-item__back');

  // modal 

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn();
  });
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut();
  });

  $('.catalog-item__btn').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__title').eq(i).text());
      $('.overlay, #order').fadeIn();
    })
  });

  function valideForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите своё имя",
          minlength: jQuery.validator.format("Введите {0} символ!")
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введён адрес почты"
        }
      }
    });
  };

  valideForms('#consultation-form');
  valideForms('#consultation form');
  valideForms('#order form');

  $('input[name=phone]').mask("+7 (999) 999-99-99");

  $('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()

    }).done(function () {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn();

      $('form').trigger('reset');
    });
    return false;
  });

  //smooth scroll and pageup

  $(window).scroll(function () {
    if ($(this).scrollTop() > 800) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a[href^='#']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" }, 1200);
    return false;
  });

  new WOW().init();

  $('.footer__triangle').on('click', function () {
    $('.footer__info, .footer__triangle').toggleClass('close');
    $('.footer__content').slideToggle();
  });

});

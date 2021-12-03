// Sticky navbar
// =========================
$(document).ready(function () {
  // Custom function which toggles between sticky class (is-sticky)
  var stickyToggle = function (sticky, stickyWrapper, scrollElement) {
    var stickyHeight = sticky.outerHeight();
    var stickyTop = stickyWrapper.offset().top;
    if (scrollElement.scrollTop() >= stickyTop) {
      stickyWrapper.height(stickyHeight);
      sticky.addClass("is-sticky");
    } else {
      sticky.removeClass("is-sticky");
      stickyWrapper.height("auto");
    }
  };

  var alert = $(".alert-container");

  alert.hide();

  // Find all data-toggle="sticky-onscroll" elements
  $('[data-toggle="sticky-onscroll"]').each(function () {
    var sticky = $(this);
    var stickyWrapper = $("<div>").addClass("sticky-wrapper"); // insert hidden element to maintain actual top offset on page
    sticky.before(stickyWrapper);
    sticky.addClass("sticky");

    // Scroll & resize events
    $(window).on("scroll.sticky-onscroll resize.sticky-onscroll", function () {
      stickyToggle(sticky, stickyWrapper, $(this));
    });

    // On page load
    stickyToggle(sticky, stickyWrapper, $(window));
  });
});

(function () {
  "use strict";

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  var fullHeight = function () {
    if (!isMobile.any()) {
      $(".js-fullheight").css("height", $(window).height());
      $(window).resize(function () {
        $(".js-fullheight").css("height", $(window).height());
      });
    }
  };

  var sliderMain = function () {
    $("#fh5co-hero .flexslider").flexslider({
      animation: "fade",
      slideshowSpeed: 5000,
      directionNav: true,
      start: function () {
        setTimeout(function () {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
      before: function () {
        setTimeout(function () {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
    });

    $("#fh5co-hero .flexslider .slides > li").css("height", $(window).height());
    $(window).resize(function () {
      $("#fh5co-hero .flexslider .slides > li").css(
        "height",
        $(window).height()
      );
    });
  };

  var centerBlock = function () {
    $(".fh5co-section-with-image .fh5co-box").css(
      "margin-top",
      -($(".fh5co-section-with-image .fh5co-box").outerHeight() / 2)
    );
    $(window).resize(function () {
      $(".fh5co-section-with-image .fh5co-box").css(
        "margin-top",
        -($(".fh5co-section-with-image .fh5co-box").outerHeight() / 2)
      );
    });
  };

  var responseHeight = function () {
    setTimeout(function () {
      $(".js-responsive > .v-align").css(
        "height",
        $(".js-responsive > img").height()
      );
    }, 1);

    $(window).resize(function () {
      setTimeout(function () {
        $(".js-responsive > .v-align").css(
          "height",
          $(".js-responsive > img").height()
        );
      }, 1);
    });
  };

  var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
      var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas-visible")) {
          $("body").removeClass("offcanvas-visible");
          $(".js-fh5co-nav-toggle").removeClass("active");
        }
      }
    });
  };

  var offcanvasMenu = function () {
    $("body").prepend('<div id="fh5co-offcanvas" />');
    $("#fh5co-offcanvas").prepend('<ul id="fh5co-side-links">');
    $("body").prepend(
      '<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle"><i></i></a>'
    );
    $("#fh5co-offcanvas").append($("#fh5co-header nav").clone());
  };

  var burgerMenu = function () {
    $("body").on("click", ".js-fh5co-nav-toggle", function (event) {
      var $this = $(this);

      $("body").toggleClass("fh5co-overflow offcanvas-visible");
      $this.toggleClass("active");
      event.preventDefault();
    });

    $(window).resize(function () {
      if ($("body").hasClass("offcanvas-visible")) {
        $("body").removeClass("offcanvas-visible");
        $(".js-fh5co-nav-toggle").removeClass("active");
      }
    });

    $(window).scroll(function () {
      if ($("body").hasClass("offcanvas-visible")) {
        $("body").removeClass("offcanvas-visible");
        $(".js-fh5co-nav-toggle").removeClass("active");
      }
    });
  };

  var toggleBtnColor = function () {
    if ($("#fh5co-hero").length > 0) {
      $("#fh5co-hero").waypoint(
        function (direction) {
          if (direction === "down") {
            $(".fh5co-nav-toggle").addClass("dark");
          }
        },
        { offset: -$("#fh5co-hero").height() }
      );

      $("#fh5co-hero").waypoint(
        function (direction) {
          if (direction === "up") {
            $(".fh5co-nav-toggle").removeClass("dark");
          }
        },
        {
          offset: function () {
            return -$(this.element).height() + 0;
          },
        }
      );
    }
  };

  var contentWayPoint = function () {
    var i = 0;
    $(".animate-box").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("animated-fast")
        ) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .animate-box.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated-fast");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated-fast");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated-fast");
                  } else {
                    el.addClass("fadeInUp animated-fast");
                  }

                  el.removeClass("item-animate");
                },
                k * 200,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "85%" }
    );
  };

  $(function () {
    fullHeight();
    sliderMain();
    centerBlock();
    responseHeight();
    mobileMenuOutsideClick();
    offcanvasMenu();
    burgerMenu();
    toggleBtnColor();
    contentWayPoint();
  });
})();

$(".openmodale").click(function (e) {
  e.preventDefault();
  $(".modale").addClass("opened");
});

$(".closemodale").click(function (e) {
  e.preventDefault();
  $(".modale").removeClass("opened");
});
// firebase config

var config = {
  apiKey: "AIzaSyDbmLjl3Z9VDtWb0jA-mGqNwBZK9VMohrs",
  authDomain: "invesco-realty.firebaseapp.com",
  projectId: "invesco-realty",
  storageBucket: "invesco-realty.appspot.com",
  messagingSenderId: "997090472940",
  appId: "1:997090472940:web:a568984cbc6311cb5ac6c9",
  measurementId: "G-B2M6H78H55",
  databaseURL: "https://invesco-realty.firebaseio.com",
};

// firebase.initializeApp(config);

var msgref = firebase.database().ref("leads");
var clicks_on_whatsapp_btn = firebase.database().ref("clicks-on-whatsapp-btn");

$("#submit-btn1").click(function (e) {
  e.preventDefault();
  var name = $("#name1").val();
  var phone = $("#phone1").val();
  var email = $("#email1").val();
  var msg = $("#msg1").val();


  if (name.length == 0) {
    $("#name-err-msg1").removeClass("err-msg");
    $("#name1").addClass("erred-input");
  } else if (!regexPhoneNumber(phone)) {
    $("#name-err-msg1").addClass("err-msg");

    $("#phone-err-msg1").removeClass("err-msg");
    $("#name1").removeClass("erred-input");

    $("#phone1").addClass("erred-input");
  } else {
    $("#name-err-msg1").addClass("err-msg");
    $("#phone-err-msg1").addClass("err-msg");

    //submit form
    $("#name1").removeClass("erred-input");
    $("#phone1").removeClass("erred-input");
    save_to_firebase(name, phone, email, "");

    launch_toast(e);
    $("#submit-btn1").addClass("disable-click");
    $(".modale").removeClass("opened");
  }


  //submit form
  save_to_firebase(name, phone, email, msg);
  console.log("submitted 1");
});

$("#modal-submit").click(function (e) {
  e.preventDefault();
  var name = $("#name2").val();
  var phone = $("#phone2").val();
  var email = $("#email2").val();

  if (name.length == 0) {
    $("#name-err-msg2").removeClass("err-msg");
    $("#name2").addClass("erred-input");
  } else if (!regexPhoneNumber(phone)) {

    $("#name-err-msg2").addClass("err-msg");

    $("#phone-err-msg2").removeClass("err-msg");
    $("#name2").removeClass("erred-input");
    $("#phone2").addClass("erred-input");
  } else {

    $("#name-err-msg2").addClass("err-msg");
    $("#phone-err-msg2").addClass("err-msg");

    //submit form
    $("#name2").removeClass("erred-input");
    $("#phone2").removeClass("erred-input");
    save_to_firebase(name, phone, email, "");
    
    launch_toast(e);
    $("#modal-submit").addClass("disable-click");
    $(".modale").removeClass("opened");
  }
});

function save_to_firebase(name, phone, email, msg) {
  var newmsgref = msgref.push();
  var when = new Date().toLocaleString()
  newmsgref.set({
    name: name,
    phone: phone,
    email: email,
    msg: msg,
    when: when
  });
}

$(".whatsapp-me-btn").click(function (e) {
  register_whatsapp_click_btn();

})

function register_whatsapp_click_btn() {
  var new_clicks_on_whatsapp_btn = clicks_on_whatsapp_btn.push()
  var when = new Date().toLocaleString();

  new_clicks_on_whatsapp_btn.set({
    when: when
  });
}

function regexPhoneNumber(input_str) {
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  return re.test(input_str);
}

function launch_toast(e) {
  e.preventDefault();
  var x = document.getElementById("toast");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 5000);
}
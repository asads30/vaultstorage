$(function () {
   $(document).on("click", ".mobile_menu_container .parent", function (e) {
      e.preventDefault();
      $(".mobile_menu_container .activity").removeClass("activity");
      $(this).siblings("ul").addClass("loaded").addClass("activity");
   });
   $(document).on("click", ".mobile_menu_container .back", function (e) {
      e.preventDefault();
      $(".mobile_menu_container .activity").removeClass("activity");
      $(this).parent().parent().removeClass("loaded");
      $(this).parent().parent().parent().parent().addClass("activity");
   });
   $(document).on("click", ".mobile_menu", function (e) {
      e.preventDefault();
      $(".mobile_menu_container").addClass("loaded");
      $(".mobile_menu_overlay").fadeIn();
   });
   $(document).on("click", ".mobile_menu_overlay", function (e) {
      $(".mobile_menu_container").removeClass("loaded");
      $(this).fadeOut(function () {
         $(".mobile_menu_container .loaded").removeClass("loaded");
         $(".mobile_menu_container .activity").removeClass("activity");
      });
   });
});

var swiper = new Swiper(".swiper-container", {
   pagination: {
      el: ".swiper-pagination",
      clickable: true,
   },
});

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
   smoothLink.addEventListener("click", function (e) {
      e.preventDefault();
      const id = smoothLink.getAttribute("href");

      document.querySelector(id).scrollIntoView({
         behavior: "smooth",
         block: "start",
      });
   });
}

$("#range").slider({
   ticks: [0, 100, 200, 300, 400],
   ticks_snap_bounds: 50,
   value: 0,
   ticks_labels: ["0 ft", "100 ft", "100 ft", "300 ft", "400 ft"],
   ticks_tooltip: true,
   lock_to_ticks: true,
});

$("#address").autocomplete({
   minChars: 1, // Минимальная длина запроса для срабатывания автозаполнения
   delimiter: /(,|;)\s*/, // Разделитель для нескольких запросов, символ или регулярное выражение
   zIndex: 9999, // z-index списка
   deferRequestBy: 0, // Задержка запроса (мсек), на случай, если мы не хотим слать миллион запросов, пока пользователь печатает. Я обычно ставлю 300.
   params: { country: "Yes" }, // Дополнительные параметры
   onSelect: function (data, value) {}, // Callback функция, срабатывающая на выбор одного из предложенных вариантов,
   lookup: ["January", "February", "March"], // Список вариантов для локального автозаполнения
});

let start = new Date(),
   prevDay,
   startHours = 9;

// 09:00
start.setHours(9);
start.setMinutes(0);

// Если сегодня суббота или воскресенье - 10:00
if ([6, 0].indexOf(start.getDay()) != -1) {
   start.setHours(10);
   startHours = 10;
}

$(".my-datapicker").datepicker({
   timepicker: false,
   startDate: start,
   minHours: startHours,
   maxHours: 18,
   onSelect: function (fd, d, picker) {
      // Ничего не делаем если выделение было снято
      if (!d) return;

      var day = d.getDay();

      // Обновляем состояние календаря только если была изменена дата
      if (prevDay != undefined && prevDay == day) return;
      prevDay = day;

      // Если выбранный день суббота или воскресенье, то устанавливаем
      // часы для выходных, в противном случае восстанавливаем начальные значения
      if (day == 6 || day == 0) {
         picker.update({
            minHours: 10,
            maxHours: 16,
         });
      } else {
         picker.update({
            minHours: 9,
            maxHours: 18,
         });
      }
   },
   language: "en",
});

(function ($) {
   $.fn.datepicker.language["en"] = {
      days: [
         "Sunday",
         "Monday",
         "Tuesday",
         "Wednesday",
         "Thursday",
         "Friday",
         "Saturday",
      ],
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      months: [
         "January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
         "December",
      ],
      monthsShort: [
         "Jan",
         "Feb",
         "Mar",
         "Apr",
         "May",
         "Jun",
         "Jul",
         "Aug",
         "Sep",
         "Oct",
         "Nov",
         "Dec",
      ],
      today: "Today",
      clear: "Clear",
      dateFormat: "mm/dd/yyyy",
      timeFormat: "hh:ii aa",
      firstDay: 0,
   };
})(jQuery);

var tooltipTriggerList = [].slice.call(
   document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
   return new bootstrap.Tooltip(tooltipTriggerEl);
});

$(function () {
   let header = $(".topbar");

   $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
         header.addClass("topbar_fixed");
      } else {
         header.removeClass("topbar_fixed");
      }
   });
});

$(".selectmob").click(function () {
   $(".select-text3").slideToggle(300, function () {
      if ($(this).is(":hidden")) {
         $(".selectmob").removeClass("open");
      } else {
         $(".selectmob").addClass("open");
      }
   });
   return false;
});

$('form[id="step3"]').validate({
   rules: {
      postcode: "required",
      address: "required",
      colldate: "required",
   },
   messages: {
      postcode: "This field is required",
      address: "This field is required",
      colldate: "This field is required",
   },
   submitHandler: function (form) {
      form.submit();
      window.location.href = "http://house.loko.uz/select-4.html";
   },
});

$('form[id="step4"]').validate({
   rules: {
      name: "required",
      email: {
         required: true,
         email: true,
      },
      phone: "required",
   },
   messages: {
      name: "This field is required",
      email: "This field is required",
      phone: "This field is required",
   },
   submitHandler: function (form) {
      form.submit();
   },
});

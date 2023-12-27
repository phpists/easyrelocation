$(document).ready(function () {
  $(document).on("submit", ".form", function (e) {
    e.preventDefault();

    var form = $(this);
    var data = form.serializeArray();

    $.ajax({
      url: "form.php",
      data: data,
      type: "POST",
      dataType: "json",
      success: function (response) {
        var status = response.status;
        if (status) {
          $(".form_request").removeClass("show");
          form[0].reset();
          $(".success_modal").addClass("show");
        }
      },
    });
  });

  $(document).on("submit", ".fast_call", function (e) {
    e.preventDefault();

    var form = $(this);
    var data = form.serializeArray();

    console.log("data", data);

    $.ajax({
      url: "fast_call.php",
      data: data,
      type: "POST",
      dataType: "json",
      success: function (response) {
        var status = response.status;
        if (status) {
          form[0].reset();
          $(".success_modal").addClass("show");

          document
            .querySelector(".success_modal .modal__close")
            .addEventListener("click", () =>
              $(".success_modal").removeClass("show")
            );
        }
      },
    });
  });
});

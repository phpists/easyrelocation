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
                    $('#form_modal').removeClass("show");
                    form[0].reset();
                    $("#success_modal").addClass("show");
                }
            },
        });
    });

    $(document).on('click', '.modal__close', function (e) {
        $("#success_modal").removeClass("show");
    });
});

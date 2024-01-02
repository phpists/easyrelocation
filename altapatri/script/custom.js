$(document).ready(function () {
    $(document).on("submit", ".get-form", function (e) {
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
                    form[0].reset();
                    console.log('some');
                    $("#modal-success").addClass("hystmodal--active");
                }
            },
        });
    });

    $(document).on('click', '.close-main', function (e) {
        $("#modal-success").removeClass("hystmodal--active");
    });
});

$(document).ready(function () {

    $(document).on('submit', '.form', function (e) {
        e.preventDefault();

        var form = $(this);
        var data = form.serializeArray();

        $.ajax({
            url: 'form.php',
            data: data,
            type: "POST",
            dataType: "json",
            success: function (response) {
                var status = response.status;
                if (status) {
                    $('.form_request').removeClass('show')
                    form[0].reset();
                    $('.success_modal').addClass('show');
                }
            }
        });
    });

    $(document).on('submit', '.fast_call', function (e) {
        e.preventDefault();

        var form = $(this);
        var data = form.serializeArray();

        console.log('data', data)

        $.ajax({
            url: 'fast_call.php',
            data: data,
            type: "POST",
            dataType: "json",
            success: function (response) {
                var status = response.status;
                if (status) {
                    form[0].reset();
                    $('.success_modal').addClass('show');

                    console.log('status ', status)
                }
            }
        });
    });

    $(document).on('click', '.modal__close', function (e) {
        $('.success_modal').removeClass('show');
        $('.webp').css('overflow', '')
    });
});
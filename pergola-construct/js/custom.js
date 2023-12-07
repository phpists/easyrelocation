$(document).ready(function () {

    $(document).on('submit', '.form', function (e) {
        e.preventDefault();

        var form = $(this);
        var data = form.serializeArray();

        console.log('data, ', data);

        $.ajax({
            url: 'form.php',
            data: data,
            type: "POST",
            dataType: "json",
            success: function (response) {
                var status = response.status;
                if (status) {
                    $('.modal').removeClass('show fade')
                    form[0].reset();

                    $('.success_modal').show();

                    console.log('status ', status)
                }
            }
        });
    })
});
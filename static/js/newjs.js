$(document).ready(function () {

    // Image preview
    $("#imageUpload").change(function () {
        let reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').attr('src', e.target.result);
            $('.image-section').show();
        };
        reader.readAsDataURL(this.files[0]);
    });

    // Predict button
    $("#btn-predict").click(function () {
        let form_data = new FormData($('#upload-file')[0]);

        // Reset UI
        $("#btn-predict").removeClass("safe danger").text("Predicting...");
        $("#result span").removeClass("result-no result-yes").text("");
        $(".loader").show();

        // Send request
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                $(".loader").hide();

                if (data.includes("No Brain Tumor")) {
                    $("#result span")
                        .text("No Brain Tumor")
                        .addClass("result-no")
                        .removeClass("result-yes");
                    $("#btn-predict")
                        .addClass("safe")
                        .removeClass("danger")
                        .text("All Clear ✅");
                } else {
                    $("#result span")
                        .text("Yes Brain Tumor")
                        .addClass("result-yes")
                        .removeClass("result-no");
                    $("#btn-predict")
                        .addClass("danger")
                        .removeClass("safe")
                        .text("Tumor Detected ⚠️");
                }
            },
        });
    });

});

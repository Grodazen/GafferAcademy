$(document).ready(function () {

  //Validate

  $('#signup-form').validate({
    rules: {

      firstname: {
        required: true
      },

      lastname: {
        required: true
      },

      email: {
        required: true,
        email: true
      },

      password: {
        minlength: 8,
        required: true
      },

      confirmation: {
        minlength: 8,
        equalTo: "#password",
        required: true
      }

    },
    success: function (element) {
      element
        .text('OK!').addClass('valid')
    }
  });
});

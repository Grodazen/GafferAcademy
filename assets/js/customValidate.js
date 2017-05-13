$(document).ready(function () {

  //Validate

  $('.form-signin').validate({
    rules: {

      firstname: {
        required: true
      },

      lastname: {
        required: true
      },

      email: {
        required: true,
        unique: true,
        email: true
      },

      password: {
        minlength: 8,
        required: true
      },

      confirmation: {
        minlength: 8,
        equalTo: "#password"
      }

    },
    success: function (element) {
      element
        .text('OK!').addClass('valid')
    }
  });
});

$(function () {
  // Handle form submission
  $("#prompt-form").submit(function (event) {
    event.preventDefault();
    const scenario = $("#scenario-input").val();
    $.get(`/prompt?scenario=${scenario}`, function (data) {
      $("#prompt-output").text(data);
    });
  });
});

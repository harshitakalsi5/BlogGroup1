$("#btnx").click(function() {
  $.ajax({
    method: "POST",
    url: "http://localhost:3005/posts",
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({
      "post": {
        "author": $("#author").val(),
        "content": $("#post-body").val(),
        "title": $("#title").val(),
        "email": $("#email").val()
      }
    }),
    success: function (data, textStatus, jQxhr) {
      $('#response pre').html(JSON.stringify(data));
    },
    error: function (jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
});
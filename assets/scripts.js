$("#btnx").click(function() {
  $.ajax({
    method: "POST",
    url: "http://localhost:3005/api/posts",
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({
      "post": {
        "author": $("#author").val(),
        "content": $("#post-body").val(),
        "title": $("#title").val(),
        "email": $("#email").val()
      }
    })
  }).done(function() {
    $("#author").val("");
    $("#post-body").val("");
    $("#title").val("");
    $("#email").val("");
  });
});
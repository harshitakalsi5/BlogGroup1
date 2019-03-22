var totalPosts;
var totalPostsPages;

function refreshPosts() {
  $.ajax({
    method: "GET",
    url: "https://agile-lake-25873.herokuapp.com/api/posts",
    dataType: 'json',
    contentType: 'application/json',
  }).done(function(data, status) {
    postsx = data;
    var postsSection = document.querySelector("#posts-section");
    postsSection.innerHTML = "";
    if (localStorage.currentPostPage === undefined) {
      localStorage.currentPostPage = Number(0);
    }
    totalPosts = Number(data.posts.length);
    //here 4 is the no. of posts viewable per page.
    totalPostsPages = Math.floor(totalPosts / 4);
    for (var i = 0; i < totalPosts; i++) {
      if (Math.floor(i/4) === Number(localStorage.currentPostPage)) {
        var postPara = document.createElement("p");
        //title
        postPara.appendChild(document.createElement("h3"));
        postPara.getElementsByTagName("h3")[0].innerText = data.posts[i].title;

        // postPara.appendChild(document.createElement("br"))

        //post content
        postPara.appendChild(document.createElement("h6"))
        console.log(data.posts[i].content);
        postPara.getElementsByTagName("h6")[0].innerText = String(data.posts[i].content);

        var details = document.createElement("span");
        details.innerHTML = "Posted by <i><u>" + data.posts[i].author + "</i></u> on " + data.posts[i].dateAdded.split("T")[0];
        postPara.appendChild(document.createElement("br"));
        postPara.appendChild(details);
        var hr = document.createElement("hr");
        hr.style.width = "200px";
        hr.classList.add('w3-opacity');
        postPara.appendChild(hr);
        postsSection.appendChild(postPara);
      }
    }
  });
}

var olderBtn = document.getElementById("increment");
var newerBtn = document.getElementById("decrement");

olderBtn.addEventListener("click", function() {
  if (localStorage.currentPostPage === undefined) {
    localStorage.currentPostPage = Number(0);
  } else {
    if (Number(localStorage.currentPostPage) + 1 <= totalPostsPages) {
      localStorage.currentPostPage = Number(localStorage.currentPostPage) + 1;
    }
  }
  refreshPosts();
});

newerBtn.addEventListener("click", function() {
  if (localStorage.currentPostPage === undefined) {
    localStorage.currentPostPage = Number(0);
  } else {
    if (Number(localStorage.currentPostPage) - 1 >= 0) {
      localStorage.currentPostPage = Number(localStorage.currentPostPage) - 1;
    }
  }
  refreshPosts();
});

$("#btnx").click(function() {
  $.ajax({
    method: "POST",
    url: "https://agile-lake-25873.herokuapp.com/posts",
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
    refreshPosts();
  });
});

refreshPosts();
## Setup instructions

+ Make sure [mongoDB](https://docs.mongodb.com/manual/administration/install-community/) is installed and running in background

+ Install all the dependencies using :
    ```
    npm install .
    ```

+ Use this to run the server :
    ```
    npm run-script start
    ```

## Here's the routes:
+ Get all Posts (GET)
    ```
    /posts
    ```
+ Get a post by cuid (GET)
    ```
    /posts/:cuid
    ```
+ Add a new Post (POST)
    ```
    /posts
    ```
    format for posting:
    ```
    {
      "post": {
        "author": $("#author").val(),
        "content": $("#post-body").val(),
        "title": $("#title").val(),
        "email": $("#email").val()
      }
    }
    ```
    - Extra properties that are generated
        + See ```PostController.addPost``` in 'controllers/post.controller.js'
+ Updates an Existing Post (PUT)
    ```
    /posts/:cuid
    ```
+ Deletes an Existing Post (DELETE)
    ```
    /posts/:cuid
    ```

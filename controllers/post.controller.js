import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

const PostController = {};

//fetches all the posts in the blog.
PostController.getAll = async (req, res) => {
    try{
        await Post.find().sort('-dateAdded').exec((err, posts) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ posts });
        });
    }
    catch(err){
        res.send(err);
    }
}

//fetches a post using the unique cuid
PostController.getPost = async (req, res) => {
    try{
        Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ post });
        });
    }
    catch(err){

    }
}

//add a new post
PostController.addPost = async (req, res) => {
    try {
        console.log(req);
        if (!req.body.post.title || !req.body.post.content) {
            res.status(403).end();
        }

        const newPost = new Post(req.body.post);
        // Prevents cross-site scripting
        // Sanitize inputs
        newPost.title = sanitizeHtml(newPost.title);
        newPost.content = sanitizeHtml(newPost.content);

        newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
        newPost.cuid = cuid();

        newPost.save((err, saved) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ post: saved });
        });
    }
    catch (err) {
        console.log(err);
    }
}


// Updates a post
PostController.updatePost = async (req, res) => {
    try {
        if (!req.body.post.title || !req.body.post.content) {
            res.status(403).end();
        }
        Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
            // Handle database errors
            if (err) {
                res.status(500).send(err);
            } else {
                post.title = req.body.post.title || post.title;
                post.content = req.body.post.content || post.content;
                console.log('Post about to be saved');
                // Save 
                post.save((err, saved) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.json({ post: saved });
                });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

// Deletes a post
PostController.deletePost = async (req, res) => {
    try {
        Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
            if (err) {
                res.status(500).send(err);
            }

            post.remove(() => {
                res.status(200).end();
            });
        });
    }
    catch (err) {
        console.log(err);
    }
}

export default PostController;
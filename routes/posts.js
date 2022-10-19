const express = require('express');
const knex = require('../db/client');

const router = express.Router()

//-----------------------Index of all Posts---------------
router.get('/', (req,res) => {
    knex('posts')
    .orderBy('created_at', 'desc')
    .then(posts => {
      res.render('posts/index', {posts: posts})
    })
})

// ---------------Show a single Post----------------

router.get('/:id', (req, res) => {
    knex('posts')
      .where('id', req.params.id)
      .first() // this will grab the first instance that matches the requirements
      .then(post => {
        if (!post) {
          res.send("No post found")
        } else {
          res.render('posts/show', {post: post})
        }
      })
  })


  //3. ----------------- Render New Post Template----------
router.get('/form', (req, res) => {
    res.render('posts/form', {post: false})
  })
  
  //---------------- Create a new Post -----------------
  router.post('/', (req,res) => {
    knex('posts')
      .insert({
        title: req.body.title,
        image_url: req.body.image_url,
        content: req.body.content
      })
      .returning('*')
      .then(posts => {
        const post = posts[0]
        res.redirect(`posts/${post.id}`)
      }) 
  })


  module.exports = router
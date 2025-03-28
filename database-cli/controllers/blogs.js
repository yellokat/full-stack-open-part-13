const Blog = require('../models/blog');
const express = require('express');
const {blogFinder} = require("../util/middleware");

router = express.Router();

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({error})
  }
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    // if(req.body.author){
    //   req.blog.author = req.body.author
    // }
    // if(req.body.title){
    //   req.blog.title = req.body.title
    // }
    // if(req.body.url){
    //   req.blog.url = req.body.url
    // }
    if(req.body.likes){
      req.blog.likes = req.body.likes
    }
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
  }
  res.status(204).end()
})

module.exports = router
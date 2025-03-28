const Blog = require('../models/blog');
const express = require('express');
const {blogFinder, tokenExtractor, blogFinderWithAuthorDetail} = require("../util/middleware");
const {User} = require("../models");
const {AuthError} = require("../util/errors");
const {Op} = require("sequelize");

router = express.Router();

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: {exclude: ['userId']},
    include: {
      model: User,
      attributes: ['name']
    },
    where: {
      title:{
        [Op.iLike]: req.query.search ? `%${req.query.search}%` : '%'
      }
    }
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({...req.body, userId: user.id})
  res.json(blog)
})

router.get('/:id', blogFinder, async (req, res) => {
  res.json(req.blog)
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.body.likes) {
    req.blog.likes = req.body.likes
  }
  await req.blog.save()
  res.json(req.blog)
})

router.delete('/:id', [tokenExtractor, blogFinderWithAuthorDetail], async (req, res) => {
  if(req.blog.user.id !== req.decodedToken.id){
    throw new AuthError('permission denied.')
  }
  await req.blog.destroy()
  res.status(204).end()
})

module.exports = router
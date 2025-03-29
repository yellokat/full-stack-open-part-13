const express = require('express');
const {Blog, User} = require("../models");
const {col, fn} = require("sequelize");

router = express.Router();

router.get('/', async (req, res) => {
  const blogs = await User.findAll({
    attributes: [
      ['name', 'author'],
      [fn('COUNT', col('blogs.id')), 'articles'],
      [fn('SUM', col('blogs.likes')), 'likes']
    ],
    include: {
      model: Blog,
      attributes: [],
    },
    group: "user.id",
    order: [
      ["likes", "DESC"]
    ]
  })
  res.status(200).send(blogs)
})

module.exports = router;
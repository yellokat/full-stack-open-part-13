const router = require('express').Router()

const { User, Blog} = require('../models')
const {userFinder, tokenExtractor} = require("../util/middleware");
const {NotExistResourceError} = require("../util/errors");

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {exclude: ['userId']}
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', userFinder, async (req, res) => {
  res.json(req.user)
})

router.put('/:username', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  if(!user){
    throw new NotExistResourceError()
  }
  if(!!req.params.username){
    user.username = req.params.username
    await user.save()
  }
  res.json(user)
})

module.exports = router
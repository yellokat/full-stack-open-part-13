const {Note, Blog, User} = require("../models");
const {NotExistResourceError, AuthError} = require("./errors");
const jwt = require("jsonwebtoken");
const {SECRET} = require("./config");

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id)
  if (!req.note) {
    throw new NotExistResourceError();
  }
  next()
}

const blogFinder = async (req, res, next) => {
  const targetId = req.params.id
  if (targetId !== Number(targetId).toString()) {
    throw new TypeError("ID must be a number.")
  }
  req.blog = await Blog.findByPk(targetId)
  if (!req.blog) {
    throw new NotExistResourceError();
  }
  next()
}

const blogFinderWithAuthorDetail = async (req, res, next) => {
  const targetId = req.params.id
  if (targetId !== Number(targetId).toString()) {
    throw new TypeError("ID must be a number.")
  }
  req.blog = await Blog.findByPk(targetId, {
    include: {
      model: User
    }
  })
  if (!req.blog) {
    throw new NotExistResourceError();
  }
  next()
}

const userFinder = async (req, res, next) => {
  const targetId = req.params.id
  if (targetId !== Number(targetId).toString()) {
    throw new TypeError("ID must be a number.")
  }
  req.user = await User.findByPk(targetId)
  if (!req.user) {
    throw new NotExistResourceError();
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  console.log({error: `${error.name} - ${error.message}`})
  if (error.name === 'NotExistResourceError') {
    return response.status(404).send({error: 'No such resource exists.'})
  } else if (error.name === 'SequelizeValidationError') {
    if (error.message.includes('username must be an email.')) {
      return response.status(400).send({error: error.message})
    } else if (error.message.includes('on year failed')) {
      return response.status(400).send({error: `field 'year' must be after 1991 and before 2025.`})
    } else {
      return response.status(400).send({error: 'Invalid input.'})
    }
  } else if (error.name === 'TypeError' && error.message.includes("ID must be a number.")) {
    return response.status(400).send({error: error.message})
  } else if (error.name === 'AuthError') {
    if (error.message.includes('token invalid')) {
      return response.status(401).json({error: 'token invalid'})
    } else if (error.message.includes('token missing')) {
      return response.status(401).json({error: 'token missing'})
    } else if (error.message.includes('permission denied')) {
      return response.status(401).json({error: 'permission denied'})
    }
  } else {
    return response.status(500).send()
  }
  // next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      throw new AuthError('token invalid')
    }
  } else {
    throw new AuthError('token missing')
  }
  next()
}

module.exports = {
  noteFinder,
  blogFinder,
  userFinder,
  errorHandler,
  tokenExtractor,
  blogFinderWithAuthorDetail,
}
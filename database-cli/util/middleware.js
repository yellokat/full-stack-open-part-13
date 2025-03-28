const {Note, Blog} = require("../models");
const {NotExistResourceError} = require("./errors");

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id)
  if(!req.note){
    throw new NotExistResourceError();
  }
  next()
}

const blogFinder = async (req, res, next) => {
  const targetId = req.params.id
  if(targetId !== Number(targetId).toString()){
    throw new TypeError("ID must be a number.")
  }
  req.blog = await Blog.findByPk(targetId)
  if(!req.blog){
    throw new NotExistResourceError();
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'NotExistResourceError') {
    return response.status(404).send({error: 'No such resource exists.'})
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({error: 'Invalid input.'})
  } else if (error.name === 'TypeError' && error.message.includes("ID must be a number.")){
    return response.status(400).send({error: error.message})
  }
  next(error)
}

module.exports = { noteFinder, blogFinder, errorHandler }
const dataModel = require('../models/dataModel')
const mongoose = require('mongoose')


// get all datas
  const getDatas = async (req, res) => {
    const user_id = req.user._id
    const dataModels = await dataModel.find({user_id}).sort({createdAt: -1})
    // const dataModels = await dataModel.find({}).sort({createdAt: -1})
  
    res.status(200).json(dataModels)
  }

//get single data
  const getData = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such data'})
    }
  
    const data = await dataModel.findById(id)
  
    if (!data) {
      return res.status(404).json({error: 'No such data'})
    }
  
    res.status(200).json(data)
  }
  
  // create new data
  const createData = async (req, res) => {
    const {company, position, status} = req.body
  
    let emptyFields = []
  
    if (!company) {
      emptyFields.push('company')
    }
    if (!position) {
      emptyFields.push('position')
    }
    if (!status) {
      emptyFields.push('status')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
  
    // add to the database
    try {
      const data = await dataModel.create({ company, position, status, user_id })
      res.status(200).json(data)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  
  // delete a workout
  const deleteData = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const workout = await Workout.findOneAndDelete({_id: id})
  
    if(!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(workout)
  }
  
  // update a workout
  const updateData = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const data = await Workout.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!data) {
      return res.status(400).json({error: 'No such data'})
    }
  
    res.status(200).json(data)
  }
  
  module.exports = {
    getDatas,
    getData,
    createData,
    deleteData,
    updateData
  }
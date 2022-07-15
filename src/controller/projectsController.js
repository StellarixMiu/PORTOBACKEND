import { createError } from "../controller/errorHandling.js"
import Projects from "../models/projectsModel.js"


//add project
export const addProject = async (req, res, next) => {
  const newProject = new Projects(req.body)
  try {
    await newProject.save()
    res.status(200).json(newProject)
  } catch (err) {
    next(err)
  }
}

//update project
export const updateProject = async (req, res, next) => {
  if(!req.params.id) return next(createError(403, "Wrong Credentials!"))
  try {
    const project = await Projects.findById(req.params.id)
    if(!project) return next(createError(404, "Project not found!!"))

    const updatedProject = await Projects.findByIdAndUpdate(
      req.params.id,
      { 
        $set: req.body 
      },
      { $new:true }
      )

    res.status(200).json(updatedProject)
  } catch (err) {
    next(err)
  }
}


//delete project
export const deleteProject = async (req, res, next) => {
  if(!req.params.id) return next(createError(403, "Wrong Credentials!"))
  try {
    const project = await Projects.findById(req.params.id)
    if(!project) return next(createError(404, "Project not found!!"))

    const deletedProject = await Projects.findByIdAndDelete(req.params.id)
    res.status(200).json("Project has been deleted")
  } catch (err) {
    next(err)
  }
}

//get project by id
export const getProjectById = async (req, res, next) => {
  if(!req.params.id) return next(createError(403, "Wrong Credentials!"))
  try {
    const project = await Projects.findById(req.params.id)
    if(!project) return next(createError(404, "Project not found!!"))

    res.status(200).json(project)
  } catch (err) {
    next(err)
  }
}

//get all projects
export const getAllProject = async (req, res, next) => {
  try {
    const projects = await Projects.find()

    res.status(200).json(projects)
  } catch (err) {
    next(err)
  }
}
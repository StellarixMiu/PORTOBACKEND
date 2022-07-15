import express from 'express'
import { addProject, updateProject, deleteProject, getProjectById, getAllProject } from '../controller/projectsController.js'
import { verifyToken } from '../controller/verifyToken.js'

const router = express.Router()

//add project
router.post('/add', verifyToken, addProject)

//update project
router.put('/:id', verifyToken, updateProject)

//delete project
router.delete('/:id', verifyToken, deleteProject)

//get project by id
router.get('/:id', getProjectById)

//get all projects
router.get('/', getAllProject)

export default router
import express from 'express'
import { addContact, deleteContact, getContactById, getAllContacts } from '../controller/contactsController.js'
import { verifyToken } from '../controller/verifyToken.js'

const router = express.Router()

//add contact
router.post('/add', verifyToken, addContact)

//delete contact
router.delete('/:id', verifyToken, deleteContact)

//get contact by id
router.get('/:id', verifyToken, getContactById)

//get all contacts
router.get('/', verifyToken, getAllContacts)

export default router
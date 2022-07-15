import { createError } from "../controller/errorHandling.js"
import Contacts from "../models/contactsModal.js"


//add project
export const addContact = async (req, res, next) => {
  const newContact = new Contacts(req.body)
  try {
    await newContact.save()
    res.status(200).json(newContact)
  } catch (err) {
    next(err)
  }
}

//// update project
// export const updateContact = async (req, res, next) => {
//   if(!req.params.id) return next(createError(403, "Wrong Credentials!"))
//   try {
//     const contact = await Contacts.findById(req.params.id)
//     if(!contact) return next(createError(404, "Project not found!!"))

//     const updatedProject = await Contacts.findByIdAndUpdate(
//       req.params.id,
//       { 
//         $set: req.body 
//       },
//       { $new:true }
//       )

//     res.status(200).json(updatedProject)
//   } catch (err) {
//     next(err)
//   }
// }


//delete project
export const deleteContact = async (req, res, next) => {
  if(!req.params.id) return next(createError(403, "Wrong Credentials!"))
  try {
    const contact = await Contacts.findById(req.params.id)
    if(!contact) return next(createError(404, "Contact not found!!"))

    const deletedContact = await Contacts.findByIdAndDelete(req.params.id)
    res.status(200).json("Contact has been deleted")
  } catch (err) {
    next(err)
  }
}

//get project by id
export const getContactById = async (req, res, next) => {
  if(!req.params.id) return next(createError(403, "Wrong Credentials!"))
  try {
    const contact = await Contacts.findById(req.params.id)
    if(!contact) return next(createError(404, "Contact not found!!"))

    res.status(200).json(contact)
  } catch (err) {
    next(err)
  }
}

//get all projects
export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.find()

    res.status(200).json(contacts)
  } catch (err) {
    next(err)
  }
}
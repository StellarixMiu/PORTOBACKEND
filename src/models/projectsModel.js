import mongoose from 'mongoose'

const projectsModel = new mongoose.Schema(
    {
        img: {
            type: String,
            required: true
        },
        title: {
            type: String,
            unique: true
        },
        desc: {
            type: String,
            required: true
        },
    },

    { timestamps: true },
)

export default mongoose.model( "Project", projectsModel )
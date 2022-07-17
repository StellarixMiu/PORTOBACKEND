import mongoose from 'mongoose'

const projectsModel = new mongoose.Schema(
    {
        img: {
            data: Buffer,
            contentType: String
        },
        slug: {
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
        preview: {
            type: String,
            required: true
        },
        github: {
            type: String,
            required: true
        },
    },

    { timestamps: true },
)

export default mongoose.model( "Project", projectsModel )
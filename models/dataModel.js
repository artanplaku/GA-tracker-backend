const mongoose =  require('mongoose')

const Schema = mongoose.Schema

const dataSchema = new Schema ({
    company:{
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
    status:{
        type: String,
    },
    user_id: {
        type: String,
        required: true
    }
    
}, { timestamps: true })

module.exports = mongoose.model('data', dataSchema)

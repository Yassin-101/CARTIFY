const mongoose = require('mongoose')

const connnectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database conneted successfully🚀🚀🚀")
    } catch (error) {
        console.log("Connection failed💀💀💀")
        process.exit(1) 
    }
}

module.exports = connnectDB
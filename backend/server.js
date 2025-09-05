const app = require('./app')
const connnectDB = require('./db')

const PORT = process.env.PORT || 3100

connnectDB()

app.listen(PORT,()=>{
    console.log(`Server running on PORT: ${PORT}`)
})
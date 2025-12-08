import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

// Initialize express
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())  // required for JSON body parsing

// Connect to database
await connectDB()

// Routes
app.get('/', (req, res) => res.send("API Working"))


app.post('/clerk', express.json(), clerkWebhooks)

// Port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

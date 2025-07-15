import { Server } from 'http'
import mongoose from 'mongoose';
import 'dotenv/config'
import app from './app';


let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)

        server = app.listen(5000, () => {
            console.log(`Server is listing to port 5000`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()



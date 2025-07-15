import express from 'express'
import cors from 'cors';
import cookieParser from "cookie-parser"
import { userRouter } from './modules/user/user.routes';


const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.use("/api", userRouter)



app.get("/", (req, res) => {
    res.status(200).json({
        massage: "Welcome to Sm Technology Server"
    })
})

export default app;
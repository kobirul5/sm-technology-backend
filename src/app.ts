import express from 'express'
import cors from 'cors';
import cookieParser from "cookie-parser"
import { userRouter } from './modules/user/user.routes';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';


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

app.use(globalErrorHandler)
app.use(notFound)

export default app;

import express from 'express'


const app = express()

app.get("/", (req, res) => {
    res.status(200).json({
        massage: "Welcome to Sm Technology Server"
    })
})

export default app;
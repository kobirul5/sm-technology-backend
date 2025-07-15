import { Request, Response } from 'express'

import { User } from './user.model';
import { generateAccessToken } from '../../utils/generateAccessToken';



const createUser = async (req: Request, res: Response) => {
    const body = req.body;
    const { name, email, password, } = body;

    if (name === "" || email === "" || password === "") {
        throw new Error("Make Sure Name, Email and Password Not Empty")
    }

    const existUser = await User.findOne({
        $or: [{ email }]
    })

    if (existUser) {
        throw new Error("User With email Already Exist")
    }

    const user = await User.create(body)

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
        throw new Error("Something is wrong while create user")
    }


    const accessToken = await generateAccessToken(user._id.toString())


    // cookie
    const options = {
        httpOnly: true,
        secure: false
    }

    res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json({
        success: true,
        massage: "Create User Successfully",
        data: createdUser,
        token: accessToken
    })
}



export {createUser}
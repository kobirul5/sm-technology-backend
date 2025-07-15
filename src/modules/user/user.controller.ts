import { Request, Response } from 'express'

import { User } from './user.model';
import { generateAccessToken } from '../../utils/generateAccessToken';
import { AuthRequest } from '../../middlewares/auth.middleware';



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
            token: accessToken
        })
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("Email and Password required")
    }
    // get user
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("User Dose not exist")
    }
    // passwordCheck
    const passwordCheck = await user.isPasswordCorrect(password.toString())

    if (!passwordCheck) {
        throw new Error("Invalid user credentials")
    }
    // token
    const accessToken = await generateAccessToken(user._id.toString())

    const loginUser = await User.findById(user._id).select(
        "-password"
    )

    if (!loginUser) {
        throw new Error("Something is wrong while login user")
    }

    // cookie
    const options = {
        httpOnly: true,
        secure: true
    }

    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json({
            success: true,
            massage: "User Login Successfully",
            data: loginUser,
            token: accessToken
        })
}


const getUserByEmailIfValidToken = async (req: AuthRequest, res: Response) => {
    const user = req.user;
    res
        .status(200)
        .json({
            success: true,
            massage: "User data get Successfully",
            data: user
        })
}




export { createUser, loginUser, getUserByEmailIfValidToken }
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmailIfValidToken = exports.loginUser = exports.createUser = void 0;
const user_model_1 = require("./user.model");
const generateAccessToken_1 = require("../../utils/generateAccessToken");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { name, email, password, } = body;
    if (name === "" || email === "" || password === "") {
        throw new Error("Make Sure Name, Email and Password Not Empty");
    }
    const existUser = yield user_model_1.User.findOne({
        $or: [{ email }]
    });
    if (existUser) {
        throw new Error("User With email Already Exist");
    }
    const user = yield user_model_1.User.create(body);
    const createdUser = yield user_model_1.User.findById(user._id).select("-password");
    if (!createdUser) {
        throw new Error("Something is wrong while create user");
    }
    const accessToken = yield (0, generateAccessToken_1.generateAccessToken)(user._id.toString());
    // cookie
    const options = {
        httpOnly: true,
        secure: false
    };
    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json({
        success: true,
        massage: "Create User Successfully",
        token: accessToken
    });
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("Email and Password required");
    }
    // get user
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new Error("User Dose not exist");
    }
    // passwordCheck
    const passwordCheck = yield user.isPasswordCorrect(password.toString());
    if (!passwordCheck) {
        throw new Error("Invalid user credentials");
    }
    // token
    const accessToken = yield (0, generateAccessToken_1.generateAccessToken)(user._id.toString());
    const loginUser = yield user_model_1.User.findById(user._id).select("-password");
    if (!loginUser) {
        throw new Error("Something is wrong while login user");
    }
    // cookie
    const options = {
        httpOnly: true,
        secure: true
    };
    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json({
        success: true,
        massage: "User Login Successfully",
        data: loginUser,
        token: accessToken
    });
});
exports.loginUser = loginUser;
const getUserByEmailIfValidToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    res
        .status(200)
        .json({
        success: true,
        massage: "User data get Successfully",
        data: user
    });
});
exports.getUserByEmailIfValidToken = getUserByEmailIfValidToken;

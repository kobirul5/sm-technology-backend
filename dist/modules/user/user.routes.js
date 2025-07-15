"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/register", user_controller_1.createUser);
exports.userRouter.post("/login", user_controller_1.loginUser);
exports.userRouter.get("/me", auth_middleware_1.verifyJWT, user_controller_1.getUserByEmailIfValidToken);

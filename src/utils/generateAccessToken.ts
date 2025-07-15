import { User } from "../modules/user/user.model";


export const generateAccessToken = async (userId: string) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new Error( "User not found");
        }
        const accessToken = user.generateAccessToken()
        
        return accessToken;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new Error("Something is wrong while generating token")
    }
}

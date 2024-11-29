import {z} from "zod";

const SignInType = z.object({
    email: z.string().min(3, { message: "The email should have at least 3 characters" }),
    password: z.string().min(6, { message: "The password should have at least 6 characters" })
})

type TSignIn = z.infer<typeof SignInType>

const SignUpType = z.object({
    username: z.string().min(3, {message: "The username should have at least 3 characters"}),
    email: z.string().min(3, {message: "The email should have at least 3 characters"}),
    password: z.string().min(6, {message: "The password should have at least 6 characters"}),
})

type TSignUp = z.infer<typeof SignUpType>

const GetUserDataType = z.object({

})


export {
    SignInType,
    SignUpType,
    GetUserDataType,
}

export type {
    TSignIn,
    TSignUp
}



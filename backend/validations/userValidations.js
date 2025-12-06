const {z} = require("zod");

const userValidatorSignUp = z.object({
    email: z.email(),
    name : z.string().min(4, "Name must be at least 4 characters").max(50, "Name must be at most 50 characters"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

const userValidatorSignIn = z.object({
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters")
})

module.exports = {
    userValidatorSignUp,
    userValidatorSignIn
}
const {z} = require("zod");

const bookmarkValidator = z.object({
    url: z.url(),
    category: z.string().min(5, "Category should be atleast 5 characters").max(50, "Category should be less that 50 characters")
})

module.exports = {
    bookmarkValidator
}
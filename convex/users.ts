import { mutation } from "./_generated/server"
import { v } from "convex/values"
import bcrypt from "bcryptjs"

export const login = mutation({
    args: {
        username: v.string(),
        password: v.string()
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users")
            .filter((q) => q.eq(q.field("username"), args.username))
            .unique();

        if (!user) {
            return { success: false as const, message: "User not found!" }
        }

        const passwordCorrect = bcrypt.compareSync(args.password, user.password)

        if (!passwordCorrect) {
            return { success: false as const, message: "Invalid credentials!" }
        }

        return { success: true as const, userId: user._id }
    }
})

export const register = mutation({
    args: {
        username: v.string(),
        password: v.string()
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users")
            .filter((q) => q.eq(q.field("username"), args.username))
            .unique();

        if (user) {
            return { success: false as const, userId: undefined, message: "User already exists!" }
        }

        const hashedPassword = bcrypt.hashSync(args.password, 10);

        const userId = await ctx.db.insert("users", {
            username: args.username,
            password: hashedPassword
        });

        return { success: true as const, userId, message: undefined }
    }
})
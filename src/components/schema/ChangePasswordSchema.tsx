import * as zod from "zod";

export const ChangePasswordSchema = zod
    .object({
        currentPassword: zod
        .string()
        .min(6, "Old password must be at least 6 characters"),

        password: zod
        .string()
        .min(6, "New password must be at least 6 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            "Password must contain uppercase, lowercase, number, and special character"
        ),

        rePassword: zod.string().nonempty("RePassword Is Required"),
    })
    .refine((data) => data.currentPassword !== data.password, {
        message: "New password cannot be the same as the old password",
        path: ["password"], 
    })
    .refine((data) => data.password === data.rePassword, {
        path: ["rePassword"],
        message: "Password and RePassword don't match",
    });

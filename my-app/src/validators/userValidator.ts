import { z } from "zod";

export const userSchema = z.object({
	name: z.string().optional(),
	username: z.string({ message: "username is required" }),
	email: z
		.string({ message: "email is required" })
		.email({ message: "invalid email format" }),
	password: z
		.string({ message: "password is required" })
		.min(5, { message: "password must be 5 character" }),
});

// const userSchemaWithId = userSchema.extend({
// 	_id: z.string(),
// });

export type typeUser = z.infer<typeof userSchema>;

export type typeUserResponse = Omit<typeUser, "password">;

export const loginSchema = z.object({
	email: z
		.string({ message: "email is required" })
		.email({ message: "invalid email format" }),
	password: z.string({ message: "password is required" }),
});

export type typeLoginSchema = z.infer<typeof loginSchema>;

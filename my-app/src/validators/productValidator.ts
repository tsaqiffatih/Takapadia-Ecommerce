import { z } from "zod";

// Schema untuk entitas Products
export const productSchema = z.object({
	name: z.string({ message: "Product Name Is Required" }),
	slug: z.string({ message: "Product Slug Is Required" }),
	description: z.string().optional(),
	excerpt: z.string().optional(),
	price: z.number().optional(),
	tags: z.array(z.string()).optional(),
	thumbnail: z.string().optional(),
	images: z.string().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export type typeProduct = z.infer<typeof productSchema>

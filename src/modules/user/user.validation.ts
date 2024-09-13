import z, { optional } from "zod";

export const userZodSchema = z.object({
  body: z.object({
    name: z.string({required_error:"name is required"}),
    email: z.string({required_error:"email is required"}),
    password: z.string({required_error:"password is required"}),
    role: z.string().optional(),
    contactNo: z.string({required_error:"contactNo is required"}),
    address: z.string({required_error:"address is required"}),
    profileImg: z.string().optional(),
  }),
});

export const userLoginZodSchema = z.object({
  body:z.object({
    email:z.string({required_error:"email is required"}),
    password:z.string({required_error:"password is required"})
  })
})


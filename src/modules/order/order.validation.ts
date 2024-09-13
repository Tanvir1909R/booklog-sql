import z from "zod";

const orderArrayZodSchema = z.object({
  bookId:z.string(),
  quantity:z.number()
})
export const orderZodSchema = z.object({
  body: z.object({
    orderedBooks:z.array(orderArrayZodSchema)
  }),
});

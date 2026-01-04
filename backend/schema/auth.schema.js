import z from "zod";
const signSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  username: z.string().min(3),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must include at least one special character"
    ),
});
export default signSchema;

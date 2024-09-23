import { z } from "zod";

const zodUserValidationSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(5, "Name lenght must be greter then 5"),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Must be email type",
      })
      .email("Invalid email address"),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be string",
      })
      .min(8, "Password must  be 8 chercter long"),
    confirmPassword: z
      .string({
        required_error: "Password does not match",
        invalid_type_error: "Password must be string",
      })
      .min(8,"Password does not match")
  })
  .refine((userData) => userData.password !==userData.confirmPassword , {
    message: "Password dont match",
    path: ["confirmPassword"],
  });

export default zodUserValidationSchema;

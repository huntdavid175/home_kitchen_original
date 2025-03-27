"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Validation schemas
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

type CheckEmailResponse = {
  status: "error" | "exists" | "available";
  error?: string;
  message?: string;
};

export async function checkEmail(
  formData: FormData
): Promise<CheckEmailResponse> {
  const supabase = await createClient();

  try {
    const validatedData = emailSchema.parse({
      email: formData.get("email"),
    });

    // Check if user exists
    const { data: existingUser, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", validatedData.email)
      .single();

    if (error && error.code !== "PGRST116") {
      return {
        status: "error",
        error: "An error occurred while checking email",
      };
    }

    if (existingUser) {
      return {
        status: "exists",
        message:
          "An account with this email already exists. Please sign in instead.",
      };
    }

    return {
      status: "available",
      message: "Email is available for signup",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        status: "error",
        error: error.errors[0].message,
      };
    }
    return {
      status: "error",
      error: "Invalid email format",
    };
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  try {
    const validatedData = signupSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const { error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "An error occurred during signup" };
  }
}

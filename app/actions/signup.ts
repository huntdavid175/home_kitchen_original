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
  try {
    const validatedData = emailSchema.parse({
      email: formData.get("email"),
    });

    // Make a fetch request to the local API
    const response = await fetch(
      `http://localhost:3001/api/users/${validatedData.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.status === 404) {
      return {
        status: "available",
        message: "Email is available for signup",
      };
    }

    if (response.status === 400) {
      return {
        status: "error",
        error: data.error || "Invalid email format",
      };
    }

    if (response.status === 500) {
      return {
        status: "error",
        error: "An error occurred while checking email",
      };
    }

    // If we get here, the user exists (response.status === 200)
    return {
      status: "exists",
      message:
        "An account with this email already exists. Please sign in instead.",
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
    // Log the raw form data
    console.log("Raw form data:", {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const validatedData = signupSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    console.log("Validated data:", validatedData);

    const { data: signUpData, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (error) {
      console.error("Supabase signup error:", error);
      return { error: error.message };
    }

    // Sync user with our database
    if (signUpData.user?.id) {
      const syncResponse = await fetch("http://localhost:3001/api/users/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supabaseUserId: signUpData.user.id,
        }),
      });

      if (!syncResponse.ok) {
        console.error("Failed to sync user with database");
        // We don't want to fail the signup if sync fails
        // Just log the error and continue
      }
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error.errors);
      return { error: error.errors[0].message };
    }
    return { error: "An error occurred during signup" };
  }
}

import { NextResponse } from "next/server";
import crypto from "crypto";
import supabase from "@/lib/supabase";
import { login } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", trimmedEmail)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // Hash the password with a randomly generated salt using scrypt
    const salt = crypto.randomBytes(16).toString("hex");
    const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
    const hashedPassword = `${salt}:${derivedKey}`;

    const { data: newUser, error } = await supabase
      .from("users")
      .insert({
        name,
        email: trimmedEmail,
        password: hashedPassword,
        role: "user"
      })
      .select("id, name, email, role")
      .single();

    if (error || !newUser) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to create account." }, { status: 500 });
    }

    // Automatically establish Next.js session cookie
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: false,
    };

    await login(userData);

    console.log(`[AUTH] Registered and logged in new user: ${trimmedEmail}`);

    return NextResponse.json({
      success: true,
      user: userData,
      message: "Account created and signed in successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


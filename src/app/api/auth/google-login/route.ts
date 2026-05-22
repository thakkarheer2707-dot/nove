import { NextResponse } from "next/server";
import crypto from "crypto";
import supabase from "@/lib/supabase";
import { login } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required for Google Sign-in." }, { status: 400 });
    }

    const trimmedEmail = email.toLowerCase().trim();
    const displayName = name || trimmedEmail.split("@")[0];

    // Check if user exists in database
    let { data: user, error } = await supabase
      .from("users")
      .select("id, name, email, role")
      .eq("email", trimmedEmail)
      .single();

    if (error || !user) {
      // User doesn't exist, register them automatically
      // Hash a random password to secure the DB row
      const randomPassword = crypto.randomBytes(32).toString("hex");
      const salt = crypto.randomBytes(16).toString("hex");
      const derivedKey = crypto.scryptSync(randomPassword, salt, 64).toString("hex");
      const hashedPassword = `${salt}:${derivedKey}`;

      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert({
          name: displayName,
          email: trimmedEmail,
          password: hashedPassword,
          role: "user" // Default to user customer
        })
        .select("id, name, email, role")
        .single();

      if (insertError || !newUser) {
        console.error("Supabase Google-sign-in insert error:", insertError);
        return NextResponse.json({ error: "Failed to initialize Google account." }, { status: 500 });
      }

      user = newUser;
    }

    // Determine admin status
    const adminEmail = process.env.ADMIN_EMAIL || "admin@nove.in";
    const isAdmin = user.role === "admin" || trimmedEmail === adminEmail;

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin,
    };

    // Create session cookie
    await login(userData);

    console.log(`[AUTH] Google user signed in: ${trimmedEmail} (Admin: ${isAdmin})`);

    return NextResponse.json({
      success: true,
      user: userData,
      isAdmin,
      message: "Signed in successfully via Google",
    });
  } catch (error) {
    console.error("Google Sign-in error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

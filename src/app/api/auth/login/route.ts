import { NextResponse } from "next/server";
import crypto from "crypto";
import supabase from "@/lib/supabase";
import { login } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const trimmedEmail = email.toLowerCase().trim();

    // Check for user in database
    const { data: user, error } = await supabase
      .from("users")
      .select("id, name, email, password, role")
      .eq("email", trimmedEmail)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "No account found with this email." }, { status: 404 });
    }

    let isValid = false;
    if (user.password && user.password.includes(":")) {
      const [salt, storedHash] = user.password.split(":");
      const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
      isValid = crypto.timingSafeEqual(
        Buffer.from(storedHash, "hex"),
        Buffer.from(derivedKey, "hex")
      );
    } else {
      // Fallback for cleartext (security risk - only for legacy support)
      isValid = user.password === password;
    }

    if (!isValid) {
      return NextResponse.json({ error: "Invalid password. Please try again." }, { status: 401 });
    }

    // Determine admin status
    // Priority: 1. DB role field, 2. Admin email environment variable, 3. Legacy hardcoded check (only as fallback)
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

    console.log(`[AUTH] User signed in: ${trimmedEmail} (Admin: ${isAdmin})`);

    return NextResponse.json({
      success: true,
      user: userData,
      isAdmin, // Still return for UI convenience, but server will verify via cookie
      message: "Signed in successfully",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


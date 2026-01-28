import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_auth", "yes", { httpOnly: true, sameSite: "lax", path: "/" });
    return res;
  }

  return NextResponse.json({ ok: false, message: "Invalid credentials" }, { status: 401 });
}

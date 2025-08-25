import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function sds(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  // Create Supabase client directly in middleware (don't use supabaseServer())
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (!session || sessionError) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const { data: employee, error: employeeError } = await supabase
      .from("employees")
      .select("role")
      .eq("id", session.user.id)
      .maybeSingle();

    if (employeeError || !employee) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    const role = employee.role;

    // Your existing role checking logic
    if (req.nextUrl.pathname.startsWith("/cashier")) {
      if (!["cashier", "admin"].includes(role)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    if (req.nextUrl.pathname.startsWith("/waiter")) {
      if (!["waiter", "admin"].includes(role)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
    
    if (req.nextUrl.pathname.startsWith("/kitchen")) {
      if (!["chef", "cook", "admin"].includes(role)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return response;

  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  // matcher: ["/kitchen/:path*", "/admin/:path*", "/waiter/:path*", "/cashier/:path*"],
};
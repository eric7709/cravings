import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Define your role types
type Role = 'admin' | 'chef' | 'cook' | 'waiter' | 'cashier';

// Define route permissions
const ROUTE_PERMISSIONS: Record<string, Role[]> = {
  '/admin': ['admin'],
  '/kitchen': ['chef', 'cook', 'admin'],
  '/waiter': ['waiter', 'admin'],
  '/cashier': ['cashier', 'admin'],
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // Skip middleware for /auth/login and public routes
  if (pathname === '/auth/login' || pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/favicon.ico') || pathname.startsWith('/public')) {
    return NextResponse.next();
  }
  let response = NextResponse.next();
  // Create Supabase client for middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Get user session
  const { data: { user }, error } = await supabase.auth.getUser();

  // If no user, redirect to login
  if (!user || error) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Get user profile with role from employees table
  const { data: employee, error: employeeError } = await supabase
    .from('employees')
    .select('role')
    .eq('id', user.id)
    .single();

  if (employeeError || !employee) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  const userRole = employee.role as Role;

  // Check if route requires specific roles
  const requiredRoles = getRequiredRolesForPath(pathname);

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return response;
}

function getRequiredRolesForPath(pathname: string): Role[] | null {
  // Check exact matches first
  if (ROUTE_PERMISSIONS[pathname]) {
    return ROUTE_PERMISSIONS[pathname];
  }

  // Check for nested routes
  for (const [route, roles] of Object.entries(ROUTE_PERMISSIONS)) {
    if (pathname.startsWith(route + '/')) {
      return roles;
    }
  }

  return null; // No restrictions for this route
}

export const config = {
  matcher: [
    '/((?!auth/login|unauthorized|menu|menu/:path*|/|_next/static|_next/image|favicon.ico).*)',
  ],
}
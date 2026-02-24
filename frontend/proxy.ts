import { NextRequest, NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'

const AdminRoutes = [
    '/admin/dashboard',
    '/admin/events',
    '/admin/registrations',
    '/admin/users',
    '/admin/registrations/[slug]'
];

const usersProtectedRoutes = [
    "/profile",
    "/registered"
];

interface JwtPayload {
    role: 'ADMIN' | 'USER';
    exp: number;
    // add other fields your token has e.g. id, email
}

function isAdminRoute(pathname: string): boolean {
    return AdminRoutes.some(route => {
        const pattern = route.replace(/\[.*?\]/g, '[^/]+');
        const regex = new RegExp(`^${pattern}(/.*)?$`);
        return regex.test(pathname);
    });
}

function isUserProtectedRoute(pathname: string): boolean {
    return usersProtectedRoutes.some(route => pathname.startsWith(route));
}

export async function proxy(request: NextRequest) {
    const accessToken = request.cookies.get("access_token")?.value;
    const { pathname } = request.nextUrl;

    const adminRoute = isAdminRoute(pathname);
    const userRoute = isUserProtectedRoute(pathname);

    // Not a protected route — let it through
    if (!adminRoute && !userRoute) {
        return NextResponse.next();
    }

    // No token — redirect to login
    if (!accessToken) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    try {
        const decoded = jwtDecode<JwtPayload>(accessToken);

        // Check if token is expired
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }

        const role = decoded.role;

        // Admin route — only ADMIN role allowed
        if (adminRoute && role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        // User protected route — any logged in user (ADMIN or USER) can access
        if (userRoute && role !== 'USER' && role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        return NextResponse.next();

    } catch (error) {
        // Token is malformed
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/profile/:path*',
        '/registered/:path*',
    ],
};
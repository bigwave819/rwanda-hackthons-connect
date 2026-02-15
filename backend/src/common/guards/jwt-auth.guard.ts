import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const auth = req.headers.authorization;

        if (!auth) throw new UnauthorizedException('Missing token');

        const token = auth.replace('Bearer ', '');

        if (!token) {
            throw new UnauthorizedException('Missing token');
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            req.user = {
                id: payload.sub,
                email: payload.email,
                role: payload.role
            };
            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }

    }
}
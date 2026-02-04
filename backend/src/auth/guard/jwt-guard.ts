import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { Observable } from 'rxjs'

@Injectable()
export class JwtGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const auth = req.headers.authorization;

        if (!auth) throw new UnauthorizedException('Missing token');

        const token = auth.replace('Bearer ', '');

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET!);
            req.user = payload;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }

    }
}
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IPayload } from '../interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    let token: string;
    let decodedToken: IPayload;

    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7);
      decodedToken = await this.authService.validateJwt(token);
    }

    if (!token || !decodedToken) return false;

    const { userId } = decodedToken;

    req.body.userId = userId;
    return true;
  }
}

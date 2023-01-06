import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: Function) {
    let token: string
    let decodedToken: string

    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
      decodedToken = await this.authService.validateJwt(token)
    }

    if(!token || !decodedToken) res.status(401).json({
      message: "Unauthorized, invalid or missing token",
      ok: false,
    })

    next();
  }
}

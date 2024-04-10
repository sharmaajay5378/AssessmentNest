import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Inside UserMiddleware');
        console.log(req.headers?.authorization);
        req.headers['authorization'] =
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMTk3MDIyOCwiaWF0IjoxNzExOTcwMjI4fQ.E1goApXjPrJQDUb9cX_5-uPlSb6ZeY71Z1mGlxYJX7k';
        console.log('Modified Request Object');
        console.log(req.headers?.authorization);
        next();
    }
}

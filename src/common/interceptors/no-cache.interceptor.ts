import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// Import các hằng số vừa tạo
import {
  HEADER_CACHE_CONTROL,
  CACHE_CONTROL_NO_CACHE_VALUE,
  HEADER_PRAGMA,
  PRAGMA_NO_CACHE_VALUE,
  HEADER_EXPIRES,
  EXPIRES_VALUE
} from 'src/common/constants/http-headers.constants';

@Injectable()
export class NoCacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    response.setHeader(HEADER_CACHE_CONTROL, CACHE_CONTROL_NO_CACHE_VALUE);
    response.setHeader(HEADER_PRAGMA, PRAGMA_NO_CACHE_VALUE);
    response.setHeader(HEADER_EXPIRES, EXPIRES_VALUE);

    return next.handle().pipe(tap(() => {}));
  }
}

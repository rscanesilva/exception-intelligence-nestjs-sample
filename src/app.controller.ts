import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

@Controller('test')
export class AppController {

  /** GET /test/ok */
  @Get('ok')
  ok() { return 'everything is fine'; }

  /** GET /test/type  → TypeError */
  @Get('type')
  typeError() {
    const obj: any = null;
    return obj.name; // TypeError: Cannot read properties of null
  }

  /** GET /test/range  → RangeError */
  @Get('range')
  rangeError() {
    const arr: string[] = [];
    arr.length = -1; // RangeError: Invalid array length
    return arr;
  }

  /** GET /test/custom  → custom error with request context */
  @Get('custom')
  customError(@Query('user') user: string) {
    if (!user) {
      throw new BadRequestException(
        `User is required — please provide a 'user' query parameter. Received: ${user}`
      );
    }
    return { user };
  }
}

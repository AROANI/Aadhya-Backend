import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getServerUp(): string {
    return this.appService.getServerUpMessage();
  }

  @Get('/health')
  getHealthCheck(): string {
    return this.appService.getHealthCheck();
  }

  @Get('/db-check')
  checkDb() {
    return this.appService.checkDbConnection();
  }
}

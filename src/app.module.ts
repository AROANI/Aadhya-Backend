import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import typeORM from './typeorm.config';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ChildModule } from './child/child.module';
import { NgoModule } from './ngo/ngo.module';
import { AssessmentModule } from './assessment/assessment.module';
import { SubjectModule } from './subject/subject.module';
import { ActivityModule } from './activity/activity.module';
import { PersonModule } from './person/person.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeORM],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ConfigService.get('typeorm') as any,
    }),
    ChildModule,
    NgoModule,
    AssessmentModule,
    SubjectModule,
    ActivityModule,
    PersonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, // Tells Nest to apply globally
      useClass: ResponseInterceptor, // interceptor logic
    },
    {
      provide: APP_FILTER, // Global exception handler
      useClass: GlobalExceptionFilter, // filter logic
    },
  ],
})
export class AppModule {}

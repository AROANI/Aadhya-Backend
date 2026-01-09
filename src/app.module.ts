import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

// Entities
import { Assessment } from './entities/assessment.entity'; // 👈 NEW IMPORT

// Modules
import { ChildModule } from './child/child.module';
import { NgoModule } from './ngo/ngo.module';
import { AssessmentModule } from './assessment/assessment.module';
import { SubjectModule } from './subject/subject.module';
import { ActivityModule } from './activity/activity.module';
import { PersonModule } from './person/person.module';
import { AuthModule } from './auth/auth.module';
import { ResponsesModule } from './responses/responses.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'aadhya',
      password: 'super_secret_password',
      database: 'aadhya',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Assessment], // 👈 Explicitly added to ensure table creation
    }),
    ChildModule,
    NgoModule,
    AssessmentModule,
    SubjectModule,
    ActivityModule,
    PersonModule,
    AuthModule,
    ResponsesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // ❌ I REMOVED THE RESPONSE INTERCEPTOR TO FIX THE "DATA WRAPPER" BUG
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}

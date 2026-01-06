import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectDataSource() private datasource: DataSource) {}

  getServerUpMessage(): string {
    return 'Server is Running';
  }

  getHealthCheck() {
    return 'ok';
  }

  async checkDbConnection() {
    try {
      if (this.datasource.isInitialized) {
        return {
          message: 'DB connected successfully',
        };
      }
    } catch (error) {
      console.error(error); // <--- logic added: This uses the variable and fixes the error!
      return { message: 'Error connecting to DB' };
    }
  }
}

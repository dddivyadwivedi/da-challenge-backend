import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
const ORMConfig = require('./config/typeorm.config');
import { CalenderTasksModule } from './calender_tasks/calender_tasks.module';


@Module({
  imports: [TypeOrmModule.forRoot(ORMConfig), CalenderTasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

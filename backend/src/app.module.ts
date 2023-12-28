import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SeleniumService } from './selenium/selenium.service';
import { SeleniumController } from './selenium/selenium.controller';
import { CategoryModule } from './category/category.module';

import config from 'ormconfig';

@Module({
  imports: [
    UserModule,
    TaskModule,
    TypeOrmModule.forRoot(config),
    AuthModule,
    CategoryModule,
  ],
  controllers: [AppController, SeleniumController],
  providers: [AppService, SeleniumService],
})
export class AppModule {}

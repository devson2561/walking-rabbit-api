import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormConfig } from './config/typeorm.config';

import { CategoryModule } from './modules/category/category.module';
import { BeverageModule } from './modules/beverage/beverage.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { AttributeModule } from './modules/attribute/attribute.module';
import { MachineModule } from './modules/machine/machine.module';
import { BeverageConfigModule } from './modules/beverage-config/beverage-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: TypeormConfig,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    CategoryModule,
    BeverageModule,
    IngredientModule,
    AttributeModule,
    MachineModule,
    BeverageConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

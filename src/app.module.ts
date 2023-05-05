import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { BeverageModule } from './modules/beverage/beverage.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { AttributeModule } from './modules/attribute/attribute.module';

@Module({
  imports: [CategoryModule, BeverageModule, IngredientModule, AttributeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

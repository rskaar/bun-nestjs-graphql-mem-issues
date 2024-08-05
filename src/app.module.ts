import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GQLModule } from './gql/gql.module';

@Module({
  imports: [GQLModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

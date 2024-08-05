import { Module } from '@nestjs/common';
import { DummyResolver } from './dummy.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    //
    // Comment out the lines below to remove the memory leak :: START
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
      path: '/graphql',
    }),
    // Comment out the lines above to remove the memory :: END
    //
  ],
  controllers: [],
  providers: [DummyResolver],
  exports: [],
})
export class GQLModule {}

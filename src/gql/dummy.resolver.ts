import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class DummyResolver {
  constructor() {}

  @Query(() => String, { name: 'dummy' })
  dummy(): string {
    return 'dummy';
  }
}

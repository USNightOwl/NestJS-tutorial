import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Song {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

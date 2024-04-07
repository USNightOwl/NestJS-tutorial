import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSongInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Item {
  @Field()
  readonly id!: number;

  @Field()
  readonly name!: string;

  @Field()
  readonly price!: number;

  @Field()
  readonly inventory!: string;
}

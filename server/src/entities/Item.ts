import { Field, ObjectType } from "type-graphql";

@ObjectType() // Post can be of type entity and also be an object type (thereby having field as well)
export class Item {
  // Extending BaseEntity allows us to do .find() and other basic commands

  @Field() // Note that field exposes to graphQL schema
  id!: number;

  @Field()
  name!: string;

  @Field()
  price!: number;

  @Field()
  inventory!: string;
}

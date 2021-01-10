import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { Item } from "../entities/Item";
import { itemTable } from "../utils/base";

// Note queries are for getting data, mutations are for updating, creating, deleting

// @InputType()
// class ItemInput {
//   @Field()
//   title: string;
//   @Field()
//   text: string;
// }

@ObjectType()
class PaginatedItems {
  @Field(() => [Item])
  items: Item[];
  @Field()
  hasMore: boolean;
}

@Resolver(Item)
export class ItemResolver {
  @Query(() => PaginatedItems) // Return array of posts

  async items(
    @Arg("limit", () => Int) _limit: number,
    @Arg("cursor", () => String, { nullable: true }) _cursor: string | null
  ): Promise<PaginatedItems | null> {
    // const realLimit = Math.min(25, limit);
    // const realLimitPlusPlus = realLimit + 1;

    // const replacements: any[] = [realLimitPlusPlus];

    // if (cursor) {
    //   replacements.push(new Date(parseInt(cursor)));
    // }

    const itemList: any = [];
    let table;

    console.log('1');


    try {

      table = await itemTable
        .select({
          fields: ["id", "name", "price"],
          view: "Grid view"
        })
      console.log('2');
    } catch (err) {
      return {
        items: [],
        hasMore: false
      };
    }

    try {
      await table.firstPage((err: Error, records: any) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('3');

        records.forEach((record: any) => {
          itemList.push(record.fields);
        });
      })
    } catch (err) {
      console.log(err);

      return {
        items: [],
        hasMore: false
      };
    }

    console.log('4');

    return {
      items: itemList,
      hasMore: false
    };
  }

  // @Query(() => Item, { nullable: true }) // Return single item or null if not found
  // post(@Arg("id", () => Int) id: number): Promise<Item | undefined> {
  //   // return Post.findOne(id);
  // }

  // // Upload single item
  // @Mutation(() => Item)
  // async uploadItem(
  //   @Arg("input") input: ItemInput,
  //   @Ctx() { req }: MyContext
  // ): Promise<Item> {
  //   // return Post.create({
  //   //   ...input,
  //   //   creatorId: req.session.userId
  //   // }).save();
  // }

  // // Batch upload items
  // @Mutation(() => Boolean) // Returns boolean to indicate whether successfully batched upload items or not
  // async uploadItems(
  //   @Arg("input") input: ItemInput,
  //   @Ctx() { req }: MyContext
  // ): Promise<boolean> {
  //   // return Post.create({
  //   //   ...input,
  //   //   creatorId: req.session.userId
  //   // }).save();
  // }

  // @Mutation(() => Item, { nullable: true }) // Return updated Item or null if post not found
  // async updateItem(
  //   @Arg("id", () => Int) id: number,
  //   @Arg("title") title: string, // id gets passed in as an argument into graphQL
  //   @Arg("text") text: string,
  //   @Ctx() { req }: MyContext
  // ): Promise<Item | null> {
  //   // const result = await getConnection()
  //   //   .createQueryBuilder()
  //   //   .update(Post)
  //   //   .set({ title, text })
  //   //   .where('id = :id and "creatorId" = :creatorId', {
  //   //     id,
  //   //     creatorId: req.session.userId
  //   //   })
  //   //   .returning("*")
  //   //   .execute();
  //   // return result.raw[0];
  // }

  // @Mutation(() => Boolean) // Return boolean indicating whether item has successfully been deleted
  // async deleteItem(
  //   @Arg("id", () => Int) id: number,
  //   @Ctx() { req }: MyContext
  // ): Promise<boolean> {
  //   // await Post.delete({ id, creatorId: req.session.userId }); // ID that is specified and the person deleting is the owner of the post
  //   // return true;
  // }
}

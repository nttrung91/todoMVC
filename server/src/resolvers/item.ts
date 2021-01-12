import {
  Arg,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from "type-graphql";
import { Item } from "../entities/Item";
import { itemTable } from "../utils/base";

// Note queries are for getting data, mutations are for updating, creating, deleting

// @InputType()
// class ItemInput {
//   @Field()
//   name: string;
//   @Field()
//   text: string;
// }

// @Arg("name", { nullable: true }) name: string, // id gets passed in as an argument into graphQL
// @Arg("price", () => Int, { nullable: true }) price: number,
// @Arg("inventory", { nullable: true }) inventory: string

@ObjectType()
class PaginatedItems {
  @Field(() => [Item])
  items: Item[];
  @Field()
  hasMore: boolean;
}

@Resolver(Item)
export class ItemResolver {
  @Query(() => PaginatedItems) // Return array of items
  async items(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string
  ): Promise<PaginatedItems | null> {
    const limitPlusPlus = limit + 1;

    const itemList: any = [];

    await itemTable
      .select({
        pageSize: limitPlusPlus,
        maxRecords: 500,
        view: "Grid view",
        sort: [{ field: "id", direction: "asc" }],
        filterByFormula: `{id} > ${parseInt(cursor)}`
      })
      .firstPage()
      .then((records: any) => {
        records.forEach(function(record: any) {
          itemList.push(record.fields);
        });
      });

    return {
      items: itemList.slice(0, limit),
      hasMore: itemList.length === limitPlusPlus
    };
  }

  @Query(() => Item, { nullable: true }) // Return single item or null if not found
  async item(@Arg("id", () => Int) id: number): Promise<Item | null> {
    let item = null;

    await itemTable
      .select({
        filterByFormula: `{id} = ${id}`
      })
      .firstPage()
      .then((records: any) => {
        item = records[0].fields;
      })
      .catch(_ => {
        return null;
      });

    return item;
  }

  // Updates a single item
  @Mutation(() => Item, { nullable: true }) // Return updated Item or null if post not found
  async updateItem(
    @Arg("id", () => Int) id: number,
    @Arg("name", { nullable: true }) name: string, // id gets passed in as an argument into graphQL
    @Arg("price", () => Int, { nullable: true }) price: number,
    @Arg("inventory", { nullable: true }) inventory: string
    // @Ctx() { req }: MyContext
  ): Promise<Item | null> {
    const updatedItems = { id, name, price, inventory };
    let recordId: string | null = null;
    let updatedRecord: Item | null = null;

    await itemTable
      .select({
        filterByFormula: `{id} = ${id}`
      })
      .firstPage()
      .then((records: any) => {
        recordId = records[0].id;
      })
      .catch(_ => {
        return null;
      });

    await itemTable
      .update([{ id: recordId, fields: updatedItems }])
      .then((records: any) => {
        updatedRecord = records[0].fields;
      })
      .catch((err: Error) => {
        console.log(
          `There was an issue updating the entry to Airtable: ${err}`
        );
        return;
      });

    return updatedRecord;
  }

  @Mutation(() => Boolean) // Return boolean indicating whether item has successfully been deleted
  async deleteItem(
    @Arg("id", () => Int) id: number
    // @Ctx() { req }: MyContext
  ): Promise<boolean> {
    let recordId: string | null = null;
    let deleted: boolean = false;

    await itemTable
      .select({
        filterByFormula: `{id} = ${id}`
      })
      .firstPage()
      .then((records: any) => {
        recordId = records[0].id;
      })
      .catch(_ => {
        return null;
      });

    if (!recordId) {
      return true; // Return true even if can't find id to dissuade hackers from continuing
    }

    await itemTable
      .destroy([recordId])
      .then(() => {
        deleted = true;
      })
      .catch((err: Error) => {
        console.log(
          `There was an issue updating the entry to Airtable: ${err}`
        );
        return;
      });

    return deleted;
  }
}

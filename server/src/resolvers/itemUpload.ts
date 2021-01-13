import { GraphQLUpload } from "apollo-server-express";
import csvParser from "csv-parser";
import { createWriteStream, ReadStream } from "fs";
import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Item } from "../entities/Item";
import { ItemObjType } from "../types";
import { itemTable } from "../utils/base";

@InputType()
class Upload {
  @Field(() => () => ReadStream)
  createReadStream: () => ReadStream;

  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;
}

@Resolver()
export class ItemUploaderResolver {
  // // Upload single item
  @Mutation(() => Boolean) // True or false whether the upload worked
  async uploadItemFile(@Arg("file", () => GraphQLUpload!)
  {
    createReadStream,
    mimetype,
    filename
  }: Upload): Promise<boolean> {
    if (!mimetype.includes("csv")) {
      return new Promise(async (_, reject) => {
        reject("You may only upload csv files.");
      });
    }

    const stream = await createReadStream();

    stream.pipe(
      createWriteStream(__dirname + `/../../../csv_data/${filename}`)
    );

    return new Promise(async (resolve, reject) => {
      const totalRes: any = [];
      let rollingBatchIndex = 0;
      let rollingBatchCounter = 0;

      stream
        .pipe(csvParser())
        .on("data", (row: Item) => {
          if (rollingBatchCounter == 10) {
            rollingBatchCounter = 0;
            rollingBatchIndex++;
          }

          if (rollingBatchCounter == 0) {
            totalRes.push([]);
          }

          const key = "fields";
          const itemObj: ItemObjType = {};
          itemObj[key] = row;

          totalRes[rollingBatchIndex].push(itemObj);

          rollingBatchCounter++;
        })
        .on("end", () => {
          totalRes.forEach((itemBatch: [Item]) => {
            itemTable.create(itemBatch, { typecast: true }, function(
              err: Error
            ) {
              if (err) {
                console.log(`There was an issue uploading to Airtable: ${err}`);
                reject(`There was an issue uploading to Airtable: ${err}`);
              }
            });
          });

          resolve(true);
        })
        .on("error", (err: Error) => {
          console.log(
            `There was an issue with the ItemUploaderResolver: ${err}`
          );
          reject(`There was an issue with the ItemUploaderResolver: ${err}`);
        });
    });
  }
}

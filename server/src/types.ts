import { Request, Response } from "express";
import { ReadStream } from "fs";
import { Item } from "./entities/Item";

declare module "express-session" {
  interface Session {
    userId: string;
  }
}

export type MyContext = {
  req: Request;
  res: Response;
};

export interface Upload {
  createReadStream: () => ReadStream;
  filename: string;
  mimetype: string;
  encoding: string;
}

export type ItemObjType = {
  fields?: Item;
};

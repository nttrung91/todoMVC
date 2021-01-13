import { Request, Response } from "express";
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

export type ItemObjType = {
  fields?: Item;
};

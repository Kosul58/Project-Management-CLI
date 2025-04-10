import { promises as fsPromises } from "fs";
import { ProductOptions } from "../common/productType";

export const readToFile = async (path: string) => {
  const data = await fsPromises.readFile(path, "utf8");
  return JSON.parse(data);
};

export const writeToFile = async (path: string, data: ProductOptions[]) => {
  await fsPromises.writeFile(path, JSON.stringify(data));
};

// export const appendToFile = async (path: string, data) => {
//   await fsPromises.appendFile(path, JSON.stringify(data));
// };

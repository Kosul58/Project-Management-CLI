import { promises as fsPromises } from "fs";
export const readToFile = async (path) => {
    const data = await fsPromises.readFile(path, "utf8");
    return JSON.parse(data);
};
export const writeToFile = async (path, data) => {
    await fsPromises.writeFile(path, JSON.stringify(data));
};
// export const appendToFile = async (path: string, data) => {
//   await fsPromises.appendFile(path, JSON.stringify(data));
// };

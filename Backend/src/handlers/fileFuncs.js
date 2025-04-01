import { promises as fsPromises } from "fs";

const cartPath = "./src/database/data/cart.json";
export const readCartFile = async () => {
  const data = await fsPromises.readFile(cartPath, "utf8");
  return JSON.parse(data);
};

export const writeCartFile = async (data) => {
  await fsPromises.writeFile(cartPath, JSON.stringify(data));
};

const productPath = "./src/database/data/products.json";
export const readProductFile = async () => {
  const data = await fsPromises.readFile(productPath, "utf8");
  return JSON.parse(data);
};

export const writeProductFile = async (data) => {
  await fsPromises.writeFile(productPath, JSON.stringify(data));
};

const orderPath = "./src/database/data/orders.json";
export const readOrderFile = async () => {
  const orders = await fsPromises.readFile(orderPath, "utf8");
  return JSON.parse(orders);
};

export const writeOrderFile = async (data) => {
  await fsPromises.writeFile(orderPath, JSON.stringify(data));
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export function getCurrentDateTimeStamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}-${hours}:${minutes}`;
}

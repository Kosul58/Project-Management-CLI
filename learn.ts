type student = {
  name: string;
  age: number;
  address: string;
};

const student1: student = {
  name: "Kosul",
  age: 25,
  address: "lalitpur",
};

console.log(student1);

function addTwo(num: number) {
  return num + 2;
}

function toUpper(s: string) {
  return s.toUpperCase();
}

console.log(toUpper("8"));
console.log(addTwo(5));

// type User = {
//   name: string;
//   age: number;
// };

const addUser = (user: User) => {};

// addUser({ name: "ram", age: 24, address: "5555" } as User);
// let user = { name: "ram", age: 24, address: "5555" };
// addUser(user);

let me: string = "safa";
console.log(me);

let arr: string[][] = [];
arr.push(["a", "b"]);

let arr2: Array<string> = [];

interface opearator {
  start: () => string;
  end: () => boolean;
}

const and: opearator = {
  start: () => {
    return "";
  },
  end: () => {
    return false;
  },
};

console.log(and);

interface User {
  name: string;
  greet(): void;
}

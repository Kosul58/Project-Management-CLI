type preson = {
  name: String;
  age: Number;
};

interface student {
  name: String;
  age: Number;
  address?: String;
  phone?: String;
}

const person1: preson = {
  name: "ram",
  age: 22,
};

// console.log(person1);

let x;
const addStudent = (args: preson): boolean => {
  const student: student = args;
  student.address = "Pokhara";
  student.phone = "45454215542124";
  x = student;
  return student.age ? true : false;
};

console.log(addStudent({ name: "kk", age: 55 }));
console.log(x);

export {};

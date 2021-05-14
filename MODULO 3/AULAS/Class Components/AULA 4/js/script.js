class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} falando...`);
  }
}

class Dog extends Animal {
  constructor(name, type) {
    super(name);
    this.type = type;
  }

  speak() {
    console.log(`${this.name} [${this.type}] latindo...`);
  }
}

class Cat extends Animal {
  constructor(name, type) {
    super(name);
    this.type = type;
  }

  speak() {
    console.log(`${this.name} [${this.type}] miando...`);
  }
}

const dog = new Dog('Jack', 'Poodle');
const cat = new Cat('Miyu', 'Frajola');
dog.speak();
cat.speak();

// 1. Immediately Invoked Function Expression (IIFE)
(function() {
    console.log("Current URL:", window.location.href);
})();

// 2. Методи роботи з масивами
const numbers = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

// a. Метод map
const doubledNumbers = numbers.map(num => num * 2);
console.log("Doubled Numbers:", doubledNumbers);

// b. Метод filter
const filteredNumbers = numbers.filter(num => num > 25);
console.log("Numbers greater than 25:", filteredNumbers);

// c. Метод reduce
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("Sum of numbers:", sum);

// 3. Оператор Spread у функції
function multiply(a, b) {
    return a * b;
}
const nums = [5, 10];
const result = multiply(...nums);
console.log("Multiplication result:", result);

// 4. Робота з Set
const uniqueValues = new Set([10, 20, 20, 30, 40, 40]);
console.log("Set values:", uniqueValues);
for (const value of uniqueValues) {
    console.log(value);
}

// 5. Метод bind для прив'язки контексту
const user = {
    name: "Alice",
    getName() {
        return this.name;
    }
};
const admin = {
    name: "Bob"
};
const getAdminName = user.getName.bind(admin);
console.log("Admin name:", getAdminName());

// 6. Функція із замиканням (closure)
function createAdvancedCounter() {
    let counter = 0;

    return {
        increment() {
            counter++;
            console.log("Counter after increment:", counter);
        },
        decrement() {
            counter--;
            console.log("Counter after decrement:", counter);
        }
    };
}
const counter = createAdvancedCounter();
counter.increment(); // Counter after increment: 1
counter.decrement(); // Counter after decrement: 0
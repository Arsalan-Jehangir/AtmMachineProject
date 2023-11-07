import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';
const createUser = () => {
    let users = [];
    for (let i = 0; i < 10; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(100000000 + Math.random() * 9000000000),
            balance: 1000000 * i
        };
        users.push(user);
    }
    return users;
};
// atmMachine
const atmMachine = async (users) => {
    const res = await inquirer.prompt({
        type: "number",
        message: "Write Your Pin Code",
        name: "pin"
    });
    // console.log("Well Come Our Respected Customer")
    const user = users.find(val => val.pin == res.pin);
    if (user) {
        console.log(`Wellcome ${user.name}`);
        atmFunc(user);
        return;
    }
    console.log("Invalid User Pin");
};
const atmFunc = async (user) => {
    const ans = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Please Select Your Option",
        choices: ["Withdraw", "Balance", "Exit"]
    });
    console.log(ans);
    if (ans.select == "Withdraw") {
        const amount = await inquirer.prompt({
            type: "number",
            message: "Enter Your Amount",
            name: "rupee",
        });
        if (amount.rupee > user.balance) {
            return console.log("In Sufficent Balance In Your Account");
        }
        if (amount.rupee > 25000) {
            return console.log("You Exceed Your Limit");
        }
        console.log(`Withdraw Amount: ${amount.rupee}`);
        console.log(`Balance Amount: ${user.balance - amount.rupee}`);
    }
    if (ans.select == "Balance") {
        console.log(`Balance Amount: ${user.balance}`);
        return;
    }
    if (ans.select == "Exit") {
        console.log("Thanks For Your Using HBL Services.");
    }
};
const users = createUser();
atmMachine(users);

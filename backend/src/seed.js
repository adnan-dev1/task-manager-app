const { Task } = require("./models/task");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const data = [{
        name: "Hit the gym",
        desc: "Hit the gym"
    },
    {
        name: "Buy eggs",
        desc: "Buy eggs"
    }, {
        name: "Read a book",
        desc: "Read a book"
    },
    {
        name: "Organize office",
        desc: "Organize office"
    }
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URL + '/taskManager');

    await Task.deleteMany({});

    for (let task of data) {
        const newTask = new Task({
            name: task.name,
            desc: task.desc,
        });
        await newTask.save();
    }

    mongoose.disconnect();

    console.info("Done!");
}

seed();
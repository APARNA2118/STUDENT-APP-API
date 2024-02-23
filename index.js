
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = new express();
app.use(cors());
app.use(bodyParser.json());


let Student = require('./student.model')


mongoose.connect('mongodb+srv://tsaparna2020:nmnp2v7bkg3E7hr5@cluster0.yl5hcmi.mongodb.net/studentdatabase?retryWrites=true&w=majority&appName=Cluster0');
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB connection established successfully");
})


app.get('/', (req, res) => {
    console.log('request received');
    res.json('Hello World');
});


app.get('/hi', (req, res) => {
    console.log('hi request received');
    res.json('Welcome with nodemon');
});

app.get('/people', (req, res) => {
    console.log('people requet received');
    res.json([{ name: 'John', role: 'Trainer' }, { name: 'Colin', role: 'Trainer' }]);
});

app.get('/students', async (req, res) => {
    console.log('students requet received');
    let data = await Student.find().catch(err => {
        res.json("Error loading data");
        //res.json([{name: 'Tony', age:'20', dept:'CSE'},{name: 'Bruce', age:'20', dept:'CSE'},{name: 'Maria', age:'20', dept:'CSE'}]);
    })
    res.json(data);

});

app.get('/students/:id', async (req, res) => {
    let id = req.params.id;
    let data = await Student.findById(id).catch(err => {
    res.json("Error finding Student");
    });
    if(!data) {
        res.json("Not Found")
    }
    else{
        res.json(data);
    }
});

//To delete selected students from database
app.delete("/students/:id", async(req, res) => {
    let id = req.params.id;
    await  Student.findByIdAndDelete(id)
    .then(() => {
        res.json("Data removed successfully")
    })
    .catch((err) => {
        res.json("Failed deleting data")
    });

});



app.post('/students', (req, res) => {
    console.log(req.body);
    let student = new Student(req.body);
    student
        .save()
        .then(() => {
            res.json("Saved successfully");
        })
        .catch(err => {
            res.json("error"+err);
        })
});



app.listen('4001', () => {
    console.log('Started server on 4001')
});


import express from 'express'
import connectDB from './lib/db.js'
import { model, Schema } from 'mongoose'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()


const schema = new Schema({
    count: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
})

const Count = model("PeopleCount", schema);

app.get('/', async (req, res) => {
    try {
        const data = await Count.find();
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
})

app.post('/', async (req, res) => {
    const newData = new Count({
        count: req.body.count
    })
    try {
        await newData.save();
        res.json(newData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
})

app.delete('/delete-all', async (req, res) => {
    try {
        await Count.deleteMany({});
        res.json({ message: "All data deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});


app.listen(5000, () => {
    console.log("The server is running")
})
import mongoose from "mongoose"

const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb+srv://Daniel:mongo123@cluster0.ptelakr.mongodb.net/PeopleCounting")
        console.log("MongoDB Connected...")
    }
    catch(err){
        console.error(err.message)
        process.exit(1)
    }
}

export default connectDB



import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectToDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URL);

        if (connection) {
            console.log(`Connected to Database`);
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectToDb;
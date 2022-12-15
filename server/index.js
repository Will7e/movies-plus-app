import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 6000;
const server = http.createServer(app);
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
    server.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}).catch((err) => {
    console.log(err);
    process.exit(1);
} 
);

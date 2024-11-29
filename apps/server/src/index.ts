import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import { whizzRouter } from "./routes/whizzRouter";

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/v1/user", userRouter);
app.use("/api/v1/whizz", whizzRouter);

app.listen(8000, () => {
    console.log("Listening to backend server at PORT 8000");   
})
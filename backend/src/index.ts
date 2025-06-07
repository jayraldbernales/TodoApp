import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import todosRouter from "./routers/todos";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/todos", todosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

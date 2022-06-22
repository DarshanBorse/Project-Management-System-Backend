import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import cors from 'cors'
import mongoose from "mongoose";
import LoginRoute from "./src/routes/auth/login.routes";
import cookieParser from "cookie-parser";
import ProjectRoutes from "./src/routes/kanban/project.routes";
import BoardRoutes from "./src/routes/kanban/board.routes";
import BoardTaskRoute from "./src/routes/kanban/boardTask.routes";
import TaskRoutes from "./src/routes/kanban/task.routes";
import BoardDNDRoutes from "./src/routes/DragDrop/board.routes";
import TaskDNDRoutes from "./src/routes/DragDrop/task.routes";
import LogoutRoute from "./src/routes/auth/logout.routes";
import RegisterRoutes from "./src/routes/auth/register.routes";
import UserRoutes from "./src/routes/auth/user.routes";

config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    optionSuccessStatus: 200
}));

app.use(cookieParser())

// BodyParser Setup 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Database Connection 
global.Promise = mongoose.Promise;
mongoose.connect(`mongodb://127.0.0.1/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Database successfully connected..`);
}).catch(err => {
    console.log(err);
});

// All Routes 
RegisterRoutes(app);
LoginRoute(app);
LogoutRoute(app)
UserRoutes(app)
ProjectRoutes(app);
BoardRoutes(app);
BoardTaskRoute(app);
TaskRoutes(app);
BoardDNDRoutes(app);
TaskDNDRoutes(app)

app.get('/', (req, res) => {
    return res.send(`Node and Express server running on port ${PORT}`)
});

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});
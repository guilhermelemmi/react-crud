import cors from "cors";
import express from "express";

import userRoutes from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});

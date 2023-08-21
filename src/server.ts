import express from "express";
import cors from "cors";
import { serverConfig, limiter } from "./configs";
import morgan from "morgan";
import { testData } from "./tests/testData";

// routes
import router from "./api/router";
import { errorHandler } from "./middlewares";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("common"));

app.use(limiter);

app.use("/api", router);
app.post("/test", testData);

app.use(errorHandler);

app.listen(serverConfig.port, () => {
  serverConfig.info();
});

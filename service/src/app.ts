import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { readdirSync } from "fs";
import path from "path";

const app: Express = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const routesPath = path.join(__dirname, "routes");

readdirSync(routesPath).forEach((file) => {
  const route = require(path.join(routesPath, file));
  const routePrefix = "/" + file.replace(".route.ts", "");
  app.use("/api" + routePrefix, route.default || route);
});

export default app;

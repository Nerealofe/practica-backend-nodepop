import "dotenv/config";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
// crea errores http (404,500...)
import createError from "http-errors";
import express from "express";
// modulo para trabajar con rutas de archivos
import path from "path";
// para leer coockies del navegador
import cookieParser from "cookie-parser";
// middleware para ver logs en consola (peticiones)
import logger from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";
import session from "express-session";
import { sessionInViews } from "./middleware/viewMiddleware.js";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  session({
    secret: "nodepop-secret",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(sessionInViews);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;

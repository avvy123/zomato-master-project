// Env variables
require("dotenv").config();

// Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// configs
import googleAuthConfig from "./config/google.config";

// microservices routes
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";

// Database Connection
import ConnectDB from "./database/connection";

const zomato = express();

// aplication middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

// passport configuration
googleAuthConfig(passport);

// Application Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);

zomato.get("/", (req, res) => res.json({ messages: "Setup Success" }));

zomato.listen(4000, () =>
     ConnectDB() 
    .then(() => console.log("Server is running!!!"))
    .catch(() => console.log("Server is running, but database connection is failed!"))
);
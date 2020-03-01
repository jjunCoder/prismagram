import dotenv from "dotenv";
import path from "path";
import { GraphQLServer } from 'graphql-yoga';
import schema from "./schema";
import logger from "morgan";
import { sendSecretMail } from "./utils";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));
server.start({
    port: PORT
}).then(r => () => console.log(`✅ Server running on http://localhost:${PORT}`));
import { Server } from "http";
import app from "./app";
import envConfig from "./envConfig";

async function server() {
  const server: Server = app.listen(envConfig.port, () => {
    console.log(`server start on port${envConfig.port}`);
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    if (server) {
      server.close();
    }
  });
}

server();

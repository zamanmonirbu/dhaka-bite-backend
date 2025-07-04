import http      from "http";
import mongoose  from "mongoose";
import dotenv    from "dotenv";

import app               from "./src/app.js";                 
import { initSocket }    from "./src/core/config/socket.js"; 
import logger            from "./src/core/config/logger.js";
import { mongoURI, port } from "./src/core/config/config.js";

dotenv.config();              

mongoose.connect(mongoURI)
  .then(() => {
    logger.info("✅  MongoDB connected");
    const server = http.createServer(app);  
    initSocket(server);                     

    server.listen(port, () => {
      logger.info(`🚀  API & sockets running  ➜  http://localhost:${port}`);
    });
  })
  .catch((err) => {
    logger.error("❌  MongoDB connection error:", err);
    process.exit(1);                       
  });

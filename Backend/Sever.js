const express=require("express");
const dbconnected = require("./config/db");
const cors=require("cors");
const compression = require("compression");
const cookieParser=require("cookie-parser");
const User = require("./routes/user.routes");
const leadsource = require("./routes/leadSource.routes");
const lead = require("./routes/lead.routes");
const branch = require("./routes/branch.routes");
const businessType = require("./routes/businessType.routes");
const Insulation = require("./routes/Insulation.routes");
const leadStatus = require("./routes/leadStatus.routes");
const SaleExcutivecell = require("./routes/SaleExcutivecell.routes");
const Role = require("./routes/Role.routes");
const DBconnection = require("./config/db");
const http=require("http");
const {Server}=require("socket.io");
const app=express();
const server= http.createServer(app);
require("dotenv").config();
DBconnection();
app.use(express.json());
app.use(
  compression({
    level: 6,
    threshold: 1024
  })
);
app.use(cookieParser())
app.use(
  cors({
    origin: [
      process.env.Backend_url,
    ],
    credentials: true,
  })
);
const io = new Server(server, {
  cors: {
    origin: [
      process.env.Backend_url,
    ],
    credentials: true,
  },
});

global.io = io;

io.on("connection", (socket) => {
  // console.log("✅ User Connected:", socket.id);

  socket.on("disconnect", () => {
    // console.log("❌ User Disconnected:", socket.id);
  });
});
app.use(User);
app.use(leadsource);
app.use(Insulation);
app.use(SaleExcutivecell);
app.use(lead);
app.use(branch);
app.use(businessType);
app.use(leadStatus);
app.use(Role);

server.listen(process.env.PORT, "0.0.0.0", () => {
  // console.log(`🚀 Server running on port ${process.env.PORT}`);
});
var fs = require("fs");
var http = require("http");
var https = require("https");
var { default: axios } = require("axios");
var privateKey = fs.readFileSync("key.pem", "utf8");
var certificate = fs.readFileSync("cert.pem", "utf8");

var credentials = { key: privateKey, cert: certificate, passphrase: "1234" };
var express = require("express");
var app = express();

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
app.get("/webhook", async (req, res) => {
  console.log(req.socket.remoteAddress, req.get("host"), req.get("origin"));
  if (req.get("host") !== "192.168.1.18")
    res.json({ success: false, message: "not authorized" });
  else {
    var response = await axios.get("https://youtube.com/");
    response.data.pipe(res);
    // return res.json({success:true,message:"You are authorized!"})
  }
});

httpServer.listen(8080, (p, h) => console.log(`HTTPS Server listening `));
httpsServer.listen(8443, (p, h) => console.log(`HTTPS Server listening`));
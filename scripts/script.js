const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);

http
  .createServer((req, res) => {
    res.writeHead(200, "response OK");
    if (req.url.includes("/about")) {
      res.end(
        "<h1>I'm Martin</h1><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam in reprehenderit atque! Omnis sit doloremque natus vero possimus eligendi neque. Ipsa atque culpa consequatur veritatis sint impedit, quaerat vitae nemo?</p>"
      );
    } else if (req.url.includes("/contact")) {
      fs.readFile("./html/contact.html", (err, data) => {
        res.end(data);
      });
    } else if (req.url.includes("/shop")) {
      res.end(
        "<h1>Buy stuff here</h1><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam in reprehenderit atque! Omnis sit doloremque natus vero possimus eligendi neque. Ipsa atque culpa consequatur veritatis sint impedit, quaerat vitae nemo?</p>"
      );
    } else if (req.url.includes("instructions")) {
      fs.readFile("instructions.txt", (err, data) => {
        res.end(data);
      });
    } else if (req.url.includes("/submit?input=")) {
      res.end("<h1>You submitted the following input:</h1><p>${}</p>");
    } else {
      fs.readFile("index.html", (err, data) => {
        res.end(data);
      });
    }
  })
  .listen(3030);

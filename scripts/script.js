const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);

http
  .createServer((req, res) => {
    res.writeHead(200, "response OK");
    const drinks = ["wine", "beer", "liquor"];
    if (req.url.includes("/about")) {
      res.end(
        "<h1>I'm Martin</h1><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam in reprehenderit atque! Omnis sit doloremque natus vero possimus eligendi neque. Ipsa atque culpa consequatur veritatis sint impedit, quaerat vitae nemo?</p>"
      );
    } else if (
      req.url.includes("/contact") ||
      req.url.includes("/submit?input=")
    ) {
      fs.readFile("./html/contact.html", (err, data) => {
        if (req.url.includes("/submit?input=")) {
          const inputParts = req.url.split("="); // Split the URL at "="
          const inputValue = inputParts[1]; // Extract the input value
          res.write(data); // Write the input value to the response
          res.end(`You sent the following message: ${inputValue}`); // End the response
        } else {
          res.end(data); // Send the contents of "contact.html" as response
        }
      });
    } else if (
      req.url.includes("/drinks") ||
      drinks.some((drink) => req.url.includes(drink))
    ) {
      fs.readFile("./html/drinks.html", (err, data) => {
        const show_drink = (drink) => {
          res.write(data);
          fs.readFile(`./html/${drink}.html`, (err, data2) => {
            res.end(data2);
          });
        };
        if (req.url.includes("wine")) {
          show_drink("wine");
        } else if (req.url.includes("beer")) {
          show_drink("beer");
        } else if (req.url.includes("liquor")) {
          show_drink("liquor");
        } else {
          res.end(data);
        }
      });
    } else if (req.url.includes("/shop")) {
      res.end(
        "<h1>Buy stuff here</h1><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam in reprehenderit atque! Omnis sit doloremque natus vero possimus eligendi neque. Ipsa atque culpa consequatur veritatis sint impedit, quaerat vitae nemo?</p>"
      );
    } else if (req.url.includes("instructions")) {
      fs.readFile("instructions.txt", (err, data) => {
        res.end(data);
      });
    } else {
      fs.readFile("index.html", (err, data) => {
        res.end(data);
      });
    }
  })
  .listen(3030);

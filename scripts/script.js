const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
// const json = require("scripts/drinks.json");
// console.log(JSON.parse(json));

http
  .createServer((req, res) => {
    res.writeHead(200, "response OK");
    const DRINKS = ["wine", "beer", "liquor"];
    const NA_DRINKS = ["juice", "milk", "soda"];
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
          const inputParts = req.url.split("=");
          const inputValue = inputParts[1];
          res.write(data);
          res.end(`You sent the following message: ${inputValue}`);
        } else {
          res.end(data);
        }
      });
    } else if (
      req.url.includes("/drinks") ||
      DRINKS.some((drink) => req.url.includes(drink))
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
      res.write(
        "<h1>Buy stuff here</h1><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam in reprehenderit atque! Omnis sit doloremque natus vero possimus eligendi neque. Ipsa atque culpa consequatur veritatis sint impedit, quaerat vitae nemo?</p>"
      );
      res.end();
    } else if (req.url.includes("instructions")) {
      fs.readFile("instructions.txt", (err, data) => {
        res.end(data);
      });
    } else if (
      req.url.includes("JSON") ||
      NA_DRINKS.some((drink) => req.url.includes(drink))
    ) {
      fs.readFile("./html/read_json.html", (err, data) => {
        res.write(data);
        if (req.url.includes("=juice")) {
          fs.readFile("scripts/drinks.json", (error, data2) => {
            const drinksData = JSON.parse(data2);
            res.end(
              `<h2>${drinksData.juice.name}</h2><p>${drinksData.juice.description}</p>`
            );
          });
        } else if (req.url.includes("=milk")) {
          fs.readFile("scripts/drinks.json", (error, data2) => {
            const drinksData = JSON.parse(data2);
            res.end(
              `<h2>${drinksData.milk.name}</h2><p>${drinksData.milk.description}</p>`
            );
          });
        } else if (req.url.includes("=soda")) {
          fs.readFile("scripts/drinks.json", (error, data2) => {
            const drinksData = JSON.parse(data2);
            res.end(
              `<h2>${drinksData.soda.name}</h2><p>${drinksData.soda.description}</p>`
            );
          });
        } else {
          res.end();
        }
      });
    } else {
      fs.readFile("index.html", (err, data) => {
        res.end(data);
      });
    }
  })
  .listen(3030);

// fs.readFile("scripts/drinks.json", (error, data2) => {
//   res.write(
//     `<h2>${JSON.parse(data2).wine.name}</h2><p>${
//       JSON.parse(data2).wine.description
//     }</p>`
//   );
//   res.end(data);
// });

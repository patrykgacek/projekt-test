const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

let limit = 0;

app.post("/", (req, res) => {
  const header = req.headers["apikey"];

  if (header !== process.env.API_KEY) {
    limit++;
    setTimeout(() => {
      limit--;
    }, 1000 * 60);
    if (limit > 3) {
      return res
        .status(400)
        .json({ message: "Max 3 requests per minute for unauthorized" });
    }
  }

  const data = req.body;

  const result = {
    valid: 0,
    invalid: 0,
  };

  data.forEach(({ num, text }) => {
    const isString = typeof text === "string";
    const isNumber = typeof num === "number";
    if (isString && isNumber) {
      const isNotEmpty = text.length > 0;

      if (isNotEmpty) {
        result.valid++;
        return;
      }
    }
    result.invalid++;
  });

  res.json(result);
});

app.listen(3000, () => {
  const x = "";
  console.log(x.length);
  console.log("Server is running on port 3000");
});

const express = require('express');
const dbConnect = require("./dbConnect");
const cors = require('cors');
const mainRouter = require("./routes");
const app = express();
const PORT = process.env.PORT || 5000;
const morgan = require('morgan');
// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("common"));
app.get("/", (req, res) => {
  res.status(200).json(
    { message: "server ok",version: '1.0.0',
    database: 'MongoDB',
    endpoints: {
      categories: '/api/categories',
      subCategories: '/api/subcategories',
      items: '/api/items',
      search: '/api/items/search/:name'
    }
  })
});

app.use("/api", mainRouter);
dbConnect.connecting();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

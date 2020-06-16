const express = require("express");
const gnx = require("@simtlix/gnx");
const app = express();

const graphqlHTTP = require("express-graphql");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://LAPTOP-863DEJJ6:27017,LAPTOP-863DEJJ6:27018,LAPTOP-863DEJJ6:27019/example",
  { replicaSet: "rs" }
);

mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

const types = require("./types");
const includedTypes = Object.values(types);
const schema = gnx.createSchema(includedTypes, includedTypes);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

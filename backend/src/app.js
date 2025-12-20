const express = require("express");
const authRoute = require("../routes/auth.routes");
const transactionRoute = require("../routes/transaction.routes");
const accountRoute = require("../routes/account.routes");
const gettransactionsRoute = require("../routes/gettransactions.routes");
const getTransactionsDateWiseRoute = require("../routes/getTransactionsByDateRange.routes");
const getTransactionsByModeRoute = require("../routes/getTransactionsByMode.routes");
const categoryRoute = require("../routes/category.routes");

const app = express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Server running Perfectly!");
});
app.use("/auth",authRoute);
app.use("/uploadcsv",transactionRoute);
app.use("/bankaccount",accountRoute);
app.use("/gettransactions",gettransactionsRoute);
app.use("/gettransactionsdaterange",getTransactionsDateWiseRoute);
app.use("/getTransactionsbymode",getTransactionsByModeRoute);
app.use("/addcategory",categoryRoute);
module.exports = app;
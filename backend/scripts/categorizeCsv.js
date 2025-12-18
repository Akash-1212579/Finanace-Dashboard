const fs = require("fs");
const csv = require("csv-parse");
const { createObjectCsvWriter } = require("csv-writer");
const {categorizeExpense} = require("../services/expenseCategorizer.service");
const inputFile = "./data/transactions.csv";
const outputFile = "./data/transactions_with_category.csv";

const rows = [];
async function processCsv() {
    fs.createReadStream(inputFile).pipe(csv())
    .on("data",(row)=>{
        rows.push(row)
    }).on("end",async ()=>{
        console.log("CSV read completed");
          for (let row of rows) {
        console.log(`Categorizing: ${row.description}`);
        row.category = await categorizeExpense(row.Particulars);
      }

      const csvWriter = createObjectCsvWriter({
        path: outputFile,
        header: [
          { id: "date", title: "date" },
          { id: "description", title: "description" },
          { id: "amount", title: "amount" },
          { id: "category", title: "category" }
        ]
      });
         await csvWriter.writeRecords(rows);
      console.log("Categorized CSV created successfully");

    })

}
processCsv();
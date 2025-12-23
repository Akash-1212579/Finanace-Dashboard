const prisma = require("../config/db.config");
const { parse } = require("csv-parse/sync");

// ------------------------------------------------------------
// Helper: Convert "1,234.56" → 1234.56
// ------------------------------------------------------------
function cleanNumber(value) {
  if (!value) return null;
  return parseFloat(String(value).replace(/,/g, ""));
}

// ------------------------------------------------------------
// Helper: Infer payment mode from "channel" column
// ------------------------------------------------------------
function inferPaymentMode(text = "") {
  const p = text.toUpperCase();
  if (p.startsWith("UPI")) return "UPI";
  if (p.includes("NEFT")) return "NEFT";
  if (p.includes("IMPS")) return "IMPS";
  if (p.includes("ATM")) return "ATM";
  if (p.includes("CHEQUE")) return "CHEQUE";
  return "UNKNOWN";
}

// ------------------------------------------------------------
// Normalize a SINGLE CSV row → matches Prisma Transaction model
// ------------------------------------------------------------
function normalizeRow(row) {
  const debit = cleanNumber(row.Debit);
  const credit = cleanNumber(row.Credit);

  return {
    amount: debit ?? credit,
    type: debit ? "DEBIT" : "CREDIT",
    description: row.Particulars || null,
    date: new Date(row.Date),
    balanceAfterTxn: cleanNumber(row.Balance),
    paymentMode: inferPaymentMode(row.channel),
    rawData: row
  };
}

// ------------------------------------------------------------
// Parse CSV buffer → Returns array of rows
// ------------------------------------------------------------
function parseCsv(buffer) {
  const csvText = buffer.toString("utf-8");

  return parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
}

// ------------------------------------------------------------
// MAIN FUNCTION — Process CSV Upload
// ------------------------------------------------------------
async function processCSVUpload({ userId, accountId, fileBuffer }) {
 // console.log("csv upload required data is ",userId,accountId);
  if (!fileBuffer) {
    throw new Error("CSV file buffer missing. Check multer setup.");
  }

  // 1) Parse CSV
  const rows = parseCsv(fileBuffer);

  if (!rows.length) {
    throw new Error("CSV file is empty or invalid.");
  }

  const account = await prisma.account.findFirst({
  where: { userId }
});
  console.log(account);
if (!account) {
  throw new Error("Account does not exist for this user");
}

  // 2) Normalize and prepare for DB insert
  const transactions = rows.map((row) => {
    const parsed = normalizeRow(row);

    return {
      userId,
      accountId,
      categoryId: null,
      ...parsed
    };
  });

  // 3) Insert into DB
  const result = await prisma.transaction.createMany({
    data: transactions
  });

  return {
    success: true,
    totalRows: rows.length,
    inserted: result.count
  };
}

module.exports = {
  processCSVUpload
};

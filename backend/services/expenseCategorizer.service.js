const fetch = require("node-fetch");


const ALLOWED_CATEGORIES = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Other"
];
async function categorizeExpense(transactions) {
  const prompt = `

  You are a JSON-only response engine.

CRITICAL RULES (VIOLATION = FAILURE):
- Output MUST be valid JSON.
- Output MUST be a SINGLE JSON OBJECT.
- Output MUST start with '{' and end with '}'.
- Keys MUST be transaction IDs (numbers as strings).
- Values MUST be ONE category string.
- Allowed categories ONLY:
  Food, Transport, Utilities, Entertainment, Shopping, Healthcare, Other.
- Do NOT include explanations, markdown, code, comments, or extra text.
- Do NOT include any other formatting.
- Do NOT repeat the input.
- If unsure, use "Other".

TASK:
Classify each transaction into exactly ONE category.

INPUT TRANSACTIONS:${JSON.stringify(transactions, null, 2)}

OUTPUT FORMAT (STRICT EXAMPLE — NOT FIXED VALUES):
{
  "transactionId": "Category"
}

REMEMBER:
Return ONLY the JSON object. NOTHING ELSE.

  `;

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "phi",
      prompt,
      stream: false,
    }),
  });
const data = await response.json();

let parsed;
try {
  parsed = JSON.parse(data.response);
} catch (err) {
  throw new Error("LLM returned invalid JSON");
}

// Validate and transform
return Object.entries(parsed).map(([id, category]) => ({
  transactionId: Number(id),
  category: ALLOWED_CATEGORIES.includes(category)
    ? category
    : "Other",
}));

}

module.exports = { categorizeExpense };

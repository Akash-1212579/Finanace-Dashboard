const fetch = require("node-fetch");

const ALLOWED_CATEGORIES = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Other",
];
async function categorizeExpense(transactions) {
  const prompt = `
  SYSTEM INSTRUCTION:
You are NOT an assistant.
You are NOT a teacher.
You are a STRICT JSON GENERATOR.

IF YOU BREAK ANY RULE BELOW, THE OUTPUT IS INVALID.

──────────────── RULES ────────────────
1. Output MUST be valid JSON.
2. Output MUST be a SINGLE, FLAT JSON OBJECT.
3. Output MUST start with { and end with }.
4. Output MUST contain ONLY JSON. NOTHING ELSE.
5. DO NOT include explanations, markdown, code, comments, or text.
6. DO NOT include "input", "output", or any wrapper keys.
7. DO NOT create new transaction IDs (1, 2, 3, etc.).
8. DO NOT skip any transaction.
9. DO NOT repeat the input.
10. DO NOT change transaction IDs.

──────────────── ID RULE (VERY IMPORTANT) ────────────────
- Each OUTPUT JSON key MUST be EXACTLY the SAME transactionId
  as the "id" field provided in the INPUT TRANSACTIONS.
- You are FORBIDDEN from generating, renaming, reindexing,
  or inventing transaction IDs.
- If the input contains transaction id 696,
  the output key MUST be "696".

──────────────── FORMAT ────────────────
- JSON keys = EXACT transactionId from input (as strings).
- JSON values = EXACTLY ONE category string.

ALLOWED CATEGORIES (ONLY THESE):
Food
Transport
Utilities
Entertainment
Shopping
Healthcare
Other

If a transaction is unclear, use "Other".

──────────────── TASK ────────────────
For EACH transaction below, assign EXACTLY ONE category.

──────────────── INPUT TRANSACTIONS ────────────────
${JSON.stringify(transactions)}

──────────────── OUTPUT FORMAT (EXAMPLE ONLY) ────────────────
{"696":"Food","697":"Transport","698":"Utilities"}

RETURN ONLY THE JSON OBJECT.
ABSOLUTELY NOTHING ELSE.
`;

  // const response = await fetch("http://localhost:11434/api/generate", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     model: "phi",
  //     prompt,
  //     stream: false,
  //   }),
  // });
  const response = await fetch("http://localhost:11434/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "phi",
    prompt,
    stream: false,
    options: {
      temperature: 0,
      num_predict: 200,
      stop: [
        "```",
        "Sure",
        "Here is",
        "Here's",
        "I can help",
        "This code",
        "Explanation"
      ]
    }
  }),
});

  const data = await response.json();
  console.log("LLM response is \n", data.response);
  let parsed;
  try {
    parsed = JSON.parse(data.response);
  } catch (err) {
    throw new Error("LLM returned invalid JSON");
  }

  // Validate and transform
  return Object.entries(parsed).map(([id, category]) => ({
    transactionId: Number(id),
    category: ALLOWED_CATEGORIES.includes(category) ? category : "Other",
  }));
}

module.exports = { categorizeExpense };

const fetch = require("node-fetch");

async function categorizeExpense(description) {
  const prompt = `
You are a finance assistant.
Categorize the following expense into ONE category only.

Categories:
Food, Transport, Utilities, Entertainment, Shopping, Healthcare, Other

Return ONLY the category name.

Expense: "${description}"
`;

  const response = await fetch(urlOfLLM, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt,
      stream: false,
    }),
  });
  const data = await response.json();
  return data.response.trim();
}

module.exports = { categorizeExpense };

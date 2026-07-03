require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function main() {
  try {
    const key = process.env.GEMINI_API_KEY || 'AQ.Ab8RN6LYac50eNnPjQyjY82_ed2YroJt65jx7MThavw5hFGNuw';
    const genAI = new GoogleGenerativeAI(key);
    // Actually, @google/generative-ai doesn't easily expose list models?
    // Let's use fetch instead to call the REST API.
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Available models:");
    data.models.forEach(m => {
        if (m.supportedGenerationMethods.includes("generateContent")) {
            console.log(m.name);
        }
    });
  } catch (e) {
    console.error(e);
  }
}
main();

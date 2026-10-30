require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getModels() {
  try {
    const response = await groq.models.list();
    console.log("✅ CURRENTLY ACTIVE GROQ MODELS:");
    console.log("--------------------------------");
    response.data.forEach(model => {
      console.log(model.id);
    });
  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

getModels();
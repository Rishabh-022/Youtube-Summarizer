const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { YoutubeTranscript } = require('youtube-transcript');
const Groq = require('groq-sdk');
const { jsonrepair } = require('jsonrepair'); // <-- NEW AUTO-FIX TOOL

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/analyze', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    console.log(`Fetching transcript for: ${url}`);
    const transcriptArray = await YoutubeTranscript.fetchTranscript(url);
    
    const fullTranscript = transcriptArray.map(t => t.text).join(' ');
    const chunk = fullTranscript.slice(0, 10000); 

    console.log("Sending to Groq for translation and analysis...");
    const prompt = `
      You are an expert AI professor. Read the following YouTube transcript. Translate to English if needed.
      Your goal is to provide HIGHLY DETAILED, COMPREHENSIVE study notes so that a person can fully understand the content WITHOUT watching the video. Do not leave out important details, examples, or explanations.
      
      Based on the transcript, output a JSON object exactly matching this structure:
      {
        "summary": {
          "tl_dr": "A comprehensive paragraph summarizing the entire core message.",
          "keyTakeaways": ["Detailed point 1 explaining the 'why' and 'how'", "Detailed point 2...", "Detailed point 3...", "Detailed point 4..."],
          "timeStamps": [{"time": "00:00", "label": "Start"}]
        },
        "notes": {
          "sections": [
            {
              "heading": "First Major Topic", 
              "content": "Write 2 to 3 paragraphs of highly detailed, comprehensive notes here. Include specific examples, definitions, and the full context mentioned in the video."
            },
            {
              "heading": "Second Major Topic", 
              "content": "Write 2 to 3 paragraphs of highly detailed, comprehensive notes here. Include specific examples, definitions, and the full context mentioned in the video."
            },
            {
              "heading": "Third Major Topic", 
              "content": "Write 2 to 3 paragraphs of highly detailed, comprehensive notes here. Include specific examples, definitions, and the full context mentioned in the video."
            }
          ]
        },
        "questions": [
          {
            "id": 1,
            "question": "A difficult question testing deep understanding?",
            "options": ["Opt 1", "Opt 2", "Opt 3", "Opt 4"],
            "correctIndex": 0,
            "explanation": "Detailed explanation of why this is correct."
          }
        ]
      }
      
      Transcript: ${chunk}
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt + "\n\nOUTPUT ONLY RAW JSON. NO MARKDOWN. NO BACKTICKS. NO INTRO TEXT." }],
      model: 'openai/gpt-oss-20b', 
      temperature: 0.3,
      max_tokens: 3500, 
    });

    let rawText = chatCompletion.choices[0].message.content;
    
    rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    const firstBrace = rawText.indexOf('{');
    const lastBrace = rawText.lastIndexOf('}');
    const cleanJson = rawText.substring(firstBrace, lastBrace + 1);

    // 3. FIX: We now use jsonrepair! If the AI forgets a comma or quote, this fixes it instantly.
    const repairedJson = jsonrepair(cleanJson);
    const aiResult = JSON.parse(repairedJson);
    
    res.json({
      videoTitle: "Analyzed Video", 
      channelName: "YouTube",
      generatedAt: new Date().toLocaleDateString(),
      ...aiResult
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process video. Please try again." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
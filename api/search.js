export default async function handler(req, res) {
    // Enable simple CORS headers for local testing if needed
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: 'Missing query in request body' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ 
                error: 'GEMINI_API_KEY environment variable is missing on Vercel.' 
            });
        }

        // Configure system prompt to search Google and return a structured JSON response
        const systemPrompt = `You are the live routing engine for TorqueTrails, a Pune motorcycle touring app. The user will ask for a ride vibe or a specific place near Pune. Use your live Google Search tool to find the exact location, its real-time distance/time from Pune city center, the road conditions, and the best local roadside chai/misal tapris. You must return your final answer strictly as a clean JSON object containing:
{
  "matchedLocation": "Exact name of the place",
  "latitude": 18.1234,
  "longitude": 73.1234,
  "aiReasoning": "A short, rider-focused explanation of why this fits their request, including details of road conditions and cornering.",
  "recommendedChaiStop": "A specific pitstop or chai tapri name"
}
Ensure the latitude and longitude keys are numeric values. Do not output markdown backticks (like \`\`\`json) outside the JSON structure. Return only the raw JSON.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${systemPrompt}\n\nUser request: "${query}"`
                    }]
                }],
                tools: [{
                    googleSearch: {}
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API responded with status ${response.status}`);
        }

        const data = await response.json();
        let textResponse = data.candidates[0].content.parts[0].text;

        // Sanitize markdown wrappers (like ```json ... ```) that the model may return
        textResponse = textResponse.replace(/```json/gi, "").replace(/```/g, "").trim();

        // Parse and validate JSON structure before returning
        const jsonResult = JSON.parse(textResponse);

        if (!jsonResult.matchedLocation || !jsonResult.latitude || !jsonResult.longitude || !jsonResult.aiReasoning) {
            throw new Error("API response is missing critical details.");
        }

        // Return the clean JSON back to the client
        return res.status(200).json(jsonResult);

    } catch (error) {
        console.error("Vercel Search Endpoint Error:", error);
        return res.status(500).json({ error: error.message });
    }
}

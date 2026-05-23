export default async function handler(req, res) {
    // Enable CORS headers for Vercel/local environments
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
        // 1. Ensure the incoming request body has a valid query parameter.
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: 'Missing query in request body' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("Error: GEMINI_API_KEY is not configured in the serverless environment.");
            return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not configured.' });
        }

        // 2. Make a clean POST fetch call to the official Google AI endpoint:
        // https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

        // 3. Format the JSON request body exactly like this (avoid strict structural schema formats to prevent conflicts with the search tool)
        const payload = {
            "contents": [{
                "parts": [{
                    "text": "Search Google for the current real-world details about this Pune biking spot or route request: '" + query + "'. You must output your response strictly as a valid JSON object. Do not wrap it in markdown blockquotes or code fences. Expected structure:\n{\n  \"matchedLocation\": \"The real name of the location found\",\n  \"latitude\": 18.1234,\n  \"longitude\": 73.1234,\n  \"aiReasoning\": \"Brief explanation of road layout and vibe tailored to the request\",\n  \"recommendedChaiStop\": \"Name of a local roadside tapri or misal spot\"\n}"
                }]
            }],
            "tools": [{
                "googleSearch": {}
            }]
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Google Gemini API responded with status ${response.status}: ${errorDetails}`);
        }

        const data = await response.json();

        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
            throw new Error("Google Gemini API returned an empty or invalid candidate structure.");
        }

        const rawText = data.candidates[0].content.parts[0].text;

        // 4. Add safe JSON parsing blocks. If Gemini returns markdown backticks like ```json, slice them out cleanly using regex before sending the raw JSON object straight back.
        const cleanedText = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();

        let jsonResult;
        try {
            jsonResult = JSON.parse(cleanedText);
        } catch (parseError) {
            throw new Error(`Failed to parse response text as JSON. Raw response content: ${rawText}`);
        }

        // Send raw JSON object straight back to client
        return res.status(200).json(jsonResult);

    } catch (error) {
        // 5. Wrap the entire function in a clear try/catch block so that if Google returns an issue, it prints the exact error message back to our console rather than throwing a silent 500 failure.
        console.error("Vercel Search Endpoint Error:", error.message);
        return res.status(500).json({
            error: "Search Endpoint internal error.",
            details: error.message
        });
    }
}

import { GoogleGenerativeAI } from "@google/generative-ai";

const classifySymptoms = async (req, res) => {
    try {
        const { symptoms } = req.body;

        if (!symptoms) {
            return res.status(400).json({ success: false, message: "Symptoms are required" });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.warn("GEMINI_API_KEY missing, using mock response.");
            const s = symptoms.toLowerCase();
            let spec = 'General Medicine';
            if (s.includes('heart') || s.includes('chest')) spec = 'Cardiology';
            else if (s.includes('skin') || s.includes('rash')) spec = 'Dermatology';
            else if (s.includes('bone') || s.includes('joint')) spec = 'Orthopedics';
            else if (s.includes('child') || s.includes('baby')) spec = 'Pediatrics';
            else if (s.includes('head') || s.includes('dizzy')) spec = 'Neurology';

            return res.json({
                success: true,
                data: {
                    specialization: spec,
                    urgency: 'Medium',
                    reason: 'This is a simulation (GEMINI_API_KEY not found).'
                }
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        You are an AI medical assistant. Analyze the following patient symptoms and map them to the most appropriate medical specialist from this specific list: 
        [Cardiology, Dermatology, General Medicine, Orthopedics, Pediatrics, Neurology].
        
        Symptoms: "${symptoms}"
        
        Return ONLY a valid JSON object (no markdown, no backticks) with the following structure:
        {
            "specialization": "One of the values from the list above",
            "urgency": "Low" | "Medium" | "High",
            "reason": "Brief explanation for the choice"
        }
        
        If the symptoms are ambiguous, default to "General Medicine".
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean up any markdown code blocks if Gemini adds them
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const data = JSON.parse(text);

        res.json({ success: true, data });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { classifySymptoms };

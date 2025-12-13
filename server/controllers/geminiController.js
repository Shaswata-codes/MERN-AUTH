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
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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

const analyzeReport = async (req, res) => {
    try {
        const { recordType, doctor, date } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.json({
                success: true,
                data: {
                    summary: `(Mock) Analysis of ${recordType}: Results are within normal range.`,
                    findings: ['Hemoglobin: 14.5 g/dL (Normal)', 'WBC: 6.5 (Normal)', 'Platelets: 250k (Normal)'],
                    recommendation: 'Maintain current diet and exercise routine.'
                }
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
        You are an AI medical assistant. Generate a realistic, patient-friendly summary for a medical record with the following details:
        Type: ${recordType}
        Doctor: ${doctor}
        Date: ${date}

        Assume typical results for a healthy adult with one minor, non-critical observation (e.g., slightly low Vitamin D or elevated cholesterol) to make it interesting.

        Return ONLY a valid JSON object with:
        {
            "summary": "2 sentnece overview",
            "findings": ["Point 1", "Point 2", "Point 3"],
            "recommendation": "One actionable health tip"
        }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(text);

        res.json({ success: true, data });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const generateHealthTips = async (req, res) => {
    try {
        const { stats } = req.body; // e.g., { heartRate: '72 bpm', bp: '120/80', weight: '70 kg' }

        if (!process.env.GEMINI_API_KEY) {
            return res.json({
                success: true,
                data: {
                    tip: "Your heart rate is consistent with a healthy athlete's. Keep up the cardio!"
                }
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
        You are a health coach. Analyze these patient vitals: ${JSON.stringify(stats)}.
        Generate a single, motivating, personalized health tip (max 20 words) based on the data.
        Return ONLY a JSON object: { "tip": "Your tip here" }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(text);

        res.json({ success: true, data });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const generatePatientBrief = async (req, res) => {
    try {
        const { patientName, reason } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.json({
                success: true,
                data: {
                    summary: `(Mock) ${patientName} is a 45-year-old managed for hypertension. Last visit was 3 months ago.`,
                    history: ['Diagnosed with Hypertension in 2022', 'Family history of diabetes', 'Allergic to Penicillin'],
                    questions: ['Have you been taking your Lisinopril regularly?', 'Any recent dizziness or headaches?']
                }
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
        You are a medical assistant preparing a doctor for an upcoming appointment.
        Patient: ${patientName}
        Reason for Visit: ${reason}

        Generate a concise "Patient Brief" assuming a realistic medical history relevant to the reason.
        
        Return ONLY a JSON object:
        {
            "summary": "2 sentence persistent history overview",
            "history": ["Key Point 1", "Key Point 2", "Key Point 3"],
            "questions": ["Suggested Question 1", "Suggested Question 2"]
        }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(text);

        res.json({ success: true, data });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const chatWithAI = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.json({
                success: true,
                reply: "I am a mock AI assistant. Please provide a valid API key to chat with the real Gemini AI."
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        // Transform frontend history to Gemini format if needed
        // Frontend sends: [{ role: 'user', text: '...' }, { role: 'model', text: '...' }]
        // Gemini expects: [{ role: 'user', parts: [{ text: '...' }] }, ...]
        let formattedHistory = (history || []).map(msg => ({
            role: msg.role === 'bot' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        }));

        // Gemini requires history to start with 'user'. Remove leading 'model' messages.
        while (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
            formattedHistory.shift();
        }

        const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ success: true, reply: text });

    } catch (error) {
        console.error("Gemini Chat Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { classifySymptoms, analyzeReport, generateHealthTips, generatePatientBrief, chatWithAI };

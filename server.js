const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// 🔑 Gemini API 키 넣기
const GEMINI_API_KEY = "AIzaSyCvBQ7bc8YcFBv0wGj2Csko-c5lDdZ7iN0";

app.use(cors());
app.use(express.json());

// 테스트용 라우트
app.get("/", (req, res) => {
    res.send("OwnView Gemini 서버 정상 작동중!");
});

// Gemini 챗봇 API
app.post("/api/gemini-chat", async (req, res) => {
    try {
        const userPrompt = req.body.prompt;

        const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: userPrompt }] }],
                }),
            }
        );

        const data = await geminiRes.json();
        const aiMessage =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "AI 응답 없음";

        res.json({ response: aiMessage });

    } catch (error) {
        console.error("Gemini API 오류:", error);
        res.status(500).json({ error: "서버 오류 발생" });
    }
});

// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
// 🚀 서버 구동부 (필수!!)
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

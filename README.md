# OpenAI

- https://platform.openai.com/docs/overview

## 1. 회원가입 하기

## 2. 결제 등록하기

## 3. API 키 발급하기

## 4. 실습 (감정 분석 서비스)

```env
REACT_APP_OPENAI_API_KEY=키값
```

```js
import React, { useState } from "react";

function App() {
  const [mood, setMood] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!mood.trim()) return;

    setIsLoading(true);
    setAnalysis("");

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "당신은 감정 분석 전문가입니다. 사용자의 기분을 분석하고 따뜻하고 건설적인 조언을 제공해주세요. 한국어로 답변해주세요.",
              },
              {
                role: "user",
                content: `다음과 같은 기분을 분석해주세요: "${mood}"`,
              },
            ],
            max_tokens: 300,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("API 요청 실패");
      }

      const data = await response.json();
      setAnalysis(data.choices[0].message.content);
    } catch (error) {
      console.error("Error:", error);
      setAnalysis(
        "죄송합니다. 분석 중 오류가 발생했습니다. 다시 시도해주세요.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>💭 기분 분석 서비스</h1>
        <p>현재 기분을 입력하면 AI가 분석해드려요</p>
      </header>

      <div className="mood-container">
        <form onSubmit={handleSubmit} className="mood-form">
          <div className="input-group">
            <label htmlFor="mood-input">
              현재 기분을 자유롭게 표현해주세요:
            </label>
            <textarea
              id="mood-input"
              value={mood}
              onChange={e => setMood(e.target.value)}
              placeholder="예: 오늘 회사에서 상사한테 혼났는데, 집에 와서도 계속 신경 쓰여요..."
              disabled={isLoading}
              rows="4"
            />
          </div>
          <button type="submit" disabled={isLoading || !mood.trim()}>
            {isLoading ? "분석 중..." : "기분 분석하기"}
          </button>
        </form>

        {isLoading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>AI가 당신의 기분을 분석하고 있어요...</p>
          </div>
        )}

        {analysis && !isLoading && (
          <div className="analysis-result">
            <h3>📊 기분 분석 결과</h3>
            <div className="analysis-content">
              {analysis.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
```

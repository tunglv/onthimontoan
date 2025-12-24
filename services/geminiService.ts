
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getExplanationFromAI = async (grade: number, question: string, options: string[], correctAnswer: string) => {
  const ai = getAI();
  const prompt = `Bạn là một giáo viên tiểu học dạy giỏi môn Toán. Hãy giải thích chi tiết, dễ hiểu cho học sinh lớp ${grade} câu hỏi sau đây:
  
  Câu hỏi: ${question}
  Các lựa chọn: ${options.join(', ')}
  Đáp án đúng là: ${correctAnswer}

  Yêu cầu:
  1. Ngôn ngữ thân thiện, vui vẻ.
  2. Giải thích từng bước như đang giảng bài trên lớp.
  3. Chỉ ra mẹo để làm nhanh hoặc lỗi sai hay gặp.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return "AI đang bận một chút, bạn thử lại sau nhé!";
  }
};

export const generateNewExam = async (grade: number) => {
  const ai = getAI();
  const prompt = `Tạo một bộ đề thi Toán lớp ${grade} học kỳ 1 (Việt Nam) gồm 5 câu hỏi. 
  QUAN TRỌNG: Ít nhất 2 câu hỏi PHẢI có hình minh họa.
  
  Đối với visualType, hãy chọn một trong các giá trị: 'triangle_count', 'fraction', 'clock', 'counting_objects', 'geometry_shapes', 'measurement', 'none'.
  Dữ liệu cho visualData:
  - 'clock': { "hour": số, "minute": số }
  - 'fraction': { "numerator": số, "denominator": số }
  - 'counting_objects': { "count": số, "icon": "🍎" hoặc "🚗" hoặc "🐱" }
  - 'measurement': { "length": số }
  
  Trả về định dạng JSON mảng các đối tượng câu hỏi.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswerIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
              visualType: { type: Type.STRING },
              visualData: { type: Type.OBJECT }
            },
            required: ["text", "options", "correctAnswerIndex", "explanation", "visualType"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Generation Error:", error);
    return null;
  }
};

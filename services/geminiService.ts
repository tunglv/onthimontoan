
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getExplanationFromAI = async (grade: number, question: string, options: string[], correctAnswer: string) => {
  const ai = getAI();
  const prompt = `Bạn là một giáo viên tiểu học dạy giỏi môn Toán. Hãy giải thích chi tiết, dễ hiểu cho học sinh lớp ${grade} câu hỏi sau đây:
  
  Câu hỏi: ${question}
  Các lựa chọn: ${options.join(', ')}
  Đáp án đúng là: ${correctAnswer}

  Yêu cầu:
  1. Ngôn ngữ thân thiện, phù hợp lứa tuổi.
  2. Giải thích từng bước cách làm.
  3. Chỉ ra lỗi sai phổ biến mà học sinh thường gặp.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching AI explanation:", error);
    return "Rất tiếc, AI đang bận một chút. Bạn hãy xem lại kiến thức trong sách giáo khoa nhé!";
  }
};

export const generateNewExam = async (grade: number) => {
  const ai = getAI();
  const prompt = `Tạo một bộ đề thi Toán lớp ${grade} học kỳ 1 (chương trình Việt Nam) gồm 5 câu hỏi trắc nghiệm ngẫu nhiên. Trả về định dạng JSON.`;

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
              explanation: { type: Type.STRING }
            },
            required: ["text", "options", "correctAnswerIndex", "explanation"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating exam:", error);
    return null;
  }
};

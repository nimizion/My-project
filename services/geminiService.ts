
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, CareerRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const RECOMMENDATION_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: 'Job title' },
      description: { type: Type.STRING, description: 'Brief overview of the role' },
      whyFits: { type: Type.STRING, description: 'Explanation of why this fits the user specifically' },
      requiredSkills: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: 'Key technical and soft skills needed'
      },
      learningPath: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            stage: { type: Type.STRING, description: 'E.g., University, Certifications, Entry-level' },
            description: { type: Type.STRING, description: 'What to do in this stage' }
          },
          required: ['stage', 'description']
        }
      },
      salaryRange: { type: Type.STRING, description: 'Expected annual salary range' },
      jobOutlook: { type: Type.STRING, description: 'Market demand and growth potential' },
      difficulty: { type: Type.STRING, enum: ['Beginner', 'Intermediate', 'Advanced'] }
    },
    required: ['title', 'description', 'whyFits', 'requiredSkills', 'learningPath', 'salaryRange', 'jobOutlook', 'difficulty']
  }
};

export const getCareerRecommendations = async (profile: UserProfile): Promise<CareerRecommendation[]> => {
  try {
    const prompt = `
      Act as a world-class career counselor. Analyze the following student profile and suggest 3 highly relevant career paths.
      User Profile:
      - Interests: ${profile.interests}
      - Skills: ${profile.skills}
      - Academic Strengths: ${profile.academicStrengths}
      - Career Goals: ${profile.careerGoals}
      - Preferred Work Environment: ${profile.preferredWorkEnvironment}

      Ensure the recommendations are practical, specific, and account for current job market trends.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: RECOMMENDATION_SCHEMA,
        temperature: 0.7,
      }
    });

    const result = JSON.parse(response.text);
    return result as CareerRecommendation[];
  } catch (error) {
    console.error("Error fetching career recommendations:", error);
    throw new Error("Failed to generate recommendations. Please check your API key or input and try again.");
  }
};

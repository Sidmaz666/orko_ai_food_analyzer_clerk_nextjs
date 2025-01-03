import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// WARNING: Hardcoding API keys is not recommended for production use.
// Use environment variables or secure key management systems instead.
const API_KEY = process.env.GENERATIVE_AI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;

    if (!API_KEY) {
      return NextResponse.json(
        { error: "No API key provided" },
        { status: 400 }
      );
    }

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const imageBuffer = await image.arrayBuffer();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `Analyze this food image and provide detailed nutritional information. Return the data in the following JSON format:
{
  "fooditems": [
    {
      "name": "string",
      "portionsize": "string",
      "calories": number,
      "macros": {
        "protein": { "value": number, "unit": "g", "status": "string" },
        "carbohydrates": { "value": number, "unit": "g", "status": "string" },
        "fat": { "value": number, "unit": "g", "status": "string" },
        "fiber": { "value": number, "unit": "g", "status": "string" },
        "sugar": { "value": number, "unit": "g", "status": "string" }
      },
      "vitaminsandminerals": {
        "iron": { "value": number, "unit": "mg", "status": "string" },
        "magnesium": { "value": number, "unit": "mg", "status": "string" },
        "phosphorus": { "value": number, "unit": "mg", "status": "string" },
        "potassium": { "value": number, "unit": "mg", "status": "string" },
        "folate": { "value": number, "unit": "µg", "status": "string" },
        "calcium": { "value": number, "unit": "mg", "status": "string" },
        "sodium": { "value": number, "unit": "mg", "status": "string" },
        "vitamin_e": { "value": number, "unit": "mg", "status": "string" },
        "vitamin_k": { "value": number, "unit": "µg", "status": "string" }
      },
      "glycemicindex": { "value": number, "status": "string" },
      "healthbenefits": ["string"],
      "possibleallergies": ["string"],
      "cookingmethods": ["string"],
      "recommendeddailyintake": {
        "servingsize": "string",
        "frequency": "string"
      },
      "bioavailability": { "value": number, "unit": "%", "status": "string" },
      "antioxidants": { "value": number, "unit": "mmol/100g", "status": "string" },
      "digestibilityscore": { "value": number, "status": "string" },
      "hydrationeffect": { "value": number, "unit": "ml/100g", "status": "string" },
      "storageinstructions": "string",
      "culturalsignificance": "string",
      "commondishes": ["string"],
      "origin": "string",
      "shelflife": "string",
      "foodcategory": "string",
      "alternativenames": ["string"],
      "preservationmethods": ["string"],
      "fermentationpotential": { "value": number, "status": "string" },
      "foodpairings": ["string"],
      "culinaryuses": ["string"],
      "texture": "string",
      "aroma": "string",
      "recipes": [
        {
          "title": "string",
          "ingredients": ["string"],
          "steps": ["string"],
          "cookingtime": "string",
          "servings": number,
          "difficulty": "string"
        }
      ],
      "cookingtime": {
        "preptime": "string",
        "cooktime": "string"
      },
      "allergenwarnings": ["string"],
      "foodgroup": "string",
      "mealtype": ["string"],
      "servingtemperature": ["string"],
      "seasonalavailability": ["string"],
      "sustainabilityscore": { "value": number, "status": "string" },
      "carbonfootprint": { "value": number, "unit": "kgCO2e", "status": "string" },
      "processinglevel": "string",
      "recommendedcombos": ["string"]
    }
  ],
  "generalhealthtips": ["string"],
  "dietaryrestrictions": ["string"]
}
    Ensure all numbers are numeric values, not strings. Provide realistic estimates based on the image. For status fields, use "ok" for normal/good levels, "risk" for borderline levels, and "critical" for high/concerning levels.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: image.type,
          data: Buffer.from(imageBuffer).toString("base64"),
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    console.log("AI Response:", text);

    // Attempt to extract and parse the JSON from the response
    try {
      const jsonMatch = text.match(/\`\`\`json\n([\s\S]*?)\n\`\`\`/);
      if (jsonMatch && jsonMatch[1]) {
        const jsonString = jsonMatch[1];
        console.log("Extracted JSON string:", jsonString);

        const jsonData = JSON.parse(jsonString);
        console.log("Parsed JSON data:", jsonData);

        return NextResponse.json({ type: "json", data: jsonData });
      } else {
        console.error("No JSON found in the response");
        return NextResponse.json({ type: "text", data: text });
      }
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return NextResponse.json({ type: "text", data: text });
    }
  } catch (error) {
    console.error("Error analyzing image:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}

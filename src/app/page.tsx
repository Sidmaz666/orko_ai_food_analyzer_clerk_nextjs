"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  Upload,
  Apple,
  Beef,
  Carrot,
  Milk,
  Egg,
  Utensils,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";

interface NutrientInfo {
  value: number;
  unit: string;
  status: string;
}

interface FoodItem {
  name: string;
  portionsize: string;
  calories: number;
  macros: {
    [key: string]: NutrientInfo;
  };
  vitaminsandminerals: {
    [key: string]: NutrientInfo;
  };
  glycemicindex: NutrientInfo;
  healthbenefits: string[];
  possibleallergies: string[];
  cookingmethods: string[];
  recommendeddailyintake: {
    servingsize: string;
    frequency: string;
  };
  bioavailability: NutrientInfo;
  antioxidants: NutrientInfo;
  digestibilityscore: NutrientInfo;
  hydrationeffect: NutrientInfo;
  storageinstructions: string;
  culturalsignificance: string;
  commondishes: string[];
  origin: string;
  shelflife: string;
  foodcategory: string;
  alternativenames: string[];
  preservationmethods: string[];
  fermentationpotential: NutrientInfo;
  foodpairings: string[];
  culinaryuses: string[];
  texture: string;
  aroma: string;
  recipes: {
    title: string;
    ingredients: string[];
    steps: string[];
    cookingtime: string;
    servings: number;
    difficulty: string;
  }[];
  cookingtime: {
    preptime: string;
    cooktime: string;
  };
  allergenwarnings: string[];
  foodgroup: string;
  mealtype: string[];
  servingtemperature: string[];
  seasonalavailability: string[];
  sustainabilityscore: NutrientInfo;
  carbonfootprint: NutrientInfo;
  processinglevel: string;
  recommendedcombos: string[];
}

interface FoodAnalysis {
  fooditems: FoodItem[];
  generalhealthtips: string[];
  dietaryrestrictions: string[];
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<FoodAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }

      const data = await response.json();
      if (data.type === "json") {
        setResult(data.data);
      } else {
        setError("Unable to parse the analysis result.");
      }
    } catch (err) {
      setError(
        "An error occurred while analyzing the image. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getFoodIcon = (foodName: string) => {
    const lowerCaseName = foodName.toLowerCase();
    if (lowerCaseName.includes("rice")) return <Utensils className="h-6 w-6" />;
    if (lowerCaseName.includes("dal") || lowerCaseName.includes("lentil"))
      return <Carrot className="h-6 w-6" />;
    return <Apple className="h-6 w-6" />;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ok":
        return "bg-green-500";
      case "risk":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  return (
    <div className={`w-full h-full overflow-auto py-4 mb-10 relative ${loading && 'overflow-hidden py-0 mb-0' || ''}`}>
      {(loading && (
        <div className="absolute top-0 left-0 bg-background text-foreground w-screen h-[100dvh] z-[9999] flex justify-center items-center">
          <div className="flex space-x-2">
            <Loader2 className="animate-spin" />
            <span>Analyzing...Please Wait...</span>
          </div>
        </div>
      )) ||
        null}
      <main className="container mx-auto px-4 bg-background text-foreground">
        <Card className="max-w-4xl mx-auto relative border-none border-0 rounded-none">
          <div className="absolute top-0 md:top-4 right-4 flex space-x-4 items-center">
            <ThemeToggle className="border-none"/>
            <UserButton
              appearance={{
                elements: {
                  userButtonPopoverFooter: "hidden",
                },
              }}
            />
          </div>
          <CardHeader>
            <CardTitle className="mt-4 text-3xl font-bold text-center text-purple-800">
              Food Analyzer
            </CardTitle>
          </CardHeader>
          <CardContent className="p-1 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 transition-colors hover:border-purple-400">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  {preview ? (
                    <Image
                      src={preview}
                      alt="Preview"
                      width={300}
                      height={300}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                    </div>
                  )}
                </label>
              </div>
              <Button
                type="submit"
                disabled={!file || loading}
                className="w-full bg-purple-600 text-primary hover:bg-purple-700"
              >
                Analyze Food
              </Button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {result && (
              <div className="mt-6 space-y-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                    <TabsTrigger value="culinary">Culinary</TabsTrigger>
                    <TabsTrigger value="health">Health</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold text-purple-800">
                          Food Items
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {result.fooditems.map((item, index) => (
                          <div key={index} className="mb-4">
                            <h3 className="text-lg font-semibold flex items-center">
                              {getFoodIcon(item.name)}
                              <span className="ml-2">{item.name}</span>
                            </h3>
                            <p>Portion Size: {item.portionsize}</p>
                            <p>Calories: {item.calories}</p>
                            <p>Food Category: {item.foodcategory}</p>
                            <p>Origin: {item.origin}</p>
                            <p>
                              Sustainability Score:
                              <span
                                className={`ml-2 px-2 py-1 rounded-full text-white ${getStatusColor(
                                  item.sustainabilityscore.status
                                )}`}
                              >
                                {item.sustainabilityscore.value}
                              </span>
                            </p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="nutrition">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold text-purple-800">
                          Nutritional Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {result.fooditems.map((item, index) => (
                          <div key={index} className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">
                              {item.name}
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Macronutrients
                                </h4>
                                <ResponsiveContainer width="100%" height={300}>
                                  <PieChart>
                                    <Pie
                                      data={Object.entries(item.macros).map(
                                        ([key, value]) => ({
                                          name: key,
                                          value: value.value,
                                        })
                                      )}
                                      cx="50%"
                                      cy="50%"
                                      labelLine={true}
                                      outerRadius={80}
                                      fill="#8884d8"
                                      dataKey="value"
                                      nameKey="name"
                                      label
                                      legendType="diamond"
                                    >
                                      {Object.entries(item.macros).map(
                                        (entry, index) => (
                                          <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                          />
                                        )
                                      )}
                                    </Pie>
                                    <Legend />
                                    <Tooltip />
                                  </PieChart>
                                </ResponsiveContainer>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2 text-xl">
                                  Vitamins and Minerals
                                </h4>
                                <ul className="space-y-2">
                                  {Object.entries(item.vitaminsandminerals).map(
                                    ([key, value]) => (
                                      <li
                                        key={key}
                                        className="flex items-center justify-between"
                                      >
                                        <span className="capitalize">
                                          {key?.replaceAll("_", " ")}
                                        </span>
                                        <span
                                          className={`px-2 py-1 rounded-full text-white ${getStatusColor(
                                            value.status
                                          )}`}
                                        >
                                          {value.value} {value.unit}
                                        </span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                            <div className="mt-4">
                              <h4 className="font-semibold mb-2 text-xl">
                                Additional Nutritional Information
                              </h4>
                              <ul className="space-y-2">
                                <li className="flex items-center justify-between">
                                  <span>Glycemic Index:</span>
                                  <span
                                    className={`px-2 py-1 rounded-full text-white ${getStatusColor(
                                      item.glycemicindex.status
                                    )}`}
                                  >
                                    {item.glycemicindex.value}
                                  </span>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span>Digestibility Score:</span>
                                  <span
                                    className={`px-2 py-1 rounded-full text-white ${getStatusColor(
                                      item.digestibilityscore.status
                                    )}`}
                                  >
                                    {item.digestibilityscore.value}
                                  </span>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span>Bioavailability:</span>
                                  <span
                                    className={`px-2 py-1 rounded-full text-white ${getStatusColor(
                                      item.bioavailability.status
                                    )}`}
                                  >
                                    {item.bioavailability.value}
                                    {item.bioavailability.unit}
                                  </span>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span>Antioxidants:</span>
                                  <span
                                    className={`px-2 py-1 rounded-full text-white ${getStatusColor(
                                      item.antioxidants.status
                                    )}`}
                                  >
                                    {item.antioxidants.value}{" "}
                                    {item.antioxidants.unit}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="culinary">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold text-purple-800">
                          Culinary Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {result.fooditems.map((item, index) => (
                          <Accordion
                            type="single"
                            collapsible
                            className="mb-4"
                            key={index}
                            defaultValue="item-0"
                          >
                            <AccordionItem value={`item-${index}`}>
                              <AccordionTrigger>{item.name}</AccordionTrigger>
                              <AccordionContent>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2 text-xl">
                                      Cooking Methods
                                    </h4>
                                    <ul className="list-disc list-inside">
                                      {item.cookingmethods.map(
                                        (method, idx) => (
                                          <li key={idx}>{method}</li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2 text-xl">
                                      Common Dishes
                                    </h4>
                                    <ul className="list-disc list-inside">
                                      {item.commondishes.map((dish, idx) => (
                                        <li key={idx}>{dish}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                <div className="mt-4">
                                  <h4 className="font-semibold mb-2 text-xl">
                                    Recipes
                                  </h4>
                                  {item.recipes.map((recipe, recipeIndex) => (
                                    <div key={recipeIndex} className="mb-4">
                                      <h5 className="">Name: {recipe.title}</h5>
                                      <p>Cooking Time: {recipe.cookingtime}</p>
                                      <p>Servings: {recipe.servings}</p>
                                      <p>Difficulty: {recipe.difficulty}</p>
                                      <h6 className="font-semibold mt-2 text-xl mb-2">
                                        Ingredients:
                                      </h6>
                                      <ul className="list-disc list-inside">
                                        {recipe.ingredients.map(
                                          (ingredient, idx) => (
                                            <li key={idx}>{ingredient}</li>
                                          )
                                        )}
                                      </ul>
                                      <h6 className="font-semibold mt-2 text-xl mb-2">
                                        Steps:
                                      </h6>
                                      <ol className="list-decimal list-inside">
                                        {recipe.steps.map((step, idx) => (
                                          <li key={idx}>{step}</li>
                                        ))}
                                      </ol>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="health">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold text-purple-800">
                          Health Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {result.fooditems.map((item, index) => (
                          <div key={index} className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">
                              {item.name}
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Health Benefits
                                </h4>
                                <ul className="list-disc list-inside">
                                  {item.healthbenefits.map((benefit, idx) => (
                                    <li key={idx}>{benefit}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Possible Allergies
                                </h4>
                                <ul className="list-disc list-inside">
                                  {item.possibleallergies.map(
                                    (allergy, idx) => (
                                      <li key={idx}>{allergy}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                            <div className="mt-4">
                              <h4 className="font-semibold mb-2">
                                Recommended Daily Intake
                              </h4>
                              <p>
                                Serving Size:{" "}
                                {item.recommendeddailyintake.servingsize}
                              </p>
                              <p>
                                Frequency:{" "}
                                {item.recommendeddailyintake.frequency}
                              </p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

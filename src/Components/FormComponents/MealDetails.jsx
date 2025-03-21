import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const MealDetails = () => {
  const [MealDetails, setMealDetails] = useState({});
  const [nutritionWidget, setNutritionWidget] = useState({});
  const [Summary, setSummary] = useState("");
  const { id } = useParams();
  const [analyzedInfo, setAnalyzedInfo] = useState({});

  const getMealDetails = async () => {
    try {
      let details = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=e1960c2436914b008fd31c03c84e51b4`
      );
      let widget = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=e1960c2436914b008fd31c03c84e51b4`
      );

      setMealDetails(details.data);
      setNutritionWidget(widget.data);
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  };

  useEffect(() => {
    getMealDetails();
  }, [id]);

  /////////////////////////////// Translator ///////////////////////////

  const mealDetailsAPI = async (MealName) => {
    let response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAnKgAF69LPmgVVKxfu3tBKXEvtcrF3Ka4`,
      {
        contents: [
          {
            parts: [
              {
                text: `Based on the name of the following meal "${MealName}", I would like you to present me with an JSON API like this:
{
  "meal_cost": "", Find the meal price in ريال سعودي
  "recipe": {
    "name": "فوتوتشيني ألفريدو",
    "ingredients": [
      { "name": "زبدة غير مملحة", "quantity": "1 ملعقة كبيرة" },
      { "name": "ثوم مهروس", "quantity": "1 فص" },
      { "name": "برش الليمون", "quantity": "1 ملعقة صغيرة" },
      { "name": "طحين أبيض", "quantity": "2 ملعقة صغيرة" },
      { "name": "حليب قليل الدسم", "quantity": "1 كوب" },
      { "name": "ملح", "quantity": "حسب الرغبة" },
      { "name": "جبنة كريمية قليلة الدسم", "quantity": "2 ملعقة كبيرة" },
      { "name": "جبنة البرمزان", "quantity": "3/4 كوب" },
      { "name": "بقدونس طازج مفروم", "quantity": "3 ملعقة كبيرة" },
      { "name": "معكرونة الفوتوتشيني", "quantity": "340 غرام" },
      { "name": "فلفل مطحون طازج", "quantity": "حسب الرغبة" }
    ],
    "steps": [
      "إذابة الزبدة في مقلاة على درجة حرارة متوسطة.",
      "إضافة الثوم وبرش الليمون، وتحريك المكونات لمدة دقيقة حتى يذبل الثوم.",
      "إضافة الطحين وتحريكه لمدة دقيقة.",
      "إضافة الحليب والخفق حتى يتجانس.",
      "إضافة الملح وتحريك المكونات.",
      "طبخ الصوص مع التحريك المستمر لمدة 3 دقائق حتى يزداد سمكه.",
      "إضافة جبنة البرمزان وتحريكها حتى تذوب.",
      "إضافة البقدونس وتحريكه جيدًا.",
      "تحضير قدر كبير به ماء وملح وتركه يغلي.",
      "إضافة المعكرونة وتركها تنضج لمدة 2-3 دقائق.",
      "الاحتفاظ بكوب من ماء السلق وتصفيتها من الباقي.",
      "إضافة الصوص ونصف كوب من ماء السلق إلى المعكرونة وخلطها برفق.",
      "إضافة المزيد من ماء السلق عند الحاجة لتخفيف الصوص.",
      "رش جبنة البرمزان والفلفل على الوجه للتزيين."
    ]
  },
  "nutritional_notes": {
    "calories_per_serving": {
      "healthy_version": "350 سعرة حرارية",
      "regular_version": "530 سعرة حرارية"
    },
    "health_tips": [
      "استخدم الفيتوتشيني المصنوع من القمح الكامل.",
      "قلل من كمية الزبدة.",
      "استخدم حليب خالي الدسم.",
      "قلل كمية جبنة البرمزان.",
      "استبدل الكريمة الثقيلة بكريمة خفيفة الدسم."
    ],
    "dietary_recommendations": {
      "diabetes": "الوجبة غير مناسبة لمرضى السكري بسبب ارتفاع الكربوهيدرات.",
      "heart_patients": "اختر الحليب والأجبان قليلة الدسم، واستبدل الزبدة بالزيت النباتي وقلل الملح.",
      "pregnant_women": "الوصفة متوازنة وغنية بالبروتينات والمعادن الضرورية للحمل."
    }
  }
}

                    Only return the result for each meal like above without extra comments or formatting.
                  `,
              },
            ],
          },
        ],
      }
    );
    setSummary(response.data.candidates[0].content.parts[0].text);
  };

  useEffect(() => {
    if (MealDetails.summary) {
      mealDetailsAPI(MealDetails.title);
    }
  }, [MealDetails.summary, nutritionWidget.ingredients]);

  function cleanJSONFormat(text) {
    if (typeof text !== "string") {
      console.error("Error: input is not a string", text);
      return "";
    }

    let CleanAPI = text.replace(/^```json\s*|```[\s\n]*$/g, "").trim();

    let firstCurly = CleanAPI.indexOf("{");
    let lastCurly = CleanAPI.lastIndexOf("}");

    if (firstCurly === -1 || lastCurly === -1) {
      console.error("Error: JSON structure not found");
      return null;
    }

    CleanAPI = CleanAPI.slice(firstCurly, lastCurly + 1);
    try {
      return JSON.parse(CleanAPI);
    } catch (error) {
      console.error("Error: Invalid JSON format", error);
      return null;
    }
  }

  useEffect(() => {
    if (Summary) {
      setAnalyzedInfo(cleanJSONFormat(Summary));
    }
  }, [Summary]);
  useEffect(() => {
    console.log(analyzedInfo);
  }, [analyzedInfo]);

  //////////////////////////////////////////////////////////////////////

  return (
    <Box>
      {Object.keys(MealDetails).length > 0 ? (
        <Box>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "270px",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <Link to={"/diet-meals"}>
              <Button
                variant="contained"
                color="error"
                sx={{
                  position: "absolute",
                  zIndex: 1,
                  p: 0,
                  borderRadius: "50px",
                  minWidth: "30px",
                  m: "3px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                X
              </Button>
            </Link>
            <img
              src={`${MealDetails.image}`}
              alt="Meal"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.18))",
              }}
            />

            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                bottom: 10,
                right: 20,
                color: "white",
                fontWeight: "bold",
              }}
            >
              {MealDetails.title}
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
              معلومات الوجبة
            </Typography>

            {Summary !== "" ? (
              <Box>
                <Typography
                  color="textSecondary"
                  sx={{
                    fontSize: { xs: "16px", sm: "18px" },
                    textAlign: "justify",
                    mb: 2,
                  }}
                >
                  سعر الوجبة: {analyzedInfo?.meal_cost || "غير متوفر"} (قد يختلف
                  السعر باختلاف أسعار المقادير)
                </Typography>

                {/* المقادير */}
                {analyzedInfo?.recipe?.ingredients && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                      المقادير
                    </Typography>
                    <ul style={{ paddingRight: "20px", margin: 0 }}>
                      {analyzedInfo.recipe.ingredients.map(
                        (ingredient, index) => (
                          <li key={index}>
                            <Typography>
                              {ingredient.quantity || "-"}{" "}
                              {ingredient.name || "غير متوفر"}
                            </Typography>
                          </li>
                        )
                      )}
                    </ul>
                  </Box>
                )}

                {/* طريقة التحضير */}
                {analyzedInfo?.recipe?.steps && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                      طريقة التحضير
                    </Typography>
                    <ol style={{ paddingRight: "20px", margin: 0 }}>
                      {analyzedInfo.recipe.steps.map((step, index) => (
                        <li key={index}>
                          <Typography>{step || "غير متوفر"}</Typography>
                        </li>
                      ))}
                    </ol>
                  </Box>
                )}

                {/* نصائح صحية */}
                {analyzedInfo?.nutritional_notes?.health_tips && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                      نصائح صحية
                    </Typography>
                    <ul style={{ paddingRight: "20px", margin: 0 }}>
                      {analyzedInfo.nutritional_notes.health_tips.map(
                        (tip, index) => (
                          <li key={index}>
                            <Typography>{tip || "غير متوفر"}</Typography>
                          </li>
                        )
                      )}
                    </ul>
                  </Box>
                )}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={200}
              >
                <CircularProgress />
              </Box>
            )}
          </Box>
          <Stack
            direction={"row"}
            sx={{
              mt: 5,
              flexWrap: "wrap",
              gap: 2,
              justifyContent: { xs: "center", sm: "start" },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                سعرات حرارية
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {parseInt(nutritionWidget.calories)}جم
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                height: "auto",
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                كاربوهيدرات
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {parseInt(nutritionWidget.carbs)}جم
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                height: "auto",
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                دهون
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {parseInt(nutritionWidget.fat)}جم
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                height: "auto",
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                بروتين
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {parseInt(nutritionWidget.protein)}جم
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              mt: 3,
              flexWrap: "wrap",
              gap: 2,
              justifyContent: { xs: "center", sm: "start" },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                height: "auto",
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                نسبة الكربوهيدرات
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {nutritionWidget.caloricBreakdown.percentCarbs}%
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                height: "auto",
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                نسبة الدهون
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {nutritionWidget.caloricBreakdown.percentFat}%
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                height: "auto",
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                نسبة البروتين
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {nutritionWidget.caloricBreakdown.percentProtein}%
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                height: "auto",
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                الوزن لكل حصة
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {nutritionWidget.weightPerServing.amount}جم
              </Typography>
            </Box>
          </Stack>
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "700px",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </Box>
  );
};

export default MealDetails;

import { Card, CardContent, Typography, Grid } from "@mui/material";

const vitaminFoods = {
  "فيتامين B12": ["اللحوم الحمراء", "الأسماك", "البيض", "منتجات الألبان"],
  "فيتامين D": ["السلمون", "صفار البيض", "الحليب المدعم", "التعرض للشمس"],
  البيوتين: ["المكسرات", "البذور", "البيض", "البطاطا الحلوة"],
  الزنك: ["اللحوم", "المأكولات البحرية", "المكسرات", "البقوليات"],
  الحديد: ["السبانخ", "الكبد", "العدس", "اللحم الأحمر"],
  "فيتامين B2": ["الحليب", "البيض", "اللوز", "الفطر"],
  "أوميغا-3": ["سمك السلمون", "التونة", "بذور الكتان", "الجوز"],
  المغنيسيوم: ["الموز", "المكسرات", "البذور", "السبانخ"],
  البوتاسيوم: ["الموز", "البطاطا", "الأفوكادو", "البرتقال"],
  الكالسيوم: ["الحليب", "الأجبان", "الزبادي", "اللوز"],
  "فيتامين A": ["الجزر", "البطاطا الحلوة", "السبانخ", "الكبد"],
};

const VitaminRecommendations = () => {
  const missingVitamins = JSON.parse(
    localStorage.getItem("vitaminDeficiencies")
  ).flatMap((vitamin) => vitamin.split(", "));

  return (
    <div style={{ maxWidth: "100%", margin: "auto", padding: "20px" }}>
      <Typography variant="h6" fontWeight={"600"} mb={2} gutterBottom>
        💊 توصيات غذائية بناءً على العناصر الغذائية الناقصة
      </Typography>

      {missingVitamins.length === 0 ? (
        <Typography color="success.main" variant="h6">
          ✔ لا يوجد نقص في الفيتامينات! استمر في تناول نظام غذائي متوازن.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {missingVitamins.map((vitamin) => (
            <Grid item xs={12} sm={6} key={vitamin}>
              <Card
                sx={{
                  bgcolor: "#fbf6fe",
                  borderRight: "5px solid #A34BCE",
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="secondary">
                    {vitamin}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {vitaminFoods[vitamin]?.join(", ")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default VitaminRecommendations;

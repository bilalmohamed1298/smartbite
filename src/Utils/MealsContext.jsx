import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

export const MealsContext = createContext([]);

export function MealsContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState({
    activity: 1.5,
  });
  const [BMR, setBMR] = useState(0);
  const [TDEE, setTDEE] = useState(0);
  const [mealsCalories, setMealsCalories] = useState(0);
  const [dailyMeals, setDaliyMeals] = useState([]);
  const [dailyNutrients, setDaliyNutrients] = useState({});
  const [submit, setSubmit] = useState(false);
  const [localMealsCalories, setLocalMealsCalories] = useState(
    JSON.parse(localStorage.getItem("LocalMealsCalories"))
  );
  const [mealsChange, setMealsChange] = useState(false);
  const [specialNutrients, setSpecialNutrients] = useState({
    specialCalories:0,
    specialCarbs:0,
    specialFat:0,
    specialProtein:0
  });
  const [vitaminDeficiencies,setVitaminDeficiencies] = useState([])

  const toggleMealsChange = () => {
    setMealsChange((prevState) => !prevState);
  };

  ////////////////////// API //////////////////////////////

  const getAPI = async () => {
    const meals = await axios.get(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=e1960c2436914b008fd31c03c84e51b4&timeFrame=day&targetCalories=${localMealsCalories}`
    );

    if (localMealsCalories > 3000) {
      const spicalCaseCalories =
        localMealsCalories - meals.data.nutrients.calories;
      let SpecialMealsCount = 1;

      if (spicalCaseCalories > 1200){
        SpecialMealsCount = 2;

      }

      if (spicalCaseCalories > 2400) {
        SpecialMealsCount = 3;
      }
      if (spicalCaseCalories > 3600) {
        SpecialMealsCount = 4;
      }

      const specialMeals = await axios.get(
        `https://api.spoonacular.com/recipes/findByNutrients?minCalories=${
          spicalCaseCalories / SpecialMealsCount - 5
        }&maxCalories=${
          spicalCaseCalories / SpecialMealsCount + 5
        }&number=${SpecialMealsCount}&apiKey=e1960c2436914b008fd31c03c84e51b4`
      );

      let specialInfo = { ...specialNutrients }
      specialInfo.specialCalories = specialMeals.data.reduce((sum, item) => sum + item.calories, 0);
      specialInfo.specialCarbs = specialMeals.data.reduce((sum, item) => sum + item.carbs, 0);
      specialInfo.specialFat = specialMeals.data.reduce((sum, item) => sum + item.fat, 0);
      specialInfo.specialProtein = specialMeals.data.reduce((sum, item) => sum + item.protein, 0);
      setSpecialNutrients(specialInfo)

      localStorage.setItem(
        "LocalMeals",
        JSON.stringify([...meals.data.meals, ...specialMeals.data])
      );
      localStorage.setItem(
        "LocalNutrients",
        JSON.stringify(meals.data.nutrients)
      );
      setDaliyMeals([...meals.data.meals, ...specialMeals.data]);
      setDaliyNutrients(meals.data.nutrients);
    } else {
      localStorage.setItem("LocalMeals", JSON.stringify(meals.data.meals));
      localStorage.setItem(
        "LocalNutrients",
        JSON.stringify(meals.data.nutrients)
      );
      setDaliyMeals(meals.data.meals);
      setDaliyNutrients(meals.data.nutrients);
    }
  };

  //////////////////////////////////////////////////////////
  
  const CalculateBMR = () => {
    var tempBMR = 0;
    if (userDetails.gender === "ذكر") {
      tempBMR =
        10 * userDetails.weight +
        6.25 * userDetails.height +
        5 * userDetails.age +
        5;
    } else if (userDetails.gender === "أنثى") {
      tempBMR =
        10 * userDetails.weight +
        6.25 * userDetails.height +
        5 * userDetails.age -
        161;
    }
    setBMR(tempBMR);
  };

  const CalculateTDEE = () => {
    let tempTDEE = BMR * userDetails.activity;
    setTDEE(tempTDEE);
  };

  const CalculateMealsCalories = () => {
    if (userDetails.goal === "خسارة الوزن") {
      let losWeight = userDetails.weight - userDetails.idealWeight;
      let losCalories = losWeight * 7700;
      let dailyLosCalories =
        userDetails.duration > 0 ? losCalories / userDetails.duration : 0;
      let tempMealsCalories = TDEE - dailyLosCalories;
      tempMealsCalories !== 0 && isNaN(tempMealsCalories) === false
        ? localStorage.setItem(
            "LocalMealsCalories",
            tempMealsCalories.toFixed(1)
          )
        : "";
      setMealsCalories(tempMealsCalories.toFixed(1));
    } else if (userDetails.goal === "زيادة العضلات") {
      let gainWeight = userDetails.idealWeight - userDetails.weight;
      let gainCalories = gainWeight * 7700;
      let dailygainCalories =
        userDetails.duration > 0 ? gainCalories / userDetails.duration : 0;
      let tempMealsCalories = TDEE + dailygainCalories;
      tempMealsCalories !== 0 && isNaN(tempMealsCalories) === false
        ? localStorage.setItem(
            "LocalMealsCalories",
            tempMealsCalories.toFixed(1)
          )
        : "";
      setMealsCalories(tempMealsCalories.toFixed(1));
    }
  };

  useEffect(() => {
    CalculateBMR();
  }, [userDetails]);

  useEffect(() => {
    CalculateTDEE();
  }, [userDetails, BMR]);

  useEffect(() => {
    CalculateMealsCalories();
    setLocalMealsCalories(
      JSON.parse(localStorage.getItem("LocalMealsCalories"))
    );
  }, [userDetails, TDEE]);

  useEffect(() => {
    if (submit) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
  }, [submit, userDetails.duration]);

  useEffect(() => {
    let localMeals = JSON.parse(localStorage.getItem("LocalMeals"));
    let localNutrients = JSON.parse(localStorage.getItem("LocalNutrients"));
    if (localMeals && localNutrients) {
      setDaliyMeals(localMeals);
      setDaliyNutrients(localNutrients);
    } else if (submit) {
      getAPI();
    }
  }, [submit]);

  useEffect(() => {
    dailyMeals.length > 0 ? getAPI() : "";
  }, [mealsChange]);

  useMemo(() => {
    if(submit){
    localStorage.setItem('vitaminDeficiencies',JSON.stringify(vitaminDeficiencies))
    }
  }, [submit,vitaminDeficiencies]);

  return (
    <MealsContext.Provider
      value={{
        userDetails,
        dailyMeals,
        setUserDetails,
        mealsCalories,
        submit,
        setSubmit,
        toggleMealsChange,
        mealsChange,
        localMealsCalories,
        dailyNutrients,
        specialNutrients,
        vitaminDeficiencies,
        setVitaminDeficiencies,

      }}
    >
      {children}
    </MealsContext.Provider>
  );
}

import axios from "axios";
import { createContext, useEffect, useState } from "react";

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

  const toggleMealsChange = () => {
    setMealsChange((prevState) => !prevState);
  };

  ////////////////////// API //////////////////////////////

  const getAPI = async () => {
    let meals = await axios.get(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=e1960c2436914b008fd31c03c84e51b4&timeFrame=day&targetCalories=${localMealsCalories}`
    );
    localStorage.setItem("LocalMeals", JSON.stringify(meals.data.meals));
    localStorage.setItem("LocalNutrients", JSON.stringify(meals.data.nutrients));
    setDaliyMeals(meals.data.meals);
    setDaliyNutrients(meals.data.nutrients);
  };

  //////////////////////////////////////////////////////////

  const CalculateBMR = () => {
    var tempBMR = 0;
    if (userDetails.gender === "Male") {
      tempBMR =
        10 * userDetails.weight +
        6.25 * userDetails.height +
        5 * userDetails.age +
        5;
    } else if (userDetails.gender === "Female") {
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
    if (userDetails.goal === "Losing weight") {
      let losWeight = userDetails.weight - userDetails.idealWeight;
      let losCalories = losWeight * 7700;
      let dailyLosCalories = userDetails.duration>0
        ? losCalories / userDetails.duration
        : 0;
      let tempMealsCalories = TDEE - dailyLosCalories;
      tempMealsCalories !== 0 && isNaN(tempMealsCalories) === false
        ? localStorage.setItem(
            "LocalMealsCalories",
            tempMealsCalories.toFixed(1)
          )
        : "";
      setMealsCalories(tempMealsCalories.toFixed(1));
    } else if (userDetails.goal === "Gaining muscle") {
      let gainWeight = userDetails.idealWeight - userDetails.weight;
      let gainCalories = gainWeight * 7700;
      let dailygainCalories = userDetails.duration>0
        ? gainCalories / userDetails.duration
        : 0;
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
  }, [submit,userDetails.duration]);

  useEffect(() => {
    let localMeals = JSON.parse(localStorage.getItem("LocalMeals"));
    let localNutrients = JSON.parse(localStorage.getItem("LocalNutrients"));
    if (localMeals&&localNutrients) {
      setDaliyMeals(localMeals);
      setDaliyNutrients(localNutrients);
    } else if (submit) {
      getAPI();
    }
  }, [submit]);

  useEffect(() => {
    dailyMeals.length>0? getAPI():''
  }, [mealsChange]);

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
        dailyNutrients
      }}
    >
      {children}
    </MealsContext.Provider>
  );
}

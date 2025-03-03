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
  const [mealsChange, setMealsChange] = useState(false);

  let localUserDetails = JSON.parse(localStorage.getItem("userDetails"));

  ////////////////////// API //////////////////////////////

  const getAPI = async () => {
    let meals = await axios.get(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=e1960c2436914b008fd31c03c84e51b4&timeFrame=day&targetCalories=${mealsCalories}`
    );
    localStorage.setItem("LocalMealsCalories", JSON.stringify(meals.data.meals));
    setDaliyMeals(meals.data.meals);
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
      let dailyLosCalories = userDetails.duration ? losCalories / userDetails.duration : 0;
      let tempMealsCalories = TDEE - dailyLosCalories;
      setMealsCalories(tempMealsCalories.toFixed(1));

    } else {
      let gainWeight = userDetails.weight - userDetails.idealWeight;
      let gainCalories = gainWeight * 7700;
      let dailygainCalories = userDetails.duration ? gainCalories / userDetails.duration : 0;
      let tempMealsCalories = TDEE + dailygainCalories;
      setMealsCalories(tempMealsCalories.toFixed(1));
      
    }
  };

  useEffect(() => {
    CalculateBMR();
  }, [userDetails]);

  useEffect(() => {
    CalculateTDEE();
  }, [userDetails,BMR]);

  useEffect(() => {
    CalculateMealsCalories();
  }, [userDetails.duration,TDEE]);

  useEffect(() => { 
    localStorage.setItem('MealsCalories', mealsCalories)
  }, [mealsCalories]);

  useEffect(() => {
    let localMealsCalories = JSON.parse(localStorage.getItem("LocalMealsCalories"));
    if (localMealsCalories && !mealsChange) {
      setDaliyMeals(localMealsCalories);
    } else {
      getAPI();
    }

  }, [mealsCalories,mealsChange]);

  return (
    <MealsContext.Provider
      value={{
        userDetails,
        dailyMeals,
        setUserDetails,
        mealsCalories,
        setMealsChange,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
}

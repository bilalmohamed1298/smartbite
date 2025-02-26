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
  const [dailyMeals,setDaliyMeals] = useState([]) 

  const getAPI = async ()=>{
    let meals = await axios.get('https://api.spoonacular.com/mealplanner/generate?apiKey=7d5e750167ac4dc0b0f4032102e970de&timeFrame=day&targetCalories=2000');
    setDaliyMeals(meals.data.meals)
  }

  const CalculateTDEE = () => {
    if (userDetails.gender === "Male") {
      let tempBMR =
        10 * userDetails.weight +
        6.25 * userDetails.height +
        5 * userDetails.age +
        5;
      setBMR(tempBMR);
      let tempTDEE = tempBMR * userDetails.activity;
      setTDEE(tempTDEE);
    } else if (userDetails.gender === "Female") {
      let tempBMR =
        10 * userDetails.weight +
        6.25 * userDetails.height +
        5 * userDetails.age -
        161;
      setBMR(tempBMR);
      let tempTDEE = tempBMR * userDetails.activity;
      setTDEE(tempTDEE);
    }
  };

  const CalculateMealsCalories = () => {
    if (userDetails.goal === "Losing weight") {
      let losWeight = userDetails.weight - userDetails.idealWeight;
      let losCalories = losWeight * 7700;
      let dailyLosCalories = losCalories / userDetails.duration;
      let tempMealsCalories = TDEE - dailyLosCalories;
      setMealsCalories(tempMealsCalories);
      console.log(`You need to eat: ${mealsCalories} ber day`);
    } else if (userDetails.goal === "Gaining muscle") {
      let gainWeight = userDetails.weight - userDetails.idealWeight;
      let gainCalories = gainWeight * 7700;
      let dailygainCalories = gainCalories / userDetails.duration;
      let tempMealsCalories = TDEE + dailygainCalories;
      setMealsCalories(tempMealsCalories);
      console.log(`You need to eat: ${mealsCalories} calories ber day`);
    }
  };

  useEffect(() => {
    CalculateTDEE();
    console.log(userDetails);
    console.log(BMR);
    console.log(TDEE);
  }, [userDetails]);

  useEffect(() => {
    CalculateMealsCalories();
  }, [userDetails, TDEE]);

  useEffect(() => {
    getAPI()
    console.log(dailyMeals)
  }, [mealsCalories]);



  return (
    <MealsContext.Provider
      value={{
        userDetails,
        dailyMeals,
        setUserDetails,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
}

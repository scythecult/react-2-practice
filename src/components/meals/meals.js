import React, { useContext, useEffect } from "react";
import { fetchMeals } from "../../actions/actions";
import { FIRE_DB_STORED_MEALS } from "../../constants/constants";
import { CartContext, DispatchContext } from "../../context/context";
import { useHttp } from "../../hooks/hooks";
import { transformObject } from "../../utils/utils";
import { ErrorIndicatior } from "../error-indicator/error-indicator";
import { LoadingIndicatior } from "../loading-indicatior/loading-indicatior";
import { Form } from "../meal/form";
import { Meal } from "../meal/meal";
import { Card } from "../UI/card";
import styles from "./meals.module.css";

const Meals = React.memo(() => {
  const { state } = useContext(CartContext);
  const dispatch = useContext(DispatchContext);
  const [fetchData, { isLoading, isError }] = useHttp({
    url: FIRE_DB_STORED_MEALS,
  });

  useEffect(() => {
    fetchData().then((response) => {
      if (response) {
        const data = transformObject(response);

        if (!data.length) return;

        dispatch(fetchMeals(data));
      }
    });
  }, []);

  if (isLoading) {
    return <LoadingIndicatior config={{ size: "small", duration: "fast" }} />;
  }

  if (isError) {
    return <ErrorIndicatior />;
  }

  return (
    <div className={styles.meals}>
      <Card>
        <ul>
          {state.meals.map((meal) => (
            <Meal key={meal.id} {...meal}>
              <Form id={meal.id} />
            </Meal>
          ))}
        </ul>
      </Card>
    </div>
  );
});

export { Meals };
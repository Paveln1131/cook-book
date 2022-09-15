import React from "react";
import styles from "./recipe.module.css";
import Card from "react-bootstrap/Card";

function IngredientList(props) {
    return (
        <div className="row g-3">
            {props.recipeList.map((recipe) => {
                return (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                        <Card key={recipe.id}>
                            <Card.Body>
                                <div className={styles.recipe}>
                                    <h3>{recipe.name}</h3>
                                    <ul>
                                        {props.ingredientsList.map((ingredient) => {
                                            for (let key in recipe.ingredients){
                                                if (recipe.ingredients[key].id === ingredient.id) {
                                                    return (
                                                        <li key={ingredient.id}>{ingredient.name}</li>
                                                    )
                                                }
                                            }
                                        })}
                                    </ul>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
}

export default IngredientList;
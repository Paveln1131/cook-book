import React from "react";
import Recipe from "./Recipe";
import styles from "./recipe.module.css";
import Card from "react-bootstrap/Card";

function RecipeSmallDetailList(props) {
    return (
        <div>
            {props.recipeList.map((recipe) => {
                return (
                    <Card key={recipe.id}>
                        <Card.Body>
                            <div className={styles.recipe}>
                                <h3>{recipe.name}</h3>
                                <span><img className={styles.recipeImg} src={recipe.imgUri} alt="Final product"/></span>
                                <p>{recipe.description.slice(0, 30) + "..."}</p>
                                <ul>
                                    {props.ingredientsList.map((ingredient) => {
                                        let x = 0;
                                        for (let key in recipe.ingredients){
                                            x++;
                                            if (x === 5){
                                                break;
                                            }

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
                );
            })}
        </div>
    );
}

export default RecipeSmallDetailList;
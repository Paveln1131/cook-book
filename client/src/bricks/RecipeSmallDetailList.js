import React from "react";
import Recipe from "./Recipe";
import styles from "./recipe.module.css";
import Card from "react-bootstrap/Card";

function RecipeSmallDetailList(props) {
    return (
        <div className="row g-3">
            {props.recipeList.map((recipe) => {
                return (
                    <div key={recipe.id} className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                        <Card>
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
                    </div>

                );
            })}
        </div>
    );
}

export default RecipeSmallDetailList;
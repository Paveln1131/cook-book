import React from "react";
import Recipe from "./Recipe";
import styles from "./recipe.module.css";
import Card from "react-bootstrap/Card";

function RecipeSmallDetailList(props) {
    return (
        <div>
            {props.recipeList.map((recipe) => {
                return (
                    <Card>
                        <Card.Body>
                            <div className={styles.recipe} key={recipe.id}>
                                <h3>{recipe.name}</h3>
                                <span><img className={styles.recipeImg} src={recipe.imgUri} alt="Final product"/></span>
                                <p>{recipe.description.slice(0,30) + "..."}</p>
                            </div>
                        </Card.Body>
                    </Card>
                );
            })}
        </div>
    );
}

export default RecipeSmallDetailList;
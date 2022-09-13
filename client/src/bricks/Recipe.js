import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./recipe.module.css"

function Recipe(props){

    return(
        <Card>
            <Card.Body>
                <div className={styles.recipe}>
                    <h3>{props.recipe.name}</h3>
                    <span className={styles.recipeImgContainer}><img className={styles.recipeImg} src={props.recipe.imgUri} alt="Final product"/></span>
                    <p>{props.recipe.description}</p>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Recipe;
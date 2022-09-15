import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./recipe.module.css"

function Recipe(props){

    return(
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
            <Card>
                <Card.Body>
                        <div className={styles.recipe}>
                            <h3>{props.recipe.name}</h3>
                            <span><img className={styles.recipeImg} src={props.recipe.imgUri} alt="Final product"/></span>
                            <p>{props.recipe.description}</p>
                    </div>
                </Card.Body>
            </Card>
            </div>

    );
}

export default Recipe;
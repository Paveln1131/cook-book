import React from "react";
import Recipe from "./Recipe";

function RecipeBigDetailList(props) {
    return(
        <div className="row g-3">
            {props.recipeList.map((recipe) => {
            return (<Recipe key={recipe.id} recipe={recipe} />)
        })}
        </div>

    );

}

export default RecipeBigDetailList;
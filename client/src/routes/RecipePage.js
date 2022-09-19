import {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import RecipeList from "../bricks/RecipeList";
import styles from "bootstrap/dist/css/bootstrap.min.css";
import ingredientPage from "./IngredientPage";

function RecipePage(){

    const [recipeLoadCall, setRecipeLoadCall] = useState({
        state: "pending",
    });
    const [ingredientsLoadCall, setIngredientsLoadCall] = useState({
        state: "pending",
    });

    function loadData(){
        setRecipeLoadCall({state: "pending"})
        fetch(`http://localhost:3000/recipe/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setRecipeLoadCall({ state: "error", error: responseJson });
            } else {
                setRecipeLoadCall({ state: "success", data: responseJson });
            }
        });
        console.log(recipeLoadCall.state)
    }

    useEffect(() => {

        loadData()

    }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/ingredient/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setIngredientsLoadCall({ state: "error", error: responseJson });
            } else {
                setIngredientsLoadCall({ state: "success", data: responseJson });
            }
        });
    }, []);

    function getChild() {

        if(ingredientsLoadCall.state === "pending"){
            return (
                <div>
                    <Icon size={2} path={mdiLoading} spin={true} />
                </div>
            );
        }

        switch (recipeLoadCall.state) {
            case "pending":

            case "success":
                return (
                    <div className={styles}>
                        <RecipeList onRefresh={loadData} recipeList={recipeLoadCall.data} ingredientsList={ingredientsLoadCall.data}/>
                    </div>
                );
            case "error":
                return (
                    <div>
                        <div>Nepodařilo se načíst data o třídě.</div>
                        <br />
                        <pre>{JSON.stringify(recipeLoadCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }

    return getChild()
}

export default RecipePage;
import "./App.css";
import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import styles from "bootstrap/dist/css/bootstrap.min.css";
import RecipeList from './bricks/RecipeList'

function App() {
    const [recipeLoadCall, setRecipeLoadCall] = useState({
        state: "pending",
    });
    const [ingredientsLoadCall, setIngredientsLoadCall] = useState({
        state: "pending",
    });

    useEffect(() => {
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
        switch (recipeLoadCall.state) {
            case "pending":
                return (
                    <div>
                        <Icon size={2} path={mdiLoading} spin={true} />
                    </div>
                );
            case "success":
                return (
                    <div className={styles}>
                        <RecipeList recipeList={recipeLoadCall.data} ingredientsList={ingredientsLoadCall.data}/>
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

    return <div className="App">{getChild()}</div>;
}

export default App;

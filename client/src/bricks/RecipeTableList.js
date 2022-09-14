import styles from "./recipe.module.css";
import Card from "react-bootstrap/Card";

function RecipeTableList(props) {
    return (
        <div>
            {props.recipeList.map((recipe) => {
                return (
                    <table className="card">
                        <tr>
                            <td>
                                <div className={styles.recipe} key={recipe.id}>
                                    <h3>{recipe.name}</h3>
                                    <p>{recipe.description}</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                );
            })}
        </div>
    );
}

export default RecipeTableList;
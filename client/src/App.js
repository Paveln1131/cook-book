import logo from './logo.svg';
import './App.css';
import recipes from './recipes.json'
import RecipeList from './bricks/RecipeList'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="App">
            <RecipeList recipeList = {recipes}/>
        </div>
    );
}

export default App;

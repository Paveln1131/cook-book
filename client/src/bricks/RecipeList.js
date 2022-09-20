import React, {useState, useMemo, useContext} from "react";
import RecipeSmallDetailList from "./RecipeSmallDetailList";
import RecipeBigDetailList from "./RecipeBigDetailList";
import RecipeTableList from "./RecipeTableList";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


import Icon from "@mdi/react";
import {mdiCropSquare, mdiSquareSmall, mdiMagnify, mdiViewGridOutline, mdiClipboardListOutline} from "@mdi/js";
import RecipeForm from "./RecipeForm";
import UserContext from "../UserProvider";

function RecipeList(props){
    const [viewType, setViewType] = useState("smallDetail");
    const isSmallDetail = viewType === "smallDetail";
    const isBigDetail = viewType === "bigDetail";
    const [searchBy, setSearchBy] = useState("");
    const {isAuthorized} = useContext(UserContext)


    const filteredRecipesList = useMemo(() => {
        if (!props.recipeList) return []
        return props.recipeList.filter((item) => {
            return (
                item.name
                    .toLocaleLowerCase()
                    .includes(searchBy.toLocaleLowerCase())||
                item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            );
        });
    }, [searchBy,  props.recipeList]);

    function handleSearch(event) {
        event.preventDefault();
        setSearchBy(event.target["searchInput"].value);
    }

    function handleSearchDelete(event) {
        if (!event.target.value) setSearchBy("");
    }

    return(
        <div>
        <Navbar bg="light">
            <div className="container-fluid">
                <Navbar.Brand>Zobrazení</Navbar.Brand>
                <div>
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            id={"searchInput"}
                            style={{ maxWidth: "150px" }}
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={handleSearchDelete}
                        />
                        <Button
                            style={{ marginRight: "8px" }}
                            variant="outline-success"
                            type="submit"
                        >
                            <Icon size={1} path={mdiMagnify} />
                        </Button>
                        <Button
                            variant="outline-primary"
                            onClick={() =>
                                setViewType((currentState) => {
                                    if (currentState === "smallDetail") return "bigDetail";
                                    else if (currentState === "bigDetail") return "table"
                                    else return "smallDetail";
                                })
                            }
                        >
                            <Icon size={1} path={isSmallDetail ? mdiSquareSmall : isBigDetail ? mdiCropSquare : mdiViewGridOutline} />{" "}
                            {isSmallDetail ? "Malý detail" : isBigDetail ? "Velký detail" : "Tabulka"}
                        </Button>
                    </Form>
                </div>
            </div>
        </Navbar>
            {isAuthorized ? (
                <RecipeForm onRefresh={props.onRefresh} addRecipe = {true} ingredientsList={props.ingredientsList}/>)
                : ((<></>))
                    }

            {isSmallDetail ? (
                <RecipeSmallDetailList onRefresh={props.onRefresh} recipeList={filteredRecipesList} ingredientsList={props.ingredientsList}/>
            ) : isBigDetail ?
                (
                    <RecipeBigDetailList recipeList={filteredRecipesList}/>
                ) :
                <RecipeTableList recipeList={filteredRecipesList}/>
            }

    </div>
);
}

export default RecipeList;
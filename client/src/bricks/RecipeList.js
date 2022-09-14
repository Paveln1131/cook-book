import React, { useState, useMemo } from "react";
import RecipeSmallDetailList from "./RecipeSmallDetailList";
import RecipeBigDetailList from "./RecipeBigDetailList";
import RecipeTableList from "./RecipeTableList";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


import Icon from "@mdi/react";
import { mdiCropSquare, mdiSquareSmall, mdiMagnify, mdiViewGridOutline} from "@mdi/js";

function RecipeList(props){
    const [viewType, setViewType] = useState("smallDetail");
    const isSmallDetail = viewType === "smallDetail";
    const isBigDetail = viewType === "bigDetail";
    const [searchBy, setSearchBy] = useState("");

    const filteredRecipesList = useMemo(() => {
        return props.recipeList.filter((item) => {
            return (
                item.name
                    .toLocaleLowerCase()
                    .includes(searchBy.toLocaleLowerCase())||
                item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            );
        });
    }, [searchBy]);

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
                            {isSmallDetail ? "Malí detail" : isBigDetail ? "Velký detail" : "Tabulka"}
                        </Button>
                    </Form>
                </div>
            </div>
        </Navbar>
        {isSmallDetail ? (
            <RecipeSmallDetailList recipeList={filteredRecipesList} ingredientsList={props.ingredientsList} />
        ) : isBigDetail ?
            (
            <RecipeBigDetailList recipeList={filteredRecipesList} />
        ) :
            <RecipeTableList recipeList={filteredRecipesList} />
        }
    </div>
);
}

export default RecipeList;
import React, { useState, useMemo } from "react";
import RecipeSmallDetailList from "./RecipeSmallDetailList";
import RecipeBigDetailList from "./RecipeBigDetailList";
import RecipeTableList from "./RecipeTableList";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline } from "@mdi/js";


function RecipeList(props){
    const [viewType, setViewType] = useState("smallDetail");
    const isSmallDetail = viewType === "smallDetail";
    const isBigDetail = viewType === "bigDetail";
    return(
        <div>
        <Navbar bg="light">
            <div className="container-fluid">
                <Navbar.Brand>Zobrazení</Navbar.Brand>
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
                    <Icon size={1} path={isSmallDetail ? mdiTable : mdiViewGridOutline} />{" "}
                    {isSmallDetail ? "Malí detail" : isBigDetail ? "Velký detail" : "Tabulka"}
                </Button>
            </div>
        </Navbar>
        {isSmallDetail ? (
            <RecipeSmallDetailList recipeList={props.recipeList} />
        ) : isBigDetail ?
            (
            <RecipeBigDetailList recipeList={props.recipeList} />
        ) :
            <RecipeTableList recipeList={props.recipeList} />
        }
    </div>
);
}

export default RecipeList;
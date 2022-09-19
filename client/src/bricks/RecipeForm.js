import {useState} from "react";
import {mdiClipboardListOutline, mdiClose, mdiPencil, mdiPlus} from "@mdi/js";
import Icon from "@mdi/react";
import {Modal, Form, Row, Col, FormSelect, FormText} from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import Ajv from "ajv"

function RecipeForm({addRecipe, recipe}) {
    const [isModalShown, setShow] = useState(false);
    const [recipeCall, setRecipeCall] = useState({state:"pending"});

    const handleShowModal = () => setShow(true)
    const handleCloseModal = () =>{
        setShow(false);
        setFormData(defaultForm);
    }
    const ajv = new Ajv({ strictTuples: false });

    const defaultForm = {
        name:"",
        description:"",
        ingredient:null,
        count:1,
        unit:"g"
    };



    const [formData, setFormData] = useState(defaultForm);

    const setField = (name, val) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            newData[name] = val;
            return newData;
        });
    };
    if(addRecipe === "false"){
        defaultForm.name = recipe.name
        defaultForm.description = recipe.description
    }

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        ajv.compile(formData)

        e.preventDefault();
        e.stopPropagation();

        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        const res = await fetch(`http://localhost:3000/recipe/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (res.status >= 400) {
            setRecipeCall({ state: "error", error: data });
        } else {
            setRecipeCall({ state: "success", data });
            handleCloseModal();
        }
        console.log(recipeCall.state)
    };


    function addButton() {
        if (addRecipe ==="true"){
            return (
                <Button
                    path={mdiClipboardListOutline}
                    style={{
                        color: "white",
                        cursor: "pointer",
                        width: "100%",
                        height: "40px",
                        marginTop: "6px",
                        marginBottom: "6px",
                        backgroundColor: "green",
                        fontSize: "50px",
                        fontWeight: "bold"
                    }}
                    onClick={handleShowModal}><span style={{position: "relative", bottom: "31px"}}>+</span>
                </Button>
            )
        }else {
            return (
                <Button
                    style={{
                        cursor: "pointer",
                        width: "30px",
                        height: "30px",
                        position:"absolute",
                        border:"none",
                        right:"-8px",
                        bottom:"-5px",
                        backgroundColor: "transparent",
                        fontSize: "50px",
                        fontWeight: "bold"
                    }}
                    onClick={handleShowModal}>
                    <Icon path={mdiPencil} style={{position: "relative",right:"10px", bottom: "38px",color:"black"}} size={1}></Icon>
                </Button>
            )
        }


    }


    const [validated, setValidated] = useState(false);

    return (
        <>
            <Modal show={isModalShown} onHide={handleCloseModal}>
                <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}><Form/>
                <Modal.Header>
                    <Modal.Title>Vytvořit recept</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br/>
                    <Form.Group className="mb-3">
                        <Form.Label>Název</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.name}
                            onChange={(e) => setField("name", e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Název receptu je povinný!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Postup</Form.Label>
                        <textarea value={formData.description}
                                  onChange={(e) => setField("description", e.target.value)}
                                  className="form-control"
                                  maxLength={1000}
                                  aria-label="With textarea"
                                  required
                        >
                        </textarea>
                    </Form.Group>
                    <Row>
                        <Form.Group className="mb-3" as={Col}>
                            <Form.Label>Ingredience</Form.Label>
                            <FormSelect
                                value={formData.ingredient}
                                onChange={(e) => setField("ingredient", e.target.value)}
                            >
                                <option value="Rajče">Rajče</option>
                                <option value="Cibule">Cibule</option>
                                <option value="Vejce">Vejce</option>
                                <option value="Hovězí maso">Hovězí maso</option>
                            </FormSelect>
                        </Form.Group>

                        <Form.Group style={{margin:"0"}} as={Col}>
                            <Form.Label>Počet</Form.Label>
                            <Form.Control
                                type="number"
                                min={1}
                                max={500}
                                value={formData.count}
                                onChange={(e) => setField("count", e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Zadejte počet v rozmezí 1 - 500
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col}>
                            <Form.Label>Jednotka</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.unit}
                                onChange={(e) => setField("unit", e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{float: "right"}}
                        variant="secondary"
                        onClick={handleCloseModal}
                    >
                        Zavřít
                    </Button>
                    <Button
                        type="submit"
                        style={{float: "right", backgroundColor:"green"}}
                        variant="primary"

                    >
                        <Icon path={mdiPlus} size={1} />
                        Přidat recept
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
            {addButton()}

        </>
    )
}



export default RecipeForm;
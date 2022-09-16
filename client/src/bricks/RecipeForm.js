import {useState} from "react";
import {mdiClipboardListOutline, mdiClose, mdiPlus} from "@mdi/js";
import Icon from "@mdi/react";
import {Modal, Form, Row, Col, FormSelect} from 'react-bootstrap';
import Button from "react-bootstrap/Button";

function RecipeForm() {
    const [isModalShown, setShow] = useState(false);

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    const [formData, setFormData] = useState({
        name:"",
        procedure:"",
        ingredient:null,
        count: 1,
        unit:"g"
    });

    const setField = (name, val) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            newData[name] = val;
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log(formData)
    };


    return (
        <>
            <Modal show={isModalShown} onHide={handleCloseModal}>
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
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Postup</Form.Label>
                        <textarea value={formData.procedure}
                                  onChange={(e) => setField("procedure", e.target.value)}
                                  className="form-control"
                                  aria-label="With textarea">
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
                                value={formData.count}
                                onChange={(e) => setField("count", e.target.value)}
                            />
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
                        style={{float: "right", backgroundColor:"green"}}
                        variant="primary"
                        onClick={handleSubmit}

                    >
                        <Icon path={mdiPlus} size={1} />
                        Přidat recept
                    </Button>
                </Modal.Footer>
            </Modal>
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
        </>
    )
}

export default RecipeForm;
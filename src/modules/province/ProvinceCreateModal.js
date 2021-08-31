import { Button, Form } from "react-bootstrap"
import { useState } from "react"
import { Modal } from "react-bootstrap"
import ProvinceForm from "./ProvinceForm"


export default function ProvinceCreateModal({ createProvince ,onSuccess}) {
    const [visible, setVisible] = useState(false)
    const [province, setProvince] = useState(null)
    const [validated, setValidated] = useState(false)

    function handleSubmit(event) {
        if(!createProvince || typeof onSuccess != "function") {
            alert("Missing or invalid create province")
            return
        }

        event.preventDefault()
        setValidated(true)

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            return
        }
    
        createProvince(province).then((province) => {
            if(!onSuccess || typeof onSuccess != "function") {
                return
            }
            onSuccess(province)
        }).catch(() => {

        }).finally(() => {
            setVisible(false)
        })

    }
    return (
        <div>
            <Button onClick={() => { setVisible(true) }}>Create</Button>
            <Modal
                show={visible}
                backdrop="static"
                onHide={() => {
                    setVisible(false);
                    setValidated(false)
                }
                }
                keyboard={false}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Province</Modal.Title>
                    </Modal.Header>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Modal.Body>
                            <ProvinceForm onChange={(province) => { setProvince(province) }} />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { setVisible(false); setValidated(false) }} >Close</Button>
                            <Button type={"submit"} variant="primary" onClick={() => { }} >Save</Button>
                        </Modal.Footer>
                    </Form>

                </Modal.Dialog>
            </Modal>

        </div>
    )
}
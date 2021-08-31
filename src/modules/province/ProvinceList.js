import { Button, Form } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { createProvince, getProvinceList } from "./ProvinceAPI"
import { Modal } from "react-bootstrap"
import ProvinceForm from "./ProvinceForm"
import { Alert } from "react-bootstrap"


function CreateProvinceModal({ createProvince ,onSuccess}) {
    const [visible, setVisible] = useState(false)
    const [province, setProvince] = useState(null)
    const [validated, setValidated] = useState(false)

    function handleSubmit(event) {
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
                            <Button type={"submit"} variant="primary" onClick={() => { }} >Save changes</Button>
                        </Modal.Footer>
                    </Form>

                </Modal.Dialog>
            </Modal>

        </div>
    )
}

export default function ProvinceList() {
    const [provinces, setProvinces] = useState(null)
    function getProvinces() {
        getProvinceList().then((provinces) => {
            setProvinces(provinces)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        getProvinces()
    }, [])

    const listItems = () => {
        let no = 1
        if (!provinces || provinces._embedded.provinces.length < 1) {
            return
        }
        return provinces._embedded.provinces.map((p) => {
            return (
                <tr key={no}>
                    <td>{no++}</td>
                    <td>{p.name}</td>
                    <td>{p.capital}</td>
                </tr>
            )
        })
    }
    const list = () => {
        if (!provinces || provinces._embedded.provinces.length < 1) {
            return (
                <div className={"m-5"}>
                    <Alert variant={"info"}>
                        There's no province availble yet
                    </Alert>
                </div>
            )
        } else {
            return (
                <Table bordered  className={"mt-3"}>
                    <tbody>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Capital</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {listItems()}
                    </tbody>
                </Table>
            )
        }
    }
    return (
        <div>
            <CreateProvinceModal onSuccess={(province)=>{getProvinces()}} createProvince={createProvince} />
            {list()}
        </div>
    )
}
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function ProvinceDeleteModal({onSuccess , deleteProvince}) {
    const [visible, setVisible] = useState(false)

    function handleDelete() {
        if(!deleteProvince || typeof deleteProvince != "function") {
            alert("Missing or invalid deleteProvince")
            return
        }

        deleteProvince().then(()=>{
            if(!onSuccess || typeof onSuccess != "function") {
                return
            }
            onSuccess()
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setVisible(false)
        })



    }


    return (
        <div>
            <FontAwesomeIcon className={"text-danger"} style={{cursor:"pointer"}} onClick={()=>{setVisible(true)}} icon={faTrash} />
            <Modal
                show={visible}
                backdrop="static">
                <Modal.Header>
                    <Modal.Title>Delete Province</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this data ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { setVisible(false); }} >Cancel</Button>
                    <Button variant="outline-primary" onClick={handleDelete} >Yes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
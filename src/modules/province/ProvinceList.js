import { Button, Form } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { createProvince, deleteProvince, getProvinceList } from "./ProvinceAPI"
import { Modal } from "react-bootstrap"
import ProvinceForm from "./ProvinceForm"
import { Alert } from "react-bootstrap"
import ProvinceCreateModal from "./ProvinceCreateModal"
import ProvinceDeleteModal from "./ProvinceDeleteModal"

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
                    <td>
                        <ProvinceDeleteModal onSuccess={()=>{getProvinces()}} deleteProvince={deleteProvince(p.id)} />
                    </td>
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
                <Table bordered className={"mt-3"}>
                    <tbody>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Capital</th>
                            <th></th>
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
            <ProvinceCreateModal onSuccess={(province) => { getProvinces() }} createProvince={createProvince} />
            {list()}
        </div>
    )
}
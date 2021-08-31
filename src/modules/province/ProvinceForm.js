import { useEffect, useState } from "react"
import { Form, Table } from "react-bootstrap"

export default function ProvinceForm({ onChange }) {
    const [name, setName] = useState("")
    const [capital, setCapital] = useState("")

    useEffect(() => {
        if (!onChange || typeof onChange != "function") {
            return
        }
        onChange({ name: name, capital: capital })

    }, [name, capital])

    return (
        <div>
            <Table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>
                            <Form.Control required onChange={(e) => { setName(e.target.value) }} value={name} type="text" />
                            {/* <input  */}
                        </td>
                    </tr>
                    <tr>
                        <td>Capital</td>
                        <td>
                            <Form.Control required onChange={(e) => { setCapital(e.target.value) }} value={capital} type="text" />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
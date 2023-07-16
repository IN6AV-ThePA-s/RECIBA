import React from 'react'
import '../css/Dashboard.css'

export const RowTableBodyBill2 = ({ id, user, recycler, cantMaterials, payMethod, total, date }) => {

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

        return formattedDate;
    }

    return (
        <>
            <tr>
                <td className='fontBarcode'> { id } </td>
                <td> { user } </td>
                <td> { recycler } </td>
                <td> Materiales </td>
                <td style={{ color: payMethod === 'ECOINS' ? 'green' : '' }}>{payMethod}</td>
                <td> { parseFloat(total).toFixed(2) } </td>
                <td> { formatDateTime( date ) } </td>
                <td> HABILITADO </td>
            </tr>
        </>
    )
}

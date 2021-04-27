import React from 'react';
import { Link } from 'react-router-dom';

function PersonRow(props) {
    const { onDeleteClick, isSetToDelete, onSetToDeleteChange } = props;
    const { firstName, lastName, age, id } = props.person;

    return (
        <tr>
            <td>
                <input
                    checked={isSetToDelete}
                    onChange={onSetToDeleteChange}
                    type="checkbox"
                    className="form-control" />
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <Link to={`/editperson/${id}`}>
                    <button className="btn btn-warning">Edit</button>
                </Link>
                <button style={{ marginLeft: 10 }} onClick={onDeleteClick} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    );
}

export default PersonRow;
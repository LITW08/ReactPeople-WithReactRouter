import React from 'react';

function AddPersonRow(props) {
    const { onTextChange, onAddClick } = props;
    const { firstName, lastName, age } = props.person;
    return (
        <div className="row" style={{ marginBottom: 20 }}>
            <div className="col-md-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    value={firstName}
                    onChange={onTextChange}
                    name="firstName" />
            </div>
            <div className="col-md-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={onTextChange}
                    name="lastName" />
            </div>
            <div className="col-md-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Age"
                    value={age}
                    onChange={onTextChange}
                    name="age" />
            </div>
            <div className="col-md-3">
                <button className="btn btn-primary btn-block" onClick={onAddClick}>Add</button>
            </div>
        </div>
    );
}

export default AddPersonRow;
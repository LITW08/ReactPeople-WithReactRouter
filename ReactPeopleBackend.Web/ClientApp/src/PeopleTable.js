import React from 'react';
import PersonRow from './PersonRow';
import AddPersonRow from './AddEditPersonRow';
import axios from 'axios';
import { produce } from 'immer';

class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        peopleToDelete: []
    }

    componentDidMount = async () => {
        await this.refreshPeople();
    }

    refreshPeople = async () => {
        const { data } = await axios.get('/api/people/getall');
        this.setState({ people: data });
    }

    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onAddPersonClick = async () => {
        await axios.post('/api/people/add', this.state.person);
        await this.refreshPeople();
        this.resetToAddMode();
    }

    resetToAddMode = () => {
        this.setState({
            person: {
                firstName: '',
                lastName: '',
                age: ''
            }
        })
    }

    onDeleteClick = async id => {
        await axios.post('/api/people/delete', { id });
        await this.refreshPeople();
    }

    onSetToDeleteChange = id => {
        const { peopleToDelete } = this.state;
        let newPeopleToDelete;
        if (peopleToDelete.includes(id)) {
            newPeopleToDelete = peopleToDelete.filter(i => i !== id);
        } else {
            newPeopleToDelete = [...peopleToDelete, id];
        }

        this.setState({ peopleToDelete: newPeopleToDelete });
    }

    onDeleteAllClick = async () => {
        await axios.post('/api/people/deletemany', { ids: this.state.peopleToDelete })
        await this.refreshPeople();
    }

    checkAll = () => {
        this.setState({ peopleToDelete: this.state.people.map(p => p.id) });
    }

    unCheckAll = () => {
        this.setState({ peopleToDelete: [] });
    }

    render() {
        return (
            <>
                <AddPersonRow
                    onTextChange={this.onTextChange}
                    person={this.state.person}
                    onAddClick={this.onAddPersonClick}
                />
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width: '15%' }}>
                                <button onClick={this.onDeleteAllClick} className="btn btn-danger btn-block">Delete All</button>
                                <button onClick={this.checkAll} className="btn btn-info btn-block">Check All</button>
                                <button onClick={this.unCheckAll} className="btn btn-info btn-block">Uncheck All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.people.map(p =>
                            <PersonRow
                                key={p.id}
                                person={p}
                                onEditClick={() => this.onEditClick(p)}
                                onDeleteClick={() => this.onDeleteClick(p.id)}
                                isSetToDelete={this.state.peopleToDelete.includes(p.id)}
                                onSetToDeleteChange={() => this.onSetToDeleteChange(p.id)}
                            />)}
                    </tbody>
                </table>
            </>
        )
    }
}

export default PeopleTable;
import React from 'react';
import { Route } from 'react-router-dom';
import PeopleTable from './PeopleTable';
import EditPersonPage from './EditPersonPage';
import Layout from './Layout';


const App = () => {
    return (
        <Layout>
            <Route exact path='/' component={PeopleTable} />
            <Route exact path='/editperson/:id' component={EditPersonPage} />
        </Layout>
    )
}

export default App;
import React from 'react';
import axios from 'axios';
import * as Bessemer from 'js/alloy/bessemer/components';

export class AddPet extends React.Component {

    state = {
        petName: null,
    };

    static registerPet(pet) {
        return axios.post('/api/pets/add-pet', pet);
    }

    onSubmit = pet => {
        return AddPet.registerPet(pet);
    };

    render() {
        let { handleSubmit, submitting } = this.props;

        return (
            <form name="addPetForm" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                <Bessemer.Field name="petname" friendlyName="Pet Name"/>

                <Bessemer.Button loading={submitting}>Add Pet</Bessemer.Button>
            </form>
        );
    }
}

export class GetPet extends React.Component {
    render() {
        return (
            <div className="container padded">
                <div className="row">
                    <div className="col-6 offset-md-3">
                        <h2>Access list of pets here!!!</h2>
                    </div>
                </div>
            </div>
        );
    }
}


import {html, render} from 'lit-html/lib/lit-extended.js';
import {createStore} from 'redux';

const InitialState = {
    mathTopics: [
        '1.1 Numbers and Numerals',
        '1.2 Sets'
    ],
    objectives: {
        '1.1 Numbers and Numerals': [
            '1.1.1 Count and write numerals up to 100,000,000',
            '1.1.2 identify and explain the place values of  digits in a numeral up to 100,000,000'
        ],
        '1.2 Sets': [
            '1.2.1 identify sets of objects and numbers',
            '1.2.2 describe and write sets of objects and numbers'
        ]
    },
    activities: {
        '1.1.1 Count and write numerals up to 100,000,000': [
            'Guide pupils to revise counting and writing numerals in ten thousands, hundred thousands and millions.',
            'Using the idea of counting in millions, guide pupils to recognize the number of millions in ten million as (10,000,000 = 10 1,000,000)',
            'Using the non-proportional structured materials like the abacus or colour-coded materials, guide pupils to count in ten millions.',
            'Show, for example, 54,621,242 on a place value chart.',
            'Point out that the commas between periods make it easier to read numerals.',
            'Assist pupils to read number names of given numerals (E.g. 54,621,242) as; Fifty four million, six hundred and twenty one thousand, two hundred and forty two.',
            'Other'
        ],
        '1.1.2 identify and explain the place values of  digits in a numeral up to 100,000,000': [
            'Using the abacus or place value chart guide pupils to find the place value of digits in numerals up to 8-digits.',
            'Discuss with pupils the value of digits in given numerals. E.g. in 27,430,561 the value of 6 is 60, the value of 3 is 30,000, the value of 7 is 7,000,000, etc',
            'Discus with pupils the difference between the place value of a digit in a numeral and the value of a digit in a numeral.'
        ],
        '1.2.1 identify sets of objects and numbers': [
            'Guide pupils to collect and sort objects into groups and let pupils describe the sets of objects formed',
            'Guide pupils to form other sets(groups) according to a given criteria using objects and numbers',
            'Introduce the concept of a set as a well defined collection of objects or ideas',
            'Guide pupils to use real life situations to form sets. E.g. a set of prefects in the school'
        ],
        '1.2.2 describe and write sets of objects and numbers': [
            '"Introduce ways of describing and writing sets using: Defining property; i.e. describing the members (elements) of a set in words. E.g. a set of mathematical instruments. Listing the members of a set using only curly brackets„{ }‟ and commas to separate the members. E.g. S = {0, 1, 2,…, 26}',
            'NOTE: Use capital letters to represent sets. E.g. A = {months of the year}."'
        ]

    },
    materials: {
        '1.1.1 Count and write numerals up to 100,000,000': [
            'Abacus',
            'Colour-coded materials',
            'Place value chart',
            'Other'
        ],
        '1.1.2 identify and explain the place values of  digits in a numeral up to 100,000,000': [
            'Abacus',
            'Colour-coded materials',
            'Place value chart'
        ],
        '1.2.1 identify sets of objects and numbers': [],
        '1.2.2 describe and write sets of objects and numbers': []
    },
    evaluations: {
        '1.1.1 Count and write numerals up to 100,000,000': [
            'read and write number names and numerals as teacher calls out the digits in a given numeral (E.g. 72,034,856)',
            'bring in news papers or magazines that mention numbers in millions to record)',
            'mention numbers they hear on TV and radio reports (this can be taken as projects to be carried out weekly for pupils;',
            'investigate types of numbers that appear in government‟s budgets, elections results, census reports, etc.',
            'Other'
        ],
        '1.1.2 identify and explain the place values of  digits in a numeral up to 100,000,000': [
            'write the value of digits in given numerals'
        ],
        '1.2.1 identify sets of objects and numbers': [
            'form sets using real life situations'
        ],
        '1.2.2 describe and write sets of objects and numbers': [
            'describe and write sets using words as well as the curly brackets'
        ]
    },
    selectedObjectives: [],
    selectedActivities: [],
    selectedMaterials: [],
    selectedEvaluations: []
};

const RootReducer = (state = InitialState, action) => {
    if (action.type === 'SET_LOCAL_STATE') {
        // return {
        //     ...state,
        //     [action.key]: action.value
        // };
        //TODO we really need to get object spread to get transpiled

        return Object.assign({}, state, {
            [action.key]: action.value
        });
    }

    return state;
};

const Store = createStore(RootReducer);

class GhanaMathJHS1 extends HTMLElement {
    constructor() {
        super();

        Store.subscribe(() => render(this.render(Store.getState()), this));
        Store.dispatch({
            type: 'DEFAULT_ACTION'
        });
    }

    mathTopicsSelectChange(e) {
        Store.dispatch({
            type: 'SET_LOCAL_STATE',
            key: 'selectedObjectives',
            value: Store.getState().objectives[e.target.value]
        });
    }

    objectivesSelectChange(e) {
        Store.dispatch({
            type: 'SET_LOCAL_STATE',
            key: 'selectedActivities',
            value: Store.getState().activities[e.target.value]
        });

        Store.dispatch({
            type: 'SET_LOCAL_STATE',
            key: 'selectedMaterials',
            value: Store.getState().materials[e.target.value]
        });

        Store.dispatch({
            type: 'SET_LOCAL_STATE',
            key: 'selectedEvaluations',
            value: Store.getState().evaluations[e.target.value]
        });
    }

    render(state) {
        return html`
            <h1>Math JHS 1 Lesson Notes</h1>

            <div>
                <div>
                    Week Ending
                </div>
                <input type="date">
            </div>

            <div>
                <div>
                    Day
                </div>
                <input type="date">
            </div>

            <div>
                <div>
                    Math Topics
                </div>
                <select onchange="${(e) => this.mathTopicsSelectChange(e)}">
                    <option selected disabled hidden>Choose</option>
                    ${state.mathTopics.map((mathTopic) => {
                        return html`
                            <option value="${mathTopic}">${mathTopic}</option>
                        `;
                    })}
                </select>
            </div>

            <div hidden="${state.selectedObjectives.length === 0}">
                <div>
                    Objectives
                </div>
                <select onchange="${(e) => this.objectivesSelectChange(e)}">
                    <option selected disabled hidden>Choose</option>
                    ${state.selectedObjectives.map((objective) => {
                        return html`
                            <option value="${objective}">${objective}</option>
                        `;
                    })}
                </select>
            </div>

            <div hidden="${state.selectedActivities.length === 0}">
                <div>
                    Activities
                </div>
                <div>
                    ${state.selectedActivities.map((activity) => {
                        return html`
                            <div>
                                <input type="checkbox"> ${activity} ${activity === 'Other' ? html`<input type="text">` : ''}
                            </div>
                        `;
                    })}
                </div>
            </div>

            <div hidden="${state.selectedObjectives.length === 0 || state.selectedActivities.length === 0}">
                <div>
                    Core Points
                </div>
                <input type="text">
            </div>

            <div hidden="${state.selectedMaterials.length === 0}">
                <div>
                    Materials
                </div>
                <div>
                    ${state.selectedMaterials.map((material) => {
                        return html`
                            <div>
                                <input type="checkbox"> ${material} ${material === 'Other' ? html`<input type="text">` : ''}
                            </div>
                        `;
                    })}
                </div>
            </div>

            <div hidden="${state.selectedEvaluations.length === 0}">
                <div>
                    Evaluations
                </div>
                <div>
                    ${state.selectedEvaluations.map((evaluation) => {
                        return html`
                            <div>
                                <input type="checkbox"> ${evaluation} ${evaluation === 'Other' ? html`<input type="text">` : ''}
                            </div>
                        `;
                    })}
                </div>
            </div>

            <div hidden="${state.selectedObjectives.length === 0 || state.selectedActivities.length === 0}">
                <div>
                    Additional Notes
                </div>
                <input type="text">
            </div>
        `;
    }
}

window.customElements.define('ghana-math-jhs-1', GhanaMathJHS1);

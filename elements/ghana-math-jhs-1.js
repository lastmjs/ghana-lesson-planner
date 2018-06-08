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
    selectedObjectives: []
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

            <div>
                <div>
                    Objectives
                </div>
                <select>
                    <option selected disabled hidden>Choose</option>
                    ${state.selectedObjectives.map((objective) => {
                        return html`
                            <option value="${objective}">${objective}</option>
                        `;
                    })}
                </select>
            </div>
        `;
    }
}

window.customElements.define('ghana-math-jhs-1', GhanaMathJHS1);

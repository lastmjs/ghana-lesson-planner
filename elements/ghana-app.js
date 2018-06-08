import {html, render} from 'lit-html';
// import '@polymer/iron-pages';
import './ghana-math-jhs-1.js';

class GhanaApp extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        render(html`
            <ghana-math-jhs-1></ghana-math-jhs-1>
        `, this);
    }
}

window.customElements.define('ghana-app', GhanaApp);

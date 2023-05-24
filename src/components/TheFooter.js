import { Component } from "../core/core";
import aboutStore from "../store/about";

export default class TheFooter extends Component {
    constructor() {
        super({
            tagName: "footer",
        });
    }
    render() {
        const { github, repository } = aboutStore.state;
        this.el.innerHTML = /*html*/ `
            <div>
                <a href="${github}">GitHub</a>
            </div>
            <div>
                <a href="${repository}">movie-app
                    ${new Date().getFullYear()}
                    JINU
                </a>

            </div>
        `;
    }
}

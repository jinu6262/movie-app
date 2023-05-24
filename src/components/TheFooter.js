import { Component } from "../core/core";

export default class TheFooter extends Component {
    constructor() {
        super({
            tagName: "footer",
        });
    }
    render() {
        this.el.innerHTML = /*html*/ `
            <div>
                <a href="https://github.com">GitHub</a>
            </div>
            <div>
                <a href="https://github.com/jinu6262/movie-app">movie-app
                    ${new Date().getFullYear()}
                    JINU
                </a>

            </div>
        `;
    }
}

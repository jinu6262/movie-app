import { Component } from "../core/core";
import movieStore, { searchMovies } from "../store/movie";

export default class MovieListMore extends Component {
    constructor() {
        super({
            tagName: "button",
        });
        movieStore.subscribe("pageMax", () => {
            const { page, pageMax } = movieStore.state;
            pageMax > page ? this.el.classList.remove("hide") : this.el.classList.add("hide");
        });

        // more 버튼이 있는 상태로 새로운 검색을 할때 more 버튼 지워주기
        movieStore.subscribe("searchText", () => {
            this.el.classList.add("hide");
        });
    }
    render() {
        this.el.classList.add("btn", "view-more", "hide");
        this.el.textContent = "View more..";

        this.el.addEventListener("click", async () => {
            this.el.classList.add("hide");
            await searchMovies(movieStore.state.page + 1);
        });
    }
}

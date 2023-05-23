import { Component } from "../core/core";
import movieStore from "../store/movie";

export default class MovieList extends Component {
    constructor() {
        super();
        movieStore.subscribe("movies", () => {
            this.render();
        });
        // MovieList 라는 컴포넌트가 만들어질때
        // 스토어의 movies 키 값이 변경되면 movies 키 이름으로 등록된 함수들을 실행
        // 지금은 옵저버객체에 movies 키에는 this.render(); 하나만 들어있음
    }
    render() {
        this.el.classList.add("movie-list");
        this.el.innerHTML = /*html*/ `
            <div class="movies"></div>
        `;

        const moviesEl = this.el.querySelector(".movies");
        moviesEl.append(
            movieStore.state.movies.map((movie) => {
                return movie.Title;
            })
        );
    }
}

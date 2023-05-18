/////// Component
export class Component {
    constructor(payload = {}) {
        //payload 라는 이름으로 객체를 받음

        const { tagName = "div", state = {}, props = {} } = payload; //구조분해할당

        this.el = document.createElement(tagName);
        this.state = state;
        this.props = props;
        // 받아온 데이터를 this 키워드가 붙은 데이터로 할당해줌
        // 어디서든 해당객체가 이 데이터들을 자유롭게 사용할수 있게됨

        this.render();
    }
    render() {}
}

/////// Router
function routeRender(routes) {
    if (!location.hash) {
        history.replaceState(null, "", "/#/"); //해쉬정보가 없는 주소가 들어오면 해쉬추가
    }
    const routerView = document.querySelector("router-view");
    const [hash, queryString = ""] = location.hash.split("?"); //현재페이지 주소(해쉬)정보

    //쿼리스트링을 객체형태로 저장하는 작업
    const query = queryString.split("&").reduce((acc, cur) => {
        const [key, value] = cur.split("="); //쿼리스트링을 key와 value로 나누고
        acc[key] = value; //acc에 key와 value 값을 넣고(속성을 추가하고)
        return acc; // 값이 추가된 acc객체데이터를 리턴
    }, {});
    //reduce 메서드가 실행되면서 쿼리스트링 값들을 객체형태로 acc에 넣어주고있음
    // 여러번의 리턴이 일어나 여러번 값을 받아 완성된 acc(객체데이터)를 query(변수)에 저장
    history.replaceState(query, "");

    console.log(query);

    const currentRoute = routes.find((route) => new RegExp(`${route.path}/?$`).test(hash)); //현재 주소와 만들어둔 컴포넌트 path와 비교
    routerView.innerHTML = "";
    routerView.append(new currentRoute.component().el);

    window.scrollTo(0, 0);
}

export function createRouter(routes) {
    return function () {
        window.addEventListener("popstate", () => {
            routeRender(routes);
        });
        routeRender(routes);
    };
} //함수를 내보내고있다

////// Store

export class Store {
    constructor(state) {
        this.state = {};
        this.observers = {};
        for (const key in state) {
            Object.defineProperty(this.state, key, {
                get: () => state[key],
                set: (val) => {
                    state[key] = val;
                    this.observers[key].forEach((observer) => observer(val));
                },
            });
        }
    }

    subscribe(key, cb) {
        Array.isArray(this.observers[key]) ? this.observers[key].push(cb) : (this.observers[key] = [cb]);
    }
}

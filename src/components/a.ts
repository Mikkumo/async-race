import AbstractComponent from "./abstractComponent";

class A extends AbstractComponent {
    protected innerText: string;
    protected href: string;

    constructor(className: string, innerText: string, href: string,) {
        super(className);
        this.innerText = innerText;
        this.href = href;
    }

    renderA() {
        const a = document.createElement('a');
        a.className = this.className;
        a.innerText = this.innerText;
        a.href = this.href;
        return a;
    }
}

export default A;

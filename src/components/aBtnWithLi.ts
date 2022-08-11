import A from "./a";

class ABtnWithLi extends A {
    protected classNameLi: string;

    constructor(classNameButton: string, innerText: string, href: string, classNameLi: string) {
        super(classNameButton, innerText, href);
        this.classNameLi = classNameLi;
    }

    renderABtnWithLi() {
        const li = document.createElement('li');
        li.append(this.renderA());
        li.className = this.classNameLi;
        return li;
    }
}

export default ABtnWithLi;

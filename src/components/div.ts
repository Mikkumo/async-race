import AbstractComponent from "./abstractComponent";

class Div extends AbstractComponent {
    protected id: string;
    protected innerText: string;

    constructor(className = '', id = '', innerText = '') {
       super(className);
       this.id = id;
       this.innerText = innerText;
    }

    render() {
        const div = document.createElement('div');
        if (this.className !== '') div.className = this.className;
        if (this.id !== '') div.id = this.id;
        if (this.innerText !== '') div.innerText = this.innerText;
        return div;
    }
}

export default Div;

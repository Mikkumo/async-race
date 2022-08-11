import AbstractComponent from "./abstractComponent";

class Button extends AbstractComponent {
    protected type: string;
    protected id: string;
    protected innerText: string;

    constructor(className: string, id: string, innerText: string, type = '') {
        super(className);
        this.type = type;
        this.id = id;
        this.innerText = innerText;
    }

    render() {
        const button = document.createElement('button');
        button.className = this.className;
        if (this.type !== '') button.type = this.type;
        button.id = this.id;
        button.innerText = this.innerText;
        return button;
    }
}

export default Button;

import AbstractComponent from "./abstractComponent";

class Input extends AbstractComponent {
    protected type: string;
    protected id: string;
    protected name: string;
    protected value: string;

    constructor(type: string, id: string, name:string, className: string, value = '') {
        super(className);
        this.type = type;
        this.id = id;
        this.name = name;
        this.value = value;
    }

    render() {
        const input = document.createElement('input');
        input.className = this.className;
        input.type = this.type;
        input.id = this.id;
        input.name = this.name;
        if (this.value !== '') input.value = this.value;
        return input;
    }
}

export default Input;

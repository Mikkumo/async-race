import AbstractComponent from "./abstractComponent";

class Component extends AbstractComponent {
    protected tagName: string;

    constructor(tagName: string, className = '') {
        super(className);
        this.tagName = tagName;
    }

    render() {
        const element = document.createElement(this.tagName);
        if (this.className !== '') element.className = this.className;
        return element;
    }
}

export default Component;

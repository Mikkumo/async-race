import AbstractComponent from "./abstractComponent";

class TextComponent extends AbstractComponent {
    protected tagName: string;
    protected innerText: string;

    constructor(tagName: string, className: string, innerText: string) {
        super(className);
        this.tagName = tagName;
        this.innerText = innerText;
    }

    render() {
        const textComponent = document.createElement(this.tagName);
        textComponent.className = this.className;
        textComponent.innerText = this.innerText;
        return textComponent;
    }
}

export default TextComponent;

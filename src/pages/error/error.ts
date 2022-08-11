import './error.css';
import Page from '../../components/page';
import Component from '../../components/component';
import Div from '../../components/div';
import TextComponent from '../../components/textComponent';

export const enum ErrorTypes {
    Error_404 = 404,
}

class ErrorPage extends Page {
    private errorType: ErrorTypes | string;

    static TextObject: { [prop: string]: string } = {
        '404': 'Error! The page was not found.'
    }

    constructor(id: string, errorType: ErrorTypes | string) {
        super(id);
        this.errorType = errorType;
    }

    renderSection() {
        const section = new Component('section', 'error_container').render();
        const mainText = new Div('error_text').render();
        mainText.append(new TextComponent('h2', 'error_title', 'Error! The page was not found.').render());
        section.append(mainText);
        return section;
    }
    
    render() {
        this.container.append(this.renderSection());
        return this.div;
    }
}

export default ErrorPage;

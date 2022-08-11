import Header from "../components/header";
import Context from "../context/context";

abstract class Page {
    protected header: HTMLElement;
    protected div: HTMLDivElement;
    protected container: HTMLElement;
    
    static TextObject = {};

    constructor(id: string) {
        const header = new Header();
        this.header = header.render();

        this.div = document.createElement('div')
        this.div.id = id;
        this.div.append(this.header);
        this.div.append(this.container = document.createElement('main'));
    }

    get page(): Promise<HTMLElement> {
        return new Promise(() => {
            return this.container
        })
    }

    protected createHeaderTitle(text: string) {
        const headerTitle = document.createElement('h1');
        headerTitle.innerText = text;
        return headerTitle;
    }

    render(context: Context) {
        return this.div;
    }
}

export default Page;

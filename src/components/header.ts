import AbstractComponent from "./abstractComponent";
import ABtnWithLi from "./aBtnWithLi";
import Div from "./div";

class Header extends AbstractComponent {
    constructor() {
        super('header');
    }
    
    renderPageBtns() {
        const pageBtns = new Div('header_container').render();
        pageBtns.append(this.renderNav());
        return pageBtns;
    }

    renderNav(): HTMLElement {
        const navItem = new Div('header_nav').render();
        navItem.append(new ABtnWithLi('nav_link', 'garage', '#garage_page', 'nav_item').renderABtnWithLi());
        navItem.append(new ABtnWithLi('nav_link', 'winners', '#winners_page', 'nav_item').renderABtnWithLi());
        return navItem;
    }

    render(): HTMLElement {
        const header = document.createElement('header');
        header.append(this.renderPageBtns());
        return header;
    }
}

export default Header;

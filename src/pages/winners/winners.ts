import './winners.css'
import Page from "../../components/page";
import Component from '../../components/component';
import TextComponent from '../../components/textComponent';
import Context from '../../context/context';
import Div from '../../components/div';
import Button from '../../components/button';
import Garage from '../../context/garageImplementation';

class WinnersPage extends Page {
    static TextObject = {
        MainTitle: 'Winners Page',
    }
    
    constructor(id: string) {
        super(id);
    }

    createMain(context: Context) {
        const main = new Div('winners_wrapper').render();
        main.append(new TextComponent('h1', 'winners_title', `Winners (${context.winners.length})`).render());
        main.append(new TextComponent('h2', 'winners_page', `Page #${context.numberPage}`).render());
        main.append(this.createTable(context));
        main.append(this.paginations());
        return main;
    }

    createTable(context: Context) {
        const table = new Component('table', 'table').render();
        const thead = new Component('thead', 'table_title').render();
        thead.append(new TextComponent('th', 'title_name', '№').render());
        thead.append(new TextComponent('th', 'title_name', 'Car').render());
        thead.append(new TextComponent('th', 'title_name', 'Name').render());
        thead.append(new TextComponent('th', `table_btn title_name `, 'Wins').render());
        thead.append(new TextComponent('th', `table_btn title_name `, 'Best time (sec)').render());
        table.append(thead);

        context.winners.forEach((winner, index) => {
            let currentGarage = context.garages.find((garage) => garage.id === winner.id)
            const tbody = new Component('tbody', 'table_row').render();
            if (currentGarage === undefined) {
                currentGarage = new Garage()
                currentGarage.color = '#141210'
                currentGarage.id = -1
                currentGarage.name = 'Not found'
            }
            tbody.append(new TextComponent('td', 'row_name', `${index + 1}`).render());
            const carImg = new TextComponent('td', 'row_name', '').render();
            const carSvg = document.createElementNS('http://www.w3.org/2000/svg','svg');
            carSvg.setAttributeNS(null, 'viewBox', '0 0 512 512');
            carSvg.setAttributeNS(null, 'fill', `${currentGarage.color}`);
            const path1 = document.createElementNS('http://www.w3.org/2000/svg','path');
            path1.setAttributeNS(null, 'd',"M206.6 113.5c-44.7 6.3-85 29.9-111.6 65.3-4.2 5.7-11.5 16.9-16.1 24.9-8.4 14.7-11.9 19.2-16.9 21.8-1.5.8-10 3.2-19 5.5-8.9 2.2-18.5 5.2-21.2 6.6C11.4 242.9 3.6 253.2 1 265c-.8 3.8-1.1 15.8-.8 39.1l.3 33.5 3.7 7.6c4.5 9.1 10.3 14.7 19.6 19.1l6.7 3.2 19.5.3 19.6.4 2.8 5c5.9 10.4 18.1 19.8 31.6 24.4 7.7 2.6 24.4 2.6 32 0 13.7-4.7 23.2-11.8 30-22.4l4.5-7.1H256l85.5-.1 2.9 5.1c5.9 10.5 18 19.9 31.6 24.5 7.7 2.6 24.4 2.6 32 0 13.6-4.7 23.2-11.8 30-22.4l4.5-6.9 19.6-.4 19.5-.4 7.6-3.7c9.1-4.5 14.7-10.3 19.1-19.6l3.2-6.7.3-19.5c.3-12-.1-22.4-.8-27-3.2-20-15.3-38.6-32.2-49.3-10.8-6.9-17.5-9-42.7-13.2-22.6-3.8-23.6-4.5-35.6-25.5-9.9-17.4-16.8-27-28-38.8-24.3-25.7-56.4-43-92.5-49.8-12-2.2-59.7-2.8-73.4-.9zm73.8 17.4c20.1 4.2 38.3 11.7 54.5 22.5 22.5 15 37.5 31.8 53.1 59.6 7.4 13.1 11.4 18.5 16.8 22.2 6.9 4.8 12.5 6.5 32.2 9.8 17.2 2.9 27 5.8 32.2 9.4 2.1 1.5 1.7 1.6-7 1.6s-9.5.2-11.9 2.6c-2.4 2.4-2.5 3-2 9.2.9 8.8 6 19.4 12.3 25.1 7.2 6.8 15.8 10.3 26.5 10.9l8.9.5v13.5c0 16.8-1 20.2-7.5 26.7-6.5 6.6-9.9 7.5-27.1 7.5h-13.9l.3-6.8c.7-14.8-5.2-29.6-16.3-40.7C420.1 293 408.1 288 392 288s-28.1 5-39.5 16.5c-11.1 11.1-17 25.9-16.3 40.7l.3 6.8h-161l.3-6.8c.7-14.8-5.2-29.6-16.3-40.7C148.1 293 136.1 288 120 288s-28.1 5-39.5 16.5c-11.1 11.1-17 25.9-16.3 40.7l.3 6.8H50.6c-17.2 0-20.6-.9-27.1-7.5-6.6-6.5-7.5-9.9-7.5-26.9V304h9.4c7.4 0 9.8-.4 11.5-1.8 1.7-1.3 3.3-5.9 6.6-19.2 2.5-9.6 4.5-18.5 4.5-19.6 0-1.2-.9-3.2-1.9-4.5-1.7-2.2-2.9-2.4-12.3-2.9l-10.3-.5 3.2-2.3c2-1.4 9.7-4 20-6.6 9.3-2.4 18.9-5.2 21.5-6.4 8.2-3.6 14-10.1 23.2-26.1 11.5-20 19.2-30.4 30.3-41.5 24.1-24 54.3-38.8 89-43.5 3.7-.5 18.7-.8 33.3-.6 22 .3 28.2.7 36.4 2.4zM27.8 280l-2 8H16v-16h13.8l-2 8zm462.4-2c1.4 3 2.9 6.5 3.3 7.7.6 2.2.3 2.3-4.1 2.3-7.8 0-12.4-2-18.1-7.7-7.9-7.8-7.5-8.4 5.5-8.1l10.7.3 2.7 5.5zm-353.8 29.8c9.1 4.2 14.9 10 19.4 19 3.5 7.2 3.7 8.1 3.7 17.2s-.2 10-3.7 17.2c-4.5 9.1-10.3 14.7-19.6 19.1-6.1 2.9-7.6 3.2-16.2 3.2s-10.1-.3-16.2-3.2c-9.3-4.4-15.1-10-19.6-19.1-3.5-7.2-3.7-8.1-3.7-17.1 0-8.7.3-10.2 3.2-16.3 4-8.5 9.7-14.7 17.2-18.6 7.8-4.2 12.2-5.2 21.3-4.8 6.1.3 9.2 1.1 14.2 3.4zm272 0c9.1 4.2 14.9 10 19.4 19 3.5 7.2 3.7 8.1 3.7 17.2s-.2 10-3.7 17.2c-4.5 9.1-10.3 14.7-19.6 19.1-6.1 2.9-7.6 3.2-16.2 3.2s-10.1-.3-16.2-3.2c-9.3-4.4-15.1-10-19.6-19.1-3.5-7.2-3.7-8.1-3.7-17.1 0-8.7.3-10.2 3.2-16.3 4-8.5 9.7-14.7 17.2-18.6 7.8-4.2 12.2-5.2 21.3-4.8 6.1.3 9.2 1.1 14.2 3.4z");
            carSvg.append(path1);
            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttributeNS(null, 'd', "M201 137.5c-35.3 5.6-66 26.7-85 58.5-4.7 7.7-12 25.3-12 28.7 0 1.3 1.1 3.5 2.5 4.8l2.4 2.5h118.2l2.4-2.5 2.5-2.4v-86.2l-2.5-2.4c-2.2-2.3-3.1-2.5-11.2-2.4-4.8.1-12.6.7-17.3 1.4zm15 46.5v32h-92l1.5-3.8c6.9-16.6 23.6-35.1 41.2-45.6 13.3-7.9 31.4-13.6 46.6-14.4l2.7-.2v32zM250.6 138.3l-2.6 2.6v86.2l2.5 2.4 2.4 2.5h118.2l2.4-2.5c3.4-3.3 3.2-5.7-1.6-17.1-6.8-16.4-13.5-26.9-24.7-38.6-6.8-7.1-7.8-7.8-11.3-7.8-2.9 0-4.2.6-5.8 2.6-3.5 4.4-2.7 6.7 5.2 15.5 7.4 8.2 16.3 21.2 19.2 28.1l1.5 3.8h-92v-64.2l6.8.7c9.3 1 19.8 3.8 30 8.1 12.4 5.1 12.6 5.1 16.2 1.6 5.3-5.4 3.8-9.8-5-14.2-13.5-6.8-29.6-10.8-47.1-11.7-11.6-.6-11.7-.6-14.3 2zM98.5 242.5c-1.6 1.5-2.5 3.6-2.5 5.5s.9 4 2.5 5.5c2.3 2.4 3.1 2.5 13.5 2.5s11.2-.1 13.5-2.5c1.6-1.5 2.5-3.6 2.5-5.5s-.9-4-2.5-5.5c-2.3-2.4-3.1-2.5-13.5-2.5s-11.2.1-13.5 2.5zM250.5 242.5c-1.6 1.5-2.5 3.6-2.5 5.5s.9 4 2.5 5.5c2.3 2.4 3.1 2.5 13.5 2.5s11.2-.1 13.5-2.5c1.6-1.5 2.5-3.6 2.5-5.5s-.9-4-2.5-5.5c-2.3-2.4-3.1-2.5-13.5-2.5s-11.2.1-13.5 2.5zM112 321.3c-4.9 1.6-13.3 10.2-14.8 15.3-2.8 9.4-.8 16.9 6.3 23.9 10.1 10.2 22.9 10.2 33 0 9.8-9.7 10.1-22.2.8-32.5-6.5-7.2-15.8-9.7-25.3-6.7zm13.5 17.2c1.6 1.5 2.5 3.6 2.5 5.5s-.9 4-2.5 5.5c-1.5 1.6-3.6 2.5-5.5 2.5s-4-.9-5.5-2.5c-1.6-1.5-2.5-3.6-2.5-5.5s.9-4 2.5-5.5c1.5-1.6 3.6-2.5 5.5-2.5s4 .9 5.5 2.5zM384 321.3c-4.9 1.6-13.3 10.2-14.8 15.3-2.8 9.4-.8 16.9 6.3 23.9 10.1 10.2 22.9 10.2 33 0 9.8-9.7 10.1-22.2.8-32.5-6.5-7.2-15.8-9.7-25.3-6.7zm13.5 17.2c5 4.9 1.5 13.5-5.5 13.5-4.1 0-8-3.9-8-8s3.9-8 8-8c1.9 0 4 .9 5.5 2.5z");
            carSvg.append(path2);
            carImg.append(carSvg);
            tbody.append(carImg);
            tbody.append(new TextComponent('td', 'row_name', `${currentGarage.name}`).render());
            tbody.append(new TextComponent('td', 'row_name', `${winner.wins}`).render());
            tbody.append(new TextComponent('td', 'row_name', `${winner.time}`).render());
            table.append(tbody);
        })
        return table;
    }

    paginations() {
        const pagination = new Div('pagination').render();
        const prevBtn = new Button('btn prev_btn pagination_btn', 'prev', 'prev').render()
        prevBtn.addEventListener('click', () => {
            const params = new URLSearchParams(window.location.search)
            let page_number = params.get('page')
            if (page_number === null) page_number = '1'
            let number = parseInt(page_number)
            if (number > 1) {
                number--
                params.set('page', number.toString())
                console.log(number)
                window.location.search = `?${params.toString()}`
            }
        })
        const currBtn = new Button('btn next_btn pagination_btn', 'next', 'next').render()
        currBtn.addEventListener('click', () => {
            const params = new URLSearchParams(window.location.search)
            let page_number = params.get('page')
            if (page_number === null) page_number = '1'
            let number = parseInt(page_number)
            number++
            params.set('page', number.toString())
            console.log(number)
            window.location.search = `?${params.toString()}`
        })
        pagination.append(prevBtn);
        pagination.append(currBtn);
        return pagination;
    }

    render(context: Context) {
        const res = this.createMain(context);
        (this.container).append(res);
        return this.div;
    }
}

export default WinnersPage;

import './garage.css'
import Page from "../../components/page";
import Component from '../../components/component';
import Context from '../../context/context';
import TextComponent from '../../components/textComponent';
import Input from '../../components/input';
import Button from '../../components/button';
import Div from '../../components/div';
import Garage from "../../context/garageImplementation";
import Car from '../../context/car';
import GarageController from '../../context/garageController';
import randomCar from '../../context/randomCar';

class GaragePage extends Page {
    private carId = -1;

    static TextObject = {
        MainTitle: 'Garage Page',
    }
    
    constructor(id: string) {
        super(id);
    }

    createMain(context: Context) {
        const main = new Div('garage_wrapper').render();
        const createAndUpdate = new Div('create_and_update_wrapper').render();
        createAndUpdate.append(this.createForm());
        createAndUpdate.append(this.updateCar(context, this.carId));
        createAndUpdate.append(this.controlls());
        main.append(createAndUpdate)
        main.append(new TextComponent('h1', 'garage_title', `Cars in the garage (${context.garages.length})`).render());
        main.append(new TextComponent('h2', 'garage_page', `Page #${context.numberPage}`).render());
        const lowLimit = (context.numberPage-1) * context.limit
        let highLimit = context.numberPage * context.limit
        console.log(lowLimit, highLimit)
        if (highLimit > context.garages.length-1) highLimit = context.garages.length-1
        for (let i = lowLimit; i <= highLimit; i++) {
            const car = context.garages[i];
            main.append(new Car(car.id, car.name, car.color).render(context));
        }
        main.append(this.pagination());
        return main;
    }

    createForm() {
        const createForm = new Component('form', 'create_form').render();
        let actualName = (new URLSearchParams(window.location.search)).get('name')
        if (actualName === null) actualName = ''
        let actualColor = (new URLSearchParams(window.location.search)).get('color')
        if (actualColor === null) actualColor = '#ffffff'
        createForm.append(new Input('text', 'create_name', 'name', 'input', actualName).render());
        createForm.append(new Input('color', 'create_color', 'color', 'color', actualColor).render());
        const createBtn = new Button('btn', 'submit', 'create').render();
        const garage = new Garage()
        createBtn.addEventListener('click', () => {
            const garageController = new GarageController();
            garage.name = (document.getElementById('create_name') as HTMLInputElement).value;
            garage.color = (document.getElementById('create_color') as HTMLInputElement).value;
            return garageController.postGarage(garage).then(r => console.log(r));
        })
        createForm.append(createBtn);
        return createForm
    }

    updateCar(context: Context, carId: number) {
        const updateCar = new Component('form', 'update_form ').render();
        updateCar.append(new Input('text', 'update_name', 'name', 'input').render());
        updateCar.append(new Input('color', 'update_color', 'color', 'color', '#ffffff').render());
        const updateBtn = new Button('btn', 'update_submit', 'update', 'submit').render();
        const garage = document.getElementById(`select_car_${this.carId}`)
        updateBtn.addEventListener('click', () => {
            // const garageController = new GarageController()
            // garage.name = (document.getElementById('create_name') as HTMLInputElement).value
            // garage.color = (document.getElementById('create_color') as HTMLInputElement).value
            // garageController.updateGarage(garage, carId)
        })
        updateCar.append(updateBtn);
        updateCar.classList.add('disabled');
        updateBtn.disabled = true;
        return updateCar;
    }

    controlls() {
        const controlls = new Div('controlls').render();
        const raceBtn = new Button('btn', 'race', 'race').render();
        raceBtn.addEventListener('click', function() {
            const allStartBtnOnPage = document.getElementsByClassName('start_btn');
            for (const item of allStartBtnOnPage) {
                item.classList.add('disabled')
                item.setAttribute('disabled', 'true')
            }
            const allStopBtnOnPage = document.getElementsByClassName('stop_btn');
            for (const item of allStopBtnOnPage) {
                item.classList.remove('disabled')
                item.removeAttribute('disabled')
            }
            const allCarsOnPage = document.getElementsByClassName('car');
            for (const item of allCarsOnPage) {
                item.classList.add('ride');
            }
        });
        controlls.append(raceBtn);
        const resetBtn = new Button('btn', 'reset', 'reset').render();
        resetBtn.addEventListener('click', function() {
            const allStartBtnOnPage = document.getElementsByClassName('start_btn');
            for (const item of allStartBtnOnPage) {
                item.classList.remove('disabled')
                item.removeAttribute('disabled')
            }
            const allStopBtnOnPage = document.getElementsByClassName('stop_btn');
            for (const item of allStopBtnOnPage) {
                item.classList.add('disabled')
                item.setAttribute('disabled', 'true')
            }
            const allCarsOnPage = document.getElementsByClassName('car');
            for (const item of allCarsOnPage) {
                item.classList.remove('ride');
            }
        });
        controlls.append(resetBtn);
        const generateCars = new Button('btn', 'generator', 'generate cars').render();
        const garage = new Garage()
        generateCars.addEventListener('click', function() {
            const garageController = new GarageController();
            // for (let i = 100; i <= 100; i++) {
            //     const car = new randomCar(id, car.name, car.color);
            //     garage.name = (randomCar);
            //     garage.color = (document.getElementById('create_color') as HTMLInputElement).value;
                // garage.append(new randomCar().render(context));
            // }
            
            return garageController.postGarage(garage).then(r => console.log(r));
        });
        controlls.append(generateCars);
        return controlls;
    }

    pagination() {
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

    // popup(context: Context) {
        // return new Promise(() => {
        //     const modalWrapper = new Div('modal_wrapper').render()
        //     const popup = new Div('modal').render()
        //     popup.append(new TextComponent('p', '', `Winner is: ${name} with time ${id}`).render())
        //     modalWrapper.append(popup)
        //     return modalWrapper;
        // })
    // }

    render(context: Context) {
        this.container.append(this.createMain(context));
        return this.div;
    }
}

export default GaragePage;

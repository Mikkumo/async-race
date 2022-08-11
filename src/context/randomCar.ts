import Car from "./car";

class RandomCar extends Car {
    public nameCar: Array<string> = [
        "Mersedes",
        "BMW",
        "Audi",
        "VW",
        "Renault",
        "Lada",
        "Volvo",
        "Honda",
        "Toyota",
        "Geely",
    ];
    
    public modelCar: Array<string> = [
        "A5",
        "Atlas",
        "Q7",
        "Touran",
        "Talisman",
        "XC90",
        "W221",
        "Insight",
        "Corolla",
        "X5",
    ];

    public randomName(): string {
        const name = this.nameCar[Math.floor(Math.random() * this.nameCar.length)];
        const model =
            this.modelCar[Math.floor(Math.random() * this.modelCar.length)];
        return `${name} ${model}`;
    }
    
    public randomColor(): string {
        const lettersColor = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i += 1) {
            color += lettersColor[Math.floor(Math.random() * lettersColor.length)];
        }
        return color;
    }
    
    // public generateHundred(count = 100): Array<Car> {
    //     return new Array(count)
    //         .fill(0)
    //         .map(() => ({ name: this.randomName(), color: this.randomColor() }));
    // }
    
}

export default RandomCar;
  
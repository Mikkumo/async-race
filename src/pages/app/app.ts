import Context from "../../context/context";
import ContextProcessors from "../../context/contextProcessors";
import GarageController from "../../context/garageController";
import WinnerController from "../../context/winnerControllers";

class App {
    async createContext(): Promise<Context> {
        return new Context();
    }

    run() {
        const promise = new Promise(resolve => {
            resolve(this.createContext())
        })
        this.runProcessing(promise, new ContextProcessors(), new GarageController(), new WinnerController())
        window.addEventListener('hashchange', () => {
            this.runProcessing(promise, new ContextProcessors(), new GarageController(), new WinnerController())
        });
    }

    runProcessing(
        promise: Promise<unknown>,
        contextProcessors: ContextProcessors,
        garageController: GarageController,
        winnerController: WinnerController
    ) {
        promise.then((context) => context as Context)
            .then((context) => {
                return contextProcessors.buildTrueRequest(context)
            }).then((context) => {
                return garageController.getGarages(context)
            }).then((context) => {
                return winnerController.getWinners(context)
            }).then((context) => {
                return contextProcessors.getInfoAboutPage(context)
            }).then((context) => {
                return contextProcessors.createCurrentPage(context)
            }).then((context) => {
                return contextProcessors.showCurrentPage(context)
            })
    }
}

export default App;

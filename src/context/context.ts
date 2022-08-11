import IGarage from "./garageImplementation";
import IWinner from "./winnerImplementation";

class Context {
    private _serverResponse = ''
    private _currentPage: HTMLDivElement = document.createElement('div')
    private _urlHash = ''
    private _garages: Array<IGarage> = [];
    private _winners: Array<IWinner> = [];
    private _numberPage = 1;
    private _limit = 7;

    get serverResponse(): string {
        return this._serverResponse;
    }

    set serverResponse(value: string) {
        this._serverResponse = value;
    }

    get garages(): Array<IGarage> {
        return this._garages;
    }

    set garages(value: Array<IGarage>) {
        this._garages = value;
    }

    get winners(): Array<IWinner> {
        return this._winners;
    }

    set winners(value: Array<IWinner>) {
        this._winners = value;
    }

    get numberPage(): number {
        return this._numberPage;
    }

    set numberPage(value: number) {
        this._numberPage = value;
    }

    get currentPage(): HTMLDivElement {
        return this._currentPage;
    }

    set currentPage(value: HTMLDivElement) {
        this._currentPage = value;
    }

    get urlHash(): string {
        return this._urlHash;
    }

    set urlHash(value: string) {
        this._urlHash = value;
    }

    get limit(): number {
        return this._limit;
    }

    set limit(value: number) {
        this._limit = value;
    }
}

export default Context;

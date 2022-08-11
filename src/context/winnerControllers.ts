import Context from "./context";
import { IWinner } from "./interfaces";
import Winner from "./winnerImplementation";

const link = 'http://localhost:3000';
const winners = `${link}/winners`;

class WinnerController {
    async getWinners(context: Context): Promise<Context> {
        return await fetch(`${winners}`)
            .then((response) => response.json())
            .then((data) => data as IWinner[])
            .then((winners) => {
                context.winners = winners;
                return context;
            })
    }

    async postWinner(winner: Winner): Promise<Winner> {
        return await fetch(`${winners}`, {
            method: 'POST',
            body: JSON.stringify(winner),
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        }).then((response) => { 
            if (response.status !== 201) {
                console.log(`winner not created`);
            }
            return response.json();
        }).then((data) => data as unknown as IWinner)
            .then((winner) => winner)
    }

    async deleteWinner(context: Context, id: number): Promise<Context> {
        return await fetch(`${winners}/${id}`, {
            method: 'DELETE'
        }).then((response) => { 
            if (response.status !== 200) {
                console.log(`winner with ${id} not deleted`);
            }
            return context;
        });  
    }

    async updateWinner(winner: Winner, id: number): Promise<Winner> {
        return await fetch(`${winners}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(winner.toString()),
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        }).then((response) => { 
            if (response.status !== 200) {
                console.log(`winner with ${id} not updated`);
            }
            return winner;
        });
    }

    async getWinner(winner: Winner, id: number): Promise<Winner> {
        return await fetch(`${winners}/${id}`)
            .then((response) => { 
                if (response.status !== 200) {
                    console.log(`winner with ${id} not select`);
                }
                return winner 
            });
    }

    async getWinnerStatus(id: number): Promise<number> {
        return (await fetch(`${winners}/${id}`)).status;
    }

    async saveWinner(winner: Winner,  id: number, time: number ) {
        const winnerStatus = await this.getWinnerStatus(id);

        if (winnerStatus === 404) {
            await this.postWinner(winner) ;
        } else {
            const currentWinner = await this.getWinner(winner, id);
            await this.updateWinner({
                id,
                wins: currentWinner.wins + 1,
                time: currentWinner.time > time ? time : currentWinner.time,
            }, id);
        }
    }
}

export default WinnerController;

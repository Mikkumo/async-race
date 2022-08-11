import Context from "./context";
import { IGarage } from "./interfaces";
import Garage from "./garageImplementation";

const link = 'http://localhost:3000';
const garage_path = `${link}/garage`;
const engine_path = `${link}/engine`;

class GarageController {
    async getGarages(context: Context): Promise<Context> {
        return await fetch(`${garage_path}`)
            .then((response) => response.json())
            .then((data) => data as IGarage[])
            .then((garages) => {
                context.garages = garages;
                return context;
            })
    }

    async deleteGarage(garage: Garage, id: number): Promise<Garage> {
        return await fetch(`${garage_path}/${id}`, {
            method: 'DELETE'
        }).then((response) => {
            if (response.status !== 200) {
                console.log(`garage with ${id} not deleted`);
            }
            return garage;
        });
    }

    async updateGarage(context: Context, id: number): Promise<Context> {
        return await fetch(`${garage_path}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(context.garages.toString()),
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        }).then((response) => {
            if (response.status !== 200) {
                console.log(`garage with ${id} not updated`);
            }
            return context 
        });
    }

    async postGarage(garage: Garage): Promise<Garage> {
        return await fetch(`${garage_path}`, {
            method: 'POST',
            body: JSON.stringify(garage),
            headers: {'Content-Type': 'application/json', Accept: 'application/json'}
        }).then((response) => {
            if (response.status !== 201) {
                console.log(`garage not created`);
            }
            return response.json()
        }).then((data) => data as unknown as IGarage )
            .then((garage) => garage)
    }

    async manageEngine(context: Context, id: number, status: 'started' | 'stopped'): Promise<Context> {
        return await fetch(`${engine_path}?id=${id}&status=${status}`, {
            method: 'PATCH'
        }).then((response) => {
            if (response.status !== 200) {
                console.log(`car ${id} not drives`);
            }
            console.log(response.json())
            return context 
        });  
    }

    async startEngine(context: Context, id: number) {
        return await fetch(`${engine_path}?id=${id}&status=started`, {
            method: "PATCH",
        }).then((response) => {
            if (response.status !== 200) {
                console.log(`car ${id} not started`);
            }
            console.log(response.json())
            return context 
        });  
      }
    
      async stopEngine(context: Context, id: number) {
        return await fetch(`${engine_path}?id=${id}&status=stopped`, {
            method: "PATCH",
        }).then((response) => {
            if (response.status !== 200) {
                console.log(`car ${id} not stopped`);
            }
            console.log(response.json())
            return context 
        });  
      }

    async driveEngine(id: number): Promise<Context> {
        const res = await fetch(`${engine_path}?id=${id}&status=drive`).catch();
        return (res.status !== 200) ? { success: false } : { ...(await res.json()) }
    }
}
export default GarageController;

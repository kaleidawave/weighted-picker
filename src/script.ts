import { IWeightable, Randomizer } from "./pool";
import { Table, Modal } from "./components";
import * as uuid from "uuid";

const pool = new Randomizer<Name>();
const table = new Table(document.getElementById('entries'), removeItem);
const modal = new Modal(document.getElementById('modal'));

const names: Name[] = [];

const nameInput = <HTMLInputElement>document.getElementById("name-input");
const weightInput = <HTMLInputElement>document.getElementById("weight-input");

export class Name implements IWeightable {
    uuid: string;
    Weight: number;
    Name: string;

    constructor(Name: string, Weight = 1) {

        if (Name == '') throw new Error("Item must have a name");
        else if (Name.length > 20) throw new Error("Name too long");
        else if (isNaN(Weight)) throw new Error("Weight must be a number");
        else if (Weight <= 0) throw new Error("Weight must be greater than 1 ");
        else if (!Number.isInteger(Weight)) throw new Error("Weight must be integer");

        this.Name = Name;
        this.Weight = Weight;
        this.uuid = uuid.v4();
    }
}

function roll() {
    try {
        const { Name } = pool.Choose(); // Object destructuring
        modal.render(`Chose ${Name}`);
    } catch (error) {
        modal.render(error);
    }
}

function addItem(event: Event) {
    event.preventDefault(); //Prevent redirect

    try {
        const item = new Name(nameInput.value, Number(weightInput.value));
        pool.Add(item);
        table.Add(item);
        names.push(item);
        // Reset inputs
        nameInput.value = '';
        weightInput.value = '1';
    } catch (error) {
        modal.render(error);
    }
}

export function removeItem(id: string) {
    const label: Name = names.find(name => name.uuid == id);
    pool.Remove(id);
    table.Remove(id);
    names.filter(name => name.uuid == id);
}

document.getElementById('add-item').addEventListener('click', addItem);
document.getElementById('roll').addEventListener('click', roll);
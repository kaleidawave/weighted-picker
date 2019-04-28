import { Collection, IUnique } from "./definitions";

/** A interface that implements a weight property*/
export interface IWeightable extends IUnique {
    Weight: number;
}

/** A class to pick random items from a list */
export class Randomizer<T extends IWeightable> extends Collection<T> {
    private _totalCount: number;
    public removeItemOnPick: boolean;

    /**
     * @param entries Items in the randomizer
     * @param removeItemOnPick Remove item from the randomizer on it being selected
     */
    constructor(entries: T[] = [], removeItemOnPick = false) {
        super(entries);
        this.removeItemOnPick = removeItemOnPick;
        if (entries.length != 0) this._totalCount = entries.map(x => x.Weight).reduce((x, y) => x + y);
        else this._totalCount = 0;
    }

    /**
     * @returns Random element from given collection
     */
    Choose(): T {
        if (this._entries.length > 1) {
            let picked = Math.random() * this._totalCount;
            // Deduces element via linear scan
            for (let item of this._entries) {
                picked -= item.Weight;
                if (picked <= 0) {
                    if (this.removeItemOnPick) this.Remove(item.uuid);
                    return item;
                }
            }
            throw new Error("Internal Error") // should not fire
        }
        else throw new Error("There must be at least two elements to pick");
    }

    /** Adds an item to the pool
     * @param item Item to add to the pool */
    Add(item: T) {
        super.Add(item);
        this._totalCount += item.Weight;
    }

    Remove(itemID: string) {
        this._totalCount -= this._entries.find(item => item.uuid == itemID).Weight;
        super.Remove(itemID);
    }
}
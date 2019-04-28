/** Implementation of a basic collection */
class Collection<T extends IUnique> {
    protected _entries: T[];

    constructor(entries: T[] = []) {
        this._entries = entries;
    }
    /**
     * Adds item to end of collection
     * @param item Item to add to collection
     */
    Add(item: T) {
        this._entries.push(item);
    };

    /**
     * Removes item from collection
     * @param item Item to remove from collection
     */
    Remove(itemID: string): void {
        this._entries = this._entries.filter(i => i.uuid != itemID);
    };
    /**
     * @param item Item to compare
     * @returns True it item is in collection
     */
    Contains(item: T): boolean {
        return this._entries.map(x => x.uuid).indexOf(item.uuid) != -1;
    };
}

/**
 * Represents a object that can be rendered
 */
interface IRenderable {
    render(): void;
}

/**
 * Represents an object which is unique. Through a unique string
 */
interface IUnique {
    uuid: string;
}


export {Collection, IRenderable, IUnique};
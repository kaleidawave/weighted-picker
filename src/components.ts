import { Name } from "./script";
import { IRenderable, Collection,} from "./definitions";

/** Represents a table object */
export class Table extends Collection<Name> implements IRenderable {

    private _table: HTMLElement;
    private _removeCallback: (uuid: string) => void;

    constructor(table: HTMLElement, removeCallback: (uuid: string) => void) {
        super();
        this._table = table;
        this._removeCallback = removeCallback;
    }

    Add(item: Name): void {
        super.Add(item);
        this.render();
    }

    Remove(item: string): void {
        super.Remove(item);
        this.render();
    }

    render() {
        this._table.innerHTML = this._entries.map(label => `<div class="grid-row"><div>${label.Name}</div><div>${label.Weight}</div><div><button data-item-uuid="${label.uuid}">Remove</button></div></div>`).join('');
        document.querySelectorAll('button[data-item-uuid]').forEach(element => {
            element.addEventListener("click", (event: Event) => { 
                this._removeCallback((<HTMLElement>event.target).getAttribute('data-item-uuid'));
            });
        });
    }
}

/** Represents a modal */
export class Modal implements IRenderable {
    
    private _modal: HTMLElement; 
    private _message: HTMLElement; 
    private _open: boolean;

    constructor(modal: HTMLElement) {
        this._modal = modal;
        window.addEventListener('click', event => { 
            if (event.target == this._modal) this.hide();
        });
        this._message = modal.querySelector(".modal-content > p");
        modal.querySelector(".modal-content > #modal-close").addEventListener('click', event => {this.hide()});
        window.addEventListener('keydown', (event:KeyboardEvent) => {
            if(this._open && event.key == "Escape") this.hide();
        });
    }

    show() {
        this._modal.style.display = "block";
        this._open = true;
    }

    hide() {
        this._modal.style.display = "none";
        this._open = false;
    }

    render(message: string = "None") {
        this._message.innerHTML = message;
        this.show();
    }
}
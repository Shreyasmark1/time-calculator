import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MyData } from "src/app/app.component";


@Component({
    selector: 'card',
    templateUrl: 'card.component.html',
    styleUrls: ['./card.component.css']
})
export class Card {

    @Output() delete = new EventEmitter<Number>()

    @Input() data!: MyData;
    @Input() index!: number;

    constructor() {}

    onDelete(){        
        this.delete.emit(this.index)
    }
}
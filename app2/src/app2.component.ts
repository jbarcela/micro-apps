import { Component, forwardRef, Inject, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState, CounterActions } from "./store";
import {Globals} from "./globals.service";
import * as angularImg from "../assets/angular-logo.png";

@Component({
	selector: 'app2',
	template: `
		<div style="margin-top: 100px;">
            <img [src]="angularImg" style="width: 100px;"/> <br />
			App2
		</div>
        <br />

        <div>
            <b> Contador: {{ count }}</b><br/><br/>
            <button (click)="increment()">+1 local</button> &nbsp;
            
            <button (click)="decrement()">-1 local</button> &nbsp;          
            <button (click)="globalIncrement()">+1 global</button>&nbsp;
            <button (click)="globalDecrement()">-1 global</button>&nbsp;
        </div>
		
        <br />
		
		<router-outlet></router-outlet>
	`,
})
export class App2 {
    count: number;
    angularImg: any;
    subscription;

    constructor(
        @Inject(forwardRef(() => NgRedux)) private ngRedux: NgRedux<IAppState>,
        @Inject(forwardRef(() => CounterActions)) private actions: CounterActions,
        @Inject(forwardRef(() => Globals)) private globals:Globals) {
        this.subscription = ngRedux.select<number>('count')
            .subscribe(newCount => this.count = newCount);
        this.angularImg = angularImg;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    increment() {
        this.ngRedux.dispatch(this.actions.increment());
    }

    decrement() {
        this.ngRedux.dispatch(this.actions.decrement());
    }

    globalIncrement() {
        this.globals.globalEventDistributor.dispatch(this.actions.increment());
    }

    globalDecrement() {
        this.globals.globalEventDistributor.dispatch(this.actions.decrement());
    }
}

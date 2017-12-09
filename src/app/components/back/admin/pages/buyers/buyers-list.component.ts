import { Component, OnInit, ElementRef, ViewChild } 		from '@angular/core';
import { DataSource } 										from '@angular/cdk/table';
import { MdPaginator } 										from '@angular/material';
import { MdSort } 											from '@angular/material';
import { BehaviorSubject } 									from 'rxjs/BehaviorSubject';
import { Observable } 										from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { CRUDService } 										from '../../../../../services/crud.service';
import { TableData } 										from '../../../../helper/table-data/table-data';

@Component({
	selector: 'admin-buyers-list',
	templateUrl: './buyers-list.component.html',
	styleUrls: ['./buyers-list.component.scss']
})
export class BuyersListComponent implements OnInit {

	displayedColumns = ['customer_name', 'image', 'email', 'customer_group', 'status', 'ip', 'date_added', 'action'];
	tableData = new TableData();
	dataSource: UserDataSource | null;

	statuses = [ 'No', 'Yes' ];

	@ViewChild(MdPaginator) paginator: MdPaginator;
	@ViewChild(MdSort) sort: MdSort;

	@ViewChild('nameFilter') 		nameFilter		: 	ElementRef;
	@ViewChild('groupFilter') 		groupFilter		: 	ElementRef;
	@ViewChild('approveFilter') 	approveFilter	: 	ElementRef;
	@ViewChild('dateFilter') 		dateFilter		: 	ElementRef;
	@ViewChild('emailFilter') 		emailFilter		: 	ElementRef;
	@ViewChild('statusFilter') 		statusFilter	: 	ElementRef;
	@ViewChild('ipFilter') 			ipFilter		: 	ElementRef;

	constructor(private crudService: CRUDService) { }

	ngOnInit() {

		this.crudService.retrieve( 'Buyer' ).subscribe( result => {
			if (result.status == 'ok') {
				this.tableData.setData(result.content);
				this.dataSource = new UserDataSource(this.tableData, this.paginator, this.sort);
			}
		});

		Observable.fromEvent(this.nameFilter.nativeElement, 'keyup')
			.debounceTime(150)
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) return;
				this.dataSource.nameFilter = this.nameFilter.nativeElement.value;
			});
	}
}

export class UserDataSource extends DataSource<any> {

	displayDataChanges: any;
	_nameFilterChange 		= new BehaviorSubject('');
	_groupFilterChange 		= new BehaviorSubject('');
	_approveFilterChange 	= new BehaviorSubject('');
	_dateFilterChange 		= new BehaviorSubject('');
	_emailFilterChange 		= new BehaviorSubject('');
	_statusFilterChange 	= new BehaviorSubject('');
	_ipFilterChange 		= new BehaviorSubject('');

	get nameFilter(): string { return this._nameFilterChange.value; }
	set nameFilter(filter: string) { this._nameFilterChange.next(filter); }

	get groupFilter(): string { return this._groupFilterChange.value; }
	set groupFilter(filter: string) { this._groupFilterChange.next(filter); }

	get approveFilter(): string { return this._approveFilterChange.value; }
	set approveFilter(filter: string) { this._approveFilterChange.next(filter); }

	get dateFilter(): string { return this._dateFilterChange.value; }
	set dateFilter(filter: string) { this._dateFilterChange.next(filter); }

	get emailFilter(): string { return this._emailFilterChange.value; }
	set emailFilter(filter: string) { this._emailFilterChange.next(filter); }

	get statusFilter(): string { return this._statusFilterChange.value; }
	set statusFilter(filter: string) { this._statusFilterChange.next(filter); }

	get ipFilter(): string { return this._ipFilterChange.value; }
	set ipFilter(filter: string) { this._ipFilterChange.next(filter); }

	constructor(private _tableData: TableData, private  _paginator: MdPaginator, private _sort: MdSort) {
		super();

		this.displayDataChanges = [
			_tableData.dataChange,
			_paginator.page,
			_sort.mdSortChange,
			this._nameFilterChange
		]
	}

	connect(): Observable<any> {

		return Observable.merge(...this.displayDataChanges).map(() => {
			const startIndex = this._paginator.pageIndex  * this._paginator.pageSize;
			return this.getSortedData().slice().filter((item) => {
				let searchStr = (item.customer_name + ' ' + item.email + ' ' + item.customer_group + ' ' + item.status + ' ' + item.ip + ' ' + item.date_added + ' ' + item.action).toLowerCase();
				return searchStr.indexOf(this.nameFilter.toLowerCase()) != -1;
			}).splice(startIndex, this._paginator.pageSize);
		});
	}

	getSortedData(): any {
		const data = this._tableData.data.slice();
		if (!this._sort.active || this._sort.direction == '') { return data; }

		return data.sort((a, b) => {
			let propertyA: number|string = '';
			let propertyB: number|string = '';

			[propertyA, propertyB] = [a[this._sort.active], b[this._sort.active]];

			let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
			let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

			return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
		});
	}

	disconnect() {

	}
}
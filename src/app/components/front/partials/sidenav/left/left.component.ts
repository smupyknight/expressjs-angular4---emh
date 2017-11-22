import { Component } from '@angular/core';

@Component({
	selector: 'app-left-sidenav',
	templateUrl: './left.component.html',
	styleUrls: [ './left.component.scss' ]
})
export class LeftSidenavComponent { 
	menuItems = [ 'Accessory', 'Jewllery', 'Shoes', 'Cosmetic', 'Handmade', 'Haute Couture', 'Horology', 'Lingerle', 'Wedding', 'Perfumery', 'Ready To Wear', 'Bag', 'Wax Clothe', 'All Categories' ];
}
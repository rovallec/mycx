import { Component } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})
export class LeftPanelComponent {

  activeItem: string = 'profile'; // Default active item

  setActive(item: string): void {
    this.activeItem = item;
  }

  // Method to check if an item is active
  isActive(item: string): boolean {
    return this.activeItem === item;
  }

}

import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() back: boolean = false;
  @Input() logout: boolean = false;
  @Input() menu: boolean = false;


  onlogout() {
    localStorage.removeItem('user')
  }

}

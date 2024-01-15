import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[sticky]',
  standalone: true,
})
export class StickyDirective {
  constructor() {}

  @HostBinding('class.new-nav')
  newNav: boolean = false;

  @HostListener('window:scroll') onScroll() {
    console.log(window.scrollY);

    if (window.scrollY >= 13) {
      this.newNav = true;
    } else {
      this.newNav = false;
    }
  }
}

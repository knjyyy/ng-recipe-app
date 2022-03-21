import { Directive, HostListener, ElementRef , HostBinding} from '@angular/core';

@Directive({ selector: '[appDropdown]' })
export class DropdownDirective {
    @HostBinding('class.open') isToggleOpen: boolean = false;

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isToggleOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isToggleOpen: false;  
    }

    constructor(private elementRef: ElementRef) { }
}
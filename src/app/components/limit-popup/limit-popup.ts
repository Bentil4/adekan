import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-limit-popup',
  imports: [CommonModule],
  templateUrl: './limit-popup.html',
  styleUrl: './limit-popup.css',
})
export class LimitPopup implements OnChanges {
  @Input() public show = false;
  @Output() public close = new EventEmitter<void>();

  public displayStyle = 'none';

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']) {
      this.displayStyle = this.show ? 'flex' : 'none';

      if (this.show) {
        setTimeout(() => {
          const button = document.getElementById('close-popup-btn');
          if (button) {
            button.focus();
          }
        }, 100);
      }
    }
  }

  public onClose(): void {
    this.close.emit();
  }

  public onOverlayClick(event: MouseEvent): void {
    // Close when clicking the overlay (background)
    if ((event.target as HTMLElement).classList.contains('limit-popup-overlay')) {
      this.onClose();
    }
  }
}

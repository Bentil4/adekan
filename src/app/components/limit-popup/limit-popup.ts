import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-limit-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './limit-popup.html',
  styleUrl: './limit-popup.css',
})
export class LimitPopup implements OnChanges {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  displayStyle = 'none';

  ngOnChanges(changes: SimpleChanges): void {
    // React to show property changes
    if (changes['show']) {
      this.displayStyle = this.show ? 'flex' : 'none';

      // Focus on the OK button when popup opens for accessibility
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

  onClose(): void {
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    // Close when clicking the overlay (background)
    if ((event.target as HTMLElement).classList.contains('limit-popup-overlay')) {
      this.onClose();
    }
  }
}

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './controls.html',
  styleUrl: './controls.css',
})
export class Controls implements OnChanges {
  @Input() excludeSpaces = false;
  @Input() isLimitEnabled = false;
  @Input() characterLimit = 300;
  @Input() readingTime = '< 1 minute';

  @Output() excludeSpacesChange = new EventEmitter<boolean>();
  @Output() limitToggle = new EventEmitter<boolean>();
  @Output() limitChange = new EventEmitter<number>();

  localExcludeSpaces = false;
  localIsLimitEnabled = false;
  localCharacterLimit = 300;
  displayReadingTime = 'Approx. reading time: < 1 minute';

  ngOnChanges(changes: SimpleChanges): void {
    // Sync local state with inputs
    if (changes['excludeSpaces']) {
      this.localExcludeSpaces = this.excludeSpaces;
    }

    if (changes['isLimitEnabled']) {
      this.localIsLimitEnabled = this.isLimitEnabled;
    }

    if (changes['characterLimit']) {
      this.localCharacterLimit = this.characterLimit;
    }

    if (changes['readingTime']) {
      this.displayReadingTime = `Approx. reading time: ${this.readingTime}`;
    }
  }

  onExcludeSpacesToggle(): void {
    this.localExcludeSpaces = !this.localExcludeSpaces;
    this.excludeSpacesChange.emit(this.localExcludeSpaces);
  }

  onLimitToggle(): void {
    this.localIsLimitEnabled = !this.localIsLimitEnabled;
    this.limitToggle.emit(this.localIsLimitEnabled);
  }

  onLimitInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);

    if (!isNaN(value) && value > 0) {
      this.localCharacterLimit = value;
      this.limitChange.emit(value);
    }
  }
}

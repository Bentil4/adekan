import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controls',
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

  public localExcludeSpaces = false;
  public localIsLimitEnabled = false;
  public localCharacterLimit = 300;
  public displayReadingTime = 'Approx. reading time: < 1 minute';

  public ngOnChanges(changes: SimpleChanges): void {
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

  public onExcludeSpacesToggle(): void {
    this.localExcludeSpaces = !this.localExcludeSpaces;
    this.excludeSpacesChange.emit(this.localExcludeSpaces);
  }

  public onLimitToggle(): void {
    this.localIsLimitEnabled = !this.localIsLimitEnabled;
    this.limitToggle.emit(this.localIsLimitEnabled);
  }

  public onLimitInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);

    if (!isNaN(value) && value > 0) {
      this.localCharacterLimit = value;
      this.limitChange.emit(value);
    } 
  }

  public onKeyPress(event: KeyboardEvent): void {
    const char = String.fromCharCode(event.which);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  }
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
})
export class TextInput implements OnChanges, OnInit {
  @Input() public text = '';
  @Input() public characterLimit = 300;
  @Input() public isLimitEnabled = false;

  @Output() public textChange = new EventEmitter<string>();
  @Output() public limitExceeded = new EventEmitter<void>();

  public currentText = '';
  public showWarning = false;
  public isLimitExceeded = false;
  private readonly STORAGE_KEY = 'textarea-content';

  public ngOnInit(): void {
    const savedText = localStorage.getItem(this.STORAGE_KEY) || '';
    this.currentText = savedText;
    this.textChange.emit(savedText);
    this.checkLimit();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['characterLimit'] || changes['isLimitEnabled']) {
      this.checkLimit();
    }

    // Sync internal state with input
    if (changes['text'] && !changes['text'].firstChange) {
      this.currentText = this.text;
    }
  }

  public onTextInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    const newText = textarea.value;

    this.currentText = newText;
    localStorage.setItem(this.STORAGE_KEY, newText);
    this.textChange.emit(newText);
    this.checkLimit();
  }

  public onKeyPress(event: KeyboardEvent): void {
    if (this.isLimitEnabled && this.characterLimit > 0 && this.currentText.length >= this.characterLimit) {
      // Allow backspace, delete, and navigation keys
      if (!['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        this.limitExceeded.emit();
      }
    }
  }

  private checkLimit(): void {
    if (!this.isLimitEnabled || this.characterLimit <= 0) {
      this.showWarning = false;
      this.isLimitExceeded = false;
      return;
    }

    const currentLength = this.currentText.length;

    if (currentLength >= this.characterLimit) {
      this.showWarning = true;
      this.isLimitExceeded = true;
    } else {
      this.showWarning = false;
      this.isLimitExceeded = false;
    }
  }
}

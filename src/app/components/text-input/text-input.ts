import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
})
export class TextInput implements OnChanges, OnInit {
  @Input() text = '';
  @Input() characterLimit = 300;
  @Input() isLimitEnabled = false;

  @Output() textChange = new EventEmitter<string>();
  @Output() limitExceeded = new EventEmitter<void>();

  currentText = '';
  showWarning = false;
  isLimitExceeded = false;
  private readonly STORAGE_KEY = 'textarea-content';

  ngOnInit(): void {
    const savedText = localStorage.getItem(this.STORAGE_KEY) || '';
    this.currentText = savedText;
    this.textChange.emit(savedText);
    this.checkLimit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // React to character limit changes
    if (changes['characterLimit'] || changes['isLimitEnabled']) {
      this.checkLimit();
    }

    // Sync internal state with input
    if (changes['text'] && !changes['text'].firstChange) {
      this.currentText = this.text;
    }
  }

  onTextInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    let newText = textarea.value;

    // Check if limit is enabled and exceeded
    if (this.isLimitEnabled && this.characterLimit > 0 && newText.length > this.characterLimit) {
      // Truncate text to limit
      newText = newText.substring(0, this.characterLimit);
      textarea.value = newText;
      this.limitExceeded.emit();
    }

    this.currentText = newText;
    localStorage.setItem(this.STORAGE_KEY, newText);
    this.textChange.emit(newText);
    this.checkLimit();
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

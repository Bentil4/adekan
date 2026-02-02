import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-cards.html',
  styleUrl: './stats-cards.css',
})
export class StatsCards implements OnChanges {
  @Input() characterCount = 0;
  @Input() wordCount = 0;
  @Input() sentenceCount = 0;

  displayCharacterCount = '00';
  displayWordCount = '00';
  displaySentenceCount = '00';

  ngOnChanges(changes: SimpleChanges): void {
    // Update display values with proper padding when inputs change
    if (changes['characterCount']) {
      this.displayCharacterCount = this.formatCount(this.characterCount);
    }

    if (changes['wordCount']) {
      this.displayWordCount = this.formatCount(this.wordCount);
    }

    if (changes['sentenceCount']) {
      this.displaySentenceCount = this.formatCount(this.sentenceCount);
    }
  }

  private formatCount(count: number): string {
    return count.toString().padStart(2, '0');
  }
}

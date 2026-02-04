import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-cards',
  imports: [CommonModule],
  templateUrl: './stats-cards.html',
  styleUrl: './stats-cards.css',
})
export class StatsCards implements OnChanges {
  @Input() public characterCount = 0;
  @Input() public wordCount = 0;
  @Input() public sentenceCount = 0;

  public displayCharacterCount = '00';
  public displayWordCount = '00';
  public displaySentenceCount = '00';

  public ngOnChanges(changes: SimpleChanges): void {
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

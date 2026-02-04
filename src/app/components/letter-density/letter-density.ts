import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LetterDensityItem {
  letter: string;
  count: number;
  percentage: number;
}

@Component({
  selector: 'app-letter-density',
  imports: [CommonModule],
  templateUrl: './letter-density.html',
  styleUrl: './letter-density.css',
})
export class LetterDensity implements OnChanges {
  @Input() public letterDensityData: LetterDensityItem[] = [];
  @Input() public hasText = false;

  public visibleData: LetterDensityItem[] = [];
  public showButton = false;
  public isExpanded = false;
  public buttonText = 'See More';
  private readonly COLLAPSED_LIMIT = 5;

  public ngOnChanges(changes: SimpleChanges): void {
    // React to changes in letter density data
    if (changes['letterDensityData'] || changes['hasText']) {
      this.updateVisibleData();
    }
  }

  public toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
    this.buttonText = this.isExpanded ? 'See Less' : 'See More';
    this.updateVisibleData();
  }

  private updateVisibleData(): void {
    if (this.letterDensityData.length === 0) {
      this.visibleData = [];
      this.showButton = false;
      return;
    }

    if (this.letterDensityData.length > this.COLLAPSED_LIMIT) {
      this.showButton = true;
      this.visibleData = this.isExpanded
        ? this.letterDensityData
        : this.letterDensityData.slice(0, this.COLLAPSED_LIMIT);
    } else {
      this.showButton = false;
      this.visibleData = this.letterDensityData;
    }
  }
}

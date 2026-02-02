import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { TextAnalysisService } from '../../services/text-analysis.service';
import { Header } from "../../components/header/header";
import { TextInput } from "../../components/text-input/text-input";
import { Controls } from "../../components/controls/controls";
import { StatsCards } from "../../components/stats-cards/stats-cards";
import { LetterDensity } from "../../components/letter-density/letter-density";
import { LimitPopup } from "../../components/limit-popup/limit-popup";

@Component({
  selector: 'app-home',
  imports: [Header, TextInput, Controls, StatsCards, LetterDensity, LimitPopup],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  textContent = '';
  excludeSpaces = false;
  characterLimit = 300;
  isLimitEnabled = false;
  showLimitPopup = false;

  characterCount = 0;
  wordCount = 0;
  sentenceCount = 0;
  readingTime = '< 1 minute';
  letterDensityData: Array<{ letter: string; count: number; percentage: number }> = [];

  private themeService = inject(ThemeService);
  private textAnalysisService = inject(TextAnalysisService);

  ngOnInit(): void {
    // Initialize theme
    this.themeService.initializeTheme();

    // Initialize with empty state
    this.updateAnalysis();
  }

  onTextChange(text: string): void {
    this.textContent = text;
    this.updateAnalysis();
  }

  onExcludeSpacesChange(exclude: boolean): void {
    this.excludeSpaces = exclude;
    this.updateAnalysis();
  }

  onLimitToggle(enabled: boolean): void {
    this.isLimitEnabled = enabled;
  }

  onLimitChange(limit: number): void {
    this.characterLimit = limit;
  }

  onLimitExceeded(): void {
    this.showLimitPopup = true;
  }

  onClosePopup(): void {
    this.showLimitPopup = false;
  }

  onThemeToggle(): void {
    this.themeService.toggleTheme();
  }

  private updateAnalysis(): void {
    const analysis = this.textAnalysisService.analyzeText(this.textContent, this.excludeSpaces);

    this.characterCount = analysis.characterCount;
    this.wordCount = analysis.wordCount;
    this.sentenceCount = analysis.sentenceCount;
    this.readingTime = analysis.readingTime;
    this.letterDensityData = analysis.letterDensity;
  }
}

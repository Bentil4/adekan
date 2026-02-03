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
  public textContent = '';
  public excludeSpaces = false;
  public characterLimit = 300;
  public isLimitEnabled = false;
  public showLimitPopup = false;

  public characterCount = 0;
  public wordCount = 0;
  public sentenceCount = 0;
  public readingTime = '< 1 minute';
  public letterDensityData: Array<{ letter: string; count: number; percentage: number }> = [];

  private themeService = inject(ThemeService);
  private textAnalysisService = inject(TextAnalysisService);

  public ngOnInit(): void {
    this.themeService.initializeTheme();

    this.updateAnalysis();
  }

  public onTextChange(text: string): void {
    this.textContent = text;
    this.updateAnalysis();
  }

  public onExcludeSpacesChange(exclude: boolean): void {
    this.excludeSpaces = exclude;
    this.updateAnalysis();
  }

  public onLimitToggle(enabled: boolean): void {
    this.isLimitEnabled = enabled;
  }

  public onLimitChange(limit: number): void {
    this.characterLimit = limit;
  }

  public onLimitExceeded(): void {
    this.showLimitPopup = true;
  }

  public onClosePopup(): void {
    this.showLimitPopup = false;
  }

  public onThemeToggle(): void {
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

import { Injectable } from '@angular/core';

export interface TextAnalysis {
  characterCount: number;
  wordCount: number;
  sentenceCount: number;
  readingTime: string;
  letterDensity: Array<{ letter: string; count: number; percentage: number }>;
}

@Injectable({
  providedIn: 'root',
})
export class TextAnalysisService {
  public analyzeText(text: string, excludeSpaces: boolean = false): TextAnalysis {
    return {
      characterCount: this.countCharacters(text, excludeSpaces),
      wordCount: this.countWords(text),
      sentenceCount: this.countSentences(text),
      readingTime: this.calculateReadingTime(this.countWords(text)),
      letterDensity: this.calculateLetterDensity(text, excludeSpaces),
    };
  }

  private countCharacters(text: string, excludeSpaces: boolean): number {
    if (excludeSpaces) {
      return text.replace(/\s+/g, '').length;
    }
    return text.length;
  }

  private countWords(text: string): number {
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word !== '');
    return words.length;
  }

  private countSentences(text: string): number {
    const sentences = text.split(/[.!?]+/).filter((sentence) => sentence.trim() !== '');
    return sentences.length;
  }

  private calculateReadingTime(wordCount: number): string {
    if (wordCount === 0) {
      return '< 1 minute';
    }
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  private calculateLetterDensity(
    text: string,
    excludeSpaces: boolean,
  ): Array<{ letter: string; count: number; percentage: number }> {
    const filteredText = excludeSpaces ? text.replace(/\s+/g, '') : text;

    if (filteredText.length === 0) {
      return [];
    }

    const letterCounts: { [key: string]: number } = {};
    const chars = [...filteredText];

    for (const char of chars) {
      const lowerChar = char.toLowerCase();
      letterCounts[lowerChar] = (letterCounts[lowerChar] || 0) + 1;
    }

    const totalCharacters = filteredText.length;
    const densityData: Array<{ letter: string; count: number; percentage: number }> = [];

    for (const letter in letterCounts) {
      const count = letterCounts[letter];
      const percentage = parseFloat(((count / totalCharacters) * 100).toFixed(2));

      densityData.push({
        letter: letter.toUpperCase(),
        count,
        percentage,
      });
    }

    return densityData.sort((a, b) => b.count - a.count);
  }
}

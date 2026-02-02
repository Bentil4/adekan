import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private readonly DARK_THEME = 'dark-theme';
  private readonly LIGHT_THEME = 'light-theme';

  initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);

    if (savedTheme === 'light') {
      document.body.classList.add(this.LIGHT_THEME);
      document.body.classList.remove(this.DARK_THEME);
    } else {
      document.body.classList.add(this.DARK_THEME);
      document.body.classList.remove(this.LIGHT_THEME);
    }
  }

  toggleTheme(): void {
    const isCurrentlyDark = document.body.classList.contains(this.DARK_THEME);

    if (isCurrentlyDark) {
      document.body.classList.remove(this.DARK_THEME);
      document.body.classList.add(this.LIGHT_THEME);
      localStorage.setItem(this.THEME_KEY, 'light');
    } else {
      document.body.classList.remove(this.LIGHT_THEME);
      document.body.classList.add(this.DARK_THEME);
      localStorage.setItem(this.THEME_KEY, 'dark');
    }
  }

  isDarkTheme(): boolean {
    return document.body.classList.contains(this.DARK_THEME);
  }
}

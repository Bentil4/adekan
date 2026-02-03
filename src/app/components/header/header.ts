import { Component, Output, EventEmitter, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit, OnDestroy {
  @Output() public themeToggle = new EventEmitter<void>();

  public themeIcon = '/assets/images/icon-sun.svg';
  public logoSrc = '/assets/images/logo-dark-theme.svg';
  private keydownHandler: ((event: KeyboardEvent) => void) | null = null;

  private themeService = inject(ThemeService);

  public ngOnInit(): void {
    this.updateIcons();

    // Add keyboard navigation support
    this.keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        const target = event.target as HTMLElement;
        if (target.classList.contains('theme')) {
          event.preventDefault();
          this.onThemeToggle();
        }
      }
    };

    document.addEventListener('keydown', this.keydownHandler);
    
    // Listen for theme changes
    const observer = new MutationObserver(() => this.updateIcons());
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  public ngOnDestroy(): void {
    // Cleanup event listener
    if (this.keydownHandler) {
      document.removeEventListener('keydown', this.keydownHandler);
    }
  }

  public onThemeToggle(): void {
    this.themeToggle.emit();
  }

  private updateIcons(): void {
    const isDark = this.themeService.isDarkTheme();

    if (isDark) {
      this.themeIcon = '/assets/images/icon-sun.svg';
      this.logoSrc = '/assets/images/logo-dark-theme.svg';
    } else {
      this.themeIcon = '/assets/images/icon-moon.svg';
      this.logoSrc = '/assets/images/logo-light-theme.svg';
    }
  }
}

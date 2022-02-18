export class TestingUtility {
  static getButtonByIcon(iconName: string): HTMLElement {
    const iconButton = document.querySelector<HTMLElement>(`ion-button ion-icon[name="${iconName}"]`);
    if (!iconButton) {
      throw new Error(`Could not find button with icon ${iconName}`);
    }
    return iconButton;
  }

  static getButtonByText(text: string): HTMLElement {
    const button = Array.from(document.querySelectorAll('ion-button')).find((button: HTMLElement | null) => {
      return button?.innerText.toLowerCase() === text.toLowerCase();
    });
    if (!button) {
      throw new Error(`Could not find button with text ${text}`);
    }
    return button;
  }
}

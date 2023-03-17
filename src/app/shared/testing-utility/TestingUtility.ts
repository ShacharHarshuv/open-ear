export class TestingUtility {
  static getButtonByIcon(iconName: string): HTMLElement {
    const iconButton = document.querySelector<HTMLElement>(
      `ion-button ion-icon[name="${iconName}"]`
    );
    if (!iconButton) {
      throw new Error(`Could not find button with icon ${iconName}`);
    }
    return iconButton;
  }

  static getElementByText(text: string, selector: string): HTMLElement {
    const element = Array.from(
      document.querySelectorAll<HTMLElement>(selector)
    ).find((element: HTMLElement | null) => {
      return element?.innerText.toLowerCase() === text.toLowerCase();
    });
    if (!element) {
      throw new Error(`Could not find ${selector} element with text ${text}`);
    }
    return element;
  }

  static getButtonByText(text: string): HTMLElement {
    return TestingUtility.getElementByText(text, 'ion-button');
  }

  static isDisabled(button: HTMLElement): boolean {
    if (button.tagName.toLowerCase() === 'ion-button') {
      return button.getAttribute('ng-reflect-disabled') === 'true';
    }
    return button.hasAttribute('disabled');
  }
}

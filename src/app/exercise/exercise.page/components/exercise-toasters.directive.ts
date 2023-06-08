import { Directive, inject, effect, signal } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ExerciseStateService } from '../state/exercise-state.service';

@Directive({
  selector: '[appExerciseToasters]',
  standalone: true,
})
export class ExerciseToastersDirective {
  readonly hideMessage = signal(false);

  constructor() {
    this._handleMessages();
  }

  private _handleMessages(): void {
    const toastController = inject(ToastController);
    const state = inject(ExerciseStateService);
    let lastToaster: HTMLIonToastElement | null = null;

    effect(() => {
      const getMessageRef = (): {
        text: string;
        type: 'error' | 'message';
      } | null => {
        if (this.hideMessage()) {
          return null;
        }

        if (state.error()) {
          return {
            text:
              'Ooops... something went wrong! If this persists, please report a bug. Details: ' +
              state.error()!,
            type: 'error',
          };
        }

        if (state.message()) {
          return {
            text: state.message()!,
            type: 'message',
          };
        }

        return null;
      };

      const messageRef = getMessageRef();

      if (lastToaster) {
        lastToaster.dismiss();
        lastToaster = null;
      }

      if (!messageRef) {
        return;
      }

      toastController
        .create({
          message: messageRef.text,
          position: 'middle',
          color: messageRef.type === 'error' ? 'danger' : 'dark',
          header: messageRef.type === 'error' ? 'Unexpected Error' : undefined,
          buttons: messageRef.type === 'error' ? ['OK'] : [],
        })
        .then((toaster) => {
          // can happen because of a race condition
          if (lastToaster) {
            lastToaster.dismiss();
          }
          lastToaster = toaster;
          toaster.present();
        });

      return () => {
        if (lastToaster) {
          lastToaster.dismiss();
          lastToaster = null;
        }
      };
    });
  }
}

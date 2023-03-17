import { PublicMembers } from "../shared/ts-utility/PublicMembers";
import {
  YouTubeCallbackDescriptor,
  YouTubePlayerService
} from "./you-tube-player.service";
import { Provider } from "@angular/core";

export class YouTubePlayerMockService
  implements PublicMembers<YouTubePlayerService>
{
  get isVideoLoading(): boolean {
    return false;
  }

  get onCurrentVideoLoaded(): Promise<void> {
    return Promise.resolve();
  }

  loadVideoById(videoId: string): Promise<void> {
    return Promise.resolve();
  }

  addCallback(seconds: number, callback: () => void): void {}

  get isPlaying(): boolean {
    return false;
  }

  ngOnDestroy(): void {}

  async onStop(): Promise<unknown> {
    return Promise.resolve();
  }

  async play(
    videoId: string,
    time: number,
    callbacks: YouTubeCallbackDescriptor[] | undefined
  ): Promise<void> {
    return Promise.resolve();
  }

  async stop(): Promise<void> {
    return Promise.resolve();
  }

  static providers: Provider[] = [
    YouTubePlayerMockService,
    {
      provide: YouTubePlayerService,
      useExisting: YouTubePlayerMockService,
    },
  ];
}

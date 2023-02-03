import {Component, Input, Output, EventEmitter, IterableDiffer, DoCheck, OnDestroy} from '@angular/core';
import {Chat} from "../../../../model/Chat";
import {EncodedImage, ImageService} from "../../../../services/image.service";

@Component({
  selector: 'app-list-of-chats',
  templateUrl: './list-of-chats.component.html',
  styleUrls: ['./list-of-chats.component.css']
})
export class ListOfChatsComponent implements DoCheck, OnDestroy {
  @Input() chats: Chat[];
  @Output() chatEventEmitter = new EventEmitter<Chat>();
  iterableDiffer: IterableDiffer<Chat>;
  profilePictures: Map<string, string> = new Map<string, string>();
  hasRequestedProfilePictures: Map<string, boolean> = new Map<string, boolean>();

  constructor(private imageService: ImageService) {
  }

  ngOnDestroy(): void {
    this.profilePictures = new Map<string, string>();
    this.hasRequestedProfilePictures = new Map<string, boolean>();
  }

  ngDoCheck() {
    this.getProfileImages(this.chats);
  }

  public getProfileImages(chats: Chat[]): void {
    for (const c of chats) {
      const requestedPicture: boolean = Object.prototype.hasOwnProperty.call(this.hasRequestedProfilePictures, c.clientEmail);
      const hasPicture: boolean = Object.prototype.hasOwnProperty.call(this.profilePictures, c.clientEmail);
      if (!requestedPicture && !hasPicture) {
        this.hasRequestedProfilePictures.set(c.clientEmail, true);
        this.imageService.getProfileImage(c.clientEmail)
          .subscribe((encodedImage: EncodedImage) => {
            if (encodedImage === null)
              this.profilePictures.set(c.clientEmail, "assets/default-profile-picture.jpg");
            else
              this.profilePictures.set(c.clientEmail, `data:image/jpeg;base64,${encodedImage.data}`);
          });
      }
    }
  }

  selectChat(email: string) {
    for (const c of this.chats) {
      if (c.clientEmail === email) {
        this.chatEventEmitter.emit(c);
      }
    }
  }
}

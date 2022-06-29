import { map, tap, take, catchError } from 'rxjs/operators';

import { ButtonService } from 'services/Buttons';
import { localStorageService } from 'services/LocalStorage';


 export function GetButtonsEvent (setButtons) {
   const networkId = localStorageService.read("network_id");
   // Anything in here is fired on component mount.
   let btns = ButtonService.find(networkId).pipe(
    take(1),
    tap((bodyResponse) => {
      setButtons({ btns: [bodyResponse.response] });
    })
  ).subscribe();

 }

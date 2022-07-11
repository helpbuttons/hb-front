import Router from "next/router";
import { map, tap, take, catchError } from 'rxjs/operators';
import { alertService } from 'services/Alert';

import { ButtonService } from 'services/Buttons';
import { localStorageService } from 'services/LocalStorage';


export function getButton(buttonId, setButton) {
    
    ButtonService.findById(buttonId).pipe(
        take(1),
        tap((bodyResponse) => {
            if (bodyResponse.response) {
                setButton({ button: bodyResponse.response });
            } else {
                alertService.error('button not found?!');
                Router.push("/Explore");
            }
        })
    ).subscribe();
}

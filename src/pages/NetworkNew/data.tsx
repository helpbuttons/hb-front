
import { NetworkService } from "services/Networks";
import { alertService } from "services/Alert";
import { errorService } from "services/Error";
import { store } from "pages";
import { selectedNetworkEvent } from "store/CommonData"
import { localStorageService } from "services/LocalStorage";
import { catchError, tap, take } from "rxjs/operators";
import Router from "next/router";

export function createNewNetwork(network, token: string, setValidationErrors) {

  NetworkService.new(network, token)
  .pipe(
    take(1),
    tap((bodyResponse) => {
      const network = bodyResponse.response;
      localStorageService.save("network_id", network.id);
      store.emit(new selectedNetworkEvent(network));
          
      alertService.info(
        "You have created a network" + network.id.toString()
      );
      Router.push("/");
    }),
    catchError((error) => {
      if (error.response && error.response.validationErrors) {
        setValidationErrors(error.response.validationErrors);
      }
      return errorService.handle(error);
    })
  ).subscribe();
  
}
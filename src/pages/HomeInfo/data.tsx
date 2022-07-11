import { NetworkService } from "services/Networks";

import { debounceTime } from "rxjs";
import { switchMap } from "rxjs/operators";
import { localStorageService } from "services/LocalStorage";
import { selectedNetworkEvent } from "store/CommonData";
import { store } from "pages";
import { alertService } from "services/Alert";
import { take, tap } from "rxjs";

export function setSelectedNetworkId(networkId: string) {
  NetworkService.findById(networkId).pipe(
    take(1),
    tap((bodyResponse) => {
      const network = bodyResponse.response;
      alertService.info("You have selected network '" + network.name.toString() + "'");
      localStorageService.save("network_id", networkId);
      store.emit(new selectedNetworkEvent(network));
    })
    ).subscribe();
}

export function setValueAndDebounce(sub, ms) {
  return sub.asObservable().pipe(
    debounceTime(ms),
    switchMap((name) => NetworkService.find(name)) //n is id;
  );
}

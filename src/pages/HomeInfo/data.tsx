import { NetworkService } from "services/Networks";

import { debounceTime } from "rxjs";
import { switchMap } from "rxjs/operators";
import { localStorageService, LocalStorageVars } from "services/LocalStorage";
import { selectedNetworkEvent } from "store/CommonData";
import { store } from "pages";
import { alertService } from "services/Alert";

export function setSelectedNetworkId(networkId: string) {
  
  return NetworkService.findById(networkId).subscribe(network => {
    if (network) {
      alertService.info("You have selected network '" + network.name.toString() + "'");
      localStorageService.save(LocalStorageVars.NETWORK_SELECTED, networkId);
      store.emit(new selectedNetworkEvent(network));
    }
  });
}

export function setValueAndDebounce(sub, ms) {
  return sub.asObservable().pipe(
    debounceTime(ms),
    switchMap((name) => NetworkService.find(name)) //n is id;
  );
}

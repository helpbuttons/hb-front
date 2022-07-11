import { store } from "pages";
import { localStorageService } from "services/LocalStorage";
import { selectedNetworkEvent } from "../store/CommonData";
import { NetworkService } from "services/Networks";
import { take, tap } from "rxjs";

export function loadStoreValues() {
    loadSelectedNetworkId();
}
function loadSelectedNetworkId() {
    const networkId = localStorageService.read("network_id");
    NetworkService.findById(networkId).pipe(
      take(1),
      tap((bodyResponse) => {
        const network = bodyResponse.response;
        store.emit(new selectedNetworkEvent(network));
      })
    )
    .subscribe();
}
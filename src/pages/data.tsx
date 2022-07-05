import { store } from "pages";
import { localStorageService } from "services/LocalStorage";
import { selectedNetworkEvent, userLoggedIn } from "../store/CommonData";
import { NetworkService } from "services/Networks";
import { map, tap, take } from 'rxjs/operators';
import { UserService } from "services/Users";

export function loadStoreValues() {
    loadSelectedNetworkId();
    loadAuthUser();
}

function loadAuthUser()
{
  const accessToken = localStorageService.read("access_token");
  if (accessToken) {
    UserService.whoAmI(accessToken).pipe(
      take(1),
      tap(bodyResponse => {
        store.emit(new userLoggedIn(bodyResponse.response))
      })).subscribe();
  }
}

function loadSelectedNetworkId() {
    const networkId = localStorageService.read("network_id");
    if (networkId) {
      return NetworkService.findById(networkId).subscribe(network => {
        if (network.response) {
          store.emit(new selectedNetworkEvent(network.response));
        }
      });
    }
}
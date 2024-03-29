import { map } from 'rxjs/operators';
import { produce } from 'immer';

import { WatchEvent, UpdateEvent, EffectEvent } from 'store/Event';
import { GlobalState } from 'store/Store';

import { INetwork } from 'services/Networks/network.type';
import { NetworkService } from 'services/Networks';

export interface NetworksState {
  // networks: INetwork[];
  selectedNetwork: INetwork;
  selectedNetworkLoading: boolean,
}

export const networksInitial = {
  // networks: [],
  selectedNetwork: undefined,
  selectedNetworkLoading: false,
}

export class FetchDefaultNetwork implements UpdateEvent, WatchEvent {
  public update(state: GlobalState) {
    return produce(state, newState => {
      newState.networks.selectedNetworkLoading = true;
    });
  }

  public watch(state: GlobalState) {
    return NetworkService.findById().pipe(  // With no Id, find the default network
      map((network) => new SelectedNetworkFetched(network)),
    );
  }
}

export class SelectedNetworkFetched implements UpdateEvent {
  public constructor(private network: INetwork) {}

  public update(state: GlobalState) {
    return produce(state, newState => {
      newState.networks.selectedNetwork = this.network;
      newState.networks.selectedNetworkLoading = false;
    });
  }
}

// Uncomment when we enable multi networks
//
// export function createNewNetwork(network, token: string, setValidationErrors) {
//   store.emit(new CreateNetworkEvent(network, token,
//     (networkData :INetwork) => {
//       localStorageService.save("network_id", networkData.id);
//             
//       alertService.info(
//         "You have created a network" + networkData.id.toString()
//       );
//       
//       Router.push("/");
//     },
//     (error) => {
//     if (error.response && error.response.validationErrors) {
//       setValidationErrors(error.response.validationErrors);
//     }
//     return errorService.handle(error);
//     }
//   ));
// }
//
// export class CreateNetworkEvent implements WatchEvent {
//     public constructor(
//       private network: INetwork,
//       private token: string,
//       private successFunction,
//       private failFunction
//     ) {}
//     public watch(state: GlobalState) {
//       return NetworkService.new(this.network, this.token).pipe(
//         tap((networkData) => {
//           this.successFunction(networkData.response);
//         }),
//         catchError((error) => {
//           return this.failFunction(error);
//         })
//       );
//     }
//   }
//  

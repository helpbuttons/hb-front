import { map, tap, take, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { produce } from "immer";

import { WatchEvent } from "store/Event";
import { GlobalState } from "store/Store";

import { UserService } from "services/Users";
import { IUser } from "services/Users/types";

//Called event for new user signup
export class SignupEvent implements WatchEvent {
  public constructor(
    private email: string,
    private password: string,
    private onSuccess,
    private onError
  ) {}
  public watch(state: GlobalState) {
    return UserService.signup(this.email, this.password).pipe(
      map((userData) => {
        if(userData) {
          return of(true);
        }
      }),
      catchError((err) => {
        if (this.onError) {
          this.onError(err);
        }
        return of(undefined);
      })
    );
  }
}

//Called event for session update values
export class UserSignupEvent implements UpdateEvent {
  public constructor(private userData: IUser) {}
  public update(state: GlobalState) {
    return produce(state, (newState) => {
      newState.user = this.userData;
    });
  }
}

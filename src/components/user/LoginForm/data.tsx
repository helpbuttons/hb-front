import { map, tap, take, catchError } from 'rxjs/operators';
import { produce } from 'immer';
import Router, { withRouter } from 'next/router';

import { UpdateEvent, WatchEvent } from 'store/Event';

import { UserService } from 'services/Users';
import { IUser } from 'services/Users/types';
import { HttpService } from "services/HttpService";
import { errorService } from 'services/Error';
import { GlobalState } from 'pages';
import { IUser } from 'services/Users/user.type';


//Called event for login
export class LoginFormEvent implements WatchEvent {

  public constructor(private email: string, private password: string, private setValidationErrors) {}

  public watch(state: GlobalState) {
    return UserService.login(this.email, this.password).pipe(
      map(userData => userData),
      take(1),
      tap(userData => {
        if(userData.response.token)

        new HttpService().setAccessToken("user",userData.response.token);
        Router.push({ pathname: '/'});
      }),
      catchError((error) => {
        if (error.response && error.response.validationErrors)
        {
          this.setValidationErrors(error.response.validationErrors)
        }
        return errorService.handle(error);
      }),
    )
  }
}


//Called event for session update values
export class UserLoginEvent implements UpdateEvent {
  public constructor(private userData: IUser) {}
  public update(state: GlobalState) {
    return produce(state, newState => {
      // TODO: user is not stored?
      // newState.user = this.userData;
    });
  }
}

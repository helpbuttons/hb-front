import { map, tap, take, catchError } from 'rxjs/operators';
import { produce } from 'immer';
import Router, { withRouter } from 'next/router';

import { WatchEvent } from 'store/Event';
import { GlobalState } from 'store/Store';

import { UserService } from 'services/Users';
import { IUser } from 'services/Users/types';
import { HttpUtilsService } from "services/HttpUtilsService";
import { errorService } from 'services/Error';


//Called event for login
export class LoginFormEvent implements WatchEvent {

  public constructor(private email: string,private password: string, private setValidationErrors) {}
  public watch(state: GlobalState) {
    return UserService.login(this.email, this.password).pipe(
      map(userData => userData),
      take(1),
      tap(userData => {
        if(userData.response.token)
        new HttpUtilsService().setAccessToken("user",userData.response.token);
        Router.push({ pathname: '/', state: {} });
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
      newState.user = this.userData;
    });
  }
}
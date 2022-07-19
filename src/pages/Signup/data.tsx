import { map, tap, take, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { produce } from 'immer';
import Router, { withRouter } from 'next/router';

import { UpdateEvent, WatchEvent } from 'store/Event';

import { UserService } from 'services/Users';
import { alertService } from 'services/Alert';
import { errorService } from 'services/Error';
import { GlobalState } from 'pages';
import { IUser } from 'services/Users/user.type';

//Called event for new user signup
export class SignupEvent implements WatchEvent {
  public constructor(private email: string,private password: string, private setValidationErrors) {}
  public watch(state: GlobalState) {
    return UserService.signup(this.email, this.password).pipe(
      map((userData) => userData),
      take(1),
      tap(userData => {
        alertService.info('You signed up! Now visit this link to activate');
        Router.push({ pathname: '/'});
      }),
      catchError((error) => {
        if (error.response && error.response.validationErrors)
        {
          this.setValidationErrors(error.response.validationErrors)
        }
        return errorService.handle(error);
      })
    )
  }
}

//Called event for session update values
export class UserSignupEvent implements UpdateEvent {
  public constructor(private userData: IUser) {}
  public update(state: GlobalState) {
    return produce(state, newState => {
      // TODO: we need to store the user
      // newState.user = this.userData;
    });
  }
}

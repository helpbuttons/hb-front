import {tap, take, catchError } from "rxjs/operators";

import Router from "next/router";

import { ButtonService } from "services/Buttons";
import IButton from "services/Buttons/types";
import { alertService } from "services/Alert";
import { errorService } from "services/Error";

export function createNewButton(button: IButton,
  token: string,
  networkId: string,
  setValidationErrors) {
  ButtonService.new(button, token, networkId).pipe(
    take(1),
    tap((buttonData) => {
      alertService.info(
        "Has creado un botón" + buttonData.response.id.toString()
      );

      Router.push({ pathname: "/Explore" });
    }),
    catchError((error) => {
      if (error.response && error.response.validationErrors) {
        setValidationErrors(error.response.validationErrors);
      }
      return errorService.handle(error);
    })
  ).subscribe();
}
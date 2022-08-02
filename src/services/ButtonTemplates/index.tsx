import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import getConfig from 'next/config';
import { httpService } from 'services/HttpService';
import { ITemplateButton } from './buttonTemplate.type';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

//TemplateButton services for all app
export class TemplateButtonService {

  //create templateButton
  public static new(data: ITemplateButton): Observable<any> {

      //save the ajax object that can be .pipe by the observable
      const templateButtonWithHeaders$ = ajax({

          url: baseUrl+"/templateButtons/new",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
          },
          body: {

            "name": data.name,
            "type": data.type,
            "fields": data.fields,
            "owner": data.owner,

          },
      });

    return templateButtonWithHeaders$;

  }

  //add templateButton to networks
  public static addToNetworks(id: any, networks : []): Observable<any> {

      //save the ajax object that can be .pipe by the observable
      const templateButtonWithHeaders$ = ajax({

          url: baseUrl+"/templateButtons/addToNetworks",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
          },
          body: {

            "templateButtonId" : data.id,
            "networks" : networks,

          },
      });

    return templateButtonWithHeaders$;

  }

  //EDIT templateButton
  public static edit(id:any, data: ITemplateButton): Observable<any> {

      //save the ajax object that can be .pipe by the observable
      const templateButtonWithHeaders$ = ajax({

          url: baseUrl+"/templateButtons/edit/"+id,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
          },
          body: {

            "id": id,
            "name": data.name,
            "type": data.type,
            "fields": data.fields,
            "owner": data.owner,

          },
      });

    return templateButtonWithHeaders$;

  }

  //FIND templateButton
  public static find(networkId: string): Observable<any> {
    return httpService.get<ITemplateButton[]>("/templateButtons/find/" + networkId);
  }

  //FIND templateButton BY ID
  public static findById(id:any): Observable<any> {

      //save the ajax object that can be .pipe by the observable
      const templateButtonWithHeaders$ = ajax({

          url: baseUrl+"/templateButtons/findById/"+id,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
          },
          body: {

            "id": id,

          },
      });

    return templateButtonWithHeaders$;

  }

  //delete templateButton
  public static _delete(id:any): Observable<any> {

      //save the ajax object that can be .pipe by the observable
      const templateButtonWithHeaders$ = ajax({

          url: baseUrl+"/templateButtons/delete/"+id,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
          },
          body: {

            "id": id,

          },
      });

    return templateButtonWithHeaders$;

  }




}

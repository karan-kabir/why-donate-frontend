import * as _moments from "moment";


export class GenericResponse<T> {
  public success!: boolean;
  public error!: string;
  public data!: T;
}

export class PaginatedResponse<T> {
  public page!: number;
  public per_page!: number;
  public total!: number;
  public items!: T[];
}

export class AppSettings {
  public name!: string;
  public type!: string;
  public value!: string;
  public updated_on!: moment.Moment;
}

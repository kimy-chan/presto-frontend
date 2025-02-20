import { HttpStatus } from "../enums/httpStatus";

export interface ResponseData<T> {
  status: HttpStatus;
  data: T[];
}

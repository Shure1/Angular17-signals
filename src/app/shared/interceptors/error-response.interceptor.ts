import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, pipe, throwError } from "rxjs";

export const ErrorResponseInterceptor:HttpInterceptorFn = (req:HttpRequest<any>,next:HttpHandlerFn) => next(req).pipe(catchError(handeErrorResponse));

function handeErrorResponse(error:HttpErrorResponse): ReturnType<typeof throwError>{
  const errorResponse = `Error code :${error.status}, message: ${error.message}`
  return throwError(() => errorResponse);
}
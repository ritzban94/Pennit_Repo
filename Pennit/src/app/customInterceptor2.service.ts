import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { PostData } from './data_class';
import { tap } from 'rxjs/operators';

export class CustomInterceptorTwo implements HttpInterceptor{
    intercept(req: HttpRequest<PostData>, next: HttpHandler) {
        const modified_req = req.clone({headers: req.headers.append('Custom_header','CH3')});
        console.log("Interceptor_Two: "+ modified_req.headers.getAll('Custom_header'))
        return next.handle(modified_req).pipe(
            tap(event => {
                console.log("Intereptor_Two: inside_pipe_tap");
                console.log(event.type);
            })
        );
    }
}
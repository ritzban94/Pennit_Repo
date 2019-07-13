import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { PostData } from './data_class';

export class CustomInterceptorOne implements HttpInterceptor{
    intercept(req: HttpRequest<PostData>, next: HttpHandler) {
        const modified_req = req.clone({headers: req.headers.append('Custom_header','CH2')});
        console.log("Interceptor_One: "+ modified_req.headers.getAll('Custom_header'))
        return next.handle(modified_req);
    }
}
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { PostData } from './data_class';
import { AuthService } from './login/auth.service';

export class CustomInterceptorOne implements HttpInterceptor{
    constructor(public authIns: AuthService){}
    intercept(req: HttpRequest<PostData>, next: HttpHandler) {
        const modified_req = req.clone({
            headers: req.headers.append('Custom_header','CH2'),
            params: req.params.append('auth', this.authIns.access_token)
        });
        console.log("Interceptor_One: "+ modified_req.headers.getAll('Custom_header'))
        return next.handle(modified_req);
    }
}
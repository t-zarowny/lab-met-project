import { AuthenticationService } from '../login/_services';

export function appInitializer(authenticationService: AuthenticationService) {
    // return () => new Promise(resolve => {
    //     // attempt to refresh token on app start up to auto authenticate
    // //     authenticationService.refreshToken()
    // //         .subscribe()
    // //         .add(resolve);
    // });
    console.log(Date.now());
    return true;
}

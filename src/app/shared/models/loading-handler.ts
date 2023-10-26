import { BehaviorSubject, Observable, delay, of, switchMap } from "rxjs";

export class LoadingHandler {
    private _isLoading$ = new BehaviorSubject(false);
    
    isLoading$: Observable<boolean> = this._isLoading$.pipe(
        switchMap(isLoading => {
            if (!isLoading) {
                return of(false)
            }
            return of(true).pipe(delay(1000))
        })
    )

    start() {
        this._isLoading$.next(true)
    }

    finish() {
        this._isLoading$.next(false)
    }

}
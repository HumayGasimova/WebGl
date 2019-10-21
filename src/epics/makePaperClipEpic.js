import { of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';
import { ofType } from 'redux-observable';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/delay';
import * as actionTypes from '../constants/actionTypes';
import * as Actions from '../actions';

export const makePaperClipEpic = (action$, state$) => 
    action$.pipe(
        ofType(actionTypes.MAKE_PAPERCLIP),
        mergeMap(action => {
            if(state$.value.business.paperClips === state$.value.business.clipsToBuyTrust){
                if(state$.value.business.wire >= 1){
                    return of(
                        Actions.setAutoClipperInitPrice(),
                        Actions.toggleMarketingButton(),
                        Actions.toggleWireButton(),
                        Actions.toggleAutoClippersButton(),
                        Actions.toggleMegaClippersButton(),
                        Actions.trustPlusOne(),
                        Actions.sendCommentToTerminal('Production target met: TRUST INCREASED, additional processor/memory capacity granted')
                    ).pipe(
                        delay(state$.value.business.delay)
                    )
                }else{
                    return of(
                        Actions.toggleMakePaperclipButton(true)
                    ) 
                }
            }else{
                if(state$.value.business.wire >= 1){
                    return of(
                        Actions.setAutoClipperInitPrice(),
                        Actions.toggleMarketingButton(),
                        Actions.toggleWireButton(),
                        Actions.toggleAutoClippersButton(),
                        Actions.toggleMegaClippersButton(),
                        Actions.trustPlusOne()
                    ).pipe(
                        delay(state$.value.business.delay)
                    )
                }else{
                    return of(
                        Actions.toggleMakePaperclipButton(true)
                    ) 
                }
            }
        })
    )
    
export default makePaperClipEpic;

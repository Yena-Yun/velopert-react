import { startLoading, finishLoading } from '../modules/loading';

export default function createRequestThunk(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return params => async dispatch => {
        //요청이 시작되었음을 알림
        dispatch({ type });
        //로딩 시작
        dispatch(startLoading(type));

        //성공 시
        try {
            const response = await request(params);
            dispatch({
                type: SUCCESS,
                payload: response.data,
            });
            //성공 시에는 로딩 완료 처리
            dispatch(finishLoading(type));
          
            //실패 시
        } catch (e) {
            dispatch({
                type: FAILURE,
                payload: e,
                error: true,
            });
            //실패 시에는 로딩 다시 시작
            dispatch(startLoading(type));
            throw e;
        }
    };
}
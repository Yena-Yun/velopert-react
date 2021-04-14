import { startLoading, finishLoading } from '../modules/loading';

export default function createRequestThunk(type, request) {
    //성공 및 실패 액션타입 정의
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return params => async dispatch => {
        dispatch({ type }); //시작됨
        //시작 시 로딩 호출
        dispatch(startLoading(type));

        try {
            const response = await request(params);
            dispatch({
                type: SUCCESS,
                payload: response.data
            }); //성공
            //성공하면 로딩 끝냄
            dispatch(finishLoading(type));

        } catch (e) {
            dispatch({
                type: FAILURE,
                payload: e,
                error: true
            }); //에러 발생
            //에러 발생하면 로딩 다시 시작
            dispatch(startLoading(type));
            throw e;
        }
    };
}

// 사용법: createRequestThunk('GET_USERS', api.getUsers);
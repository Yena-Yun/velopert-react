import React from 'react';
import { connect } from 'react-redux';
import Sample from '../components/Sample';
import { getPost, getUsers } from '../modules/sample';

const { useEffect } = React;

const SampleContainer = ({ getPost, getUsers, post, users, loadingPost, loadingUsers }) => {

    useEffect(() => {
        //useEffect에 파라미터로 넣는 함수는 async로 할 수 없기 때문에
        //그 내부에서 async 함수(fn)를 선언하고
        const fn = async () => {
            try {
            getPost(1);
            getUsers(1);
            } catch (e) {
            console.log(e); //에러 조회
            }
        };
        //함수가 끝나는 즉시 호출
        fn();
    }, [getPost, getUsers]);

    return (
        <Sample
            post={post} users={users} loadingPost={loadingPost} loadingUsers={loadingUsers}
        />
    );
};

export default connect(
    //connect 함수 인자에 사용할 reducer들을 넣음
    ({ sample, loading }) => ({
    //post와 users는 sample에서 꺼내오고
    post: sample.post,
    users: sample.users,
    
    //loading 부분은 loading 리듀서에서 꺼내온다.
    //   loadingPost: sample.loading.GET_POST,
    //   loadingUserS: sample.loading.GET_USERS
    loadingPost: loading['sample/GET_POST'],
    loadingUsers: loading['sample/GET_USERS']
}),
{
    getPost,
    getUsers,
}
)(SampleContainer);
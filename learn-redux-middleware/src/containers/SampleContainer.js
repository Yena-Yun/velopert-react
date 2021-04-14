import React from 'react';
import { connect } from 'react-redux';
import Sample from '../components/Sample';
import { getPost, getUsers } from '../modules/sample';

const { useEffect } = React;

const SampleContainer = ({
    getPost,
    getUsers,
    post,
    users,
    loadingPost,
    loadingUsers
}) => {
    //클래스 형태 컴포넌트였다면 componentDidMount
    useEffect(() => {
        //useEffect에 파라미터로 넣는 함수는 async로 할 수 없기 때문에
        //그 내부에서 async 함수를 선언하고 호출해준다.
        //fn 함수 선언
        const fn = async () => {
            try {
                await getPost(1);
                await getUsers(1);
            } catch (e) {
                console.log(e); //에러 조회
            }
        };
        //fn 함수 호출
        fn();

    }, [getPost, getUsers]);

    return (
        <Sample post={post} users={users}
            loadingPost={loadingPost} loadingUsers={loadingUsers} />
    );
};

export default connect(
    ({ sample, loading }) => ({
        post: sample.post,
        users: sample.users,
        loadingPosts: loading['sample/GET_POST'],
        loadingUsers: loading['sample/GET_USER']
    }),
    {
        getPost,
        getUsers
    }
)(SampleContainer);
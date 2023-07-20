import { useEffect, useState } from 'react';

// material-ui
import { IconButton, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';

import { useSelector, useDispatch } from 'react-redux';
import StyledTable from 'ui-component/table/StyledTable';
import { getPost, getPosts } from 'store/actions/postsActions';
import { clearError } from 'store/types/postsTypes';
import { Edit, AddOutlined, ThumbUpAltRounded, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import moment from 'moment';
import SnackNotify from 'ui-component/notification/snackNotify';
// import DeleteMember from './memberForm/deleteMember';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const tableColumns = [
    {
        key: 'likes',
        label: 'Likes',
        width: 100,
        align: 'left'
    },
    {
        key: 'author',
        label: 'Author',
        width: 200,
        align: 'left'
    },
    {
        key: 'postTitle',
        label: 'Title',
        width: 400,
        align: 'left'
    },
    {
        key: 'postSubTitle',
        label: 'Subtitle',
        width: 600,
        align: 'left'
    },
    {
        key: 'updatedAt',
        label: 'Last update',
        width: 200,
        align: 'left'
    },
    // {
    //     key: 'index',
    //     label: 'Showed as',
    //     width: 100,
    //     align: 'center'
    // },
    {
        key: 'actions',
        label: 'Actions',
        width: 200,
        align: 'right'
    }
]

const Posts = () => {
    const [loading, setLoading] = useState(false);
    const [news, setPosts] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const newsRed = useSelector((state) => state.newsState);
    const messagePosts = useSelector((state) => state?.newsState?.error)

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    useEffect(() => {
        if (newsRed?.news) {
            const newsSet = newsRed?.news.map((post) => {
                return {
                    ...post,
                    name: `${post.firstName} ${post.lastName}`,
                    actions: <>
                        <IconButton onClick={() => dispatch(getPost(post._id, () => navigate('edit')))}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={() => dispatch(getPost(post._id, () => navigate('edit')))}>
                            <Delete color='primary' />
                        </IconButton>
                        {/* <DeleteMember memberId={post._id} loading={newsRed?.loading} memberName={`${post.firstName} ${post.lastName}`} /> */}
                    </>,
                    author: 'James Blunt',
                    updatedAt: moment('2021-01-01T12:00:00-04:00').format('ll'),
                    likes: <Typography variant='h4' display={'flex'} justifyContent={'space-between'} width={60} alignItems={'top'}>
                        100 <ThumbUpAltRounded color='primary' sx={{ fontSize: 20 }} />
                    </Typography>
                }
            })
            setPosts(newsSet || []);
        }
        setLoading(newsRed?.loading || false);
    }, [newsRed, navigate, dispatch]);

    return (
        <>
            <SnackNotify open={messagePosts?.message?.length > 0} onClose={() => dispatch(clearError())}
                autoHide={1000} isError={messagePosts?.status} message={messagePosts?.message} />
            <MainCard title="Posts" secondary={<CardSecondaryAction icon={<AddOutlined />} title={'Add news'} link={'add'} />}>
                <StyledTable name={'news'} pagination data={{ rows: news, columns: tableColumns }} loading={loading} noContentMessage={'nu'} />
            </MainCard>
        </>
    );
};

export default Posts;

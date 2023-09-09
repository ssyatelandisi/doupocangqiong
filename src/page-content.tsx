import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Divider, Typography, Button, Space, Skeleton, FloatButton } from 'antd';
import styles from './page-content.module.scss'

const { Title, Paragraph } = Typography;

const yunyun: React.CSSProperties = {
    minHeight: window.screen.availHeight,
    backgroundImage: 'url("./background.jpg")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    overflow: 'hidden',
}

const noYunyun: React.CSSProperties = {
    backgroundImage: 'none'
}

function PageContent() {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [index_page] = useState(location.state ? location.state.index_page : 1);//目录页
    const [title, setTitle] = useState('');                                       //标题
    const [previous, setPrevious] = useState(null);                               //上一页
    const [next, setNext] = useState(null);                                       //下一页
    const [content, setContent] = useState('');                                   //文档内容
    const [contentPage, setContentPage] = useState(noYunyun);                           //背景样式
    const [index, setIndex] = useState(params.index ? params.index : '1');        //文档索引序号

    useEffect(() => {
        // axios.get(`http://127.0.0.1:8000/doupocangqiong/content/${index}`,
        axios.get(`https://server_api-1-h2090100.deta.app/doupocangqiong/content/${index}`,
            {
                responseType: 'json',
                headers: {
                    "X-API-Key": "c0K3jSb9ZLED_pkzFXAm5i8QudrptwZT8xPNCpFtSnS3s"
                }
            })
            .then(function (response) {
                if (response.data.content) {
                    setContent(response.data.content);
                    setTitle(response.data.title);
                    setPrevious(response.data.previous);
                    setNext(response.data.next);
                    document.title = response.data.title;
                    if (RegExp(/云韵|云芝/).test(response.data.content)) {
                        setContentPage(yunyun);
                    } else {
                        setContentPage(noYunyun);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [location.pathname, index])

    if (content === '') {
        return <div className={styles.content}><Skeleton active /></div>
    } else {
        return (
            <>
                <div style={contentPage}>
                    <div className={styles.content}>
                        <Title style={{ textAlign: 'center' }}>{title}</Title>
                        <div className={styles.click_button}>
                            <Space>
                                <PagePrevious previous={previous} setContent={setContent} setTitle={setTitle} setIndex={setIndex} />
                                <Button onClick={() => { navigate(`/${index_page}`) }}>目录</Button>
                                <PageNext next={next} setContent={setContent} setTitle={setTitle} setIndex={setIndex} />
                            </Space>
                        </div>
                        <Divider></Divider>
                        <Paragraph>{content.split('\n').map((p, i) => <p key={i}>{p}</p>)}</Paragraph>
                        <Divider orientation="right" plain>{title}</Divider>
                        <div className={styles.click_button}>
                            <Space>
                                <PagePrevious previous={previous} setContent={setContent} setTitle={setTitle} setIndex={setIndex} />
                                <Button onClick={() => { navigate(`/${index_page}`) }}>目录</Button>
                                <PageNext next={next} setContent={setContent} setTitle={setTitle} setIndex={setIndex} />
                            </Space>
                        </div>
                    </div>
                </div>
                <FloatButton.BackTop visibilityHeight={window.screen.availHeight / 2} />
            </>
        )
    }
}

function PagePrevious(props: any) {
    const navigate = useNavigate();//导航跳转
    const handleClick = () => {
        props.setTitle('');
        props.setContent('');
        props.setIndex(props.previous);
        navigate(`/content/${props.previous}`);
    }
    if (props.previous) {
        return (<Button onClick={handleClick}>上一章</Button>)
    }
    else {
        return <Button disabled>上一章</Button>
    }
}

function PageNext(props: any) {
    const navigate = useNavigate();
    const handleClick = () => {
        props.setTitle('');
        props.setContent('');
        props.setIndex(props.next);
        navigate(`/content/${props.next}`);
    }
    if (props.next) {
        return <Button onClick={handleClick}>下一章</Button>
    }
    else {
        return <Button disabled>下一章</Button>
    }
}

export default PageContent;
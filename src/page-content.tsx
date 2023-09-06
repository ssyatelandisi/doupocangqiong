import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Divider, Typography, Button, Space, Skeleton } from 'antd';

const { Title, Paragraph } = Typography;
function PageContent() {
    const params = useParams();
    const location = useLocation();
    const [title, setTitle] = useState('');
    const [previous, setPrevious] = useState(null);
    const [next, setNext] = useState(null);
    const [content, setContent] = useState('');
    useEffect(() => {
        axios.get(`https://server_api-1-h2090100.deta.app/doupocangqiong/content/${params.index}`)
            .then(function (response) {
                if (response.data.content) {
                    let output = ``;
                    for (let i of response.data.content.split("\n")) {
                        output += `<p> ${i}</p > `
                    }
                    setContent(output);
                    setTitle(response.data.title);
                    setPrevious(response.data.previous);
                    setNext(response.data.next);
                    document.title = response.data.title;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [location.pathname])
    if (content != '') {
        return <div className='content'>
            <Title level={3}>{title}</Title>
            <Divider></Divider>
            <Paragraph><div dangerouslySetInnerHTML={{ __html: content }} ></div></Paragraph>
            <Divider orientation="right" plain>
                {title ? title : ''}
            </Divider>
            <div className="click_button">
                <Space>
                    <PagePrevious previous={previous} set_content={setContent} />
                    <PageNext next={next} set_content={setContent} />
                </Space>
            </div>
        </div>
    } else {
        return <div className='content'><Skeleton /></div>
    }

}
function PagePrevious(props: any, ref: any) {
    const navigate = useNavigate();//导航跳转
    const handleClick = () => {
        props.set_content('');
        navigate(`/content/${props.previous}`);
    }
    if (props.previous) {
        return <Button onClick={handleClick}>上一章</Button>
    }
    else {
        return <Button disabled>上一章</Button>
    }
}
function PageNext(props: any, ref: any) {
    const navigate = useNavigate();
    const handleClick = () => {
        props.set_content('');
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
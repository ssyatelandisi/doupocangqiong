import React, { useEffect, useState } from 'react';
import { Pagination, Card, FloatButton, Spin } from 'antd'
import { useNavigate, useParams } from 'react-router-dom';
import styles from './App.module.scss';
import axios from 'axios';

const gridStyle: React.CSSProperties = {
  width: '50%',
  textAlign: 'left',
};

const spin: React.CSSProperties = {
  padding: '50px',
  borderRadius: '4px'
};

interface Item {
  index: number,
  title: string
}

function App() {
  const [content, setContent] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const params = useParams();
  const index_page = params.index ? Number(params.index) : 1;
  const navigate = useNavigate();

  const handleClick = (index: string | number) => {
    navigate(`/content/${index}`, { state: { index_page } })
  }
  const change = (page: number) => {
    setContent([]);
    navigate(`/${page}`);
  }

  useEffect(() => {
    // axios.get(`http://127.0.0.1:8000/doupocangqiong/index/${index_page}`,
    axios.get(`https://server_api-1-h2090100.deta.app/doupocangqiong/index/${index_page}`,
      {
        responseType: 'json'
      })
      .then(response => {
        if (response.data) {
          setContent(response.data.content);
          setTotal(response.data.total);
        }
      })
  }, [index_page])

  if (content.length === 0) {
    return (
      <Spin tip="加载中…" size="large" style={{ marginTop: '10rem' }}>
        <div style={spin} ></div>
      </Spin>
    )
  } else {
    return (
      <>
        <div className={styles.content}>
          <Card title="斗破苍穹" className='novel_list'>
            {content.map((item, i) => <Card.Grid key={i} style={gridStyle} onClick={() => { handleClick(item.index) }}>{item.title}</Card.Grid>)}
          </Card>
          <Pagination style={{ textAlign: 'center', marginTop: '1rem' }} simple defaultCurrent={1} current={index_page} total={total} defaultPageSize={50} onChange={change} responsive showSizeChanger={false} />
        </div>
        <FloatButton.BackTop visibilityHeight={window.screen.availHeight / 2} />
      </>
    );
  }
}

export default App;

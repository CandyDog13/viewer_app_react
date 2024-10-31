import { useEffect, useRef, useState } from "react";
import "./App.css";
import { List } from "antd";
import {getInformation} from "./utils/api";
import InfiniteScroll from 'react-infinite-scroll-component';
import { observer } from "mobx-react";
import { useStore } from "./store";

type IData = {
  total_count: number,
  incomplete_result: boolean,
  items:IItems[]
}

export type IItems = {
  name: string,
  id: number
}

const App = observer(() => {
  const didCompMount = useRef(false);
  const { dataStore } = useStore();
  // const [data, setData] = useState<IData>(initialData);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (isLoading) return;
    setLoading(true);
    setError(null);
    try {
          const response:IData = await getInformation(page);
          dataStore.addData(response.items);
          setPage(page+1);
    } catch (err) {
          setError(
            err instanceof Error ? err.message : 'Unknown Error: api.get.data'
          );
          console.log(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (didCompMount.current === false) {
      fetchData();
      didCompMount.current = true;
    }
    return () => dataStore.clearData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteClick = (id:number) => {
    dataStore.removeElement(id);
    console.log('click');
  }

  return (
      <div
        id='scrollableDiv'
        style={{
          display: "block",
          width: 700,
          height: 400,
          overflow: 'auto',
          padding: 30,
          backgroundColor: "white",
        }}
      >
        <h4>ReactJS Ant-Design List Component</h4>
        <InfiniteScroll dataLength={dataStore.data.length} next={fetchData} hasMore={true} loader={undefined} scrollableTarget='scrollableDiv'>
        <List
          header={<div>Sample HEADER</div>}
          bordered
          dataSource={dataStore.data || []}
          renderItem={(item) => <List.Item key={item.id}>
            <div>
            <h3>{item.name}</h3>
            <button onClick={()=>handleDeleteClick(item.id)}>
              delete
            </button>
            <button>edit</button>
            </div>
            </List.Item>}
        />
        </InfiniteScroll>
      </div>
  );
});

export default App;

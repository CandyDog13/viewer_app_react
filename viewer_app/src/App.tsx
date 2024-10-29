import { useEffect, useState } from "react";
import "./App.css";
import { List } from "antd";
import {getInformation} from "./utils/api";
import ListItem from "./components/ListItem/ListItem";

type IData = {
  total_count: number,
  incomplete_result: boolean,
  items:object[]
}

type ID = {
  name: string
}

function App() {
  const [data, setData] = useState<IData|undefined>(undefined);
  // const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
            const response = await getInformation(page);
            setData(response);
      } catch (err) {
            setError(
              err instanceof Error ? err.message : 'Unknown Error: api.get.data'
            );
            console.log(err)
            setData(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <>
      <div
        style={{
          display: "block",
          width: 700,
          padding: 30,
          backgroundColor: "white",
        }}
      >
        <h4>ReactJS Ant-Design List Component</h4>
        <List
          header={<div>Sample HEADER</div>}
          // footer={<div>Sample FOOTER</div>}
          bordered
          // dataSource={['a', 'b' , 'c']}
          dataSource={data?.items || []}
          renderItem={(item) => <List.Item>{item.name}</List.Item>}
          // renderItem={(item) => <ListItem name= {item.name}/>}
        />
      </div>
    </>
  );
}

export default App;

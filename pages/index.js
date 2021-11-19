import { SearchOutlined } from "@ant-design/icons";
import { Input, Table, Radio } from "antd"
import { useEffect, useRef, useState } from 'react';
import CSVData from "../mock/CSVData";
import Status from "../mock/Status"

export default function Home() {
  const [data, setData] = useState([])
  const [pageSize, setPageSize] = useState(20)
  const [value, setValue] = useState(1)
  const searchInput = useRef(null)

  useEffect(() => {
    async function getData() {
      try {
        const newData = CSVData.map((item) => {
          const findStatus = Status.find(x => x.url === item.twitter)

          if (findStatus.isShare === true) {
            return {
              ...item,
              isStatus: true
            }
          } else {
            return {
              ...item,
              isStatus: false
            }
          }
        })

        setData(newData)
      } catch (error) {

      }
    }
    getData()
  }, [])

  const getColumnSearchProps = (dataIndex, field) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input.Search
          ref={node => {
            searchInput.current = node;
          }}
          placeholder={`SEARCH: ${field}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onSearch={(e) => {
            setSelectedKeys(e ? [e] : []);
            confirm();
          }
          }
          style={{ marginBottom: 8, display: "block" }}
          allowClear={true}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
  });

  const onChange = (e) => {
    setValue(e.target.value)

    if (e.target.value === 1) {
      setData(filterData(CSVData, true))
    } else {
      setData(filterData(CSVData, false))
    }
  }

  const filterData = (originalData, status) => {
    return originalData.filter((item) => {
      const findStatus = Status.find(x => x.url === item.twitter)

      return findStatus.isShare === status
    })
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      ...getColumnSearchProps("userId", "User Id"),
      key: 'userId',
    },
    {
      title: 'User Code',
      dataIndex: 'userCode',
      ...getColumnSearchProps("userCode", "User Code"),
      key: 'userCode',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      ...getColumnSearchProps("username", "User Name"),
      key: 'username',
    },
    {
      title: 'Wallet',
      dataIndex: 'wallet',
      ...getColumnSearchProps("wallet", "Wallet"),
      key: 'wallet',
    },
    {
      title: 'Twitter',
      dataIndex: 'twitter',
      ...getColumnSearchProps("twitter", "Twitter"),
      with: 250,
      key: 'twitter',
    },
    {
      title: 'Discord',
      dataIndex: 'discord',
      ...getColumnSearchProps("discord", "Discord"),
      key: 'discord',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      ...getColumnSearchProps("balance", "Balance"),
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.balance - b.balance,
      key: 'balance',
      with: 250
    },
    {
      title: 'Ref',
      dataIndex: 'ref1',
      ...getColumnSearchProps("ref1", "Ref"),
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.ref1 - b.ref1,
      key: 'ref1',
      with: 250
    },
    {
      title: 'Ref_Parent',
      dataIndex: 'refParent',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.refParent - b.refParent,
      ...getColumnSearchProps("refParent", "Ref Parent"),
      key: 'refParent',
      with: 250
    },
  ];

  function onShowSizeChange(current, pageSize) {
    setPageSize(pageSize)
    console.log(current, pageSize);
  }

  function showTotal(total) {
    return `Total ${total} items`;
  }

  return (
    <div className="App">
      <div className="filter">
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>OK</Radio>
          <Radio value={2}>Not OK</Radio>
        </Radio.Group>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        bordered={true}
        rowKey={record => record.id}

        pagination={{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          showTotal: showTotal,
          showQuickJumper: true
        }}
      />
    </div>
  );
}

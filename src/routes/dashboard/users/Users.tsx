import {useGetAllProfilesQuery} from "../../../redux/api/profileApi.ts";
import {Table, TableProps} from "antd";
import {AllUsers} from "../../../types";

const Users = () => {
  const {data} = useGetAllProfilesQuery()

  const columns: TableProps<AllUsers>['columns'] = [
    {
      title: "#",
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: 'Status',
      render: (item) => <p
          className={item.status === "ACTIVE" ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>{item.status}</p>
    },
    {
      title: "Role",
      render: (item) => <p>{item.roleList[0].split("_").slice(-1)}</p>
    }
  ]
  return (
      <div>
        <Table<AllUsers>
            columns={columns}
            dataSource={data?.map((item) => ({key: item.id, ...item}))}
        />
      </div>
  )
}
export default Users

import {
  useChangeManagerMutation,
  useCreateBranchMutation, useDeleteBranchMutation,
  useGetAllBranchesQuery, useGetSingBranchQuery,
  useUpdateBranchMutation
} from "../../../redux/api/companBranchApi.ts";
import {
  Button,
  Form,
  FormProps,
  Input,
  message,
  Modal,
  Popover,
  Select,
  Table,
  TableProps
} from "antd";
import {useEffect, useState} from "react";
import {Content} from "../../../types";
import {useGetAllProfilesQuery} from "../../../redux/api/profileApi.ts";
import {MdEdit, MdDelete} from "react-icons/md";
import {ImUserPlus} from "react-icons/im";

export type FieldTypeC = {
  name?: string,
  address?: string,
  managerId?: string,
}

const CompanyBranch = () => {
  const [form] = Form.useForm()
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const {data, isFetching} = useGetAllBranchesQuery({page: currentPage, size: pageSize});

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [branchId, setBranchId] = useState<string | null>(null);
  const [managerSetID, setManagerSetID] = useState<string | null>(null);
  const [deletId, setDeletId] = useState<string | null>(null);
  const [createBranch, {isSuccess: createSuc, isError: createEr}] = useCreateBranchMutation()
  const [editBranch, {isSuccess: editSuc, isError: editEr}] = useUpdateBranchMutation()
  const {
    data: singleBranch,
    isSuccess: singleSuc,
    isError: singleError
  } = useGetSingBranchQuery({id: branchId}, {skip: !branchId});
  const [deleteBranch, {isSuccess: deleteSuc, isError: deleteEr}] = useDeleteBranchMutation()
  const {data: allUsers} = useGetAllProfilesQuery()
  const [changeManager, {isSuccess: manSuc, isError: manEr}] = useChangeManagerMutation()

  const handleTableChange = (pagination: any): void => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  // submit form
  const onFinish: FormProps<FieldTypeC>["onFinish"] = (values) => {
    if (branchId) {
      editBranch({body: values, id: branchId})
      console.log(values)
    } else {
      createBranch(values)
    }
  };
  const onFinishFailed: FormProps<FieldTypeC>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinesh: FormProps<FieldTypeC>["onFinish"] = (values) => {
    changeManager({body: values, id: managerSetID})
  }

  // modal management
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    form.resetFields()
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // set manager
  const setManager = (item: Content) => {
    setIsModalOpen(true);
    setManagerSetID(item.id);
  }

  const deleting = () => {
    deleteBranch({id: deletId})
  }

  const editContract = (item: Content) => {
    setBranchId(item.id)
    setIsModalOpen(true);
  }

  const content = (
      <div className="w-full flex justify-around items-center gap-3">
        <button className="bg-amber-400 text-black rounded-lg px-3 py-1"
                onClick={() => message.error("No deleted branch")}>No
        </button>
        <button className="bg-red-500 text-black rounded-lg px-3 py-1" onClick={deleting}>Yes</button>
      </div>
  );

  const columns: TableProps<Content>['columns'] = [
    {
      title: "#",
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: "name",
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Manager name',
      dataIndex: 'managerName',
    },
    {
      title: 'Status',
      render: (item) => <p
          className={item.status === "ACTIVE" ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>{item.status}</p>
    },
    {
      title: 'Action',
      render: (item) => (
          <div className="w-full flex justify-start items-center gap-2">
            <Button className="font-semibold !bg-amber-400 border-none !text-black"
                    onClick={() => editContract(item)}><MdEdit/>Edit</Button>
            <Popover content={content} title="Confirm deleting" trigger="click">
              <Button className="font-semibold !bg-red-500 border-none !text-black" onClick={() => setDeletId(item.id)}><MdDelete/>Delete</Button>
            </Popover>
            <Button className="font-semibold !bg-green-400 border-none !text-black"
                    onClick={() => setManager(item)}><ImUserPlus/>Manager</Button>
          </div>
      )
    }
  ];

  // create and edit branch event
  useEffect(() => {
    if (createSuc || editSuc) {
      setIsModalOpen(false);
      form.resetFields();
      message.success(createSuc ? "Successfully created branch" : "Successfully edited branch");
    }
    if (createEr || editEr) {
      setIsModalOpen(false);
      form.resetFields();
      message.error(createEr ? "Error creating branch" : "Error editing branch");
    }
  }, [createSuc, createEr, editSuc, editEr, form]);

  // single branch event
  useEffect(() => {
    if (singleSuc) {
      form.setFieldsValue({...singleBranch?.data,});
    }
    if (singleError) {
      message.error("Error fetching data");
    }
  }, [singleSuc, singleError, singleBranch, form]);

  // delete event
  useEffect(() => {
    if (deleteSuc) {
      message.success("Successfully deleted branch");
    }
    if (deleteEr) {
      message.error("Error deleting branch");
    }
  }, [deleteSuc, deleteEr]);

  // set manager id
  useEffect(() => {
    if (manSuc) {
      setIsModalOpen(false);
      form.resetFields();
      message.success("Manager successfully joined the branch");
    }
    if (manEr) {
      setIsModalOpen(false);
      form.resetFields();
      message.error("Adding a manager to the branch failed.");
    }
  }, [manEr, manSuc]);

  return (
      <div>
        <div className="pb-3">
          <Button className="border-none !bg-[#53dfdb] !text-white font-bold rounded-lg duration-400 active:scale-95"
                  onClick={showModal}>Create branch</Button>
        </div>

        <Table<Content>
            columns={columns}
            dataSource={data?.data?.content?.map((item) => ({key: item.id, ...item}))}
            loading={isFetching}
            pagination={{
              current: currentPage,
              pageSize,
              total: data?.data?.totalElements,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
            }}
            onChange={handleTableChange}
        />

        <Modal title="Branches modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} maskClosable={false}
               footer={null} forceRender={true}>

          <Form
              form={form}
              onFinish={managerSetID !== null ? onFinesh : onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
          >
            {managerSetID !== null ? (
                <Form.Item
                    label="Select manager"
                    name="managerId"
                    rules={[{required: true, message: 'Please select a manager!'}]}
                    className="mb-2"
                >
                  <Select
                      size="large" options={allUsers?.map(user => ({value: user.id, label: user.name}))}
                  />
                </Form.Item>
            ) : (
                <>
                  <Form.Item
                      label="Name"
                      name="name"
                      rules={[{required: true, message: 'Please input branch name!'}]}
                      className="mb-2"
                  >
                    <Input placeholder="Name" className="py-1.5 px-4 !border-gray-300 rounded-lg text-[16px]"/>
                  </Form.Item>
                  <Form.Item
                      label="Address"
                      name="address"
                      rules={[{required: true, message: 'Please input branch address!'}]}
                      className="mb-2"
                  >
                    <Input placeholder="Address" className="py-1.5 px-4 !border-gray-300 rounded-lg text-[16px]"/>
                  </Form.Item>
                  <Form.Item
                      label="Select manager"
                      name="managerId"
                      className="mb-2"
                  >
                    <Select
                        placeholder="Select manager" size="large"
                        options={allUsers?.map(user => ({value: user.id, label: user.name}))}
                    />
                  </Form.Item>
                </>
            )}
            <div className="w-full flex justify-end max-h-[50px] mt-4">
              <Form.Item>
                <Button
                    className="py-5 border-none !bg-[#53dfdb] !text-white font-bold rounded-lg duration-400 active:scale-95"
                    htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>

        </Modal>

      </div>
  )
}
export default CompanyBranch

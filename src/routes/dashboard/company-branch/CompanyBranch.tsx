import {
  useCreateBranchMutation, useDeleteBranchMutation,
  useGetAllBranchesQuery
} from "../../../redux/api/companBranchApi.ts";
import {
  Button, Form, FormProps, Input,
  message, Modal, Popconfirm, PopconfirmProps,
  Select, Table, TableProps
} from "antd";
import {useEffect, useState} from "react";
import {Content} from "../../../types";
import {useGetAllProfilesQuery} from "../../../redux/api/profileApi.ts";
import {MdEdit, MdDelete} from "react-icons/md";
import {ImUserPlus} from "react-icons/im";
import Edit from "../../../components/edit/Edit.tsx";
import SetManager from "../../../components/set-manager/SetManager.tsx";

export type FieldTypeC = {
  name?: string,
  address?: string,
  managerId?: string,
}

const CompanyBranch = () => {
  const [form] = Form.useForm()
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [branchId, setBranchId] = useState<string | null>(null);

  const [managerModal, setManagerModal] = useState<boolean>(false);
  const [managerSetID, setManagerSetID] = useState<string | null>(null);

  const {data, isFetching} = useGetAllBranchesQuery({page: currentPage, size: pageSize});
  const [createBranch, {isSuccess: createSuc, isError: createEr}] = useCreateBranchMutation()
  const [deleteBranch, {isSuccess: deleteSuc, isError: deleteEr}] = useDeleteBranchMutation()
  const {data: allUsers} = useGetAllProfilesQuery()

  const handleTableChange = (pagination: any): void => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  // submit form
  const onFinish: FormProps<FieldTypeC>["onFinish"] = (values) => {
    createBranch(values)
  };
  const onFinishFailed: FormProps<FieldTypeC>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
    setManagerModal(true);
    setManagerSetID(item.id);
  }
  const managerOk = () => {
    setManagerModal(false);
    form.resetFields()
  };
  const managerCancel = () => {
    setManagerModal(false);
    form.resetFields();
  };

  // edit branch
  const editContract = (item: Content) => {
    setBranchId(item.id)
    setModalOpen(true);
  }
  const editOk = () => {
    setModalOpen(false);
    form.resetFields()
  };
  const onCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };

  // deleting branch
  const confirm: PopconfirmProps['onConfirm'] = (item) => {
    // @ts-ignore
    deleteBranch({id: item.id});
  };
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
    message.error('No deleted branch');
  };

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
            <Popconfirm
                title="Delete the branch"
                description="Are you sure to delete this branch?"
                onConfirm={() => confirm(item)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
              <Button className="font-semibold !bg-red-500 border-none !text-black"><MdDelete/>Delete</Button>
            </Popconfirm>
            <Button className="font-semibold !bg-green-400 border-none !text-black"
                    onClick={() => setManager(item)}><ImUserPlus/>Manager</Button>
          </div>
      )
    }
  ];

  // create branch event
  useEffect(() => {
    if (createSuc) {
      setIsModalOpen(false);
      form.resetFields();
      message.success("Successfully created branch");
    }
    if (createEr) {
      setIsModalOpen(false);
      form.resetFields();
      message.error("Error creating branch");
    }
  }, [createSuc, createEr, form]);

  // delete event
  useEffect(() => {
    if (deleteSuc) {
      message.success("Successfully deleted branch");
    }
    if (deleteEr) {
      message.error("Error deleting branch");
    }
  }, [deleteSuc, deleteEr]);

  return (
      <div>
        <div className="pb-3">
          <Button className="border-none !bg-[#53dfdb] !text-white font-bold rounded-lg duration-400 active:scale-95"
                  onClick={showModal}>Create branch</Button>
        </div>

        <Table<Content>
            columns={columns} loading={isFetching}
            dataSource={data?.data?.content?.map((item) => ({key: item.id, ...item}))}
            pagination={{
              current: currentPage, pageSize,
              total: data?.data?.totalElements,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
            }}
            onChange={handleTableChange}
        />

        <Modal title="Create Branches modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
               maskClosable={false} footer={null} forceRender={true}
        >
          <Form
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
          >
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

        <Modal title="Edit Branch modal" open={modalOpen} onOk={editOk} onCancel={onCancel}
               maskClosable={false} footer={null} forceRender={true}>
          <Edit branchId={branchId} setModalOpen={setModalOpen}/>
        </Modal>

        <Modal title="Set Manager modal" open={managerModal} onOk={managerOk} onCancel={managerCancel}
               maskClosable={false} footer={null} forceRender={true}>
          <SetManager managerSetID={managerSetID} setManagerModal={setManagerModal}/>
        </Modal>
      </div>
  )
}
export default CompanyBranch
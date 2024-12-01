import {useGetSingBranchQuery, useUpdateBranchMutation} from "../../redux/api/companBranchApi.ts";
import {Button, Form, FormProps, Input, message, Select} from "antd";
import {FieldTypeC} from "../../routes/dashboard/company-branch/CompanyBranch.tsx";
import {Dispatch, SetStateAction, useEffect} from "react";
import {useGetAllProfilesQuery} from "../../redux/api/profileApi.ts";

const Edit = ({branchId, setModalOpen}: {
  branchId: string | null,
  setModalOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const [form] = Form.useForm();

  const [editBranch, {isSuccess: editSuc, isError: editEr}] = useUpdateBranchMutation()
  const {
    data: singleBranch,
    isSuccess: singleSuc,
    isError: singleError
  } = useGetSingBranchQuery({id: branchId}, {skip: !branchId});
  const {data: allUsers} = useGetAllProfilesQuery()

  // submit form
  const onFinish: FormProps<FieldTypeC>["onFinish"] = (values) => {
    editBranch({body: values, id: branchId})
  };
  const onFinishFailed: FormProps<FieldTypeC>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // create and edit branch event
  useEffect(() => {
    if (editSuc) {
      setModalOpen(false);
      form.resetFields();
      message.success("Successfully edited branch");
    }
    if (editEr) {
      setModalOpen(false);
      form.resetFields();
      message.error("Error editing branch");
    }
  }, [editSuc, editEr, form]);

  // single branch event
  useEffect(() => {
    if (singleSuc) {
      form.setFieldsValue({...singleBranch?.data,});
    }
    if (singleError) {
      console.log('error fetching data');
    }
  }, [singleSuc, singleError, singleBranch, form]);

  return (
      <div>
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
      </div>
  )
}
export default Edit

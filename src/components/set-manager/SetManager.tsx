import {Dispatch, SetStateAction, useEffect} from "react";
import {Button, Form, FormProps, message, Select} from "antd";
import {useChangeManagerMutation} from "../../redux/api/companBranchApi.ts";
import {FieldTypeC} from "../../routes/dashboard/company-branch/CompanyBranch.tsx";
import {useGetAllProfilesQuery} from "../../redux/api/profileApi.ts";

const SetManager = ({managerSetID, setManagerModal}: {
  managerSetID: string | null,
  setManagerModal: Dispatch<SetStateAction<boolean>>
}) => {
  const [form] = Form.useForm();
  const [changeManager, {isSuccess: manSuc, isError: manEr}] = useChangeManagerMutation()
  const {data: allUsers} = useGetAllProfilesQuery()

  const onFinish: FormProps<FieldTypeC>["onFinish"] = (values) => {
    changeManager({body: values, id: managerSetID})
  }
  const onFinishFailed: FormProps<FieldTypeC>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  // set manager id
  useEffect(() => {
    if (manSuc) {
      setManagerModal(false);
      form.resetFields();
      message.success("Manager successfully joined the branch");
    }
    if (manEr) {
      setManagerModal(false);
      form.resetFields();
      message.error("Adding a manager to the branch failed.");
    }
  }, [manEr, manSuc, form]);

  return (
      <div>
        <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
        >
          <Form.Item
              label="Select manager"
              name="managerId"
              rules={[{required: true, message: 'Please select a manager!'}]}
              className="mb-2"
          >
            <Select placeholder="Select manager"
                size="large" options={allUsers?.map(user => ({value: user.id, label: user.name}))}
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
export default SetManager

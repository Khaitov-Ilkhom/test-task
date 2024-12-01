import {useSignUpMutation, useVerificationMutation} from "../../../redux/api/authApi.ts";
import {useEffect, useState} from "react";
import {Button, Form, FormProps, Input, message, Modal, Typography} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {OTPProps} from "antd/es/input/OTP";
import {signIn} from "../../../redux/slice/authSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";

const {Title, Text} = Typography

export type FieldType = {
  name: string,
  phone: string,
  password: string,
  surname: string,
}

const Register = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [signUp, {isSuccess, isError}] = useSignUpMutation()
  const [verification, {data, isSuccess: verifySuc, isError: verifyEr}] = useVerificationMutation()
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<FieldType>({name: "", password: "", phone: "", surname: ""})

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    signUp(values)
    setFormValues(values)
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onChange: OTPProps['onChange'] = (text) => {
    verification({phone: formValues.phone, code: text})
  };
  const sharedProps: OTPProps = {
    onChange,
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Successfully registered");
      setOpen(true)
      form.resetFields();
    }
    if (isError) {
      message.error("User already exists or incorrect phone");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (verifySuc) {
      setOpen(false)
      dispatch(signIn(data.data.token))
      message.success("Successfully verified");
      navigate("/home");
    }
    if (verifyEr) {
      message.error("Verification failed");
    }
  }, [verifySuc, verifyEr, data]);

  return (
      <div className="flex items-center justify-center p-4">
        <div
            className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-700 hover:scale-[1.02]">
          <div className="p-8 space-y-6">
            <div className="text-center">
              <Title
                  className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
                Sign up
              </Title>
              <Text className="text-gray-500">Create your account to get started</Text>
            </div>

            <Form
                form={form}
                name="basic"
                initialValues={{
                  remember: true,
                  phone: "+998",
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <Form.Item<FieldType>
                    label="Name"
                    name="name"
                    rules={[{required: true, message: "Please input your name!"}]}
                    className="mb-0"
                >
                  <Input
                      placeholder="Name"
                      className="py-2.5 px-4 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-300"
                  />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Surname"
                    name="surname"
                    rules={[{required: true, message: "Please input your surname!"}]}
                    className="mb-0"
                >
                  <Input
                      placeholder="Surname"
                      className="py-2.5 px-4 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-300"
                  />
                </Form.Item>
              </div>

              <Form.Item<FieldType>
                  label="Phone"
                  name="phone"
                  rules={[{required: true, message: "Please input your phone number!"}]}
                  className="mb-0"
              >
                <Input
                    placeholder="Phone"
                    className="py-2.5 px-4 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-300"
                />
              </Form.Item>

              <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[{required: true, message: "Please input your password!"}]}
                  className="mb-0"
              >
                <Input.Password
                    placeholder="********"
                    className="py-2.5 px-4 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-300"
                />
              </Form.Item>

              <Form.Item className="mt-6">
                <Button
                    className="w-full py-3 px-4 border-none !bg-gradient-to-r from-blue-500 to-purple-600 !text-white font-bold rounded-lg hover:!from-blue-600 hover:!to-purple-700 !transition-all !duration-700 transform hover:scale-[1.02] focus:!outline-none focus:ring-4 focus:ring-blue-300"
                    htmlType="submit"
                >
                  Sign up
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center">
              <Text className="text-gray-600">Already have an account? <Link
                  className="text-blue-600 hover:underline font-semibold" to="/">Sign In</Link></Text>
            </div>
          </div>
        </div>

        <Modal
            title="Verification"
            open={open}
            onCancel={handleCancel}
            footer={null}
            maskClosable={false}
            className="max-w-sm w-full mx-auto"
        >
          <div className="w-full flex flex-col items-center gap-3 min-h-[150px]">
            <Text className="text-lg font-semibold text-gray-700">Enter verification code</Text>
            <Input.OTP size={"large"} length={5} variant="filled" {...sharedProps} />
          </div>
        </Modal>
      </div>
  )
}
export default Register
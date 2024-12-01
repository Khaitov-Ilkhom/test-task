import {Button, Form, FormProps, Input, message, Typography} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import {useEffect} from "react";
import {signIn} from "../../../redux/slice/authSlice.ts";
import {useSignInMutation} from "../../../redux/api/authApi.ts";

export type FieldTypeL = {
  phone: string,
  password: string,
  fcmtoken: ""
}

const {Title, Text} = Typography

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [login, {data, isSuccess, isError}] = useSignInMutation();
  const navigate = useNavigate()

  const onFinish: FormProps<FieldTypeL>["onFinish"] = (values) => {
    login({...values, fcmtoken: ""})
  };
  const onFinishFailed: FormProps<FieldTypeL>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Successfully logged")
      dispatch(signIn(data.data.token))
      navigate("/home")
    }
    if (isError) {
      message.error("Logged error")
    }
  }, [isSuccess, isError])

  return (
      <div className="w-[450px] flex items-center justify-center p-4">
        <div
            className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-700 hover:scale-[1.02]"
        >
          <div className="p-8 space-y-6">
            <div className="text-center">
              <Title
                  className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2"
              >
                Sign In
              </Title>
              <Text className="text-gray-500">Welcome back! Please log in to your account</Text>
            </div>

            <Form
                name="basic"
                layout="vertical"
                initialValues={{remember: true, phone: "+998"}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="space-y-4"
            >
              <Form.Item<FieldTypeL>
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

              <Form.Item<FieldTypeL>
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
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center">
              <Text className="text-gray-600">
                Don’t have an account?{" "}
                <Link
                    className="text-blue-600 hover:underline font-semibold"
                    to="/register"
                >
                  Sign Up
                </Link>
              </Text>
            </div>
          </div>
        </div>
      </div>

  )
}
export default Login

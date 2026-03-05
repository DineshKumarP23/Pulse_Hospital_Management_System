import { Button, PasswordInput, SegmentedControl, TextInput } from "@mantine/core";
import { IconHeartbeat } from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import { Link, useNavigate } from "react-router-dom";
import { errorNotification, successNotification } from "../Utility/NotificationUtil";
import { loginUser } from "../Service/UserService";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setJwt } from "../Slices/JwtSlice";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../Slices/UserSlice";
interface RegisterFormValues {
  type: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const form = useForm<RegisterFormValues>({
    initialValues: {
        type: "PATIENT",
        email: '',
        password: '',
        confirmPassword: '',
    },
    validate: {
        email: (value) =>
            /^\S+@\S+$/.test(value) ? null : 'Invalid email',

        password: (value) =>
            !value
            ? "Password is required"
            : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value)
            ? null
            : "Password must be 8-15 characters and include uppercase, lowercase, number, and special character",

        confirmPassword: (value, values) =>
            value !== values.password ? "Passwords don't match" : null,
        },
    });


    
    const handleSubmit = (values: typeof form.values) => {
        setLoading(true);
        loginUser(values).then((_data)=>{
            successNotification("Logged in Successfully.");
            dispatch(setJwt(_data))
            dispatch(setUser(jwtDecode(_data)));

        }).catch((error)=>{
            errorNotification(error?.response?.data?.errorMessage);
        }).finally(()=>setLoading(false))
    };

    return (
        <div style={{background:'url("/bg.jpg")'}} className='h-screen w-screen !bg-cover !bg-center !bg-no-repeat flex flex-col items-center justify-center'>
            <div className='py-3 text-primary-400 flex gap-1 items-center'>
                <IconHeartbeat size={40} stroke={2.5}/>
                <span className='font-heading font-semibold text-4xl'>Pulse</span>
            </div>
            <div className='w-[450px] backdrop-blur-md p-10 py-8 rounded-lg'>
                <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-5 [&_input]:placeholder-neutral-100 [&_mantine-Input-input]:!border-white focus-within:[&_mantine-Input-input]:!border-primary [&_.mantine-Input-input]:!border [&_input]:!pl-2 [&_svg]:text-white [&_input]:!text-white'>
                    <div className='self-center font-medium font-heading text-white text-xl'>Login</div>
                    <SegmentedControl {...form.getInputProps("type")} fullWidth size="md" radius="md" color="primary" bg="none" className="[&_*]:!text-white border border-white" data={[{label:'Patient', value:'PATIENT'},{label:'Doctor', value:'DOCTOR'}, {label:'Admin', value:'ADMIN'}]} />;
                    <TextInput {...form.getInputProps('email')} className="transition duration-300" variant="unstyled" size="md" radius="md" placeholder="Email"/>
                    <PasswordInput {...form.getInputProps('password')} className="transition duration-300" variant="unstyled" size="md" radius="md" placeholder="Password"/>
                    <PasswordInput {...form.getInputProps('confirmPassword')} className="transition duration-300" variant="unstyled" size="md" radius="md" placeholder="Confirm Password"/>
                    <Button loading={loading} radius="md" size="md" type='submit' color='primary'>Login</Button>
                <div className="text-neutral-100 text-sm self-center">Don't have an account <Link to="/register" className="hover:underline">Register</Link></div>
                </form>
            </div>
        </div>
    )
}
export default LoginPage;
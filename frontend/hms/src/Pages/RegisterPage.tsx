import { Button, PasswordInput, TextInput } from "@mantine/core";
import { IconHeartbeat } from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import { Link } from "react-router-dom";
const RegisterPage = () => {
    const form = useForm({
            initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value:string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value:string) => (!value?"Password is required":null),
        },
    });
    
    const handleSubmit = (values: typeof form.values) => {
        console.log(values);
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
                    <TextInput {...form.getInputProps('email')} className="transition duration-300" variant="unstyled" size="md" radius="md" placeholder="Email"/>
                    <PasswordInput {...form.getInputProps('password')} className="transition duration-300" variant="unstyled" size="md" radius="md" placeholder="Password"/>
                    <Button radius="md" size="md" type='submit' color='primary'>Login</Button>
                <div className="text-neutral-100 text-sm self-center">Have an account <Link to="/login" className="hover:underline">Login</Link></div>
                </form>
            </div>
        </div>
    )
}
export default RegisterPage;
import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bloodGroups } from "../../../Data/DropdownData";
import { useDisclosure } from "@mantine/hooks";
import { getPatient, updatePatient } from "../../../Service/PatientProfileService";
import { formatDate } from "../../../Utility/DateUtility";
import { useForm } from "@mantine/form";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";
import { arrayToCSV } from "../../../Utility/OtherUtility";
const patient = {
  dob: "12-02-2000",
  phone: "9876543210",
  address: "Chennai",
  aadharNo: "123456789012",
  bloodGroup: "O+",
  allergies: "",
  chronicDisease: ""
};
type ProfileFormValues = {
  dob: Date | null;
  phone: string;
  address: string;
  aadharNo: string;
  bloodGroup: string;
  allergies: string[];
  chronicDisease: string[];
};
const Profile = () => {
    const user = useSelector((state:any) => state.user);
    const [opened, { open, close}] = useDisclosure(false);
    const [editMode, setEdit] = useState(true);
    const [profile, setProfile] = useState<any>({});
    useEffect(() => {
            getPatient(user.profileId).then((data) => {
                setProfile({...data, allergies: data.allergies ? (JSON.parse(data.allergies)):null, chronicDisease:data.chronicDisease ? (JSON.parse(data.chronicDisease)):null});
            }).catch((error) => {
                console.log(error);
            })
        }, [])
    const form = useForm<ProfileFormValues>({
            initialValues: {
                dob: null,
                phone: '',
                address: '',
                aadharNo: '',
                bloodGroup: '',
                allergies: [],
                chronicDisease: [],
            },
            validate: {
                dob: (value: Date | null) => (!value ? 'Date of Birth is required' : null),
                phone: (value: string) => (!value ? 'Phone Number is required' : null),
                address: (value: string) => (!value ? 'Address is required' : null),
                aadharNo: (value: string) => (!value ? 'License Number is required' : null),
            },
    });
    const handleEdit = () => {
        form.setValues({...profile, dob: profile.dob ? new Date(profile.dob) : undefined, chronicDisease: profile.chronicDisease ?? [], allergies: profile.allergies ?? [] });
        setEdit(true);
    }
    const handleSubmit = (e:any) => {
        let values= form.getValues();
        form.validate();
        if(!form.isValid()) return;
        updatePatient({...profile, ...values, allergies: values.allergies ? JSON.stringify(values.allergies):null, chronicDisease: values.chronicDisease ? JSON.stringify(values.chronicDisease):null}).then((data)=>{
            successNotification("Profile updated successfully");
            setProfile(data);
            setEdit(false);
        }).catch((error) => {
            errorNotification(error.response.data.errorMessage);
        })
    }
    return (
        <div className="p-10">
            <div className="flex justify-between items-center">
                <div className="flex gap-5 items-center">
                    <div className="flex flex-col items-center gap-3">
                        <Avatar variant='filled' src="/avatar.png" size={150} alt="It's me" />
                        {editMode && <Button size="sm" onClick={()=>setEdit(false)} variant="filled">Upload</Button>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-3xl font-medium text-neutral-900">{user.name}</div>
                        <div className="text-xl text-neutral-700">{user.email}</div>
                    </div>
                </div>
                {!editMode ? <Button size="lg" type="button" onClick={handleEdit} variant="filled" leftSection={<IconEdit />}>Edit</Button> : <Button onClick={handleSubmit} size="lg" type="submit" variant="filled">Submit</Button> }
            </div>
            <Divider my="xl" />
            <div>
                <div className="text-2xl font-medium mb-5 text-neutral-900">Personal Information</div>
                <Table striped stripedColor="primary.1" verticalSpacing="md" withRowBorders={false}>
                    <Table.Tbody className="[&>tr]:!mb-3 [&_td}:!w-1/2">
                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Date of Birth</Table.Td>
                            {editMode ? <Table.Td className="text-xl"> <DateInput {...form.getInputProps("dob")} placeholder="Date of Birth" /> </Table.Td>:<Table.Td className="text-xl">{formatDate(profile.dob ?? '-')}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Phone</Table.Td>
                            {editMode ? <Table.Td className="text-xl"> <NumberInput {...form.getInputProps("phone")} maxLength={10} placeholder="Phone Number" clampBehavior="strict" hideControls /></Table.Td>:<Table.Td className="text-xl">{profile.phone ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Address</Table.Td>
                            {editMode ? <Table.Td className="text-xl"> <TextInput {...form.getInputProps("address")} placeholder="Address" /></Table.Td>:<Table.Td className="text-xl">{profile.address ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Aadhar No</Table.Td>
                            {editMode ? <Table.Td className="text-xl"> <NumberInput {...form.getInputProps("aadharNo")} maxLength={12} placeholder="Aadhaar Number" clampBehavior="strict" hideControls /></Table.Td>:<Table.Td className="text-xl">{profile.aadharNo ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Blood Group</Table.Td>
                            {editMode ? <Table.Td className="text-xl"> <Select {...form.getInputProps("bloodGroup")} placeholder="Blood Group" data={bloodGroups}/></Table.Td>:<Table.Td className="text-xl">{profile.bloodGroup ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Allergies</Table.Td>
                            {editMode ? <Table.Td className="text-xl"> <TagsInput {...form.getInputProps("allergies")} placeholder="Allergies separated by comma" /></Table.Td>:<Table.Td className="text-xl">{arrayToCSV(profile.allergies) ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Chronic Disease</Table.Td>
                            {editMode ? <Table.Td className="text-xl"> <TagsInput {...form.getInputProps("chronicDisease")} placeholder="Chronic Disease separated by comma" /></Table.Td>:<Table.Td className="text-xl">{arrayToCSV(profile.chronicDisease) ?? '-'}</Table.Td>}
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </div>
            <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium" >Upload Picture</span>}></Modal>
        </div>
    )
}
export default Profile;
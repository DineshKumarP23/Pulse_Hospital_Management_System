import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { bloodGroups } from "../../../Data/DropdownData";
import { useDisclosure } from "@mantine/hooks";
const patient = {
  dob: "12-02-2000",
  phone: "9876543210",
  address: "Chennai",
  aadharNo: "123456789012",
  bloodGroup: "O+",
  allergies: "",
  chronicDisease: ""
};
const Profile = () => {
    const user = useSelector((state:any) => state.user);
    const [opened, { open, close}] = useDisclosure(false);
    const [editMode, setEdit] = useState(false);
    return (
        <div className="p-10">
            <div className="flex justify-between items-center">
                <div className="flex gap-5 items-center">
                    <div className="flex flex-col items-center gap-3">
                        <Avatar variant='filled' src="/avatar.png" size={150} alt="It's me" />
                        {editMode && <Button size="sm" onClick={(open)=>setEdit(false)} variant="filled">Upload</Button>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-3xl font-medium text-neutral-900">{user.name}</div>
                        <div className="text-xl text-neutral-700">{user.email}</div>
                    </div>
                </div>
                {!editMode ? <Button size="lg" onClick={()=>setEdit(true)} variant="filled" leftSection={<IconEdit />}>Edit</Button> : <Button size="lg" onClick={()=>setEdit(false)} variant="filled">Submit</Button> }
            </div>
            <Divider my="xl" />
            <div>
                <div className="text-2xl font-medium mb-5 text-neutral-900">Personal Information</div>
                <Table striped stripedColor="primary.1" verticalSpacing="md" withRowBorders={false}>
                    <Table.Tbody className="[&>tr]:!mb-3">
                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Date of Birth</Table.Td>
                            {editMode ? <Table.Td className="text-xl"> <DateInput placeholder="Date of Birth" /> </Table.Td>:<Table.Td className="text-xl">{patient.dob}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Phone</Table.Td>
                            {editMode ? <Table.Td className="text-xl"> <NumberInput maxLength={10} placeholder="Phone Number" clampBehavior="strict" hideControls /></Table.Td>:<Table.Td className="text-xl">{patient.phone}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Address</Table.Td>
                            {editMode ? <Table.Td className="text-xl"> <TextInput placeholder="Address" /></Table.Td>:<Table.Td className="text-xl">{patient.address}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Aadhar No</Table.Td>
                            {editMode ? <Table.Td className="text-xl"> <NumberInput maxLength={12} placeholder="Aadhaar Number" clampBehavior="strict" hideControls /></Table.Td>:<Table.Td className="text-xl">{patient.aadharNo}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Blood Group</Table.Td>
                            {editMode ? <Table.Td className="text-xl"> <Select placeholder="Blood Group" data={bloodGroups}/></Table.Td>:<Table.Td className="text-xl">{patient.bloodGroup}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Allergies</Table.Td>
                            {editMode ? <Table.Td className="text-xl"> <TagsInput placeholder="Allergies separated by comma" /></Table.Td>:<Table.Td className="text-xl">{patient.allergies}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Chronic Disease</Table.Td>
                            {editMode ? <Table.Td className="text-xl"> <TagsInput placeholder="Chronic Disease separated by comma" /></Table.Td>:<Table.Td className="text-xl">{patient.chronicDisease}</Table.Td>}
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </div>
            <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium" >Upload Picture</span>}></Modal>
        </div>
    )
}
export default Profile;
import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { doctorSpecializations, doctorDepartments } from "../../../Data/DropdownData";
import { useDisclosure } from "@mantine/hooks";
import { getDoctor, updateDoctor } from "../../../Service/DoctorProfileService";
import { useForm } from "@mantine/form";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";
import { formatDate } from "../../../Utility/DateUtility";
const doctor = {
  dob: "12-02-2000",
  phone: "9876543210",
  address: "Chennai",
  licenseNo: "DL123456789",
  specialization: "Cardiology",
  departments: "Cardioogy",
  totalExp: "5"
};
type ProfileFormValues = {
  dob: Date | null;
  phone: string;
  address: string;
  licenseNo: string;
  specialization: string;
  department: string;
  totalExp: string;
};
const Profile = () => {
    const user = useSelector((state:any) => state.user);
    const [opened, { open, close}] = useDisclosure(false);
    const [editMode, setEdit] = useState(false);
    const [profile, setProfile] = useState<any>({});
    useEffect(() => {
            getDoctor(user.profileId).then((data) => {
                setProfile({...data});
            }).catch((error) => {
                console.log(error);
            })
        }, [])
    const form = useForm<ProfileFormValues>({
        initialValues: {
            dob: null,
            phone: '',
            address: '',
            licenseNo: '',
            specialization: '',
            department: '',
            totalExp: '',
        },
        validate: {
            dob: (value) => (!value ? 'Date of Birth is required' : null),
            phone: (value) => (!value ? 'Phone Number is required' : null),
            address: (value) => (!value ? 'Address is required' : null),
            licenseNo: (value) => (!value ? 'License Number is required' : null),
        },
    });
    const handleEdit = () => {
        form.setValues({...profile});
        setEdit(true);
    }
    const handleSubmit = (e: any) => { 
        let values = form.getValues(); 
        form.validate(); 
        if (!form.isValid()) 
            return; updateDoctor({ ...profile, ...values }) .then((data) => { 
                successNotification("Profile updated successfully"); 
                setProfile({ ...profile, ...values }); setEdit(false); 
            }) .catch((error) => { errorNotification(error.response.data.errorMessage); }); };
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
                {!editMode ? <Button size="lg" type="button" onClick={handleEdit} variant="filled" leftSection={<IconEdit />}>Edit</Button> : <Button onClick={handleSubmit} size="lg" type="submit" variant="filled">Submit</Button> }
            </div>
            <Divider my="xl" />
            {/* Personal Information */}
      <div>
        <div className="text-2xl font-medium mb-5 text-neutral-900">
          Personal Information
        </div>

        <Table
          striped
          stripedColor="primary.1"
          verticalSpacing="md"
          withRowBorders={false}
        >
          <Table.Tbody className="[&>tr]:!mb-3 [&_td]:!w-1/2">
            {/* Date of Birth */}
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">
                Date of Birth
              </Table.Td>

              {editMode ? (
                <Table.Td className="text-xl">
                  <DateInput
                    {...form.getInputProps("dob")}
                    placeholder="Date of Birth"
                    valueFormat="DD/MM/YYYY"
                    clearable
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {formatDate(profile?.dob)}
                </Table.Td>
              )}
            </Table.Tr>

            {/* Phone */}
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">
                Phone
              </Table.Td>

              {editMode ? (
                <Table.Td className="text-xl">
                  <TextInput
                    {...form.getInputProps("phone")}
                    maxLength={10}
                    placeholder="Phone Number"
                    inputMode="numeric"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {profile?.phone ?? "-"}
                </Table.Td>
              )}
            </Table.Tr>

            {/* Address */}
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">
                Address
              </Table.Td>

              {editMode ? (
                <Table.Td className="text-xl">
                  <TextInput
                    {...form.getInputProps("address")}
                    placeholder="Address"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {profile?.address ?? "-"}
                </Table.Td>
              )}
            </Table.Tr>

            {/* License Number */}
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">
                License No
              </Table.Td>

              {editMode ? (
                <Table.Td className="text-xl">
                  <TextInput
                    {...form.getInputProps("licenseNo")}
                    maxLength={12}
                    placeholder="License Number"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {profile?.licenseNo ?? "-"}
                </Table.Td>
              )}
            </Table.Tr>

            {/* Specialization */}
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">
                Specialization
              </Table.Td>

              {editMode ? (
                <Table.Td className="text-xl">
                  <Select
                    {...form.getInputProps("specialization")}
                    placeholder="Specialization"
                    data={doctorSpecializations}
                    searchable
                    clearable
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {profile?.specialization ?? "-"}
                </Table.Td>
              )}
            </Table.Tr>

            {/* Department */}
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">
                Department
              </Table.Td>

              {editMode ? (
                <Table.Td className="text-xl">
                  <Select
                    {...form.getInputProps("department")}
                    placeholder="Department"
                    data={doctorDepartments}
                    searchable
                    clearable
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {profile?.department ?? "-"}
                </Table.Td>
              )}
            </Table.Tr>

            {/* Total Experience */}
            <Table.Tr>
              <Table.Td className="font-semibold text-xl">
                Total Experience
              </Table.Td>

              {editMode ? (
                <Table.Td className="text-xl">
                  <NumberInput
                    {...form.getInputProps("totalExp")}
                    max={50}
                    min={0}
                    placeholder="Total Experience"
                    clampBehavior="strict"
                    hideControls
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {profile?.totalExp != null
                    ? `${profile.totalExp} years`
                    : "-"}
                                </Table.Td>
                            )}
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </div>
            <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium" >Upload Picture</span>}></Modal>
        </div>
    )
}
export default Profile;
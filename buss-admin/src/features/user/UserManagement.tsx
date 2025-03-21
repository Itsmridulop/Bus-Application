import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDialog } from "@/context/DialogContext";
import { SchoolType, UserType } from "@/types";
import { CustomDialog } from "@/components/CustomDialog";
import RichTable from "@/components/RichTable";
import { UserForm } from "./UserForm";
import { useCreteUser, useDeleteUser, useUpdateUser } from "./user.hook";
import { BackdropLoader } from "@/components/BackdropLoader";

const UserManagement: FC = () => {
  const { openDeleteDialog } = useDialog();

  const { data: users, isLoading } = useQuery<UserType[]>({
    queryKey: ["user"],
  });
  const { data: school } = useQuery<SchoolType>({
    queryKey: ["schools"],
  });
  const { createUser } = useCreteUser();
  const { updateUser } = useUpdateUser();
  const { deleteUser } = useDeleteUser();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [activeEditElement, setActiveEditElement] = useState<UserType | null>(
    null,
  );

  const handleDelete = (id: string) => {
    deleteUser(id);
  };

  // used to edit the routes
  const handleEdit = (id: string) => {
    setEditDialogOpen(true);
    const user = users?.find((user) => user._id === id);
    if (user) {
      setActiveEditElement(user);
    }
  };

  // used to add new routes
  const handleAddRecord = () => {
    setEditDialogOpen(true);
    setActiveEditElement(null);
  };

  // final submit function for the form
  const handleSubmit = (body: Partial<UserType>) => {
    if (body._id) {
      const data = updateUser(body);
      console.log(data);
    } else {
      const data = createUser({ ...body, school: school?._id });
      console.log(data);
    }
  };

  if (!users) return <BackdropLoader isLoading={isLoading} />;

  // this is used to filter the record to show in the table
  const filteredData = users.map((el, i) => ({
    sno: i + 1,
    id: el._id,
    name: el.name,
    email: el.email,
    role: el.role,
    phone: el.phone,
  }));

  const mapping = [
    { label: "SNO.", field: "sno" },
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Role", field: "role" },
    { label: "Phone", field: "phone" },
  ];

  if (isLoading) return <BackdropLoader isLoading={isLoading} />;

  return (
    <div className="flex flex-col gap-10">
      <CustomDialog
        width={55}
        dialoagOpen={editDialogOpen}
        label="Edit Routes"
        onOpenChange={setEditDialogOpen}
      >
        <UserForm
          defaultValues={activeEditElement}
          onSubmit={handleSubmit}
          isUpdateMode={true}
        />
      </CustomDialog>
      <RichTable
        onAddRecord={handleAddRecord}
        initialData={filteredData}
        mapping={mapping}
        onDelete={(id) => openDeleteDialog(() => handleDelete(id))}
        label="User List"
        onEdit={handleEdit}
      />
    </div>
  );
};

export default UserManagement;

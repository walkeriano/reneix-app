import React, { useState } from "react";
import styles from "./publications.module.css";
import UsersActions from "../usersActions/usersActions";
import FormLocker from "../formLocker/formLocker";

export default function Publications() {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleToggleUser = (user) => {
    setSelectedUsers((prev) => {
      const exists = prev.some((item) => item.id === user.id);

      if (exists) {
        return prev.filter((item) => item.id !== user.id);
      }

      return [...prev, user];
    });
  };

  return (
    <section className={styles.containerPublications}>
      <UsersActions
        selectedUsers={selectedUsers}
        onToggleUser={handleToggleUser}
      />
      <FormLocker
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
    </section>
  );
}

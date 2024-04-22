"use client";
import CreatePetModal from "@/app/components/modal/CreatePetModal";
import EditProfileModal from "@/app/components/modal/EditProfileModal";
import { useCreatePetModal } from "@/app/hooks/useCreatePetModal";
import { useEditProfileModal } from "@/app/hooks/useEditProfileModal";
import { useUser } from "@/app/hooks/useUser";
import React from "react";

const ModalProvider = () => {
  const { user: currentUser } = useUser();
  const { isOpen, onClose } = useCreatePetModal();
  const { isOpen: isOpenEditProfileModal, onClose: onCloseEditProfileModal } =
    useEditProfileModal();

  if (!currentUser) {
    return null;
  }
  
  return (
    <>
      <CreatePetModal open={isOpen} onClose={onClose} />
      <EditProfileModal
        user={currentUser}
        open={isOpenEditProfileModal}
        onClose={onCloseEditProfileModal}
      />
    </>
  );
};

export default ModalProvider;

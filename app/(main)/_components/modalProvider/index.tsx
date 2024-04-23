"use client";
import CreatePetModal from "@/app/components/modal/CreatePetModal";
import EditProfileModal from "@/app/components/modal/EditProfileModal";
import UpdatePostModal from "@/app/components/modal/UpdatePostModal";
import { useCreatePetModal } from "@/app/hooks/useCreatePetModal";
import { useEditProfileModal } from "@/app/hooks/useEditProfileModal";
import { useUpdatePostModal } from "@/app/hooks/useUpdatePostModal";
import { useUser } from "@/app/hooks/useUser";
import React from "react";

const ModalProvider = () => {
  const { user: currentUser } = useUser();
  const { isOpen, onClose } = useCreatePetModal();
  const { isOpen: isOpenEditProfileModal, onClose: onCloseEditProfileModal } =
    useEditProfileModal();
  const updatePost = useUpdatePostModal();

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
      <UpdatePostModal
        onClose={() => updatePost.onClose()}
        open={updatePost.isOpen}
      />
    </>
  );
};

export default ModalProvider;

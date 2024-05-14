"use client";
import ConfirmModal from "@/app/components/modal/ConfirmModal";
import CreatePetModal from "@/app/components/modal/CreatePetModal";
import EditProfileModal from "@/app/components/modal/EditProfileModal";
import UpdatePostModal from "@/app/components/modal/UpdatePostModal";
import { useConfirmModal } from "@/app/hooks/useConfirmModal";
import { useCreatePetModal } from "@/app/hooks/useCreatePetModal";
import { useEditProfileModal } from "@/app/hooks/useEditProfileModal";
import { useUpdatePostModal } from "@/app/hooks/useUpdatePostModal";
import { useUser } from "@/app/hooks/useUser";
import React from "react";

const ModalProvider = () => {
  const { user: currentUser } = useUser();
  const createPetModal = useCreatePetModal();
  const editProfileModal = useEditProfileModal();
  const updatePostModal = useUpdatePostModal();
  const confirmModal = useConfirmModal();

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <ConfirmModal
        isLoading={confirmModal.state.isLoading}
        open={confirmModal.state.isOpen}
        handleSubmit={confirmModal.handleConfirm}
        title={confirmModal.state.title}
        onClose={confirmModal.onClose}
      />
      <CreatePetModal
        open={createPetModal.isOpen}
        onClose={createPetModal.onClose}
      />
      <EditProfileModal
        user={currentUser}
        open={editProfileModal.isOpen}
        onClose={editProfileModal.onClose}
      />
      <UpdatePostModal
        open={updatePostModal.isOpen}
        onClose={updatePostModal.onClose}
      />
    </>
  );
};

export default ModalProvider;

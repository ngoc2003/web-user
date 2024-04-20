import { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/app/config/firebase-config";
import { useUser } from "./useUser";

export const useUploadImage = () => {
  const [isloading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useUser();

  const upload = (file: File) => {
    return new Promise<string>(async (resolve, reject) => {
      setIsLoading(true);

      const storageRef = ref(
        storage,
        "images/" + user?.id + "-" + file.name + new Date().getTime()
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      try {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setProgress(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (err) => {
            console.log(err.message);
            setIsLoading(false);

            switch (err.code) {
              case "storage/unauthorized":
                break;

              case "storage/canceled":
                break;

              case "storage/unknown":
                break;
            }
            reject(err);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setIsLoading(false);
              resolve(downloadURL);
            } catch (err) {
              console.error("Error during getDownloadURL:", err);
              reject(err);
            }
          }
        );
      } catch (err) {
        console.error("Error during upload:", err);
        reject(err);
      }
    });
  };

  const deleteImage = (fileName: string) => {
    return new Promise<void>((resolve, reject) => {
      const fileRef = ref(storage, fileName);

      deleteObject(fileRef)
        .then(() => {
          console.log("File deleted successfully");
          resolve();
        })
        .catch((error) => {
          console.error("Error deleting file:", error);
          reject(error);
        });
    });
  };

  return { upload, isloading, progress, deleteImage };
};

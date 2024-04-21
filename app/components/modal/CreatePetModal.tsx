import React, { forwardRef, useMemo, useRef, useState } from "react";
import PCModal, { PCModalProps } from ".";
import { useUser } from "@/app/hooks/useUser";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { theme } from "@/app/theme";
import toast from "react-hot-toast";
import { useUploadImage } from "@/app/hooks/useUploadImage";
import PCSelect from "../select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const STEPS = [
  "Breed & Gender",
  "Basic Information",
  "Advance information",
  "Finish!",
];

import { PetTypeType, SEX_TYPE } from "@/app/types/user";
import * as yup from "yup";
import { useListPetType } from "@/app/services/petType";
import { capitalize, snakeCase } from "lodash";
import PCTextField from "../textfield";
import { useAddPet } from "@/app/services/petProfile";

const CreatePetModal = forwardRef<any, Omit<PCModalProps, "children">>(
  ({ ...props }, ref) => {
    const { user } = useUser();
    const [step, setStep] = useState(1);
    const [image, setImage] = useState<File | null>(null);

    const { mutate, isLoading } = useAddPet();
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    const { data, isLoading: isListPetTypeLoading } = useListPetType();
    const { upload } = useUploadImage();

    const petsByType = useMemo(() => {
      if (!data || !data.length) return {};

      return data.reduce<{ [key: string]: PetTypeType[] }>((acc, pet) => {
        if (acc[pet.type]) {
          acc[pet.type].push(pet);
        } else {
          acc[pet.type] = [pet];
        }
        return acc;
      }, {});
    }, [data?.length]);

    const [loves, setLoves] = React.useState({
      dry: true,
      wet: false,
      fresh: false,
      cooked: false,
      seafood: true,
      fruits: true,
      meat: false,
      raw: false,
    });

    const [characteristic, setCharacteristic] = React.useState({
      isFriendlyWithDog: false,
      isFriendlyWithCat: false,
      isFriendlyWithKid: false,
      isCleanProperly: false,
      isHyperactive: false,
      isShy: false,
    });

    const schema = yup.object().shape({
      name: yup.string().required("This field is required"),
      type: yup.string().required("This field is required"),
      pet_type_id: yup.number().required("This field is required"),
      sex: yup.mixed<SEX_TYPE>().required("This field is required"),
      birthday: yup
        .date()
        .required("This field is required")
        .typeError("Invalid date!")
        .max(new Date(), "Must less than current date"),
      description: yup.string().required("This field is required"),
    });

    const {
      watch,
      register,
      handleSubmit,
      getValues,
      reset,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
      mode: "onSubmit",
    });

    const handleChangeLoves = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoves({
        ...loves,
        [event.target.name]: event.target.checked,
      });
    };
    const handleChangeCharacteristic = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setCharacteristic({
        ...characteristic,
        [event.target.name]: !!event.target.value,
      });
    };

    const handleClose = () => {
      props?.onClose?.({}, "escapeKeyDown");
      reset();
    };

    const handleNextStep2 = () => {
      if (!!getValues("pet_type_id") && !!getValues("sex")) setStep(2);
      else toast.error("You need to fill all values.");
    };

    const handleNextStep3 = () => {
      if (!!getValues("name") && !!getValues("birthday") && !!image) setStep(3);
      else toast.error("You need to fill all values.");
    };

    const handleAddImage = (event: any) => {
      setImage(event.target.files[0]);
    };

    const onSubmit = async (values: any) => {
      const favoriteFood = Object.keys(loves)
        .filter((key) => loves[key])
        .join(",");

      if (image) {
        const imageToUpload = await upload(image);

        if (imageToUpload) {
          const dataToSubmit = {
            ...values,
            ...characteristic,
            favoriteFood,
            image: imageToUpload,
          };
          mutate(dataToSubmit, {
            onSuccess: () => {
              setStep(4);
            },
          });
        }
      }
    };

    if (!user?.name || isListPetTypeLoading) return null;

    return (
      <PCModal
        onClose={() => {
          handleClose();
          step != 4 ? undefined : window.location.reload();
        }}
        containerProps={{
          sx: {
            width: theme.spacing(94),
          },
        }}
        title="Create your new pet’s profile"
        {...props}
      >
        <>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={step - 1} alternativeLabel>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel>
                    <Typography variant="title4" fontWeight={300}>
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          {step === 1 && (
            <>
              <Box display="flex" gap={2} justifyContent="space-between" my={5}>
                <PCSelect
                  inputProps={{ ...register("type") }}
                  fullWidth
                  label="Type of pet"
                  options={Object.keys(petsByType).map((item) => ({
                    value: item,
                    label: capitalize(item),
                  }))}
                />
                <PCSelect
                  inputProps={{ ...register("pet_type_id") }}
                  fullWidth
                  label="Breed"
                  options={
                    watch("type")
                      ? petsByType[watch("type")].map((item) => ({
                          value: item.id,
                          label: capitalize(item.name),
                        }))
                      : petsByType[Object.keys(petsByType)[0]].map((item) => ({
                          value: item.id,
                          label: capitalize(item.name),
                        }))
                  }
                />
                <PCSelect
                  inputProps={{ ...register("sex") }}
                  fullWidth
                  label="Gender"
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]}
                />
              </Box>
              <Box textAlign="right" mb={5}>
                <Button
                  sx={{ minWidth: 200 }}
                  endIcon={<ArrowForwardIosIcon />}
                  variant="contained"
                  color="primary"
                  onClick={handleNextStep2}
                >
                  Next
                </Button>
              </Box>
              <Image
                src="/createPet1.png"
                alt="Step1"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </>
          )}

          {step === 2 && (
            <>
              <Box display="flex" gap={2} justifyContent="space-between" my={5}>
                <Box width={250}>
                  <PCTextField
                    inputProps={{ ...register("name") }}
                    label="Name"
                    placeholder="Your pet's name"
                    fullWidth
                  />
                  <PCTextField
                    inputProps={{ ...register("birthday") }}
                    containerProps={{ sx: { mt: 2 } }}
                    type="date"
                    label="Date of birth"
                    fullWidth
                  />
                  <PCTextField
                    inputProps={{ ...register("description") }}
                    label="Description"
                    placeholder="Your pet's description"
                    fullWidth
                  />
                </Box>
                <Box
                  onClick={() => imageInputRef.current?.click()}
                  flex={1}
                  borderRadius={2}
                  overflow="hidden"
                  border="1px dashed"
                  borderColor={theme.palette.grey[500]}
                  bgcolor={theme.palette.grey[200]}
                  display="grid"
                  sx={{ placeItems: "center", cursor: "pointer" }}
                  height={300}
                  maxHeight={300}
                  position="relative"
                >
                  {image && URL.createObjectURL(image) ? (
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="Step1"
                      fill
                      objectFit="contain"
                    />
                  ) : (
                    <Typography
                      variant="title4"
                      color={theme.palette.grey[500]}
                    >
                      Click to select
                    </Typography>
                  )}
                </Box>
                <input
                  ref={imageInputRef}
                  type="file"
                  onChange={handleAddImage}
                  accept="image/png, image/jpeg"
                  style={{ display: "none" }}
                />
              </Box>
              <Box textAlign="right" mb={5}>
                <Button
                  sx={{ minWidth: 200 }}
                  endIcon={<ArrowForwardIosIcon />}
                  variant="contained"
                  color="primary"
                  onClick={handleNextStep3}
                >
                  Next
                </Button>
              </Box>
            </>
          )}

          {step === 3 && (
            <>
              <Box>
                <Typography variant="title4">Favorite Food</Typography>

                <FormControl
                  required
                  sx={{
                    width: "100%",
                    m: 3,
                  }}
                  variant="standard"
                >
                  <FormGroup
                    sx={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "repeat(6,1fr)",
                      gap: 2,
                    }}
                  >
                    {Object.keys(loves).map((item) => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                            checked={loves[item]}
                            onChange={handleChangeLoves}
                            name={item}
                          />
                        }
                        label={capitalize(item)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Box>

              <Box>
                <Typography variant="title4">Characteristic</Typography>

                {Object.keys(characteristic).map((item) => (
                  <FormControl
                    key={item}
                    required
                    sx={{
                      width: "100%",
                      m: 3,
                    }}
                    variant="standard"
                  >
                    <FormGroup>
                      <Box>
                        <FormLabel>
                          {capitalize(snakeCase(item)).replaceAll("_", " ")}
                        </FormLabel>
                        <RadioGroup
                          name={item}
                          defaultValue={false}
                          onChange={handleChangeCharacteristic}
                        >
                          <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      </Box>
                    </FormGroup>
                  </FormControl>
                ))}
              </Box>
              <Button
                disabled={isLoading}
                sx={{ minWidth: 200 }}
                endIcon={<ArrowForwardIosIcon />}
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Create
              </Button>
            </>
          )}

          {step === 4 && (
            <Box textAlign="center">
              <Image
                src="/createPet4.png"
                alt="Success"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: 500,
                }}
                objectFit="cover"
              />
              <Box py={2}>
                <Typography variant="title4">
                  Awesome! You have successfully created a pet profile.
                </Typography>
              </Box>
              <Button variant="contained" color="primary">
                Go to {getValues("name")}&apos;s profile
              </Button>
            </Box>
          )}
        </>
      </PCModal>
    );
  }
);

CreatePetModal.displayName = "CreatePetModal";

export default CreatePetModal;

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import useStatus from "../../hooks/useStatus";
import { useState } from "react";
import { patchChangeUserPic } from "../../api/AuthController";
import { useDispatch } from "react-redux";
import { AuthSliceActions } from "../../state/AuthSlice";

const AddProfilePic: React.FC = () => {
  const {
    setStatus,
    status: { hasError, isLoading, statusText },
  } = useStatus();
  const dispatch = useDispatch();

  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [prevImg, setPrevImg] = useState("");
  const userUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImg(e.target?.files![0]!);
    setPrevImg(URL.createObjectURL(e.target?.files![0]!));
  };

  const savePicHandler = async () => {
    setStatus({ hasError: false, isLoading: true, statusText: "" });
    if (!selectedImg) return;
    const form = new FormData();
    form.append("image", selectedImg);
    const result = await patchChangeUserPic(form);
    if (result.ok && result.imgPath)
      dispatch(AuthSliceActions.changeUserPic({ imgPath: result.imgPath }));

    setStatus({ hasError: !result.ok, isLoading: false, statusText: result.message });
  };

  return (
    <>
      <Typography variant='h4'>Add Profile Picture</Typography>
      <Typography variant='h6'>Select a photo as a new Profile Picture</Typography>
      <Button
        variant='outlined'
        component='label'
        color='info'
        sx={{ my: 2, minHeight: "59px", fontWeight: "bold" }}
      >
        Upload Here
        <input type='file' hidden onChange={userUpload} accept='image/*' />
        {!!prevImg && (
          <Avatar
            alt='Remy Sharp'
            src={prevImg || "https://i.ibb.co/LxryDqs/default.png"}
            sx={{ width: 36, height: 36, marginLeft: "20px" }}
          />
        )}
      </Button>{" "}
      <br />
      <Button
        variant='contained'
        component='label'
        color='success'
        sx={{ display: "inline-block" }}
        onClick={savePicHandler}
      >
        Save
      </Button>
      <b style={{ marginLeft: "10px", color: hasError ? "green" : "red" }}>
        {!isLoading && statusText}
      </b>
    </>
  );
};

export default AddProfilePic;

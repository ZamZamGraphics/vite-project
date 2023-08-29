import { Avatar, Button as Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { createRef, useState } from "react";
import { styled } from "@mui/material/styles";

const BigAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
`;

const AvatarUpload = ({ avaterImage }) => {
  const [image, _setImage] = useState(null);
  const inputFileRef = createRef(null);

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  // const avaterImage = (event) => {
  //   const newImage = event.target?.files?.[0];
  //   if (newImage) {
  //     setImage(URL.createObjectURL(newImage));
  //   }
  // };

  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(null);
    }
  };

  return (
    <>
      <BigAvatar
        alt="Avatar"
        src={image || "/static/img/avatars/default-profile.svg"}
        imgProps={{
          style: {
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "cover",
          },
        }}
      />
      <input
        ref={inputFileRef}
        accept="image/jpg, image/png, image/jpeg"
        hidden
        id="avatar-upload"
        type="file"
        name="avatar"
        onChange={(e) => avaterImage(e)}
      />
      <label htmlFor="avatar-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          sx={{ marginY: 1 }}
          onClick={handleClick}
        >
          {image ? <DeleteIcon mr={2} /> : <CloudUploadIcon mr={2} />}
          {image ? "Remove" : "Upload"}
        </Button>
      </label>
      <Typography variant="caption" display="block" gutterBottom>
        Para obter os melhores resultados, use uma imagem de pelo menos 128 x
        128 pixels no formato .jpg
      </Typography>
    </>
  );
};

export default AvatarUpload;

import { ImageList, ImageListItem, ListSubheader } from "@mui/material";

function Img() {
  return (
    <>
      <ImageList sx={{ width: 500, height: 450 }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div" sx={{ fontWeight: "bold" }}>
            Nossos Produtos
          </ListSubheader>
        </ImageListItem>
      </ImageList>
    </>
  );
}
export default Img;

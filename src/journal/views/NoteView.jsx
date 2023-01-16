import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useRef } from "react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'; 
import { useForm } from "../../hooks/useForm";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";
import { ImageGallery } from "../components";


export const NoteView = () => {


  const dispatch = useDispatch();
  const {active:note, messageSaved, isSaving } = useSelector( state => state.journal );

  const { body, title, onInputChange, formState, date} = useForm( note )
  const fileInputRef = useRef(0); 

  const dateString = useMemo(() => {
    const newDate = new Date ( date );

    return newDate.toUTCString(); 

  }, [ date ])


  
  useEffect(() => {
    console.log({ formState })
    dispatch( setActiveNote( formState ) )
    
  }, [formState])

  useEffect(() => {
    if( messageSaved.length > 0){
     if( messageSaved === "Body can't be empty")
        {
          Swal.fire('Updated failed' , messageSaved, 'error');
        } else {
          Swal.fire('Note updated' , messageSaved, 'success'); }
        }
  
  }, [messageSaved])
   useEffect(() => {
      console.log("console.log()");
       if (messageSaved === "Title can't be empty") {
        
         Swal.fire("Updated failed", messageSaved, "error");
       } 
   }, [messageSaved]);

   const onSaveNote = () => {
      dispatch(startSaveNote()); 
   }

   const onFileInputChange = ({ target }) => {
      if( target.files === 0 ) return; 
      dispatch(startUploadingFiles(target.files) )

   }

   const onDelete = () => {
    dispatch(startDeletingNote()); 
   }
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          { dateString }
        </Typography>
      </Grid>
        <input 
          type="file"
          multiple
          onChange={ onFileInputChange }
          ref= { fileInputRef }
          style={{ display: 'none'}}
        
        />
        <IconButton
          color="primary"
          disabled={ isSaving }
          onClick={ () => fileInputRef.current.click() }
        >
          <UploadOutlined />
        </IconButton>
        

      <Grid item>
        <Button 
        disabled={ isSaving }
        onClick={ onSaveNote }
        color="primary" 
        sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Enter a Title "
          label="Title"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}
          name="body"
          value={ body }
          onChange={ onInputChange }
        />
      </Grid>
      <Grid container justifyContent='end'>
        <Button
          onClick={ onDelete }
          sx={{ mt:2 }}
          color= "error"
        >
          <DeleteOutline />
          Delete
        </Button>

      </Grid>
      <ImageGallery images={ note.imageUrls} />
    </Grid>
  );
}

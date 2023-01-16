import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '', 
        notes: [],
        active: null, 
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], 
        // }
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving= true;
        },
        addNewEmptyNote: (state, action ) => { 
            state.notes.push( action.payload ); 
            state.isSaving = false; 
        },
        setActiveNote: (state, action ) => { 
            state.active = action.payload; 

        },
        setNotes: (state, action) => {
            state.notes = action.payload ; 
            state.messageSaved = ""; 
        },
        setSaving: ( state ) =>{ 
            state.isSaving = true; 
            state.messageSaved = ''; 
            // TODO : D: 
        },
        updateNote: (state, action) => {
            state.isSaving = false; 

            if (action.payload.title.trim().length < 1 ) {
                console.log("hagzel"); 
              state.messageSaved = "Title can't be empty"; 
            } else if (action.payload.body.trim().length < 1) {
                console.log("hagzel2"); 
              state.messageSaved = "Body can't be empty";
            } else {
              state.notes = state.notes.map((note) => {
                if (note.id === action.payload.id) {
                  return action.payload;
                }
                return note;
              });
              console.log("hagzel3"); 
              state.messageSaved = `${action.payload.title}, was correctly updated`;
            }
        },
        setPhotosToActiveNot: ( state, action) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload],
            state.isSaving = false; 
        },

        clearNotesLogout: (state) => {
            state.isSaving= false; 
            state.messageSaved= ''; 
            state.notes= []; 
            state.active = null; 
        },

        deleteNoteById: (state, action) => {
            state.active = null; 
            state.notes = state.notes.filter( note =>  note.id !== action.payload )
        }


    }
});
// Action creators are generated for each case reducer function
export const { addNewEmptyNote,
setActiveNote,
setNotes,
setSaving,
updateNote,
deleteNoteById,
savingNewNote,
setPhotosToActiveNot,
clearNotesLogout,
} = journalSlice.actions;
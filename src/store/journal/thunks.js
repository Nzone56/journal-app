import { async } from '@firebase/util';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers/fileUpload';
import { loadNotes } from '../../helpers/loadNotes';

import { addNewEmptyNote, deleteNoteById, savingNewNote, setNotes, setPhotosToActiveNot, setSaving, updateNote } from './JournalSlice';

export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( savingNewNote() ); 
        
        const { uid } = getState().auth; 

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(), 
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ))
        await setDoc( newDoc, newNote); 

        newNote.id = newDoc.id 

        dispatch(addNewEmptyNote(newNote )); 
       

    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth; 
        if (!uid) throw new Error("UID does not exist"); 

       const  notes  = await loadNotes( uid ); 

       dispatch(setNotes( notes )); 
    } 
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {
         dispatch( setSaving( ) )
         
         const { uid } = getState().auth; 
         const { active: note} = getState().journal; 

         
         if (note.title.trim().length >= 1 && note.body.trim().length >= 1) {
            console.log("saved"); 
            const noteToFireStore = { ...note };
            delete noteToFireStore.id;
            console.log(noteToFireStore);
            const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
            await setDoc(docRef, noteToFireStore, { merge: true });
         }

        dispatch( updateNote( note )); 

    }
}


export const startUploadingFiles = (files = [] ) => {
    return async( dispatch ) => {

        dispatch(setSaving()); 
        const fileUploadPromises = []; 
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file))
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        dispatch( setPhotosToActiveNot(photosUrls) ); 
        
    }
}

export const startDeletingNote = () => {
    return async ( dispatch, getState) => {

        const { uid } = getState().auth;
        const{ active: note } = getState().journal; 

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id}`); 
        await deleteDoc( docRef ); 

        dispatch( deleteNoteById( note.id )); 

    }
}
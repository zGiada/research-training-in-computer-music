import React, { useState, useEffect } from 'react';

export default function AppState() {
    
    const [allNotes, setAllNotes] = useState([{ noteID: 1, noteTitle: 'Item1', noteText: 'First lab' }, { noteID: 2, noteTitle: 'Item2', noteText: 'idk' }])
    const [note, setNote] = useState({})
    const AppState = {
        allNotes, setAllNotes,
        note, setNote
    };

    return <AppNavigation AppState={AppState} />;
}
// import React from 'react'

import { useState } from "react";

export const Input = ({ onSubmit }: { onSubmit: (title: string) => void }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = () => {
        onSubmit(title);
        setTitle("");
    }
  return (
    <div>

        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={handleSubmit}>Add</button>
    </div>
  )
}

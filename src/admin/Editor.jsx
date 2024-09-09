import { useState } from 'react';
import JoditEditor from 'jodit-react';

const Example = () => {
    const [editorValue, setEditorValue] = useState('');
    return (
        <div className='w-100'>
            <JoditEditor value={editorValue} onChange={(value) => setEditorValue(value)} />
        </div>
    )
}

export default Example;
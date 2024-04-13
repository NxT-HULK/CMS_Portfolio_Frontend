import { useState } from 'react';
import JoditEditor from 'jodit-react';

const Example = () => {
    const [editorValue, setEditorValue] = useState('');

    return (
        <div className='container py-5'>
            <JoditEditor value={editorValue} onChange={(value) => setEditorValue(value)} />
        </div>
    );
};

export default Example;
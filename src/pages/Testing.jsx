import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Component = () => {
    const codeString =
   `import SyntaxHighlighter from 'react-syntax-highlighter';
    import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
    
     const Component = () => {
         const codeString = '(num) => num + 1';
         return (
             <SyntaxHighlighter language="javascript" style={docco}>
                 {codeString}
             </SyntaxHighlighter>
         );
     };
    `



    return (
        <div className="my-5">

            <div className="rounded-3 overflow-hidden">
                <div className='flex justify-content-between px-4 text-white align-items-center bg-dark py-2'>
                    <p className='mb-0'>Example Code</p>

                </div>

                <SyntaxHighlighter
                    language="jsx"
                    style={atomOneDark}
                    customStyle={{
                        padding: '25px',
                        marginBottom: 0
                    }}
                    showLineNumbers={true}
                    wrapLongLines={true}
                >
                    {codeString}
                </SyntaxHighlighter>
            </div>

        </div>
    );
};

export default Component
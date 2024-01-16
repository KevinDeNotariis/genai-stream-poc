import { Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const decoder = new TextDecoder();

const Typewriter = ({ text, delay }: any) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prevText) => prevText + text[currentIndex]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    return <ReactMarkdown children={currentText} />;
};

export default () => {
    const [answer, setAnswer] = useState('');

    const generateAnswer = async () => {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080');

        const reader = response.body?.getReader();

        if (reader) {
            while (true) {
                const { done, value } = await reader?.read();

                if (done) {
                    break;
                }

                setAnswer((curr) => curr + decoder.decode(value));
            }
        }
    };

    return (
        <Stack
            spacing={2}
            style={{
                width: '1000px',
            }}
        >
            <Button onClick={generateAnswer}>Click Me</Button>
            <Typewriter text={answer} delay={5} />
        </Stack>
    );
};

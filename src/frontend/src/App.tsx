import { ChangeEvent, useRef, useState } from "react";
import styles from "./App.module.css";
import "./App.css";
import { Delete } from "../wailsjs/go/main/SourceCode";

function App() {
    const [deletedSourceText, setDeletedSourceText] = useState("");
    const [inputSourceText, setInputSourceText] = useState("");
    const updateName = (e: any) => setInputSourceText(e.target.value);
    const updateResultText = (result: string) => {
        setDeletedSourceText(result);
        setInputSourceText(result);
    };

    function deleteComment() {
        Delete(inputSourceText || "").then(updateResultText);
    }
    const textAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputSourceText(event.target.value);
        setDeletedSourceText(event.target.value);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(deletedSourceText);
        } catch (err) {
            console.error("クリップボードにコピーできませんでした", err);
        }
    };

    return (
        <div className={styles.mainDiv}>
            <div className={styles.textDiv}>
                <textarea
                    className={styles.textArea}
                    onChange={textAreaChange}
                    value={deletedSourceText}
                ></textarea>
            </div>
            <div className={styles.buttonArea}>
                <button className={styles.button} onClick={deleteComment}>
                    delete
                </button>
                <button className={styles.button} onClick={handleCopy}>
                    copy
                </button>
            </div>
        </div>
    );
}

export default App;

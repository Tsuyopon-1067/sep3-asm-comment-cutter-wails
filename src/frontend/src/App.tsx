import { ChangeEvent, useState } from "react";
import styles from "./App.module.css";
import "./App.css";
import { Delete } from "../wailsjs/go/main/SourceCode";
import DeleteIcon from "./assets/images/deleteIcon.png";
import CopyIcon from "./assets/images/copyIcon.png";
import CopyCheckIcon from "./assets/images/copyCheckIcon.png";

function App() {
    const [deletedSourceText, setDeletedSourceText] = useState("");
    const [inputSourceText, setInputSourceText] = useState("");

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
        setAttentionStyle({
            transform: "rotateY(0deg)",
        });
    };

    const onMouseLeave = () => {
        setAttentionStyle({
            transform: "rotateY(180deg)",
        });
    };

    function sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const [attentionStyle, setAttentionStyle] = useState<React.CSSProperties>({
        transform: "rotateY(180deg)",
    });

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
                <button
                    className={`${styles.button} ${styles.deleteButton}`}
                    onClick={deleteComment}
                >
                    <div className={styles.buttonText}>
                        <img className={styles.buttonIcon} src={DeleteIcon} />
                        delete
                    </div>
                </button>
                <button
                    className={`${styles.button} ${styles.copyButton}`}
                    onClick={handleCopy}
                >
                    <div className={styles.buttonText}>
                        <img className={styles.buttonIcon} src={CopyIcon} />
                        copy
                    </div>
                </button>
                <div
                    className={styles.clipBoardAttention}
                    style={attentionStyle}
                    onMouseLeave={onMouseLeave}
                >
                    <img
                        className={styles.clipBoardAttentionIcon}
                        src={CopyCheckIcon}
                    />
                    copied!
                </div>
            </div>
        </div>
    );
}

export default App;

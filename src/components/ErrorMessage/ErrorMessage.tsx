import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return <p className={styles.text}>{message}</p>;
};

export default ErrorMessage;
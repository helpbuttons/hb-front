import dateFormat from "dateformat";

export default function DateTimeFormat({ datetime }) {
    return (
        dateFormat(datetime, "dddd, mmmm dS, yyyy, HH:MM:ss")
    );
}
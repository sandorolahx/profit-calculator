export interface Props {
    disabled?: boolean;
    checked: boolean;
    label?: string;
    onChanged?: (value: boolean) => void;
}

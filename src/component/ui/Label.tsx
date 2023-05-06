import Select from "./Select";
import { ILabel } from "../../interface/app.interface";

export default function Label({ title, error, selected, setSelected, options, children, setFlag }: ILabel) {
    return (
        <div className='form__label'>
            {children}
            <p className='form__title'>{title}</p>
            {error &&
                <div className='form__error'>
                    Поле не может быть пустым
                </div>
            }
            <Select title={title} selected={selected} setSelected={setSelected} options={options} setFlag={setFlag} />
        </div>
    )
}
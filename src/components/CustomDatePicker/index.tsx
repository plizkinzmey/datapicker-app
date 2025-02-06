import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU';
import './styles.css';

interface CustomDatePickerProps {
  onChange?: (date: Dayjs | null, dateString: string | string[]) => void;
}

const CustomDatePicker = ({ onChange }: CustomDatePickerProps) => {
  const handleChange = (date: Dayjs | null, dateString: string | string[]) => {
    if (onChange) {
      onChange(date, dateString);
    }
  };

  return (
    <div className="custom-datepicker-wrapper">
      <DatePicker 
        locale={locale} 
        onChange={handleChange}
        showToday={false}
        getPopupContainer={trigger =>
          trigger.parentElement ? trigger.parentElement : document.body
        }
        superPrevIcon={null}
        superNextIcon={null}
      />
    </div>
  );
};

export default CustomDatePicker;

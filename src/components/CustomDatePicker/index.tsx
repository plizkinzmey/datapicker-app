import React from 'react';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU';
import './styles.css';

interface CustomDatePickerProps {
  onChange?: (date: Dayjs | null, dateString: string | string[]) => void;
}

const CustomDatePicker = ({ onChange }: CustomDatePickerProps) => {
  const [mode, setMode] = React.useState<'date' | 'month' | 'year'>('date');

  const handleChange = (date: Dayjs | null, dateString: string | string[]) => {
    if (onChange) {
      onChange(date, dateString);
    }
  };

  const handlePanelChange = (_: Dayjs | null, newMode: string) => {
    if (newMode === 'decade') {
      // Оставляем режим year при попытке переключения на decade
      setMode('year');
    } else {
      setMode(newMode as 'date' | 'month' | 'year');
    }
  };

  return (
    <div className="custom-datepicker-wrapper">
      <DatePicker 
        locale={locale} 
        onChange={handleChange}
        onPanelChange={handlePanelChange}
        mode={mode}
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

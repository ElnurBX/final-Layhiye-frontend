import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './Calendar.scss'; 

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

const disabledDate = (current) => {
 
  return current && current < dayjs().endOf('day');
};

const Calendar = () => {
  return (
    <Space direction="vertical" size={12} className="custom-range-picker">
      <RangePicker
        format={dateFormat}
        disabledDate={disabledDate}
      />
    </Space>
  );
};

export default Calendar;

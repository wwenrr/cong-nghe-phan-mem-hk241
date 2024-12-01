import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function FormData(props: {
  brand: string,
  model: string,
  description: string,
  location: string,
  status: string,
  price: number,
  discountpercent: number,
  deleted: boolean,
  cs: number,
  disabled: boolean
}) {
  // Sử dụng useState để lưu trữ các giá trị nhập vào
  const [formValues, setFormValues] = useState({
    brand: props.brand,
    model: props.model,
    description: props.description,
    location: props.location,
    status: props.status,
    price: props.price,
    discountpercent: props.discountpercent,
    cs: props.cs,
  });

  // Hàm xử lý khi người dùng thay đổi giá trị input

  // Danh sách các trường trong props
  const fields = [
    { label: 'Brand', value: formValues.brand, type: 'text' },
    { label: 'Model', value: formValues.model, type: 'text' },
    { label: 'Description', value: formValues.description, type: 'text' },
    { label: 'Location', value: formValues.location, type: 'text' },
    { label: 'Status', value: formValues.status, type: 'text' },
    { label: 'Price', value: formValues.price, type: 'number' },
    { label: 'Discount Percent', value: formValues.discountpercent, type: 'number' },
    { label: 'CS', value: formValues.cs, type: 'number' },
  ];

  return (
    <>
      {fields.map((field, index) => (
        <Box sx={{ marginBottom: 2 }} key={index}>
          <TextField 
            fullWidth 
            label={field.label}
            defaultValue={field.value} // Liên kết với giá trị từ state
            disabled={props.disabled}
            variant="outlined" 
            type={field.type} // Thiết lập kiểu dữ liệu cho input
            inputProps={{ 
              style: { 
                fontSize: '16px', 
                color: 'black',
                fontWeight: 'bold',
              } 
            }}
          />
        </Box>
      ))}
    </>
  );
}

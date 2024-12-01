'use client';

import PageTitle from "@/assessts/components/PageTitle";
import Cookies from 'js-cookie';
import FormData from "../../formData";
import { useEffect, useState } from "react";
import { fetch_printer_detail } from "@/assessts/function/fetch";
import { Button } from "@mui/material";

export default function EditPrinter({params}: {params: { id: string }}) {
  console.log(params.id);
  
  const [usePrinterDetail, setPrinterDetail] = useState<any>(null);

  useEffect(() => {
    async function get_printer_detail() {
      const token = Cookies.get('token');
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const result = await fetch_printer_detail(token, params.id);
        setPrinterDetail(result['printer']);  // Cập nhật trạng thái với dữ liệu máy in lấy được
      } catch (e) {
        console.log("Lỗi: ", e);
        window.location.href = "/login";  // Nếu có lỗi, chuyển hướng tới trang đăng nhập
      }
    }

    get_printer_detail(); // Gọi hàm lấy chi tiết máy in
  }, []); // useEffect chạy một lần khi component được mount

  // Hiển thị form chỉ khi chi tiết máy in đã được tải
  if (!usePrinterDetail) {
    return <div>Đang tải...</div>;  // Hiển thị trạng thái tải khi chờ dữ liệu
  }

  return (
    <>
      <form>
        <FormData 
          brand={usePrinterDetail.brand}
          model={usePrinterDetail.model}
          description={usePrinterDetail.description}
          location={usePrinterDetail.location}
          status={usePrinterDetail.status}
          price={usePrinterDetail.price}
          discountpercent={usePrinterDetail.discountpercent}
          deleted={usePrinterDetail.deleted}
          cs={usePrinterDetail.cs}
          disabled={true}
        />
      </form>
      
    </>
  );
}

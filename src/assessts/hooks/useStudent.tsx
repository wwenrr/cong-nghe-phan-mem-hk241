import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export async function usePrinter() {
    const [printerData, setPrinterData ] = useState([])
    const token = Cookies.get('token')
    let printer
    try {
        //@ts-ignore
        const result = await fetch_printer(token);
        printer = result['listPrinter']
    } catch(e) {
        //@ts-ignore
        console.log("Lỗi: ", e);
        
        // window.location.href = "/login"
    }

    setPrinterData(printer)
    return { printerData }
}
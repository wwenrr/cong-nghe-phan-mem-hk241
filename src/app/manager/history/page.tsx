'use client'

import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { get_all_history } from "@/assessts/function/fetch"
import { DataGrid } from "@mui/x-data-grid"

export default function Page() {
    const [data, setData] = useState(null)

    async function foo() {
        const token = Cookies.get('token')

        try {
            if(token) {
                const data = await get_all_history(token)
                console.log(data);
                setData(data['historys'])
            }
        } catch(e) {

        }
    }

    useEffect(() => {
        foo()
    }, [])

    const columns = [
        { field: "accountId", headerName: "Account ID", flex: 1, sortable: false },
        { field: "balancePaperNew", headerName: "Balance Paper", flex: 1, sortable: false },
        { field: "createdAt", headerName: "Created At", flex: 1, sortable: false },
        { field: "cs", headerName: "CS", flex: 1, sortable: false },
        { field: "expireAt", headerName: "Expire At", flex: 1, sortable: false },
        { field: "linkPath", headerName: "Link Path", flex: 1, sortable: false },
        { field: "location", headerName: "Location", flex: 1, sortable: false },
        { field: "pages", headerName: "Pages", flex: 1, sortable: false },
        { field: "printerId", headerName: "Printer ID", flex: 1, sortable: false },
        { field: "status", headerName: "Status", flex: 1, sortable: false },
        { field: "totle", headerName: "Total", flex: 1, sortable: false },
        { field: "updatedAt", headerName: "Updated At", flex: 1, sortable: false },
    ];

    if(data)
        return(
            <>
                <DataGrid
                    rows={
                        //@ts-ignore
                        data.map(
                            //@ts-ignore
                            (account) => ({ ...account, id: account._id }))}
                    columns={columns}
                    sx={{
                        width: "100%",
                        height: "100%",
                        background: 'linear-gradient(135deg, #fff, #F1F0E8)', 
                        overflow: "hidden",
                        "& .MuiDataGrid-columnHeaders": {
                            // backgroundColor: "#00796b", 
                            // color: "#0a638f", 
                            fontSize: "1.4rem", 
                            fontWeight: "bold",
                        },
                        "& .MuiDataGrid-cell": {
                            // backgroundColor: "#8ddde9",
                            fontSize: "1.4rem", 
                        },
                        "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
                            display: "none",
                        },
                        "& .MuiDataGrid-root": {
                            overflowX: "hidden", 
                        },
                    }}
                />
            </>
        )
}
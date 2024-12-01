'use client'
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { get_all_account } from "@/assessts/function/fetch";
import { DataGrid } from "@mui/x-data-grid";

export default function Page() {
    const [data, setData] = useState(null)

    async function getData() {
        const token = Cookies.get('token')

        if(token) {
            const res = await get_all_account(token)
            setData(res['accounts'])
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const columns = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "phone", headerName: "Phone", flex: 1 },
        { field: "role", headerName: "Role", flex: 1 },
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
                    rowsPerPageOptions={[5, 10]}
                    disableSelectionOnClick
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
import Cookies from "js-cookie";

const url:string = 'https://cnpmbe.hcmutssps.id.vn/api'

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Call form client side
export async function fetch_otp_api(email:string) {
    await sleep(500);

    return fetch(`${url}/account/otp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": email
        })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Có lỗi xảy ra');
                });
            }
            return response.json();
        })
        .then(data => {
            if(data['code'] == 'error')
                throw new Error(data['msg'])
            return data;
        })
}

//Call form client side
export async function fetch_register_api(formData:any) {
    await sleep(500);    
    
    return fetch(`${url}/account/register`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "email": formData['email'],
            "password": formData['password'],
            "name": formData['name'],
            "phone": formData['phone'],
            "otp": formData['otp'].toString()
        })
    })
        .then(
            response => {
                if(!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Có lỗi xảy ra');
                    });
                }

                return response.json()
            }
        )
        .then(data => {
            if(data['code'] == 'error') {
                throw new Error(data['msg'])
            }

            return data
        })
}

//Call form client side
export async function fetch_login(formData:any) {
    await sleep(1000);

    return fetch(`${url}/account/login`, {
        method: "POST",
        body: JSON.stringify({
            'email': formData['email'],
            'password': formData['password']
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(
        response => {
            if(!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Có lỗi xảy ra');
                });
            }

            return response.json()
        }
    )
    .then(data => {
        if(data['code'] !== 'success') {
            throw new Error(data['code'])
        }

        return data
    })
}

//Call form server side
export async function fetch_account(token:string | null, userAgent:string) {    
    return fetch(`${url}/account`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'user-agent': userAgent,
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {

                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        // Kiểm tra nếu phản hồi có phải JSON không
        return response.json();
    })
    .then(data => {
        if(data['code'] !== 'success') {
            throw new Error(data['msg'])
        }

        return data
    })    
}

// Student
export async function fetch_printer(token:string) {
    return fetch(`${url}/printer`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {

                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        // Kiểm tra nếu phản hồi có phải JSON không
        return response.json();
    })
    .then(data => {
        return data
    }) 
}

export async function fetch_file_list(token:string) {
    return fetch(`${url}/file`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {

                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        // Kiểm tra nếu phản hồi có phải JSON không
        return response.json();
    })
    .then(data => {
        return data
    }) 
}

export async function upload_file(token:string, formdata:FormData) {
    return fetch(`${url}/file`, {
        method: 'POST', 
        body: formdata,
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {

                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        // Kiểm tra nếu phản hồi có phải JSON không
        return response.json();
    })
    .then(data => {
        return data
    }) 
}

export async function delete_file(token:string, id:string) {
    return fetch(`${url}/file/${id}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {

                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        // Kiểm tra nếu phản hồi có phải JSON không
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data
    }) 
}

export async function get_wallet(token:string) {
    return fetch(`${url}/e-wallet`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {

                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        // Kiểm tra nếu phản hồi có phải JSON không
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data
    }) 
}

export async function get_history(token:string) {
    return fetch(`${url}/history`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {

                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        // Kiểm tra nếu phản hồi có phải JSON không
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data
    }) 
}

export async function donate_money(token:string, value:number) {
    await sleep(3000);

    return fetch(`${url}/e-wallet/change`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
            'type': 'add',
            'value': value
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {

                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data
    }) 
}

export async function print_file(token:string, printer_id:string, file_id:string) {
    await sleep(1000);

    return fetch(`${url}/printer`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
            "printerId": printer_id,
            "fileId": file_id
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {

                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data
    }) 
}

export async function buy_paper(token:string, papers:number) {
    await sleep(1000);

    return fetch(`${url}/e-wallet/buy`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
            "balancePaper": papers
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {

                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data
    }) 
}

export async function get_info(token:string) {
    return fetch(`${url}/account`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {

                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data
    }) 
}


//Manager
const manager_url = 'https://cnpmbe.hcmutssps.id.vn/manager/api'

export async function get_manager_account(token:string, userAgent:string) {
    return fetch(`${manager_url}/account`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
            'user-agent': userAgent,
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {                
                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        return response.json();
    })
    .then(data => {
        return data
    }) 
}

export async function get_printer(token:string) {
    return fetch(`${manager_url}/printer/all`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {                
                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data
    }) 
}

export async function delete_printer(token:string, printer_id:string) {
    return fetch(`${manager_url}/printer/delete/${printer_id}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {                
                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data
    }) 
}

export async function create_function(token:string, formdata:any) {
    return fetch(`${manager_url}/printer/create`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
            "brand": formdata['brand'],
            "model": formdata['model'],
            "description": formdata['description'],
            "location": formdata['location'],
            "status": formdata['status'],
            "type": formdata['type'],
            "deleted": formdata['deleted'],
            "cs": formdata['cs']
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {                
                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data
    }) 
}

export async function change_printer_props(token:string, formdata:any, id:string) {
    return fetch(`${manager_url}/printer/changeAll/${id}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
            [formdata['label']]: formdata['data']
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {                
                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data
    }) 
}

export async function get_all_printer(token:string) {
    return fetch(`${manager_url}/file`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {                
                //@ts-ignore
                throw new Error(errorData.message || 'Có lỗi xảy ra');
            });
        }
    
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data
    }) 
}
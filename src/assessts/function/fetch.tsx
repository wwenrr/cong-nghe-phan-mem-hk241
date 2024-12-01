import Cookies from "js-cookie";

const url:string = 'https://cnpmbe.hcmutssps.id.vn/api'
const url_manager:string = 'https://cnpmbe.hcmutssps.id.vn/manager/api'

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

export async function fetch_printer_detail(token:string, id: string) {
    return fetch(`${url_manager}/printer/${id}`, {
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
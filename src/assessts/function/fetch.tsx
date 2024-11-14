const url:string = 'https://project-cnpm.onrender.com/api'

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetch_otp_api(email:string) {
    await sleep(1000);

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
            console.log('Dữ liệu nhận được từ API:', data);
            if(data['code'] == 'error')
                throw new Error(data['msg'])
            return data;
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export async function fetch_register_api(formData:any) {
    await sleep(1000);

    console.log(formData);
    console.log(formData['otp'].toString());
    
    
    return fetch(`${url}/account/register`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "email": formData['email'],
            "password": formData['password'],
            "name": 'Guest',
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

            console.log(data);

            return data
        })
        .catch(error => {
            throw new Error(error.message);
        });
}
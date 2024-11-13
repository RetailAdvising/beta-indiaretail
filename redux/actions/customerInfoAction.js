const setCustomerInfo = (data) => {
    return ({
        type: 'Set_CustomerInfo',
        payload: data
    })
}

export default setCustomerInfo;
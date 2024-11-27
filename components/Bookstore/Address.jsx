import { useEffect, useState } from 'react'
import styles from '@/styles/checkout.module.scss';
import { useForm, Controller } from "react-hook-form";
import { get_country_list, get_country_states, insert_address, update_address } from '@/libs/api';
import Select from 'react-select';
import style from '@/styles/Components.module.scss'

export default function Address({ hide, edit_address, modal }) {

  const { handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      first_name: ((edit_address && edit_address.first_name) ? edit_address.first_name : ''),
      last_name: ((edit_address && edit_address.last_name) ? edit_address.last_name : ''),
      state: ((edit_address && edit_address.state) ? edit_address.state : ''),
      city: ((edit_address && edit_address.city) ? edit_address.city : ''),
      country: ((edit_address && edit_address.country) ? edit_address.country : ''),
      custom_company_name: ((edit_address && edit_address.custom_company_name) ? edit_address.custom_company_name : ''),
      custom_gst_no: ((edit_address && edit_address.custom_gst_no) ? edit_address.custom_gst_no : ''),
      phone: ((edit_address && edit_address.phone) ? edit_address.phone : ''),
      pincode: ((edit_address && edit_address.zipcode) ? edit_address.zipcode : ''),
      address: ((edit_address && edit_address.address) ? edit_address.address : '')
    }
  });

  let [countryList, setCounty] = useState([]);
  let [stateList, setState] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});


  useEffect(() => {
    get_country();
  }, [])

  async function get_country() {
    const resp = await get_country_list();
    if (resp && resp.message && resp.message.length != 0) {
      countryList = resp.message;
      setCounty(resp.message);
      get_state(resp.message[0].value);
    }
  }

  async function get_state(selectedCountry) {
    const resp = await get_country_states(selectedCountry);
    if (resp && resp.message && resp.message.length != 0) {
      stateList = resp.message
      setState(resp.message);
      if (edit_address && edit_address.country != '') {
        let formData = {}
        formData.country = countryList.find((res) => { return res.label == edit_address.country })
        formData.state = stateList.find((res) => { return res.label == edit_address.state })
        setValue('country', formData.country);
        setValue('state', formData.state);
        setSelectedValues(formData);
      }
    }
  }

  const onSubmit = (data) => {
    data.zipcode = data.pincode;
    data.addr1 = data.address;
    data.is_default = false;
    data.country = data.country.value;
    data.state = data.state.value;
    data.customer = localStorage['customer_id']
    // hide(data);

    if (edit_address && edit_address.name) {
      data.name = edit_address.name;
      address_update(data)
    } else {
      address_insert(data);
    }
  };

  async function address_insert(data) {
    const resp = await insert_address(data);
    if (resp && resp.message) {
      // console.log(resp.message);
      reset();
      hide(resp.message);
      // customerInfo.address.push(resp.message);
      // setCustomerInfo(customerInfo);
    }
  }

  async function address_update(data) {
    const resp = await update_address(data);
    if (resp && resp.message) {
      // console.log(resp.message);
      reset();
      hide(resp.message);
      // customerInfo.address.push(resp.message);
      // setCustomerInfo(customerInfo);
    }
  }

  const validatePhoneNumber = (value) => {
    if (!value) {
      return 'Phone is required';
    }

    if (value.length !== 10) {
      return 'Phone number must be 10 digits';
    }

    return true; // Validation passed
  };

  const validateZipCode = (value) => {
    if (!value) {
      return 'Zip code is required';
    }

    const isValidZipCode = /^\d{6}$/.test(value);
    if (!isValidZipCode) {
      return 'Zip code must be a 6-digit number';
    }

    return true; // Validation passed
  };

  return (
    <>
      <form className={`${modal ? 'px-[20px]' : null}`} onSubmit={handleSubmit(onSubmit)}>

        <Controller
          name="country"
          control={control}
          rules={{
            required: { value: true, message: "Country is required" },
          }}
          render={({ field }) => (
            <Select
              className={`${styles.custom_input} w-full`}
              placeholder="Country"
              {...field}
              value={
                selectedValues && selectedValues['country']
                  ? selectedValues['country']
                  // ? { value: selectedValues['country'], label: selectedValues['country'] }
                  : null
              }
              options={countryList}
              styles={{
                control: (provided) => ({
                  ...provided,
                  border: 'none',
                  height: '43px',
                }),
                // Other style overrides if needed
              }}
            />
          )}
        />
        {errors.country && <p className={`${style.danger}`}>{errors.country.message}</p>}

        <div className={`box_ flex gap-[10px]`}>
          <div className={`${styles.flex_2} `}>
            <Controller name="first_name" control={control} rules={{ required: 'First Name is required' }} render={({ field }) => (<input className={`${styles.custom_input} w-full`} type="text" placeholder="First name" id="first_name" {...field} />)} />
            {errors.first_name && <p className={`${style.danger}`}>{errors.first_name.message}</p>}
          </div>
          <div className={`${styles.flex_2} `}>
            <Controller name="last_name" control={control} rules={{ required: 'Last Name is required' }} render={({ field }) => (<input className={`${styles.custom_input} w-full`} type="text" placeholder="Last name" id="last_name" {...field} />)} />
            {errors.last_name && <p className={`${style.danger}`}>{errors.last_name.message}</p>}
          </div>
        </div>
        {/* rules={{ required: 'custom_company_name is required' }}  */}
        <Controller name="custom_company_name" control={control} render={({ field }) => (<input className={`${styles.custom_input} w-full`} type="text" placeholder="Company (Optional)" id="custom_company_name" {...field} />)} />
        {errors.custom_company_name && <p className={`${style.danger}`}>{errors.custom_company_name.message}</p>}

        <Controller name="custom_gst_no" control={control} render={({ field }) => (<input className={`${styles.custom_input} w-full`} type="text" placeholder="GST No (Optional)" id="custom_gst_no" {...field} />)} />
        {errors.company && <p className={`${style.danger}`}>{errors.company.message}</p>}

        <Controller name="address" control={control} rules={{ required: 'Address is required' }} render={({ field }) => (<input className={`${styles.custom_input} w-full`} type="text" placeholder="Address" id="address" {...field} />)} />
        {errors.address && <p className={`${style.danger}`}>{errors.address.message}</p>}


        <div className={`box_ flex gap-[10px] flex-wrap md:gap-y-[0px]`}>
          <div className={`${styles.flex_3} md:flex-[0_0_100%]`}>
            <Controller name="city" control={control} rules={{ required: 'City is required' }} render={({ field }) => (<input className={`${styles.custom_input} w-full`} type="text" placeholder="City" id="city" {...field} />)} />
            {errors.city && <p className={`${style.danger}`}>{errors.city.message}</p>}
          </div>

          <div className={`${styles.flex_3} md:flex-[0_0_calc(50%_-_5px)] `}>
            <Controller
              name="state"
              control={control}
              rules={{
                required: { value: true, message: "State is required" },
              }}
              render={({ field }) => (
                <Select
                  className={`${styles.custom_input} w-full`}
                  placeholder="State"
                  {...field}
                  defaultValue={
                    selectedValues && selectedValues['state']
                      ? { value: selectedValues['state'], label: selectedValues['state'] }
                      : null
                  }
                  options={stateList}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: 'none',
                      height: '43px',
                    }),
                    // Other style overrides
                  }}
                />
              )}
            />
            {errors.state && <p className={`${style.danger}`}>{errors.state.message}</p>}
          </div>


          <div className={`${styles.flex_3} md:flex-[0_0_calc(50%_-_5px)]`}>
            <Controller name="pincode" control={control} rules={{ validate: validateZipCode }} render={({ field }) => (<input className={`${styles.custom_input} w-full`} type="text" placeholder="Zip code" id="pincode" {...field} />)} />
            {errors.pincode && <p className={`${style.danger}`}>{errors.pincode.message}</p>}
          </div>

        </div>

        <Controller name="phone" control={control} rules={{ validate: validatePhoneNumber }} render={({ field }) => (<input className={`${styles.custom_input} ${style.input1} w-full`} type="number" placeholder="Phone (Required" id="phone" {...field} />)} />
        {errors.phone && <p className={`${style.danger}`}>{errors.phone.message}</p>}

        <div class="flex mb-[15px] justify-center items-center">
          <button className={`primary_btn text-[14px] h-[40px] w-[50%]`} type="submit" >{(edit_address && edit_address.name) ? 'Update' : 'Save'}</button>
        </div>

      </form>
    </>
  )
}

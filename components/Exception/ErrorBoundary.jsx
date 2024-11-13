import React from 'react'
import Image from 'next/image';
import Link from 'next/link'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, error_message: '' }
    // this.state = {error:''}
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true, error_message: error.message }
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    // console.log({ error, errorInfo })
    // return { error_message: error.message }
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (

        // {/* // lg:absolute lg:top-[50%] lg:left-[50%] lg:transform md:grid md:place-content-center */ }
        < div className='center_div md:grid md:place-content-center md:h-[75vh]' >
          <div className='relative'>
            <Image src={'/error-02.svg'} height={300} width={600} alt='error icon' className='h-[350px] w-full' />
            <div className='absolute top-[40px] right-[18%] md:right-[11%] w-[300px]'>
              <h2 className='text-[14px] font-semibold'>Oops, there is an </h2>
              <span className='text-red text-[18px] py-[10px] font-semibold'>" Error "</span>
              <h1 className='text-red  text-[16px] font-semibold'>{this.state.error_message}</h1>
            </div>
          </div>

          <div className='text-center'>
            <button className='primary_button md:text-[14px] w-[140px] text-[15px] h-[40px] !rounded-full'> <Link href={'/'}>Back To Home</Link></button>
          </div>
          {/* <h6>{this.state.hasError.}</h6> */}
          {/* <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again?
            </button> */}
        </div >

      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary
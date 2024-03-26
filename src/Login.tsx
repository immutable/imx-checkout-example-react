import { passport } from '@imtbl/sdk'
import { useEffect } from 'react'

function Login({passportInstance}: {passportInstance: passport.Passport}) {
  useEffect(() => {
    passportInstance.loginCallback();
  }, [passportInstance])
  return (
    <div>Login</div>
  )
}

export default Login
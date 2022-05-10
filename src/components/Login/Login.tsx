import './Login.scss'
import SharedButton from '@/components/Shared/SharedButton'
import * as yup from 'yup'
import {FieldValues, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useAuthContext, LoginInterface} from '@/ctx/auth'
import {FC, useEffect} from 'react'
import useTranslation from 'next-translate/useTranslation'

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6)
}).required();

export const Login: FC<{authCookie: any}> = ({authCookie}) => {
  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })
  const {t} = useTranslation('login')

  const {login, autoLogin} = useAuthContext()

  useEffect(() => {
    autoLogin(authCookie)
  }, [autoLogin, authCookie])


  const onSubmit = async(data: FieldValues) => {
    await login(data as LoginInterface)
  }

  return (
    <section className="section login">
      <div className="login__wrapper card">
        <h1>{t('helloAdmin')} &#129312;</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <div className="form-control__heading">
              <label htmlFor="emailField">{t('email')}</label>
              <span>{errors.email?.message}</span>
            </div>
            <input
              {...register("email")}
              className={`form-control__input${errors.email ? '_error' : ''}`}
              id="emailField"
              type="text"
            />
          </div>
          <div className="form-control">
            <div className="form-control__heading">
              <label htmlFor="passwordField">{t('password')}</label>
              <span>{errors.password?.message}</span>
            </div>
            <input
              {...register("password")}
              className={`form-control__input${errors.password ? '_error' : ''}`}
              id="passwordField"
              type="password"
            />
          </div>
          <SharedButton type="submit">{t('login')}</SharedButton>
        </form>
      </div>
    </section>
  )
}

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { logIn, signUp } from "../services/authAPI"

type LogInOrSignUp = "logIn" | "signUp"
interface messageComponentProps {
  onClick: () => void
}

export type AuthData = {
  email: string
  password: string
}

const LogInMessage = ({ onClick }: messageComponentProps) => {
  return (
    <p className="text-right">
      Already a user?{" "}
      <button type="button" className="underline" onClick={onClick}>
        LOGIN
      </button>
    </p>
  )
}

const SignUpMessage = ({ onClick }: messageComponentProps) => {
  return (
    <p className="text-right">
            Need an account?{" "}
            <button
              type="button"
              className="underline"
              onClick={onClick}
            >
              SIGN UP
            </button>
          </p>
  )
}

function Auth() {
  const [logInOrSignUp, setLogInOrSignUp] = useState<LogInOrSignUp>("logIn")
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    setEmailInput("")
    setPasswordInput("")
  }, [logInOrSignUp])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if (!emailRegex.test(emailInput)) {
      window.alert("Please enter an email address.")
    } else {
      handleLogInOrSignUp()
    }
  }

  function handleLogInOrSignUp() {
    const data: AuthData = {
      email: emailInput,
      password: passwordInput,
    }

    if (logInOrSignUp === "logIn") {
      logIn(data).then((result) => {
        if (result.details === "로그인에 실패했습니다") {
          window.alert("Invalid email or password.")
        } else if (result.message === "성공적으로 로그인 했습니다") {
          window.localStorage.setItem("userToken", result.token)
          setEmailInput("")
          setPasswordInput("")
          navigate("/")
        }
      })
    } else if (logInOrSignUp === "signUp") {
      signUp(data).then((result) => {
        if (result.details === "이미 존재하는 유저입니다") {
          window.alert("This email address is already registered.")
        } else if (result.message === "계정이 성공적으로 생성되었습니다") {
          window.alert("Thanks for signing up. You can login now.")
          setLogInOrSignUp("logIn")
        }
      })
    }
  }

  return (
    <div>
      <div className="max-w-xs md:max-w-lg mx-auto my-8">
        <h1 className="font-bold text-xl uppercase">{logInOrSignUp}</h1>
        <form className="my-4" onSubmit={(event) => handleSubmit(event)}>
          <div className="flex flex-col mb-2">
            <label htmlFor="emailForLogin">Email</label>
            <input
              type="email"
              id="emailForLogin"
              className="border rounded"
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="passwordForLogin">Password</label>
            <input
              type="password"
              id="passwordForLogin"
              className="border rounded"
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              minLength={8}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-1 my-4 uppercase rounded bg-primary-900 text-white shadow-lg"
          >
            {logInOrSignUp}
          </button>
        </form>
        {logInOrSignUp === "logIn" ? (
          <SignUpMessage onClick={() => setLogInOrSignUp("signup") />
        ) : (
          <LogInMessage onClick={() => setLogInOrSignUp("logIn")} />
          // <p className="text-right">
          //   Already a user?{" "}
          //   <button
          //     type="button"
          //     className="underline"
          //     onClick={() => setLogInOrSignUp("logIn")}
          //   >
          //     LOGIN
          //   </button>
          // </p>
        )}
      </div>
    </div>
  )
}

export default Auth
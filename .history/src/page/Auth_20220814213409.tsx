import { AxiosError } from "axios"
import React, { useEffect, useState } from "react"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { logIn, signUp } from "../services/authAPI"

type LogInOrSignUp = "logIn" | "signUp"
interface messageComponentProps {
  onClick: () => void
  currentStatus: LogInOrSignUp
}

export type AuthData = {
  email: string
  password: string
}

const Message = ({ onClick, currentStatus }: messageComponentProps) => {
  return (
    <p className="text-right">
      {currentStatus === "logIn" ? "Need an account? " : "Already a user? "}
      <button type="button" className="underline uppercase" onClick={onClick}>
        {currentStatus === "logIn" ? "SIGN UP" : "LOGIN"}
      </button>
    </p>
  )
}

function Auth() {
  const [logInOrSignUp, setLogInOrSignUp] = useState<LogInOrSignUp>("logIn")
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const navigate = useNavigate()

  const logInReq = useMutation(logIn, {
    onSuccess: (data) => {
      if (data.details === "로그인에 실패했습니다") {
        window.alert("Invalid email or password.")
      } else if (data.message === "성공적으로 로그인 했습니다") {
        window.localStorage.setItem("userToken", data.token)
        setEmailInput("")
        setPasswordInput("")
        navigate("/")
      }
    },
    onError: (error: AxiosError) => {
      window.alert(error.message)
    },
  })

  const signUpReq = useMutation(signUp, {
    onSuccess: (data) => {
      if (data.details === "이미 존재하는 유저입니다") {
        window.alert("This email address is already registered.")
      } else if (data.message === "계정이 성공적으로 생성되었습니다") {
        window.alert("Thanks for signing up. You can login now.")
        setLogInOrSignUp("logIn")
      }
    },
    onError: (error: AxiosError) => {
      window.alert(error.message)
    },
  })

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
      logInReq.mutate(data)
    } else if (logInOrSignUp === "signUp") {
      signUpReq.mutate(data)
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
        <Message
          onClick={() =>
            setLogInOrSignUp(logInOrSignUp === "logIn" ? "signUp" : "logIn")
          }
          currentStatus={logInOrSignUp}
        />
      </div>
    </div>
  )
}

export default Auth

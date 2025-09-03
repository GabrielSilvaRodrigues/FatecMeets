import { useState } from 'react'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [msg, setMsg] = useState('')

  async function handleSignup(e) {
    e.preventDefault()
    setMsg('')
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    })
    if (res.ok) {
      setMsg('Cadastro realizado! Faça login.')
    } else {
      setMsg('Erro ao cadastrar')
    }
  }

  return (
    <form onSubmit={handleSignup}>
      <h2>Cadastro</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
      <button type="submit">Cadastrar</button>
      <div>{msg}</div>
    </form>
  )
}

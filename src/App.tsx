import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
    <PageHeader />
    <AddMemo />
    </>
  )
}

function PageHeader() {
  return(
    <header>
    <h1>Web page Memo</h1>
    </header>
  )
}

function AddMemo() {
  return(
    <button className="pure-button">メモを追加</button>
  )
}

export default App

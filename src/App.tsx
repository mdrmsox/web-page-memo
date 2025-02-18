import { useState } from 'react'
import './App.css'
import { getData } from './IDBWrapper.tsx'

function App() {
  
  const listSubstitute = [
                          {
                            title: "タイトル",
                            url: "",
                            memo: "Webページについてのメモ",
                            date: "0"
                          }
                        ];
    
  const [flameMode, setFlameMode] = useState("a");
  const [memos, setMemos] = useState(listSubstitute);
  
  //IndexedDBからデータを取得する
  getData().then((data: any[]) => {
      if (data.length > 0) {
        setMemos(data);
      } else {
        setMemos(listSubstitute);
      }
    });
  const memoList = memos.map(({title, url, date}) => {
      return(
        <li key={date}>
          <a className="pure-button" href={url} target="_blank">{title}</a>
        </li>
      );
    });
  
  function modeChange() {
      setFlameMode(flameMode == "a" ? "b" : "a");
  }
  return (
    <>
      <PageHeader />
      <MemoList memo={memoList} mode={flameMode} />
      <AddMemo modeSet={modeChange} mode={flameMode}/>
    </>
  );
}

function PageHeader() {
  return(
    <header>
    <h1>Web page Memo</h1>
    </header>
  );
}

function AddMemo({modeSet, mode}) {
  return(
    <>
      <MemoForm mode={mode} />
      <button className="pure-button" onClick={() => {modeSet()}}>メモを追加</button>
    </>
  );
}

function MemoList({memo, mode}) {
  return(
    <ol className={"memo-list " + (mode == 'a' ? 'do-display' : 'no-display')}>{memo}</ol>
  );
}

function MemoForm({mode}) {
    return(
      <form className={"pure-form pure-form-stacked memo-form " + (mode == 'b' ? '' : 'no-display')}>
        <fieldset>
        <label htmlFor="page-title">
          Webページのタイトル
        </label>
        <input type="text" id="page-title" name="title" />
        <div className="pure-control-group">
          <label htmlFor="page-url">
            Webページのurl
          </label>
          <input type="text" id="page-url" name="url" />
        </div>
        <div className="pure-control-group">
          <label htmlFor="page-memo">
            Webページに関するメモ
          </label>
          <textarea id="page-memo" name="memo"></textarea>
        </div>
        </fieldset>
      </form>
    );
}

export default App

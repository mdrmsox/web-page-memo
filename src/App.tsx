import { useState, useRef } from 'react'
import './App.css'
import { getData, setData } from './IDBWrapper.tsx'

interface MemoType {
  title: string;
  url: string;
  memo: string;
  date: number;
}

function App() {
  
  const listSubstitute: MemoType[] = [
                          {
                            title: "タイトル",
                            url: "",
                            memo: "Webページについてのメモ",
                            date: "0"
                          }
                        ];
    
  const [flameMode, setFlameMode] = useState<string>("a");
  const [memos, setMemos] = useState<MemoType[]>(listSubstitute);
  
  //IndexedDBからデータを取得する
  getData().then((data: any[]) => {
      if (data.length > 0) {
        setMemos(data);
      } else {
        setMemos(listSubstitute);
      }
    })
    .catch((e) => {
      setMemos(listSubstitute);
        console.error(e.message);
      });
  const memoList = memos.map(({title, url, date}) => {
      return(
        <li key={date}>
          <a className="pure-button" href={url} target="_blank">{title}</a>
        </li>
      );
    });
  
  function appendMemos(memo: MemoType) {
    const nextMemos = memos.slice();
    nextMemos.push(memo);
    setMemos(nextMemos);
  }
  
  return (
    <>
      <PageHeader />
      <MemoList memo={memoList} />
      <AddMemo />
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

function AddMemo({appendMemos}) {
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  function changeDisplayForm() {
    setDisplayForm(displayForm ? false : true);
  }
  return(
    <div className="form-tray">
      <MemoForm isDisplay={displayForm} changeDisplayForm={changeDisplayForm} />
      <button className={"pure-button " + (displayForm ? 'no-display' : '')} onClick={() => {changeDisplayForm()}}>メモを追加</button>
    </div>
  );
}

function MemoList({memo}) {
  return(
    <ol className={"memo-list"}>{memo}</ol>
  );
}

function MemoForm({isDisplay, changeDisplayForm}) {
  
  const formRef = useRef<HTMLFormElement | null>(null);
  const dialogRef = useRef<HTMLDiadogElement | null>(null);
  
  function addMemo(formData: FormData ) {
    const memoData: MemoType = {
      title: formData.get('title'),
      url: formData.get('url'),
      memo: formData.get('memo'),
      date: Date.now()
    }
    setData(memeData).then((event : Event) => {
      console.log("メモデータ記録完了");
      
    }).catch((message) => {
      console.error(`メモデータの記録を失敗しました。${message}`);
    });
  }
  function onCancel(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dialogRef.current?.close();
    formRef.current?.reset();
    changeDisplayForm();
  }
  function closeDialog(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dialogRef.current?.close();
  }
  
  function ConfirmDialog({onCancel, closeDialog}) {
    return (
      <dialog ref={dialogRef}>
        <p>キャンセルしますか？</p>
        <div>
          <button onClick={onCancel}>はい</button>
          <button onClick={closeDialog}>いいえ</button>
        </div>
      </dialog>
    );
  }
    return(
    <>
        <form className={"pure-form pure-form-stacked memo-form " + (isDisplay ? '' : 'no-display')} ref={formRef}>
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
          <div className="box-align-container">
            <button className="pure-button">保存</button><button className="pure-button box-align-right" onClick={() => {dialogRef.current.showModal()}}>キャンセル</button>
          </div>
          </fieldset>
        </form>
        <ConfirmDialog onCancel={onCancel} closeDialog={closeDialog}/>
      </>
    );
}

export default App

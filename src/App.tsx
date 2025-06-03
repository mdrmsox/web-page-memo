import { createContext, useContext, useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import './App.css'
import { getData, setData, deleteData } from './IDBWrapper.tsx'

interface MemoType {
  title: string;
  url: string;
  date: number;
}
interface DefaultFormValuesType {
  title: string;
  url: string;
}
type DeleteMemo = (dbKey: number) => void;
type MemosContextType ={
  memos : MemoType[];
  setMemos : Dispatch<SetStateAction<MemoType[]>>;
  deleteMemo : DeleteMemo;
};
const MemosContext = createContext<MemosContextType | null>(null);


function App() {
  
  const listSubstitute: MemoType[] = [
                          {
                            title: "タイトル",
                            url: "",
                            date: 0
                          }
                        ];
    
  const [memos, setMemos] = useState<MemoType[]>([]);
  
  //IndexedDBからデータを取得する
  useEffect(() => {getData().then((data: any[]) => {
      if (data.length > 0) {
        setMemos(data);
      }
    })
    .catch((e) => {
      setMemos(listSubstitute);
        console.error(e.message);
      });
    }, []);
    function deleteMemo(dbKey: number) {
      deleteData(dbKey).then(() => {
        const modifiedMemo: MemoType[] = memos.filter((element: MemoType) => element.date != dbKey);
        setMemos(modifiedMemo);
      }).catch((message : string) => {
        console.error("メモの削除に失敗しました。%s", message);
      });
    }
   
  return (
    <>
      <PageHeader />
      <MemosContext.Provider value={{memos, setMemos, deleteMemo}}>
        <MemoList />
        <AddMemo />
      </MemosContext.Provider>
    </>
  );
}

function PageHeader() {
  return(
    <header>
    <h1>Webページメモ</h1>
    <HowToUse />
    </header>
  );
}

function HowToUse() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <article className="how-to-use-frame">
      <button className="pure-button" onClick={() => setIsVisible(true)}>使い方</button>
      <div className={`how-to-use-block ${isVisible ? 'visible' : ''}`}>
        <div className="close-button"><span className="pure-button" onClick={() => setIsVisible(false)}>&times;</span></div>
        <h3>使い方</h3>
        <p>このアプリはWebページのタイトルとURLを記録し、リスト形式で表示します。</p>
        <ol>
          <li>
            <h4>リストの表示</h4>
            <p>リスト内の項目をクリックすると、記録したWebページが表示されます。</p>
          </li>
          <li>
            <h4>項目の削除</h4>
            <p>不要な項目は削除ボタンをクリックすることで簡単に削除できます。</p>
          </li>
          <li>
            <h4>ブックマークレットの活用</h4>
            <p>ブックマークレットを使用するとWebページの登録がさらに簡単になります。</p>
            <p>登録したいWebページでブックマークレットを実行すると、そのページのタイトルとURLが自動的に入力された状態でアプリが表示されます。あとは「保存」ボタンを押すだけで、そのWebページがアプリに登録されます。</p>
            <h5>ブックマークレットの設定</h5>
            <p>「ブックマークマネージャ」や「ブックマークを管理」から「新しいブックマークを追加」を選択し、タイトルに「Webページメモブックマークレット」などお好みの名前をつけます。URL欄に以下のJavaScriptコードをそのまま入力してください。</p>
            <div className="code-box">
              <button onClick={() => {
                (document.getElementById('bookmarklet-code') as HTMLTextAreaElement)?.select();
                document.execCommand('copy');
               }} >
                JavaScriptをコピー
              </button>
              <textarea id="bookmarklet-code" defaultValue={'javascript:(function(){window.location.href = "' + window.location.href + '?title="+encodeURIComponent(document.title)+"%26url="+encodeURIComponent(location.href)})()'} readOnly />
           </div>
          </li>
        </ol>
      </div>
    </article>
  )
}

function AddMemo() {
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [defaultFormValues, setDefaultFormValues] = useState<DefaultFormValuesType>({
    title: "",
    url: ""
  });
  useEffect(() => {
    const currentLocation = window.location;
    if (currentLocation.search != '') {
      const params = new URLSearchParams(currentLocation.search);
      setDefaultFormValues({
        title: decodeURI(params.get("title") ?? ""),
        url: decodeURI(params.get("url") ?? "")
      });
      setDisplayForm(true);
    }
  }, [setDefaultFormValues, setDisplayForm]);
  function changeDisplayForm() {
    setDisplayForm(displayForm ? false : true);
  }
  return(
    <div className="form-tray">
      <MemoForm isDisplay={displayForm} changeDisplayForm={changeDisplayForm} defaultFormValues={defaultFormValues} />
      <button className={"pure-button " + (displayForm ? 'no-display' : '')} onClick={() => {changeDisplayForm()}}>メモを追加</button>
    </div>
  );
}

function MemoList() {

  const context = useContext(MemosContext);
  if (!context) {
   throw new Error('MemoContextが提供されていません。');
 }
  const {memos, deleteMemo} = context;
  const memoList = memos.map(({title, url, date}) => {
      return(
        <li key={date}>
          <a className="pure-button" href={url} target="_blank">{title}</a>
          <button className="delete-button pure-button" onClick={() => {return deleteMemo(date)}}>削除</button>
        </li>
      );
    });

  return(
    <div className="list-container"><ol className={"memo-list"}>{memoList}</ol></div>
  );
}

type MemoFormProps = {
  isDisplay : boolean;
  changeDisplayForm : () => void;
  defaultFormValues : DefaultFormValuesType;
}
function MemoForm({isDisplay, changeDisplayForm, defaultFormValues} : MemoFormProps) {
  
  const formRef = useRef<HTMLFormElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const context = useContext(MemosContext);
  if (!context) {
   throw new Error('MemoContextが提供されていません。');
 }
   const {memos, setMemos} = context;

  function addMemo(formData: FormData) {
    const memoData: MemoType = {
      title: formData.get('title')!.toString(),
      url: formData.get('url')!.toString(),
      date: Date.now()
    }
    setData(memoData).then(() => {
      console.log("メモデータ記録完了");
      const newMemos = memos.slice();
      newMemos.push(memoData);
      setMemos(newMemos);
    }).catch((message) => {
      console.error(`メモデータの記録を失敗しました。${message}`);
    });
    changeDisplayForm();
  }
  function onCancel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dialogRef.current?.close();
    formRef.current?.reset();
    changeDisplayForm();
  }
  function onCancelCancel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dialogRef.current?.showModal();
  }
  function closeDialog(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dialogRef.current?.close();
  }

  type ConfirmDialogProps = {
    onCancel : (e: React.MouseEvent<HTMLButtonElement>) => void;
    closeDialog : (e: React.MouseEvent<HTMLButtonElement>) => void;
  } 

  function ConfirmDialog({onCancel, closeDialog}: ConfirmDialogProps) {
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
        <form action={addMemo} className={"pure-form pure-form-stacked memo-form " + (isDisplay ? '' : 'no-display')} ref={formRef}>
          <fieldset>
          <label htmlFor="page-title">
            Webページのタイトル
          </label>
          <input type="text" id="page-title" name="title" defaultValue={defaultFormValues.title} required />
          <div className="pure-control-group">
            <label htmlFor="page-url">
              Webページのurl
            </label>
            <input type="url" id="page-url" name="url" defaultValue={defaultFormValues.url} required />
          </div>
          <div className="box-align-container">
            <button className="pure-button">保存</button><button className="pure-button box-align-right" onClick={onCancelCancel} >キャンセル</button>
          </div>
          </fieldset>
        </form>
        <ConfirmDialog onCancel={onCancel} closeDialog={closeDialog}/>
      </>
    );
}

export default App

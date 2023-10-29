import { useEffect, useState} from 'react';
import './Translator.css';
export default function Translator() {
const [translation, setTranslation] = useState(''); 
const [inputText, setInputText] = useState(''); 
const [outputLang, setOutputLang] = useState('en'); 
const rapidApiKey = import.meta.env.VITE_REACT_APP_API_KEY;
const rapidApiHost = import.meta.env.VITE_REACT_APP_API_HOST;
const url = import.meta.env.VITE_REACT_APP_BASE_URL;
const queryParams = import.meta.env.VITE_REACT_APP_QUERY_PARAMS;

    async function translate() {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      if (rapidApiKey) {
        headers.append('X-RapidAPI-Key', rapidApiKey);
      }
      if (rapidApiHost) {
        headers.append('X-RapidAPI-Host', rapidApiHost);
      }
      
      const options: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify([{ Text: inputText }])
      };
      
      try {
        const response = await fetch(`${url}${outputLang}${queryParams}`, options);
        const data = await response.json();
        const translatedText = data[0].translations[0].text;
        setTranslation(translatedText); 
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
      translate();
    },[inputText, outputLang])
      
  
      return (
    <>
      <section className="translator">
        <div className="row-wrapper">
          <div className="translator-container input-language">
            <div className="top-row">
             
            </div>
            <form action="" className="input-form">
              <textarea
                placeholder="Insira um texto que deseja traduzir (Qualquer idioma)"
                className="text-box"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
            </form>
         </div>



          <div className="translator-container output-lang">
            <div className="top-row">
              <select name="languages" id="languages" className="form-select form-select-sm" onChange={(e) => setOutputLang(e.target.value)}>
                <option value="en">Inglês</option> 
                <option value="es">Espanhol</option>
                <option value="it">Italiano</option>
                <option value="ja">Japão</option>
                <option value="ko">Coreano</option> 
                <option value="zh">Chinês</option>
                <option value="ru">Russo</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
                <option value="ar">Arabe</option>
                <option value="fr">Francês</option>
                <option value="de">Alemão</option>
              </select>
            </div>
              <p className="text-box output-box">{translation}</p> 
          </div>
        </div>
      </section>
    </>
  );
}

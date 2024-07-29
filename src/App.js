import './App.css';
import Menu from "./component/menu/menu"
import Sidebar from "./component/sidebar/Sidebar"
import MovieContant from "./component/movie/MovieContant"
import Footer from "./component/footer/Footer"
import {GenresProvider} from "./component/sidebar/fillter/context/GenresContext";
import {LanguageProvider} from "./component/sidebar/fillter/context/languageContext";
import {PageProvider} from "./component/sidebar/fillter/context/PageContext";
import {KeywordsProvider} from "./component/sidebar/fillter/context/KeywordContext";
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <KeywordsProvider>
    <PageProvider>
<GenresProvider>
<LanguageProvider>
<BrowserRouter>


    <div className="App">
      <div><Menu/></div>
      <div className='container-all'>
        <div className='sidebar-filter'><Sidebar/></div>

        <div className='contant-movie'><MovieContant/></div>

      </div>

      <div><Footer/></div>

    </div>
    </BrowserRouter>
</LanguageProvider>
</GenresProvider>
    </PageProvider>
    </KeywordsProvider>
  );
}

export default App;

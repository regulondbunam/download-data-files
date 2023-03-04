import { ColorPalette } from './components/ui-components';
import "./styleSheet_regulonDB.css"
import DownloadDataFile from './app/dowloadDataFiles';

function App() {
  return (
    <div>
      <ColorPalette >
        <DownloadDataFile />
      </ColorPalette>
    </div>
  );
}

export default App;

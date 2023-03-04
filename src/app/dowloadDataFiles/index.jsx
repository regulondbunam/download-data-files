import {Cover} from "../../components/ui-components"
import { getRIdata } from "./processFile/RI"

const DESCRIPTION = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent leo diam, maximus vitae turpis non, maximus rhoncus dolor. Sed eget mauris molestie, fermentum sapien sit amet, dapibus neque. Quisque posuere ipsum ligula, sit amet suscipit elit auctor nec. Pellentesque lacinia rutrum dui, ut commodo metus elementum in."

export default function DownloadDataFile() {

    getRIdata()

    return(
        <div>
            <Cover>
            <h1>Regulatory Interactions</h1>
        </Cover>
        <article>
            <p dangerouslySetInnerHTML={{__html: DESCRIPTION}} />
        </article>
        </div>
        
    )
}
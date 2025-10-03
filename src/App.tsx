import {HubContainer} from './components/HubContainer';
import {ActiveCoverageHeader} from './components/ActiveCoverageHeader';
import {PoliciesSection} from './components/PoliciesSection';
import {ToolsSupportSection} from './components/ToolsSupportSection';

function App() {
    return (
        <HubContainer>
            <ActiveCoverageHeader/>
            <PoliciesSection/>
            <ToolsSupportSection/>
        </HubContainer>
    );
}

export default App;
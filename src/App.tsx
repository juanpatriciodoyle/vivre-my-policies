import React, {useState} from 'react';
import {HubContainer} from './components/HubContainer';
import {ActiveCoverageHeader} from './components/ActiveCoverageHeader';
import {PoliciesSection, PolicyData} from './components/PoliciesSection';
import {ToolsSupportSection} from './components/ToolsSupportSection';
import {DetailsSidePanel} from './components/DetailsSidePanel';

function App() {
    const [isPanelOpen, setPanelOpen] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState<PolicyData | null>(null);

    const handleViewDetails = (policy: PolicyData) => {
        setSelectedPolicy(policy);
        setPanelOpen(true);
    };

    const handleClosePanel = () => {
        setPanelOpen(false);
    };

    return (
        <>
            <HubContainer>
                <ActiveCoverageHeader/>
                <PoliciesSection onViewDetails={handleViewDetails}/>
                <ToolsSupportSection/>
            </HubContainer>
            <DetailsSidePanel
                isOpen={isPanelOpen}
                onClose={handleClosePanel}
                policy={selectedPolicy}
            />
        </>
    );
}

export default App;